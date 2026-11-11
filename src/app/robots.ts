import type { MetadataRoute } from "next";

import { siteOrigin } from "@/lib/schema";

// Section G1. Private paths and the duplicate ".html" case-study URLs are
// blocked; search engines and AI assistants are explicitly allowed.
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  const disallow = ["/api/", "/admin", "/case-studies/*.html"];

  const allowedBots = [
    "Googlebot",
    "Bingbot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "GPTBot",
    "PerplexityBot",
    "ClaudeBot",
    "Google-Extended",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: allowedBots, allow: "/", disallow },
    ],
    sitemap: `${origin}/sitemap.xml`,
  };
}
