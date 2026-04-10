import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { prisma } from "@/database/prisma/client";

import { checkRateLimit } from "@/rate-limiting/limiter";
import { apiPolicies } from "@/rate-limiting/policies/api";
import { getClientIp } from "@/backend/utilities/http";
import { healthQuerySchema } from "@/validation/zod/health";

export async function GET(req: Request) {
  try {
    const { verbose } = healthQuerySchema.parse({
      verbose: new URL(req.url).searchParams.get("verbose"),
    });

    const clientIp = getClientIp(req) ?? "anonymous";
    const policy = apiPolicies.health;

    const { allowed, remaining, resetAt } = await checkRateLimit({
      key: clientIp,
      policy,
    });

    const now = Date.now();
    const retryAfterSeconds = Math.max(0, Math.ceil((resetAt - now) / 1000));

    const headers = new Headers();
    headers.set("X-RateLimit-Limit", policy.max.toString());
    headers.set("X-RateLimit-Remaining", remaining.toString());
    headers.set("Retry-After", retryAfterSeconds.toString());

    if (!allowed) {
      const res = NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429, headers }
      );
      return res;
    }

    const payload: Record<string, unknown> = {
      ok: true,
      service: "zyverra-labs",
    };

    if (verbose) {
      let database = "not_checked";
      try {
        await prisma.$queryRaw`SELECT 1`;
        database = "ok";
      } catch {
        database = "unreachable";
      }

      payload.verbose = { clientIp, resetAt, database };
    }

    return NextResponse.json(payload, { status: 200, headers });
  } catch (err) {
    if (err instanceof ZodError || err instanceof SyntaxError) {
      return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
    }

    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}

