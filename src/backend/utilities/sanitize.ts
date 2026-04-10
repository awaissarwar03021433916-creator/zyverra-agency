function stripHtmlTags(input: string) {
  // Basic protection against HTML/script injection by removing tags.
  return input.replace(/<[^>]*>/g, "");
}

function stripDisallowedControlChars(input: string) {
  // Allow newline + tab for nicer messages; remove other control chars.
  return input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
}

function normalizeWhitespace(input: string) {
  return input.replace(/[ \t]{2,}/g, " ").replace(/\s+/g, " ").trim();
}

export function sanitizeContactInput(input: {
  name: string;
  email: string;
  message: string;
}): { name: string; email: string; message: string } {
  const name = stripDisallowedControlChars(stripHtmlTags(input.name)).trim();
  const email = stripDisallowedControlChars(stripHtmlTags(input.email))
    .trim()
    .toLowerCase();
  // Keep newlines in message; normalize other whitespace and remove tags/control chars.
  const messageRaw = stripDisallowedControlChars(stripHtmlTags(input.message));
  const messageLines = messageRaw
    .split("\n")
    .map((line) => normalizeWhitespace(line))
    .join("\n")
    .trim();

  return { name, email, message: messageLines };
}

