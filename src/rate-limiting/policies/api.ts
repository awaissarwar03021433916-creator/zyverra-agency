import type { RateLimitPolicy } from "../limiter";

export const apiPolicies: Record<string, RateLimitPolicy> = {
  health: { windowMs: 60_000, max: 20 },
  contact: { windowMs: 60_000, max: 10 },
};

