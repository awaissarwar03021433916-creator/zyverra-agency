import { openai } from "./openaiClient";

/**
 * Project routing (Project Context Management).
 *
 * Detects when a visitor starts discussing a DIFFERENT project than the one in
 * progress, and interprets their answer when the bot asks whether to continue the
 * current project or start a new one. Two small structured-output classifiers; each
 * returns null on failure so the chat simply proceeds without project separation.
 */

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return (await Promise.race([
    p,
    new Promise((_, reject) => setTimeout(() => reject(new Error("project_router_timeout")), ms)),
  ])) as T;
}

const DETECT_INSTRUCTIONS = `You manage project context for a software-agency sales chat.

Decide whether the visitor's latest message is about a DIFFERENT project than the current one. STRONGLY PREFER STABILITY: keep the same project unless there is a clear, major change of business or product domain. Avoid creating excessive projects.

- If the current project is "(none yet)", set isDifferent=true (this is the first project) and give it a short title.
- isDifferent=false (SAME project) for any addition, new feature, module, page, integration, refinement, budget/timeline change, or follow-up within the same product or business — even when it introduces a new component. Example: for a "Real Estate Website", "add a booking system", "add an admin panel", "add payments", or "also build a CRM for it" are ALL the same project.
- isDifferent=true (NEW project) ONLY when the visitor clearly pivots to a different business domain or a separate, unrelated product/system. Example: going from a "Real Estate Website" to a "Restaurant POS System" is a different project.
- When in doubt, choose isDifferent=false (stay in the current project).

Always provide a concise 2-5 word title for the project the message is about (e.g. "Real Estate Website", "Restaurant POS System").`;

const DETECT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["isDifferent", "title"],
  properties: {
    isDifferent: { type: "boolean" },
    title: { type: "string" },
  },
} as const;

export type DetectResult = { isDifferent: boolean; title: string };

export async function detectProject(params: {
  activeTitle: string | null;
  message: string;
}): Promise<DetectResult | null> {
  const { activeTitle, message } = params;
  if (!message.trim()) return null;

  try {
    const completion = (await withTimeout(
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 80,
        messages: [
          { role: "system", content: DETECT_INSTRUCTIONS },
          {
            role: "user",
            content: `Current project: ${activeTitle ?? "(none yet)"}\nVisitor message: ${message}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "project_detect", strict: true, schema: DETECT_SCHEMA },
        },
      }),
      10000
    )) as Awaited<ReturnType<typeof openai.chat.completions.create>>;

    const raw = "choices" in completion ? completion.choices?.[0]?.message?.content ?? "" : "";
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { isDifferent?: unknown; title?: unknown };
    const title = clean(parsed.title) || activeTitle || "New project";
    return { isDifferent: Boolean(parsed.isDifferent), title };
  } catch (err) {
    console.error("project_detect_error", err);
    return null;
  }
}

const CHOICE_INSTRUCTIONS = `The visitor was asked whether to CONTINUE their current project or START A NEW one. From their latest message, classify their choice:
- "continue" — they want to keep working on the current project.
- "new" — they want to start the new/different project.
- "unclear" — they did not clearly choose.`;

const CHOICE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["choice"],
  properties: {
    choice: { type: "string", enum: ["continue", "new", "unclear"] },
  },
} as const;

export type Choice = "continue" | "new" | "unclear";

export async function resolveChoice(params: {
  activeTitle: string | null;
  pendingTitle: string | null;
  message: string;
}): Promise<Choice | null> {
  const { activeTitle, pendingTitle, message } = params;
  if (!message.trim()) return null;

  try {
    const completion = (await withTimeout(
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 20,
        messages: [
          { role: "system", content: CHOICE_INSTRUCTIONS },
          {
            role: "user",
            content: `Current project: ${activeTitle ?? "(unknown)"}\nNew project: ${pendingTitle ?? "(unknown)"}\nVisitor message: ${message}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "project_choice", strict: true, schema: CHOICE_SCHEMA },
        },
      }),
      10000
    )) as Awaited<ReturnType<typeof openai.chat.completions.create>>;

    const raw = "choices" in completion ? completion.choices?.[0]?.message?.content ?? "" : "";
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice?: unknown };
    if (parsed.choice === "continue" || parsed.choice === "new" || parsed.choice === "unclear") {
      return parsed.choice;
    }
    return null;
  } catch (err) {
    console.error("project_choice_error", err);
    return null;
  }
}
