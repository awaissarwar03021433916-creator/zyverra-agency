import type { MetadataRoute } from "next";

import { appConfig } from "@/config/app";
import { env } from "@/config/env";
import { locales, defaultLocale } from "@/i18n/config";
import { blogPosts } from "@/data/blog";

// Static case-study pages (single English version, served at clean URLs).
const CASE_STUDY_SLUGS = [
  "ai-sales-engineer",
  "aura-manufacturers",
  "vareza",
  "employee-management-crm",
  "ai-proposal-generator",
  "pdf-merger",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (env.APP_URL ?? appConfig.url).replace(/\/$/, "");
  const now = new Date();

  // Localized app routes (relative to the locale root, "" = home), each with a
  // real last-modified date where we have one.
  const localizedPaths: { path: string; lastModified: Date }[] = [
    { path: "", lastModified: now },
    { path: "/how-we-deliver", lastModified: now },
    { path: "/why-us", lastModified: now },
    { path: "/blog", lastModified: now },
    ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, lastModified: new Date(p.date) })),
  ];

  const localized: MetadataRoute.Sitemap = localizedPaths.flatMap(({ path, lastModified }) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`])
    );

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? (locale === defaultLocale ? 1 : 0.8) : 0.6,
      alternates: { languages },
    }));
  });

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDY_SLUGS.map((slug) => ({
    url: `${baseUrl}/case-studies/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...localized, ...caseStudies];
}
