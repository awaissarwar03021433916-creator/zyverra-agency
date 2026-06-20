import type { RateLimitPolicy } from "../limiter";

export const apiPolicies: Record<string, RateLimitPolicy> = {
  health: { windowMs: 60_000, max: 20 },
  contact: { windowMs: 60_000, max: 10 },
  // Chat is the most expensive endpoint (LLM calls): keep generous enough for a
  // real back-and-forth, tight enough to stop cost/DoS abuse.
  chat: { windowMs: 60_000, max: 30 },
  chatHistory: { windowMs: 60_000, max: 60 },
  leads: { windowMs: 60_000, max: 10 },
};

