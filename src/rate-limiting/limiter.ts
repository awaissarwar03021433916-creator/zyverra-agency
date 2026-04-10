export type RateLimitPolicy = {
  windowMs: number;
  max: number;
};

type RateState = {
  count: number;
  resetAt: number;
};

const memoryStore = new Map<string, RateState>();

export async function checkRateLimit(params: {
  key: string;
  policy: RateLimitPolicy;
}): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const { key, policy } = params;

  const now = Date.now();
  const current = memoryStore.get(key);

  const resetAt = current?.resetAt ?? now + policy.windowMs;
  const isExpired = now > resetAt;

  const next: RateState = isExpired
    ? { count: 1, resetAt: now + policy.windowMs }
    : { count: (current?.count ?? 0) + 1, resetAt };

  memoryStore.set(key, next);

  const remaining = Math.max(0, policy.max - next.count);
  return {
    allowed: next.count <= policy.max,
    remaining,
    resetAt: next.resetAt,
  };
}

