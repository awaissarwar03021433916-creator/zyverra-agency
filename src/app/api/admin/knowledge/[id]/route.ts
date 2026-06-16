import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/server/auth/requireAdmin";

function str(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * PATCH /api/admin/knowledge/[id] — edit an article (admin only).
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing article id" }, { status: 400 });
  }

  const body = (await req.json().catch(() => null)) as
    | { title?: unknown; category?: unknown; content?: unknown; status?: unknown }
    | null;

  // Only update provided fields; reject explicit empty title/content.
  const data: {
    title?: string;
    content?: string;
    category?: string | null;
    status?: "DRAFT" | "PUBLISHED";
  } = {};
  if (body && "title" in body) {
    const title = str(body.title);
    if (!title) return NextResponse.json({ error: "Title cannot be empty" }, { status: 400 });
    data.title = title;
  }
  if (body && "content" in body) {
    const content = str(body.content);
    if (!content) return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 });
    data.content = content;
  }
  if (body && "category" in body) {
    data.category = str(body.category) ?? null;
  }
  if (body && "status" in body) {
    if (body.status !== "DRAFT" && body.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    data.status = body.status;
  }

  try {
    const article = await prisma.knowledgeArticle.update({ where: { id }, data });
    return NextResponse.json(article);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

/**
 * DELETE /api/admin/knowledge/[id] — delete an article (admin only).
 */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing article id" }, { status: 400 });
  }

  try {
    await prisma.knowledgeArticle.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
