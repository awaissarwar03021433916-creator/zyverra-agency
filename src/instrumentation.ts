// Runs once when the server process starts. Used to fail fast in production
// if required environment variables are missing.
export async function register() {
  const { assertRequiredEnvForProduction } = await import("@/config/env");
  assertRequiredEnvForProduction();
}
