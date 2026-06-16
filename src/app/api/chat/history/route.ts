import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/chat/history?sessionId=...
 *
 * Returns the full message history for a visitor's own conversation, oldest first,
 * so the chat widget can restore a project's thread when it is selected. Each
 * project uses its own sessionId, so this naturally returns only that project's
 * messages. The sessionId is the caller's own opaque, unguessable key.
 */
export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get("sessionId")?.trim();
  if (!sessionId) {
    return NextResponse.json({ messages: [] });
  }

  const conversation = await prisma.conversation.findUnique({
    where: { sessionId },
    select: {
      createdAt: true,
      updatedAt: true,
      messages: {
        orderBy: [{ createdAt: "asc" }, { id: "asc" }],
        select: { id: true, role: true, content: true, createdAt: true },
      },
    },
  });

  return NextResponse.json({
    messages: conversation?.messages ?? [],
    createdAt: conversation?.createdAt ?? null,
    updatedAt: conversation?.updatedAt ?? null,
  });
}
