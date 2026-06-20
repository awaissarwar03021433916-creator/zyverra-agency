// Input sanitization helpers shared by the public API routes.

/**
 * Remove null bytes and non-printable control characters, keeping tab (9),
 * newline (10), and carriage return (13). Implemented as a code-point scan so
 * the source stays plain ASCII (no embedded control characters).
 */
function stripControlChars(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.codePointAt(0) ?? 0;
    const isAllowedWhitespace = code === 9 || code === 10 || code === 13;
    const isPrintable = code >= 32 && code !== 127;
    if (isAllowedWhitespace || isPrintable) out += ch;
  }
  return out;
}

/**
 * Coerce an unknown value to a clean, length-bounded string.
 * - Returns `undefined` for non-strings or empty results (so Prisma leaves
 *   existing values untouched on update).
 * - Strips control characters, trims, and caps length to bound payload size.
 */
export function sanitizeText(value: unknown, maxLength = 2000): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = stripControlChars(value).trim();
  if (!cleaned) return undefined;
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

/** Strip control characters and cap length, preserving (possibly empty) text. */
export function cleanContent(value: string, maxLength = 4000): string {
  const cleaned = stripControlChars(value);
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

/** Conservative email shape check (defense-in-depth alongside normalizeEmail). */
export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
