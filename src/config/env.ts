import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().optional(),
  APP_URL: z.string().url().optional(),

  // AI provider actually used by the app (was incorrectly validated as GEMINI before).
  OPENAI_API_KEY: z.string().optional(),

  // Transactional email (optional — email features no-op gracefully if absent).
  RESEND_API_KEY: z.string().optional(),

  // Admin authentication (Phase 0.5).
  ADMIN_USERNAME: z.string().optional(),
  ADMIN_PASSWORD_HASH: z.string().optional(),
  ADMIN_PASSWORD: z.string().optional(),
  ADMIN_SESSION_SECRET: z.string().optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  APP_URL: process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
});

/**
 * Fail fast in production when required configuration is missing.
 * Invoked from `src/instrumentation.ts` at server startup.
 */
export function assertRequiredEnvForProduction() {
  if (env.NODE_ENV !== "production") return;

  const missing: string[] = [];

  if (!env.APP_URL) missing.push("APP_URL");
  if (!env.DATABASE_URL) missing.push("DATABASE_URL");
  if (!env.OPENAI_API_KEY) missing.push("OPENAI_API_KEY");
  if (!env.ADMIN_SESSION_SECRET) missing.push("ADMIN_SESSION_SECRET");
  if (!env.ADMIN_USERNAME) missing.push("ADMIN_USERNAME");
  if (!env.ADMIN_PASSWORD_HASH && !env.ADMIN_PASSWORD) {
    missing.push("ADMIN_PASSWORD_HASH (or ADMIN_PASSWORD)");
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for production: ${missing.join(", ")}`
    );
  }
}
