import type { MetadataRoute } from "next";

import { appConfig } from "@/config/app";
import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.APP_URL ?? appConfig.url;

  // Block private routes and the duplicate ".html" case-study URLs so only the
  // clean /case-studies/<slug> paths are crawled and indexed.
  const disallow = ["/api/", "/admin/", "/case-studies/*.html"];

  // Explicitly welcome the major AI answer-engine crawlers (ChatGPT/OpenAI,
  // Claude/Anthropic, Perplexity, Gemini/Google-Extended, Apple, etc.) so the
  // site can be read, understood, and cited by AI systems.
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Amazonbot",
    "cohere-ai",
    "CCBot",
  ];

  return {
    rules: [
      { userAgent: aiBots, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
