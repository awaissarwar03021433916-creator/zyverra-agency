import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/server/auth/requireAdmin";

/**
 * GET /api/admin/conversations/[id]
 *
 * Admin-only full transcript for one conversation: every user and AI message
 * ordered chronologically, plus the linked lead (if any). Requires an
 * authenticated admin session because the content is PII.
 *
 * Messages are read straight off the (conversationId, createdAt) index, with id
 * as a tiebreaker for deterministic ordering on identical timestamps.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing conversation id" }, { status: 400 });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    select: {
      id: true,
      sessionId: true,
      createdAt: true,
      updatedAt: true,
      lead: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          businessType: true,
          projectType: true,
        },
      },
      messages: {
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
        select: { id: true, role: true, content: true, createdAt: true },
      },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(conversation);
}
