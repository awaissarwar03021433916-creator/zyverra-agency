import { systemPrompt } from "@/utils/systemPrompt";
import { sanitizeReply } from "@/utils/sanitizeReply";
import type { ChatCompletion } from "openai/resources/chat/completions";

import { openai } from "./openaiClient";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

async function requestCompletion(
  messages: ChatMessage[],
  memory?: string | null,
  knowledge?: string | null,
  directive?: string | null
) {
  return (await Promise.race([
    openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        // Project Context Management: a high-priority routing directive (e.g. ask the
        // visitor whether to continue the current project or start a new one).
        ...(directive ? [{ role: "system" as const, content: directive }] : []),
        // Phase 6: inject relevant Knowledge Base context first, so authoritative
        // company knowledge is preferred over the model's general knowledge.
        ...(knowledge ? [{ role: "system" as const, content: knowledge }] : []),
        // Phase 3: inject relevant remembered context as a second system message,
        // so the model continues naturally without re-asking known details.
        ...(memory ? [{ role: "system" as const, content: memory }] : []),
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.6,
      max_tokens: 120,
    }),

    // ⏱ Timeout after 20 seconds
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), 20000)
    ),
  ])) as ChatCompletion;
}

/**
 * Pick a fallback message without relying on shared module state. Varying by
 * how far the conversation has progressed keeps responses from feeling
 * identical, while staying correct under concurrent requests.
 */
function pickFallback(messages: ChatMessage[]): string {
  const userTurns = messages.filter((m) => m.role === "user").length;

  if (userTurns > 1) {
    return `Let’s keep building on what you already shared.

We already have direction, so we will refine the next step clearly.

What should we shape next: your key feature flow or your delivery timeline?`;
  }

  return `Got it, let’s structure this properly.

Based on what you’ve shared, we’re building a clear system here.

Tell me, what matters more to you right now:
how users interact with it, or how you manage it internally?`;
}

export async function generateAIResponse(
  messages: ChatMessage[],
  memory?: string | null,
  knowledge?: string | null,
  directive?: string | null
) {
  try {
    const firstResponse = await requestCompletion(messages, memory, knowledge, directive);
    let text = firstResponse?.choices?.[0]?.message?.content ?? "";

    // If response is too short, retry once before falling back.
    if (text.trim().length < 5) {
      const retryResponse = await requestCompletion(messages, memory, knowledge, directive);
      text = retryResponse?.choices?.[0]?.message?.content ?? "";
      if (text.trim().length < 5) {
        throw new Error("empty_response_after_retry");
      }
    }

    // Strip any markdown the model still emitted before it hits the chat window.
    return sanitizeReply(text);
  } catch (error) {
    console.error("AI ERROR:", error);
    return pickFallback(messages);
  }
}
