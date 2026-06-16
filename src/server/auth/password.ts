import crypto from "node:crypto";

import { env } from "@/config/env";

// Stored hash format: `scrypt$<saltHex>$<hashHex>`.
const SCRYPT_KEYLEN = 64;

/** Generate a hash for `ADMIN_PASSWORD_HASH` (used in setup, not at runtime). */
export function hashPassword(plain: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(plain, salt, SCRYPT_KEYLEN);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function verifyAgainstHash(plain: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;

  const salt = Buffer.from(parts[1], "hex");
  const expected = Buffer.from(parts[2], "hex");
  const actual = crypto.scryptSync(plain, salt, expected.length);

  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

/**
 * Verify a password against `ADMIN_PASSWORD_HASH` (preferred) or, for local
 * convenience, a plaintext `ADMIN_PASSWORD`.
 */
export function verifyAdminPassword(plain: string): boolean {
  if (!plain) return false;

  if (env.ADMIN_PASSWORD_HASH) return verifyAgainstHash(plain, env.ADMIN_PASSWORD_HASH);

  if (env.ADMIN_PASSWORD) {
    const a = Buffer.from(plain);
    const b = Buffer.from(env.ADMIN_PASSWORD);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  }

  return false;
}
