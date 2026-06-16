import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/server/auth/requireAdmin";

const STAGES = ["NEW", "CONTACTED", "MEETING", "PROPOSAL", "WON", "LOST"] as const;
type Stage = (typeof STAGES)[number];

function isStage(value: unknown): value is Stage {
  return typeof value === "string" && (STAGES as readonly string[]).includes(value);
}

/**
 * PATCH /api/admin/leads/[id]
 *
 * Admin-only update of a lead's pipeline stage. This is a write path, so it
 * requires an authenticated admin session (same guard as the read endpoints).
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing lead id" }, { status: 400 });
  }

  const body = (await req.json().catch(() => null)) as { stage?: unknown } | null;
  if (!isStage(body?.stage)) {
    return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
  }

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: { stage: body.stage, stageUpdatedAt: new Date() },
      select: { id: true, stage: true, stageUpdatedAt: true },
    });
    return NextResponse.json({ ok: true, lead });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
