import { NextResponse } from "next/server";

import { checkRateLimit, type RateLimitPolicy } from "@/rate-limiting/limiter";
import { getClientIp } from "@/backend/utilities/http";

/**
 * Per-IP rate limit for a route scope. Returns a ready-to-send 429 response when
 * the caller is over the limit, or null when the request may proceed.
 *
 * NOTE: the underlying store is in-memory (per instance). It throttles abuse from
 * a single client well; for multi-instance deployments back it with a shared
 * store (Redis/Upstash) without changing this call site.
 */
export async function rateLimited(
  req: Request,
  scope: string,
  policy: RateLimitPolicy
): Promise<NextResponse | null> {
  const ip = getClientIp(req)?.trim() || "unknown";
  const { allowed, remaining, resetAt } = await checkRateLimit({
    key: `${scope}:${ip}`,
    policy,
  });
  if (allowed) return null;

  const retryAfter = Math.max(0, Math.ceil((resetAt - Date.now()) / 1000));
  return NextResponse.json(
    { error: "rate_limited", message: "Too many requests. Please slow down." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "X-RateLimit-Remaining": String(remaining),
      },
    }
  );
}
