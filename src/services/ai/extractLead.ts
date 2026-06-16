import { z } from "zod";

import { openai } from "./openaiClient";

/**
 * AI-powered structured lead extraction (Phase 2).
 *
 * Replaces the old keyword/substring matching as the PRIMARY extractor. It reads
 * the whole conversation and returns clean, CRM-ready structured fields via
 * OpenAI Structured Outputs (strict json_schema), validated with zod.
 *
 * Deterministic regex remains only as a high-precision backstop for email/phone
 * and as the graceful fallback when the model call fails or times out.
 */

type ChatTurn = { role: "user" | "assistant"; content: string };

export type ExtractedLead = {
  name: string | null;
  email: string | null;
  phone: string | null;
  businessType: string | null;
  projectType: string | null;
  budget: string | null;
  timeline: string | null;
  projectSummary: string | null;
};

// Normalized industry taxonomy. Kept in sync with the dashboard's categorization
// layer so "Business Type" reads as a clean category for CRM use.
const BUSINESS_CATEGORIES = [
  "Healthcare",
  "Beauty",
  "Restaurant",
  "Real Estate",
  "E-commerce",
  "Fitness",
  "Education",
  "Finance",
  "Technology",
  "Travel & Hospitality",
  "Automotive",
  "Legal",
  "Construction",
  "Logistics",
  "Energy",
  "Manufacturing",
  "General Business",
] as const;

const ExtractedLeadSchema = z.object({
  name: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  businessType: z.string().nullable(),
  projectType: z.string().nullable(),
  budget: z.string().nullable(),
  timeline: z.string().nullable(),
  projectSummary: z.string().nullable(),
});

// Strict JSON schema handed to the model. Every key is required (strict mode);
// "unknown" values are returned as null rather than omitted.
const LEAD_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "name",
    "email",
    "phone",
    "businessType",
    "projectType",
    "budget",
    "timeline",
    "projectSummary",
  ],
  properties: {
    name: { type: ["string", "null"] },
    email: { type: ["string", "null"] },
    phone: { type: ["string", "null"] },
    businessType: { type: ["string", "null"], enum: [...BUSINESS_CATEGORIES, null] },
    projectType: { type: ["string", "null"] },
    budget: { type: ["string", "null"] },
    timeline: { type: ["string", "null"] },
    projectSummary: { type: ["string", "null"] },
  },
} as const;

const EXTRACTION_INSTRUCTIONS = `You extract structured CRM lead data from a conversation between a website visitor and Zyverra's sales assistant.

Return ONLY the JSON object defined by the schema. Use null for anything not clearly stated — never guess or invent values.

Field rules:
- name: the visitor's personal name only (not their company). null if not given.
- email: a valid email address if present, else null.
- phone: a phone number in digits (keep country code if given), else null.
- businessType: classify the visitor's industry into exactly ONE category from the allowed list. Examples: "dental clinic" -> "Healthcare"; "restaurant" -> "Restaurant"; "ladies bags business" -> "E-commerce"; "construction company" -> "Construction"; "law firm" -> "Legal"; "gym" -> "Fitness". If the industry is unclear, use "General Business". null only if no business is mentioned at all.
- projectType: a short, clean description of what they want built (e.g. "Appointment booking website", "E-commerce store", "Mobile app", "CRM system", "Company website"). null if not stated.
- budget: a normalized budget string preserving the real amount and currency/range (e.g. "$5,000", "10k-15k USD", "PKR 200,000"). null if not stated. Do NOT fabricate a number.
- timeline: a normalized delivery timeframe (e.g. "6 weeks", "2 months", "ASAP", "By Q3 2026"). null if not stated.
- projectSummary: 1-2 concise sentences summarizing the lead's business and what they need, synthesized from the WHOLE conversation. null only if there is no project context at all.`;

function clean(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const lowered = trimmed.toLowerCase();
  if (["null", "n/a", "na", "none", "unknown", "not provided", "-"].includes(lowered)) {
    return null;
  }
  return trimmed;
}

/**
 * Normalize an email: trim, strip trailing sentence punctuation (e.g. an email at
 * the end of a sentence "... at me@x.com." becomes "me@x.com"), lowercase, and
 * validate. Returns null when it isn't a valid address.
 */
export function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const candidate = value.trim().replace(/[.,;:!?)\]>'"]+$/, "").toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : null;
}

/**
 * Normalize a phone for storage: strip all non-digits (spaces, dashes, parens, "+")
 * and validate length. Returns digits only, or null if it isn't a plausible number.
 */
export function normalizePhone(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const digits = value.replace(/\D/g, "");
  return /^\d{10,15}$/.test(digits) ? digits : null;
}

/**
 * Canonical dedup key for a phone: drop an international "00" prefix and any leading
 * trunk zeros, then take the last 10 significant digits. This makes the same number
 * match regardless of formatting, country code, or a leading 0 — e.g.
 * "+92 300 1234567", "03001234567" and "92-300-1234567" all key to "3001234567".
 */
export function phoneDedupKey(value: unknown): string | null {
  const digits = normalizePhone(value);
  if (!digits) return null;
  let d = digits.startsWith("00") ? digits.slice(2) : digits;
  d = d.replace(/^0+/, "");
  return d.length >= 10 ? d.slice(-10) : d || null;
}

/** High-precision deterministic backstop for the two fields regex does well. */
export function regexContacts(text: string): { email: string | null; phone: string | null } {
  const normalized = text.replace(/\r/g, "");

  const emailMatch = normalized.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  const email = normalizeEmail(emailMatch?.[0] ?? null);

  const phoneMatch = normalized.match(/\+?\d[\d\s-]{8,}\d/);
  const phone = normalizePhone(phoneMatch?.[0] ?? null);

  return { email, phone };
}

function transcriptOf(messages: ChatTurn[]): string {
  return messages
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n");
}

/**
 * Extract structured lead fields from the full conversation. Returns null on any
 * failure (timeout, API error, invalid JSON) so the caller can fall back.
 */
export async function extractLeadFromConversation(
  messages: ChatTurn[]
): Promise<ExtractedLead | null> {
  const transcript = transcriptOf(messages).trim();
  if (!transcript) return null;

  try {
    const completion = (await Promise.race([
      openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 500,
        messages: [
          { role: "system", content: EXTRACTION_INSTRUCTIONS },
          { role: "user", content: `Conversation:\n${transcript}` },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "lead_extraction", strict: true, schema: LEAD_JSON_SCHEMA },
        },
      }),
      new Promise((_, reject) => setTimeout(() => reject(new Error("extract_timeout")), 15000)),
    ])) as Awaited<ReturnType<typeof openai.chat.completions.create>>;

    const raw = "choices" in completion ? completion.choices?.[0]?.message?.content ?? "" : "";
    if (!raw) return null;

    const parsed = ExtractedLeadSchema.safeParse(JSON.parse(raw));
    if (!parsed.success) return null;

    const d = parsed.data;
    const result: ExtractedLead = {
      name: clean(d.name),
      email: normalizeEmail(d.email),
      phone: normalizePhone(d.phone),
      businessType: clean(d.businessType),
      projectType: clean(d.projectType),
      budget: clean(d.budget),
      timeline: clean(d.timeline),
      projectSummary: clean(d.projectSummary),
    };

    // Backstop: if the model missed contact details that regex can find verbatim
    // in the transcript, fill them in.
    const fallback = regexContacts(transcript);
    if (!result.email && fallback.email) result.email = fallback.email;
    if (!result.phone && fallback.phone) result.phone = fallback.phone;

    return result;
  } catch (err) {
    console.error("lead_extraction_error", err);
    return null;
  }
}
