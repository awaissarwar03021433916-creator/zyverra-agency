import { NextResponse } from "next/server";
import { generateAIResponse } from "@/services/ai/openaiService";
import {
  extractLeadFromConversation,
  regexContacts,
  normalizeEmail,
  normalizePhone,
  phoneDedupKey,
} from "@/services/ai/extractLead";
import { buildConversationMemory } from "@/services/ai/conversationMemory";
import { searchKnowledge } from "@/services/ai/knowledgeBase";
import { detectProject, resolveChoice } from "@/services/ai/projectRouter";
import { scoreLead } from "@/lib/leadScoring";
import { sendNewLeadEmail, sendHotLeadEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

type LeadFields = {
  name?: string;
  email?: string;
  phone?: string;
  businessType?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  description?: string;
};

function str(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

// Insert a message, treating a unique-constraint violation (P2002 on the
// conversationId+clientId index) as a no-op: an accidental retry of the same turn
// must never store a duplicate message.
async function storeMessageOnce(data: {
  conversationId: string;
  projectId: string | null;
  clientId: string | null;
  role: "user" | "assistant";
  content: string;
}): Promise<void> {
  try {
    await prisma.message.create({ data });
  } catch (err) {
    if ((err as { code?: string } | null)?.code === "P2002") return; // duplicate retry
    throw err;
  }
}

type RouteState = {
  activeProjectTitle: string | null;
  pendingProjectTitle: string | null;
  projectId: string | null;
};

type RouteOutcome = {
  directive: string | null;
  nextActive: string | null;
  nextPending: string | null;
  // A project title to create a Project record for (when a lead exists).
  createProjectTitle: string | null;
};

/**
 * Project Context Management: decide how this turn relates to the visitor's
 * project(s) — establish the first project, continue the current one, detect a
 * switch to a different project (and ask), or resolve their continue/new choice.
 * Returns a steering directive for the reply plus the next routing state.
 */
async function resolveProjectRoute(state: RouteState, message: string): Promise<RouteOutcome> {
  const base: RouteOutcome = {
    directive: null,
    nextActive: state.activeProjectTitle,
    nextPending: state.pendingProjectTitle,
    createProjectTitle: null,
  };
  if (!message.trim()) return base;

  // We previously asked the visitor to choose: continue current vs. start new.
  if (state.pendingProjectTitle) {
    const choice = await resolveChoice({
      activeTitle: state.activeProjectTitle,
      pendingTitle: state.pendingProjectTitle,
      message,
    });
    if (choice === "new") {
      return {
        directive: `PROJECT CONTEXT: The visitor chose to start a NEW project: "${state.pendingProjectTitle}". Begin a fresh discussion focused on this new project, and do not mix in the previous project's details.`,
        nextActive: state.pendingProjectTitle,
        nextPending: null,
        createProjectTitle: state.pendingProjectTitle,
      };
    }
    if (choice === "continue") {
      return {
        directive: `PROJECT CONTEXT: The visitor chose to CONTINUE their current project: "${state.activeProjectTitle}". Keep helping with that project.`,
        nextActive: state.activeProjectTitle,
        nextPending: null,
        createProjectTitle: null,
      };
    }
    // Unclear / classifier failed — ask again.
    return {
      directive: `PROJECT CONTEXT: The visitor was asked whether to continue "${state.activeProjectTitle}" or start a new project ("${state.pendingProjectTitle}") but did not clearly choose. Politely ask them to pick one before continuing.`,
      nextActive: state.activeProjectTitle,
      nextPending: state.pendingProjectTitle,
      createProjectTitle: null,
    };
  }

  const detected = await detectProject({ activeTitle: state.activeProjectTitle, message });
  if (!detected) return base;

  // First substantive project of the session — establish it.
  if (!state.activeProjectTitle) {
    return { directive: null, nextActive: detected.title, nextPending: null, createProjectTitle: detected.title };
  }

  // A clearly different project — ask the visitor how to proceed.
  if (detected.isDifferent) {
    return {
      directive: `PROJECT CONTEXT: The visitor has been discussing the project "${state.activeProjectTitle}". Their latest message appears to be about a DIFFERENT project ("${detected.title}"). Do not switch automatically. Briefly acknowledge this, then ask them to choose: continue with the "${state.activeProjectTitle}" project, or start a new project for "${detected.title}". Wait for their choice before going further.`,
      nextActive: state.activeProjectTitle,
      nextPending: detected.title,
      createProjectTitle: null,
    };
  }

  // Same project — proceed normally.
  return base;
}

export async function POST(req: Request) {
  try {
    const { messages, lead, sessionId } = (await req.json().catch(() => ({}))) as {
      messages?: Array<{ id?: string; role?: string; content?: string }>;
      lead?: Record<string, unknown>;
      sessionId?: unknown;
    };

    const safeSessionId =
      typeof sessionId === "string" && sessionId.trim() ? sessionId.trim() : null;

    const safeMessages = Array.isArray(messages) ? messages : [];
    const conversationTurns = safeMessages
      .filter((m): m is { role: "user" | "assistant"; content: string } => {
        return (m.role === "user" || m.role === "assistant") && typeof m.content === "string";
      })
      .map((m) => ({ role: m.role, content: m.content }));

    const lastUserMsg = [...safeMessages].reverse().find((m) => m?.role === "user");
    const lastUserMessage = lastUserMsg?.content ?? "";
    // Stable client message id used as an idempotency key so accidental retries of
    // the same turn never store duplicate messages.
    const lastUserMessageId =
      typeof lastUserMsg?.id === "string" && lastUserMsg.id.trim() ? lastUserMsg.id.trim() : null;

    const clientLead = (lead && typeof lead === "object" ? lead : {}) as Record<string, unknown>;

    // Project Context Management: load this session's current project-routing state.
    let routeState = {
      activeProjectTitle: null as string | null,
      pendingProjectTitle: null as string | null,
      projectId: null as string | null,
    };
    if (safeSessionId) {
      const existingConv = await prisma.conversation.findUnique({
        where: { sessionId: safeSessionId },
        select: { activeProjectTitle: true, pendingProjectTitle: true, projectId: true },
      });
      if (existingConv) routeState = existingConv;
    }
    const routePromise = resolveProjectRoute(routeState, lastUserMessage);

    // Phase 3 memory: load only the relevant remembered facts for this visitor
    // (business, project, budget, timeline, previous discussion) BEFORE replying.
    // Memory load and lead extraction run concurrently; the reply starts as soon
    // as memory resolves, so extraction still overlaps the model call.
    const memoryPromise = buildConversationMemory({
      sessionId: safeSessionId,
      email: str(clientLead.email),
      phone: str(clientLead.phone),
    });
    // Phase 6: retrieve relevant Knowledge Base context for the latest question.
    const knowledgePromise = searchKnowledge(lastUserMessage);
    const extractionPromise = extractLeadFromConversation(conversationTurns);
    const replyPromise = Promise.all([memoryPromise, knowledgePromise, routePromise]).then(
      ([loadedMemory, knowledge, route]) => {
        // Project-aware memory (Phase 10): memory is loaded for the conversation's
        // current project. When the router establishes or switches to a different
        // project this turn (createProjectTitle set), drop that memory so the new
        // project starts with a clean context — the switch is immediate and no
        // other project's details bleed in.
        const memory = route.createProjectTitle ? null : loadedMemory;
        return generateAIResponse(conversationTurns, memory, knowledge, route.directive);
      }
    );

    const extraction = await extractionPromise;

    const regex = regexContacts(lastUserMessage);

    // AI is the primary, authoritative extractor. Keyword/regex and the client's
    // optimistic values are only fallbacks for contact details — never the primary
    // source for the intent fields (business type, project, budget, timeline).
    const fields: LeadFields = extraction
      ? {
          name: extraction.name ?? str(clientLead.name),
          email: extraction.email ?? normalizeEmail(clientLead.email) ?? regex.email ?? undefined,
          phone: extraction.phone ?? normalizePhone(clientLead.phone) ?? regex.phone ?? undefined,
          businessType: extraction.businessType ?? undefined,
          projectType: extraction.projectType ?? undefined,
          budget: extraction.budget ?? undefined,
          timeline: extraction.timeline ?? undefined,
          description: extraction.projectSummary ?? str(clientLead.description),
        }
      : {
          // Extraction unavailable (timeout/error): degrade gracefully to contact
          // details plus the raw last message, so a lead is still captured.
          name: str(clientLead.name),
          email: normalizeEmail(clientLead.email) ?? regex.email ?? undefined,
          phone: normalizePhone(clientLead.phone) ?? regex.phone ?? undefined,
          businessType: str(clientLead.businessType),
          projectType: str(clientLead.projectType),
          budget: str(clientLead.budget),
          timeline: str(clientLead.timeline),
          description: str(clientLead.description) ?? (lastUserMessage.trim() || undefined),
        };

    // Deterministic score from the captured fields (Phase 4). Computed once and
    // reused for the lead and the active project (Phase D); recomputed each turn so
    // the score evolves as more is learned, and the reason stays explainable.
    const scored = scoreLead(fields);

    // Persist the lead only when we have a real contact method. Enrich an existing
    // record (matched by email/phone) without downgrading — Prisma treats undefined
    // fields as "leave unchanged", so empty extractions never wipe known data.
    let leadId: string | null = null;
    if (fields.email || fields.phone) {
      try {
        const leadData = {
          ...fields,
          score: scored.score,
          scoreTier: scored.tier,
          scoreReason: scored.reason,
          scoredAt: new Date(),
        };

        // Dedup by normalized email (exact) and by canonical phone key (last 10
        // significant digits), so differently-formatted numbers match the same lead.
        const phoneKey = phoneDedupKey(fields.phone);
        const exists = await prisma.lead.findFirst({
          where: {
            OR: [
              fields.email ? { email: fields.email } : undefined,
              phoneKey ? { phone: { endsWith: phoneKey } } : undefined,
            ].filter(Boolean) as Array<{ email?: string; phone?: { endsWith: string } }>,
          },
        });

        const row = exists
          ? await prisma.lead.update({ where: { id: exists.id }, data: leadData })
          : await prisma.lead.create({ data: leadData });
        leadId = row.id;

        // Admin email notifications (Phase 9). Idempotent (each alert fires at most
        // once via the *NotifiedAt flags) and best-effort — runs while the reply is
        // already being generated, so it never blocks or changes the chat response.
        try {
          if (!row.newLeadNotifiedAt) {
            await sendNewLeadEmail(row);
            await prisma.lead.update({
              where: { id: row.id },
              data: { newLeadNotifiedAt: new Date() },
            });
          }
          if (row.scoreTier === "HOT" && !row.hotLeadNotifiedAt) {
            await sendHotLeadEmail(row);
            await prisma.lead.update({
              where: { id: row.id },
              data: { hotLeadNotifiedAt: new Date() },
            });
          }
        } catch (err) {
          console.error("lead_notify_error", err);
        }
      } catch (err) {
        // Never block chat responses on lead persistence.
        console.error("lead_save_error", err);
      }
    }

    // Resolve project routing, and create a Project record when the visitor
    // establishes or commits to a new project (only possible once a lead exists).
    const route = await routePromise;
    let projectId = routeState.projectId;
    if (route.createProjectTitle && leadId) {
      try {
        const project = await prisma.project.create({
          data: {
            leadId,
            title: route.createProjectTitle,
            summary: extraction?.projectSummary ?? null,
            projectType: fields.projectType ?? null,
            budget: fields.budget ?? null,
            timeline: fields.timeline ?? null,
            score: scored.score,
            scoreTier: scored.tier,
            scoreReason: scored.reason,
          },
        });
        projectId = project.id;
      } catch (err) {
        console.error("project_create_error", err);
      }
    }

    // Per-project qualification (Phase 9.5): keep the active project's own fields and
    // deterministic score in sync with the current extraction (its own data in the
    // per-project session). Lead-level scoring is left untouched (additive).
    if (projectId) {
      try {
        await prisma.project.update({
          where: { id: projectId },
          data: {
            projectType: fields.projectType,
            budget: fields.budget,
            timeline: fields.timeline,
            score: scored.score,
            scoreTier: scored.tier,
            scoreReason: scored.reason,
            ...(extraction?.projectSummary ? { summary: extraction.projectSummary } : {}),
          },
        });
      } catch (err) {
        console.error("project_score_error", err);
      }
    }

    // Conversation persistence (Phase 1): tie this turn to a sessionId-keyed
    // conversation, store the user message, and link the lead when present.
    let conversationId: string | null = null;
    if (safeSessionId) {
      try {
        // Persist the running conversation summary so ANONYMOUS visitors are
        // remembered too (Phase 3.5). Reuses the extractor's projectSummary — no
        // extra model call. Only updates when this turn produced a summary.
        const summary = extraction?.projectSummary ?? null;
        const summaryData = summary
          ? { summary, summaryUpdatedAt: new Date() }
          : {};

        const projectData = {
          activeProjectTitle: route.nextActive,
          pendingProjectTitle: route.nextPending,
          ...(projectId ? { projectId } : {}),
        };

        const conversation = await prisma.conversation.upsert({
          where: { sessionId: safeSessionId },
          create: { sessionId: safeSessionId, leadId, ...summaryData, ...projectData },
          update: { ...(leadId ? { leadId } : {}), ...summaryData, ...projectData },
        });
        conversationId = conversation.id;

        if (lastUserMessage.trim()) {
          await storeMessageOnce({
            conversationId,
            projectId,
            clientId: lastUserMessageId,
            role: "user",
            content: lastUserMessage,
          });
        }
      } catch (err) {
        console.error("conversation_persist_error", err);
        conversationId = null;
      }
    }

    const reply = await replyPromise;

    // Store the AI response against the same conversation, ordered after the user
    // message. Its idempotency key is derived from the user turn so a retry never
    // stores a duplicate reply (one assistant message per user turn).
    if (conversationId && typeof reply === "string" && reply.trim()) {
      try {
        await storeMessageOnce({
          conversationId,
          projectId,
          clientId: lastUserMessageId ? `${lastUserMessageId}:assistant` : null,
          role: "assistant",
          content: reply,
        });
      } catch (err) {
        console.error("conversation_persist_error", err);
      }
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      reply: "Something went wrong. Please try again.",
    });
  }
}
