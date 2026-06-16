import type { MetadataRoute } from "next";

import { appConfig } from "@/config/app";
import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.APP_URL ?? appConfig.url;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/*", "/admin/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
