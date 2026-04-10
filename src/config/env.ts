import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().optional(),
  APP_URL: z.string().url().optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  APP_URL: process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL,
});

export function assertRequiredEnvForProduction() {
  if (env.NODE_ENV !== "production") return;

  const missing: string[] = [];

  if (!env.APP_URL) missing.push("APP_URL");
  if (!env.DATABASE_URL) missing.push("DATABASE_URL");

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables for production: ${missing.join(", ")}`
    );
  }
}

