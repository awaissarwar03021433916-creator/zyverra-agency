import crypto from "node:crypto";

import { env } from "@/config/env";

export const ADMIN_COOKIE = "zyverra_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

type SessionPayload = { sub: string; exp: number };

function secret(): string {
  const s = env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET is not set");
  return s;
}

function sign(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("base64url");
}

/** Create a signed, expiring session token: `base64url(payload).signature`. */
export function createSessionToken(sub: string): string {
  const payload: SessionPayload = {
    sub,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data)}`;
}

/** Verify signature + expiry. Returns the payload or null. */
export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token) return null;

  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expected = sign(data);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString()) as SessionPayload;
    if (!payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
