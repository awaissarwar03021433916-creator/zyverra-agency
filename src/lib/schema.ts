// Schema.org / JSON-LD builders (Section G5). Pure functions returning plain
// objects that server components emit through <JsonLd>.
//
// Rules: only describe what is visible on the page, never output placeholder
// or unconfirmed values, and never emit Review/AggregateRating for Zyverra Labs.

import { env } from "@/config/env";
import { appConfig, CANONICAL_ORIGIN, ENTITY_DESCRIPTION } from "@/config/app";
import { business, pricing, type MarketingPackage } from "@/config/business";
import { founder, sameAsProfiles } from "@/config/founder";
import { routes } from "@/config/site";
import type { Faq } from "@/data/faqs";
import { postSources, type BlogPost } from "@/data/blog";

const CONTEXT = "https://schema.org";

/**
 * Canonical origin, without a trailing slash. APP_URL wins (so local dev uses
 * localhost), but the bare production domain is normalised to www because the
 * host layer redirects apex -> www — the www host is the one that serves pages.
 */
export function siteOrigin(): string {
  const raw = (env.APP_URL ?? appConfig.url).replace(/\/$/, "");
  return raw === "https://zyverralabs.com" ? CANONICAL_ORIGIN : raw;
}

export const orgId = (origin: string) => `${origin}/#organization`;
export const founderId = (origin: string) => `${origin}/#founder`;
export const websiteId = (origin: string) => `${origin}/#website`;

const abs = (origin: string, path: string) => (path === "/" ? `${origin}/` : `${origin}${path}`);

// The UK and its four nations, used as areaServed on the Organization.
const UK_AREA = [
  { "@type": "Country", name: "United Kingdom" },
  { "@type": "Place", name: "England" },
  { "@type": "Place", name: "Scotland" },
  { "@type": "Place", name: "Wales" },
  { "@type": "Place", name: "Northern Ireland" },
];

const KNOWS_ABOUT = [
  "Aesthetic clinic website design",
  "Beauty salon website design",
  "Website admin dashboards",
  "Local SEO",
  "AI search visibility",
  "Meta advertising",
  "Social media management",
  "AI chatbots",
  "Custom software development",
];

/** Site-wide graph: Organization + ProfessionalService, WebSite and the founder. */
export function siteGraph(origin: string) {
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": orgId(origin),
        name: business.name,
        url: abs(origin, "/"),
        logo: `${origin}/zyverra-mark.png`,
        image: `${origin}/og-image.png`,
        description: ENTITY_DESCRIPTION,
        email: business.email,
        telephone: business.phone,
        areaServed: UK_AREA,
        currenciesAccepted: "GBP",
        priceRange: `£${pricing.optionB.price}–£${pricing.optionA.price}`,
        founder: { "@id": founderId(origin) },
        knowsAbout: KNOWS_ABOUT,
        sameAs: sameAsProfiles,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: business.email,
          telephone: business.phone,
          areaServed: "GB",
          availableLanguage: ["en-GB"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId(origin),
        url: abs(origin, "/"),
        name: business.name,
        inLanguage: "en-GB",
        publisher: { "@id": orgId(origin) },
      },
      {
        "@type": "Person",
        "@id": founderId(origin),
        name: founder.name,
        jobTitle: founder.role,
        description:
          "Founder of Zyverra Labs. Designs and builds websites, admin dashboards and AI search foundations for UK aesthetics clinics and practitioners.",
        knowsAbout: ["Aesthetic clinic website design", "Website admin dashboards", "Local SEO", "AI search visibility", "Software engineering"],
        image: `${origin}${founder.image}`,
        worksFor: { "@id": orgId(origin) },
        url: `${origin}${founder.profilePath}`,
        sameAs: [sameAsProfiles[0]],
      },
    ],
  };
}

type Crumb = { name: string; path: string };

export function breadcrumbSchema(origin: string, items: Crumb[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(origin, it.path),
    })),
  };
}

export function websiteOffers(origin: string) {
  return [
    {
      "@type": "Offer",
      name: `${pricing.optionA.name} – website with admin dashboard`,
      price: String(pricing.optionA.price),
      priceCurrency: "GBP",
      url: abs(origin, routes.pricing),
    },
    {
      "@type": "Offer",
      name: `${pricing.optionB.name} – website without admin dashboard`,
      price: String(pricing.optionB.price),
      priceCurrency: "GBP",
      url: abs(origin, routes.pricing),
    },
  ];
}

/**
 * Service schema. Pass `offers: true` only where the price is confirmed and
 * shown on the page (website services); otherwise offers are omitted.
 */
