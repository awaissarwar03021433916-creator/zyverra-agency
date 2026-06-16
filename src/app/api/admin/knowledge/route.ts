import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/server/auth/requireAdmin";

function str(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * GET /api/admin/knowledge — admin-only list of knowledge articles, newest first.
 */
export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const articles = await prisma.knowledgeArticle.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(articles);
}

/**
 * POST /api/admin/knowledge — create an article. Title and content are required.
 */
export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { title?: unknown; category?: unknown; content?: unknown; status?: unknown }
    | null;

  const title = str(body?.title);
  const content = str(body?.content);
  if (!title || !content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
  }

  const status = body?.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

  const article = await prisma.knowledgeArticle.create({
    data: { title, content, category: str(body?.category) ?? null, status },
  });
  return NextResponse.json(article, { status: 201 });
}
