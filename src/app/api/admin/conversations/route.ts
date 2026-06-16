import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/server/auth/requireAdmin";

const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 100;

function parseLimit(raw: string | null): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(n) || n <= 0) return DEFAULT_LIMIT;
  return Math.min(n, MAX_LIMIT);
}

/**
 * GET /api/admin/conversations
 *
 * Admin-only list of conversations, newest activity first. Conversation content
 * is PII, so an authenticated admin session is required.
 *
 * Scaling: cursor-based pagination via `?limit=` and `?cursor=` (an opaque
 * conversation id). Only summary fields are selected; full transcripts are
 * fetched per-conversation from the detail endpoint.
 */
export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const limit = parseLimit(url.searchParams.get("limit"));
  const cursor = url.searchParams.get("cursor");

  const items = await prisma.conversation.findMany({
    take: limit + 1, // fetch one extra to detect a following page
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    // Compound order keeps pagination stable when updatedAt values collide.
    orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
    select: {
      id: true,
      sessionId: true,
      createdAt: true,
      updatedAt: true,
      lead: { select: { id: true, name: true, email: true } },
      _count: { select: { messages: true } },
    },
  });

  const hasMore = items.length > limit;
  const page = hasMore ? items.slice(0, limit) : items;
  const nextCursor = hasMore ? page[page.length - 1]?.id ?? null : null;

  return NextResponse.json({
    conversations: page.map((c) => ({
      id: c.id,
      sessionId: c.sessionId,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      messageCount: c._count.messages,
      lead: c.lead,
    })),
    nextCursor,
  });
}
