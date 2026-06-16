import type { MetadataRoute } from "next";

import { appConfig } from "@/config/app";
import { env } from "@/config/env";
import { locales, defaultLocale } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (env.APP_URL ?? appConfig.url).replace(/\/$/, "");
  const now = new Date();

  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${baseUrl}/${locale}`])
  );

  return locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
