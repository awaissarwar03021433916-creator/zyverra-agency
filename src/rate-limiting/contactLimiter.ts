import { checkRateLimit } from "./limiter";

const contactPolicy = {
  // Max 5 submissions per minute per IP.
  windowMs: 60_000,
  max: 5,
};

export async function checkContactRateLimit(ip: string) {
  const safeIp = ip?.trim() ? ip.trim() : "unknown";
  return checkRateLimit({
    key: `contact:${safeIp}`,
    policy: contactPolicy,
  });
}

