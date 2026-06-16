import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/server/auth/requireAdmin";

const STAGES = ["NEW", "CONTACTED", "MEETING", "PROPOSAL", "WON", "LOST"] as const;
type Stage = (typeof STAGES)[number];

function isStage(value: unknown): value is Stage {
  return typeof value === "string" && (STAGES as readonly string[]).includes(value);
}

/**
 * PATCH /api/admin/projects/[id]
 *
 * Admin-only update of a single project's pipeline stage. Projects progress
 * independently of each other and of the lead. Auth-gated like the other writes.
 */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing project id" }, { status: 400 });
  }

  const body = (await req.json().catch(() => null)) as { stage?: unknown } | null;
  if (!isStage(body?.stage)) {
    return NextResponse.json({ error: "Invalid stage" }, { status: 400 });
  }

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { stage: body.stage, stageUpdatedAt: new Date() },
      select: { id: true, stage: true, stageUpdatedAt: true },
    });
    return NextResponse.json({ ok: true, project });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