export function serviceSchema(
  origin: string,
  opts: {
    path: string;
    name: string;
    serviceType: string;
    description: string;
    offers?: boolean;
    /** Monthly packages shown on the page (marketing services). */
    monthlyOffers?: MarketingPackage[];
    areaServed?: { "@type": "Country" | "City"; name: string };
  }
) {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    "@id": `${abs(origin, opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(origin, opts.path),
    provider: { "@id": orgId(origin) },
    areaServed: opts.areaServed ?? { "@type": "Country", name: business.areaServed },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Aesthetics clinics, aesthetic practitioners, med spas and beauty salons",
    },
    ...(opts.offers ? { offers: websiteOffers(origin) } : {}),
    ...(opts.monthlyOffers
      ? {
          offers: opts.monthlyOffers.map((p) => ({
            "@type": "Offer",
            name: `${p.name} – ${p.summary}`,
            price: String(p.price),
            priceCurrency: "GBP",
            url: abs(origin, opts.path),
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: String(p.price),
              priceCurrency: "GBP",
              unitText: "MONTH",
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
            },
          })),
        }
      : {}),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Typed WebPage helper: AboutPage, ContactPage, CollectionPage. */
export function webPageSchema(
  origin: string,
  type: "AboutPage" | "ContactPage" | "CollectionPage",
  opts: { path: string; name: string; description: string }
) {
  return {
    "@context": CONTEXT,
    "@type": type,
    "@id": `${abs(origin, opts.path)}#webpage`,
    url: abs(origin, opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "en-GB",
    isPartOf: { "@id": websiteId(origin) },
    ...(type === "AboutPage" ? { about: { "@id": orgId(origin) }, mainEntity: { "@id": founderId(origin) } } : {}),
  };
}

export function blogSchema(origin: string, posts: BlogPost[]) {
  return {
    "@context": CONTEXT,
    "@type": "Blog",
    "@id": `${abs(origin, routes.blog)}#blog`,
    url: abs(origin, routes.blog),
    name: "Zyverra Labs blog",
    inLanguage: "en-GB",
    publisher: { "@id": orgId(origin) },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.listingTitle ?? p.title,
      url: abs(origin, `${routes.blog}/${p.slug}`),
      datePublished: p.date,
      dateModified: p.updated,
    })),
  };
}

export function blogPostingSchema(origin: string, post: BlogPost) {
  const url = abs(origin, `${routes.blog}/${post.slug}`);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: "en-GB",
    author: { "@id": founderId(origin) },
    publisher: { "@id": orgId(origin) },
    mainEntityOfPage: url,
    url,
    image: `${origin}${routes.blog}/${post.slug}/og`,
    keywords: post.targetKeyword,
    articleSection: post.category,
    ...(postSources(post).length ? { citation: postSources(post).map((s) => s.url) } : {}),
  };
}

export function articleSchema(
  origin: string,
  opts: {
    path: string;
    headline: string;
    description: string;
    datePublished: string;
    image?: string;
    /** The client organisation the case study is about. */
    about?: { name: string; url: string };
  }
) {
  return {
    "@context": CONTEXT,
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    inLanguage: "en-GB",
    author: { "@id": founderId(origin) },
    publisher: { "@id": orgId(origin) },
    mainEntityOfPage: abs(origin, opts.path),
    image: `${origin}${opts.image ?? "/og-image.png"}`,
    ...(opts.about ? { about: { "@type": "Organization", name: opts.about.name, url: opts.about.url } } : {}),
  };
}

/** Post-launch updates (confirmed: £50–£100 per update), as an OfferCatalog. */
export function updatesOfferCatalog(origin: string) {
  return {
    "@context": CONTEXT,
    "@type": "OfferCatalog",
    "@id": `${abs(origin, routes.pricing)}#updates`,
    name: "Post-launch website updates",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Website update or major change (new feature, layout or integration)",
        priceCurrency: "GBP",
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "50",
          maxPrice: "100",
          priceCurrency: "GBP",
        },
        url: abs(origin, routes.pricing),
        seller: { "@id": orgId(origin) },
      },
    ],
  };
}

/** Free audit: a Service with a contact action. */
export function auditSchema(origin: string, path: string) {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    "@id": `${abs(origin, path)}#service`,
    name: "Free clinic website audit",
    serviceType: "Website audit for aesthetics clinics",
    description:
      "A free, personalised review of a UK clinic's website: speed, Google visibility, treatment pages, booking journey, advertising wording and AI search readiness.",
    provider: { "@id": orgId(origin) },
    areaServed: { "@type": "Country", name: "United Kingdom" },
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", url: abs(origin, path) },
    potentialAction: {
      "@type": "CommunicateAction",
      name: "Request a free clinic website audit",
      target: { "@type": "EntryPoint", urlTemplate: `${abs(origin, path)}#request` },
    },
  };
}
