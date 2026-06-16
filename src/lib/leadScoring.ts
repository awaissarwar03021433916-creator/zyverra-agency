/**
 * AI Lead Scoring (Phase 4) — deterministic, explainable rubric.
 *
 * Produces a 0-100 score and a HOT/WARM/COLD tier from the structured lead
 * fields already captured by extraction. No LLM call: identical inputs always
 * yield the same score, and every point is traceable to a named signal (see
 * `reason`), so a salesperson can understand exactly why a lead is rated as it is.
 *
 * Weighting (max 100):
 *   Email captured        20   |  Budget identified    20
 *   Phone captured        15   |  Timeline identified  15
 *   Project identified    12   |  Business identified   8
 *   Conversation quality   5   |  Buying intent         5
 *
 * Because contact is worth 35 of 100, an unreachable lead (no email/phone) tops
 * out at 65 and can never be HOT — you can't be "hot" if we can't contact you.
 *
 * Tiers:  HOT >= 70   |   WARM 40-69   |   COLD < 40
 */

export type LeadScoreTier = "HOT" | "WARM" | "COLD";

export type LeadScoreResult = {
  score: number;
  tier: LeadScoreTier;
  reason: string;
};

export type LeadScoreInput = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  businessType?: string | null;
  projectType?: string | null;
  budget?: string | null;
  timeline?: string | null;
  description?: string | null;
};

export const HOT_THRESHOLD = 70;
export const WARM_THRESHOLD = 40;

// Explicit, readable buying-intent signals scanned in the conversation summary.
const INTENT_KEYWORDS = [
  "ready",
  "start",
  "get started",
  "move forward",
  "asap",
  "urgent",
  "soon",
  "deadline",
  "this week",
  "this month",
  "hire",
  "quote",
  "proceed",
  "sign",
  "launch",
];

function has(value?: string | null): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function scoreLead(input: LeadScoreInput): LeadScoreResult {
  const reasons: string[] = [];
  let score = 0;

  if (has(input.email)) {
    score += 20;
    reasons.push("email captured (+20)");
  }
  if (has(input.phone)) {
    score += 15;
    reasons.push("phone captured (+15)");
  }
  if (has(input.budget)) {
    score += 20;
    reasons.push("budget identified (+20)");
  }
  if (has(input.timeline)) {
    score += 15;
    reasons.push("timeline identified (+15)");
  }
  if (has(input.projectType)) {
    score += 12;
    reasons.push("project identified (+12)");
  }
  if (has(input.businessType)) {
    score += 8;
    reasons.push("business identified (+8)");
  }

  // Conversation quality: richness of the captured summary.
  const summary = (input.description ?? "").trim();
  let quality = 0;
  if (summary.length >= 160) quality = 5;
  else if (summary.length >= 60) quality = 3;
  else if (summary.length > 0) quality = 1;
  if (quality > 0) {
    score += quality;
    reasons.push(`conversation quality (+${quality})`);
  }

  // Buying intent: explicit readiness signals in the summary.
  if (summary && INTENT_KEYWORDS.some((kw) => summary.toLowerCase().includes(kw))) {
    score += 5;
    reasons.push("buying intent (+5)");
  }

  score = Math.min(100, score);

  const tier: LeadScoreTier =
    score >= HOT_THRESHOLD ? "HOT" : score >= WARM_THRESHOLD ? "WARM" : "COLD";

  const reason =
    reasons.length > 0
      ? `${tier} (${score}/100): ${reasons.join(", ")}`
      : `${tier} (${score}/100): no qualifying signals captured`;

  return { score, tier, reason };
}
