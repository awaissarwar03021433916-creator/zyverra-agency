import { cookies } from "next/headers";

import { ADMIN_COOKIE, verifySessionToken } from "./adminSession";

/**
 * Read and verify the admin session from the request cookies.
 * Returns the session payload or null. Safe to call when no secret/cookie is
 * present (returns null rather than throwing).
 */
export async function getAdminSession() {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token);
}
