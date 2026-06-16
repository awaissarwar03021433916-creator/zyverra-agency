import { prisma } from "@/lib/prisma";

/**
 * Conversation memory layer — project-isolated (Phase 10).
 *
 * Provides the chatbot with ONLY the relevant remembered context for the project
 * the current conversation is about — its business/project/budget/timeline and a
 * short summary of that project's earlier discussion. Memory is scoped to the
 * conversation's OWN project (not the lead, which may have several projects), so
 * the AI never mixes information between projects.
 *
 * Sources (all already persisted):
 *  - the Project linked to this session's Conversation (its own extracted facts)
 *  - the Conversation's own running summary (anonymous / no-project sessions)
 *  - the contact's name from the linked Lead (shared identity only)
 *
 * Cross-session recall (by email/phone) intentionally returns the contact's NAME
 * only — never another project's facts — to keep projects isolated.
 */

type MemoryProject = {
  title: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  summary: string | null;
};

const PROJECT_SELECT = {
  title: true,
  projectType: true,
  budget: true,
  timeline: true,
  summary: true,
} as const;

// Keep the injected summary bounded so memory never dominates the context window.
const SUMMARY_MAX_CHARS = 600;

function clip(value: string, max: number): string {
  const trimmed = value.trim();
  return trimmed.length <= max ? trimmed : `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

function projectHasFacts(p: MemoryProject): boolean {
  return Boolean(p.projectType || p.budget || p.timeline || p.summary || p.title);
}

// Memory for the conversation's OWN project — strictly isolated to that project.
function renderProjectMemory(
  name: string | null,
  project: MemoryProject,
  conversationSummary: string | null
): string {
  const lines: string[] = [];
  if (name) lines.push(`- Name: ${name}`);
  if (project.title) lines.push(`- Project: ${project.title}`);
  if (project.projectType) lines.push(`- Project type: ${project.projectType}`);
  if (project.budget) lines.push(`- Budget: ${project.budget}`);
  if (project.timeline) lines.push(`- Timeline: ${project.timeline}`);
  const discussion = project.summary ?? conversationSummary;
  if (discussion) lines.push(`- Previous discussion: ${clip(discussion, SUMMARY_MAX_CHARS)}`);

  const title = project.title ?? "current";
  return [
    `MEMORY — context for the visitor's "${title}" project ONLY. Treat it as known and never re-ask for it. This conversation is exclusively about this project: never reference, assume, or mix in details from any other project the visitor may have.`,
    ...lines,
    "Continue naturally on this project, building on the above and keeping strictly to it.",
  ].join("\n");
}

// Fallback for sessions with no linked project yet (e.g. anonymous): the
// conversation's own running summary, which is per-session and therefore isolated.
function renderSummaryMemory(name: string | null, summary: string): string {
  const lines: string[] = [];
  if (name) lines.push(`- Name: ${name}`);
  lines.push(`- Previous discussion: ${clip(summary, SUMMARY_MAX_CHARS)}`);
  return [
    "MEMORY — summary of THIS conversation's earlier discussion. Treat anything covered here as known and do not re-ask. Keep strictly to this conversation; do not mix in any other project.",
    ...lines,
    "Continue naturally from this point.",
  ].join("\n");
}

// Cross-session recall: the contact's name only — never another project's facts.
function renderContactMemory(name: string): string {
  return [
    `MEMORY — ${name} is a returning contact. You may greet them by name, but you have no saved details for their current project yet, so ask what they would like to work on. Do not assume details from any previous project.`,
  ].join("\n");
}

/**
 * Build a compact, project-isolated memory preamble, or null when there is nothing
 * useful to remember. Never throws — on any failure it returns null so the chat
 * simply proceeds without memory.
 */
export async function buildConversationMemory(params: {
  sessionId: string | null;
  email?: string;
  phone?: string;
}): Promise<string | null> {
  const { sessionId, email, phone } = params;

  try {
    // 1) This session's conversation -> its OWN project + summary (+ contact name).
    if (sessionId) {
      const conversation = await prisma.conversation.findUnique({
        where: { sessionId },
        select: {
          summary: true,
          lead: { select: { name: true } },
          project: { select: PROJECT_SELECT },
        },
      });

      if (conversation) {
        const name = conversation.lead?.name ?? null;

        if (conversation.project && projectHasFacts(conversation.project)) {
          return renderProjectMemory(name, conversation.project, conversation.summary);
        }
        if (conversation.summary && conversation.summary.trim()) {
          return renderSummaryMemory(name, conversation.summary);
        }
        if (name) {
          return renderContactMemory(name);
        }
      }
    }

    // 2) Cross-session recall: contact identity ONLY (no project facts -> no bleed).
    if (email || phone) {
      const lead = await prisma.lead.findFirst({
        where: {
          OR: [
            email ? { email } : undefined,
            phone ? { phone } : undefined,
          ].filter(Boolean) as Array<{ email?: string; phone?: string }>,
        },
        orderBy: { createdAt: "desc" },
        select: { name: true },
      });
      if (lead?.name) return renderContactMemory(lead.name);
    }

    return null;
  } catch (err) {
    console.error("conversation_memory_error", err);
    return null;
  }
}
