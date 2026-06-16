/**
 * Deterministic safety net for chat output. The system prompt forbids markdown,
 * but models still occasionally emit it, so we strip any artifacts before the
 * reply reaches the chat window. Plain, readable text only.
 */
export function sanitizeReply(input: string): string {
  let text = input ?? "";

  // Code fences and inline code → keep the content, drop the markers.
  text = text.replace(/```[a-zA-Z0-9]*\n?/g, "").replace(/```/g, "");
  text = text.replace(/`([^`]+)`/g, "$1");

  // Bold / bold-italic markers.
  text = text.replace(/\*\*\*([^*]+)\*\*\*/g, "$1");
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/___([^_]+)___/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");

  // Headings (### Title) → plain line.
  text = text.replace(/^\s{0,3}#{1,6}\s+/gm, "");

  // Blockquotes.
  text = text.replace(/^\s{0,3}>\s?/gm, "");

  // Markdown bullets (* or +) at line start → a simple dash.
  text = text.replace(/^(\s*)[*+]\s+/gm, "$1- ");

  // Leftover emphasis markers.
  text = text.replace(/\*([^*\n]+)\*/g, "$1");
  text = text.replace(/(?<![\w])_([^_\n]+)_(?![\w])/g, "$1");

  // Any stray double markers left behind.
  text = text.replace(/\*\*/g, "").replace(/__/g, "");

  // Tidy whitespace: drop trailing spaces and collapse big gaps.
  text = text.replace(/[ \t]+$/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}
