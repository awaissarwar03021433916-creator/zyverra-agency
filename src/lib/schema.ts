// Centralized Schema.org / JSON-LD builders. Pure functions returning plain
// objects so any server component can emit them via <JsonLd>.

import { env } from "@/config/env";
import { appConfig } from "@/config/app";
import { business } from "@/config/business";
import type { Locale } from "@/i18n/config";
import type { Faq } from "@/data/faqs";

const CONTEXT = "https://schema.org";
const EMAIL = "hello@zyverralabs.com";
const NAME = "Zyverra Labs";

// Entities Zyverra Labs is associated with — strengthens AI/entity understanding.
const KNOWS_ABOUT = [
  "Custom Software Development",
  "AI Solutions",
  "Business Automation",
  "CRM Development",
  "Web Application Development",
  "Blockchain Development",
  "SaaS Development",
];

export function siteOrigin(): string {
  return (env.APP_URL ?? appConfig.url).replace(/\/$/, "");
}

const orgId = (origin: string) => `${origin}/#organization`;

function postalAddress() {
  const a = business.address;
  const addr: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: a.city,
    addressRegion: a.region,
    addressCountry: a.country,
  };
  if (a.street) addr.streetAddress = a.street;
  if (a.postalCode) addr.postalCode = a.postalCode;
  return addr;
}

export function organizationSchema(origin: string) {
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": orgId(origin),
    name: NAME,
    url: origin,
    logo: `${origin}/icon-192.png`,
    image: `${origin}/og-image.png`,
    email: EMAIL,
    description:
      "Software house in Lahore, Pakistan building custom software, AI solutions, business automation, CRM, web applications, blockchain, and SaaS products.",
    alternateName: "Zyverra",
    slogan: "Custom software, AI, and SaaS engineering for modern teams.",
    knowsAbout: KNOWS_ABOUT,
    foundingLocation: {
      "@type": "Place",
      name: `${business.address.city}, ${business.address.countryName}`,
    },
    address: postalAddress(),
    areaServed: business.areaServed,
    ...(business.phone ? { telephone: business.phone } : {}),
  };
}

export function websiteSchema(origin: string, locale: Locale) {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    name: NAME,
    url: origin,
    inLanguage: locale,
    publisher: { "@id": orgId(origin) },
  };
}

export function localBusinessSchema(origin: string) {
  return {
    "@context": CONTEXT,
    "@type": "ProfessionalService",
    "@id": `${origin}/#localbusiness`,
    name: NAME,
    url: origin,
    image: `${origin}/og-image.png`,
    logo: `${origin}/icon-192.png`,
    email: EMAIL,
    description:
      "Zyverra Labs is a software house in Lahore, Pakistan building custom software, AI solutions, business automation, and SaaS products for teams worldwide.",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: business.areaServed,
    knowsAbout: KNOWS_ABOUT,
    priceRange: "$$",
    parentOrganization: { "@id": orgId(origin) },
    ...(business.phone ? { telephone: business.phone } : {}),
  };
}

const SERVICES: { name: string; description: string }[] = [
  {
    name: "Custom Software Development",
    description:
      "Custom software built around your exact business logic, from CRM development to blockchain solutions.",
  },
  {
    name: "AI Solutions",
    description: "AI agents and AI-powered products that reason, use your tools, and act in your systems.",
  },
  {
    name: "Business Automation",
    description: "Automation and smart workflows that remove repetitive work across your data, apps, and teams.",
  },
  {
    name: "Web Application Development",
    description: "Fast, secure web applications with clean UX, strong performance, and real conversion.",
  },
  {
    name: "SaaS Development",
    description: "Production-ready, multi-tenant SaaS platforms that are secure and built to scale.",
  },
  {
    name: "CRM Development",
    description: "Custom CRM platforms that centralize records, enforce role-based access, and track operations.",
  },
  {
    name: "Blockchain Development",
    description: "Blockchain and Web3 systems with smart contracts and tamper-proof, verifiable records.",
  },
];

export function serviceSchemas(origin: string) {
  return SERVICES.map((s) => ({
    "@context": CONTEXT,
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.description,
    provider: { "@id": orgId(origin) },
    areaServed: "Worldwide",
  }));
}

export function softwareApplicationSchemas(origin: string) {
  const apps = [
    {
      name: "AI Proposal Generator",
      url: "https://ai-proposal-generator-eta-three.vercel.app/",
      category: "BusinessApplication",
      description:
        "An AI product that drafts customized, professional client proposals in seconds from a few inputs.",
    },
    {
      name: "Employee Management CRM",
      url: "https://crms-tan.vercel.app/",
      category: "BusinessApplication",
      description:
        "A custom CRM that centralizes employee records, role-based access, and operations tracking.",
    },
  ];

  return apps.map((a) => ({
    "@context": CONTEXT,
    "@type": "SoftwareApplication",
    name: a.name,
    url: a.url,
    applicationCategory: a.category,
    operatingSystem: "Web",
    description: a.description,
    publisher: { "@id": orgId(origin) },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  }));
}

export function productSchemas(origin: string) {
  // Tools, modeled as Product.
  const tools = [
    {
      name: "PDF Merger",
      url: "https://pdf-merger-liard.vercel.app/",
      description:
        "A fast, zero-install web tool that merges PDF files privately, right in the browser.",
    },
  ];

  return tools.map((t) => ({
    "@context": CONTEXT,
    "@type": "Product",
    name: t.name,
    url: t.url,
    description: t.description,
    brand: { "@type": "Brand", name: NAME },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  }));
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

export function breadcrumbSchema(
  origin: string,
  locale: Locale,
  items: { name: string; path: string }[]
) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${origin}/${locale}${it.path}`,
    })),
  };
}
