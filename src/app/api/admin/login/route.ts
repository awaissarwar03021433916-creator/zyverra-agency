import { NextResponse } from "next/server";

import { env } from "@/config/env";
import { verifyAdminPassword } from "@/server/auth/password";
import { ADMIN_COOKIE, SESSION_TTL_SECONDS, createSessionToken } from "@/server/auth/adminSession";

// Naive in-memory throttle (single-instance). Good enough to slow brute force
// for a single admin login; can be replaced with the shared rate limiter later.
const attempts = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 10;

function isThrottled(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.ts > WINDOW_MS) {
    attempts.set(ip, { count: 1, ts: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isThrottled(ip)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const body = (await req.json().catch(() => null)) as
    | { username?: string; password?: string }
    | null;

  const username = body?.username ?? "";
  const password = body?.password ?? "";

  const ok =
    !!env.ADMIN_USERNAME &&
    username === env.ADMIN_USERNAME &&
    verifyAdminPassword(password);

  if (!ok) {
    return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
