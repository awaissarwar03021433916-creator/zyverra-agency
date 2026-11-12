import type { MetadataRoute } from "next";

import { siteOrigin } from "@/lib/schema";

// Search engines and AI assistants are explicitly allowed. Only the API and
// the private admin area are disallowed. (The static /case-studies/*.html
// duplicates carry canonical tags pointing to their clean URLs.)
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  const disallow = ["/api/", "/admin"];

  const allowedBots = [
    "Googlebot",
    "Bingbot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "PerplexityBot",
    "ClaudeBot",
    "Google-Extended",
    "Applebot",
    "meta-externalagent",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: allowedBots, allow: "/", disallow },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
