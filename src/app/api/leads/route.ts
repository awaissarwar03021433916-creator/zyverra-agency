import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendClientEmail } from "@/lib/email";
import { normalizeEmail, normalizePhone, phoneDedupKey } from "@/services/ai/extractLead";
import { getAdminSession } from "@/server/auth/requireAdmin";

function pickFirstEmail(value: unknown) {
  if (typeof value !== "string") return undefined;
  const match = value.replace(/\r/g, "").match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return normalizeEmail(match?.[0] ?? null) ?? undefined;
}

function pickFirstPhone(value: unknown) {
  if (typeof value !== "string") return undefined;
  const match = value.replace(/\r/g, "").match(/\+?\d[\d\s-]{8,}\d/);
  return normalizePhone(match?.[0] ?? null) ?? undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = pickFirstEmail(body?.email);
    const phone = pickFirstPhone(body?.phone);
    const phoneKey = phoneDedupKey(phone);

    const existing =
      email || phoneKey
        ? await prisma.lead.findFirst({
            where: {
              OR: [
                ...(email ? [{ email }] : []),
                ...(phoneKey ? [{ phone: { endsWith: phoneKey } }] : []),
              ],
            },
          })
        : null;

    const data = {
      ...body,
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
    } as Record<string, unknown>;

    const lead = existing
      ? await prisma.lead.update({
          where: { id: existing.id },
          data,
        })
      : await prisma.lead.create({
          data,
        });

    if (lead.email) {
      // Visitor confirmation only. The admin lead notification (with score + stage)
      // is sent from the chat route, which is where scoring happens.
      await sendClientEmail(lead.email, lead.name ?? undefined).catch((err) => {
        console.error("sendClientEmail_error", err);
      });
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}

export async function GET() {
  // Lead data is PII: never expose it without an authenticated admin session.
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Prefer leads with their latest linked conversation id (for deep-linking to the
  // conversation viewer). The Conversation table may not exist in every environment
  // yet; if the relational read fails, fall back to a plain lead list so the dashboard
  // always loads. Read-only either way — storage is never changed.
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        conversations: {
          select: { id: true },
          orderBy: { updatedAt: "desc" },
          take: 1,
        },
        // Projects (Lead -> Projects -> Conversations), each with its latest
        // conversation id for a per-project "View Conversation" link.
        projects: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            title: true,
            status: true,
            projectType: true,
            budget: true,
            score: true,
            scoreTier: true,
            stage: true,
            conversations: { select: { id: true }, orderBy: { updatedAt: "desc" }, take: 1 },
          },
        },
      },
    });
    return NextResponse.json(leads);
  } catch (err) {
    console.error("leads_with_conversations_fallback", err);
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(leads);
  }
}

