import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimited } from "@/server/security/guard";
import { apiPolicies } from "@/rate-limiting/policies/api";

/**
 * GET /api/chat/history?sessionId=...
 *
 * Returns the full message history for a visitor's own conversation, oldest first,
 * so the chat widget can restore a project's thread when it is selected. Each
 * project uses its own sessionId, so this naturally returns only that project's
 * messages. The sessionId is the caller's own opaque, unguessable key.
 */
export async function GET(req: Request) {
  const limited = await rateLimited(req, "chat-history", apiPolicies.chatHistory);
  if (limited) return limited;

  // searchParams.get() returns a single value, so duplicate query params can't
  // pollute this. Bound the length; the sessionId is an opaque capability key.
  const raw = new URL(req.url).searchParams.get("sessionId")?.trim();
  const sessionId = raw ? raw.slice(0, 200) : "";
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
