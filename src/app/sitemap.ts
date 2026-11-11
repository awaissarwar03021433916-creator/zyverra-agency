import type { MetadataRoute } from "next";

import { routes } from "@/config/site";
import { blogPosts } from "@/data/blog";
import { clinicTypes } from "@/data/clinicTypes";
import { publishedCaseStudies } from "@/data/work";
import { siteOrigin } from "@/lib/schema";

// Section G2. Every public, indexable page — no redirects, admin, or 404s.
// Dates are fixed content dates (not "now"), so lastModified stays meaningful.
const SITE_UPDATED = new Date("2026-11-11");

// Existing static software case studies, served at clean /case-studies/<slug>.
const SOFTWARE_CASE_STUDIES = [
  "ai-sales-engineer",
  "aura-manufacturers",
  "vareza",
  "employee-management-crm",
  "ai-proposal-generator",
  "pdf-merger",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  const url = (path: string) => (path === "/" ? `${origin}/` : `${origin}${path}`);

  const pages: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.aestheticClinicWebsites, priority: 0.9 },
    { path: routes.bristol, priority: 0.7 },
    { path: routes.london, priority: 0.7 },
    { path: routes.beautySalonWebsites, priority: 0.8 },
    { path: routes.adminDashboard, priority: 0.8 },
    { path: routes.seoAiSearch, priority: 0.8 },
    { path: routes.metaAds, priority: 0.7 },
    { path: routes.socialReels, priority: 0.7 },
    { path: routes.customSoftware, priority: 0.7 },
    { path: routes.pricing, priority: 0.9 },
    { path: routes.work, priority: 0.8 },
    { path: routes.about, priority: 0.6 },
    { path: routes.contact, priority: 0.7 },
    { path: routes.faq, priority: 0.6 },
    { path: routes.blog, priority: 0.6 },
    { path: routes.privacy, priority: 0.2 },
    { path: routes.cookies, priority: 0.2 },
    { path: routes.terms, priority: 0.2 },
    { path: routes.complaints, priority: 0.2 },
    { path: routes.googleBusinessProfile, priority: 0.7 },
    { path: routes.nurseWebsites, priority: 0.8 },
    { path: routes.redesign, priority: 0.7 },
    { path: routes.freeAudit, priority: 0.8 },
    { path: routes.clinicTypes, priority: 0.6 },
    { path: routes.treatmentPages, priority: 0.6 },
    { path: routes.htmlSitemap, priority: 0.3 },
    { path: routes.accessibility, priority: 0.2 },
    ...clinicTypes.map((t) => ({ path: t.content.path, priority: 0.6 })),
  ];

  return [
    ...pages.map((p) => ({
      url: url(p.path),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: p.priority,
    })),
    ...publishedCaseStudies.map((c) => ({
      url: url(`${routes.work}/${c.slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...SOFTWARE_CASE_STUDIES.map((slug) => ({
      url: url(`/case-studies/${slug}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    ...blogPosts.map((p) => ({
      url: url(`${routes.blog}/${p.slug}`),
      lastModified: new Date(p.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
