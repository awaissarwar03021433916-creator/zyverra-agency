// Site structure: every public route, the header menu, the footer columns and
// the service catalogue. Pages, navigation, the sitemap and llms.txt all read
// from this file so a route is only ever named in one place.

export const routes = {
  home: "/",
  aestheticClinicWebsites: "/aesthetic-clinic-website-design",
  bristol: "/aesthetic-clinic-website-design/bristol",
  london: "/aesthetic-clinic-website-design/london",
  beautySalonWebsites: "/beauty-salon-website-design",
  adminDashboard: "/clinic-website-admin-dashboard",
  seoAiSearch: "/seo-ai-search-for-aesthetic-clinics",
  metaAds: "/meta-ads-for-aesthetic-clinics",
  socialReels: "/social-media-reels-for-clinics",
  customSoftware: "/custom-software-ai-chatbots",
  pricing: "/pricing",
  work: "/work",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  blog: "/blog",
  privacy: "/privacy",
  cookies: "/cookies",
  terms: "/terms",
  complaints: "/complaints",
  // SEO expansion
  googleBusinessProfile: "/google-business-profile-for-aesthetic-clinics",
  nurseWebsites: "/website-for-aesthetic-nurses",
  redesign: "/clinic-website-redesign",
  freeAudit: "/free-clinic-website-audit",
  clinicTypes: "/clinic-types",
  treatmentPages: "/treatment-pages",
  htmlSitemap: "/sitemap",
  accessibility: "/accessibility",
} as const;

export type ServiceKey =
  | "aestheticClinicWebsites"
  | "beautySalonWebsites"
  | "adminDashboard"
  | "seoAiSearch"
  | "metaAds"
  | "socialReels"
  | "customSoftware";

export type Service = {
  key: ServiceKey;
  name: string;
  short: string;
  href: string;
  description: string;
};

export const services: Service[] = [
  {
    key: "aestheticClinicWebsites",
    name: "Aesthetic Clinic Websites",
    short: "Aesthetic clinic websites",
    href: routes.aestheticClinicWebsites,
    description:
      "Custom, mobile-first websites for aesthetics clinics, aesthetic nurses, skin clinics and med spas.",
  },
  {
    key: "beautySalonWebsites",
    name: "Beauty Salon Websites",
    short: "Beauty salon websites",
    href: routes.beautySalonWebsites,
    description:
      "Salon websites with your treatment menu, prices, gallery and a direct route to booking.",
  },
  {
    key: "adminDashboard",
    name: "Admin Dashboard",
    short: "Clinic admin dashboard",
    href: routes.adminDashboard,
    description:
      "Update treatments, prices, before-and-after photos, offers and blog posts yourself.",
  },
  {
    key: "seoAiSearch",
    name: "SEO & AI Search",
    short: "Local SEO & AI search visibility",
    href: routes.seoAiSearch,
    description:
      "Local SEO and AI search visibility so Google, ChatGPT, Gemini and Perplexity can find and understand your clinic.",
  },
  {
    key: "metaAds",
    name: "Meta Ads",
    short: "Meta ads",
    href: routes.metaAds,
    description:
      "Consultation-led Facebook and Instagram campaigns, written with UK advertising rules in mind.",
  },
  {
    key: "socialReels",
    name: "Social & Reels",
    short: "Social media & reels",
    href: routes.socialReels,
    description:
      "Reels, posts and content calendars for clinics and salons, planned, scripted, edited and scheduled.",
  },
  {
    key: "customSoftware",
    name: "AI & Software",
    short: "AI chatbots & custom software",
    href: routes.customSoftware,
    description:
      "AI chatbots that capture enquiries out of hours, plus CRMs, dashboards and SaaS products.",
  },
];

export function service(key: ServiceKey): Service {
  const found = services.find((s) => s.key === key);
  if (!found) throw new Error(`Unknown service: ${key}`);
  return found;
}

export type NavItem =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string; description: string }[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: routes.home },
  {
    label: "Clinic Websites",
    children: [
      {
        label: "Aesthetic Clinic Websites",
        href: routes.aestheticClinicWebsites,
        description: "For clinics, aesthetic nurses and med spas",
      },
      {
        label: "Beauty Salon Websites",
        href: routes.beautySalonWebsites,
        description: "Menu, prices, gallery and booking",
      },
      {
        label: "Admin Dashboard",
        href: routes.adminDashboard,
        description: "Update your website yourself",
      },
      {
        label: "Aesthetic Nurse Websites",
        href: routes.nurseWebsites,
        description: "For nurse prescribers and practitioners",
      },
      { label: "Website Redesign", href: routes.redesign, description: "Replace a Wix or tired website" },
      { label: "Treatment Pages", href: routes.treatmentPages, description: "Treatment pages built to rank" },
    ],
  },
  {
    label: "Marketing",
    children: [
      {
        label: "SEO & AI Search",
        href: routes.seoAiSearch,
        description: "Google, ChatGPT, Gemini and Perplexity",
      },
      { label: "Meta Ads", href: routes.metaAds, description: "Facebook and Instagram campaigns" },
      {
        label: "Social & Reels",
        href: routes.socialReels,
        description: "Reels, posts and content calendars",
      },
      {
        label: "Google Business Profile",
        href: routes.googleBusinessProfile,
        description: "Rank higher on Google Maps",
      },
      { label: "AI Chatbots & Software", href: routes.customSoftware, description: "Chatbots, CRMs and SaaS" },
    ],
  },
  {
    label: "Clinic Types",
    children: [
      { label: "All clinic types", href: routes.clinicTypes, description: "Who we build for" },
      { label: "Aesthetics clinics", href: "/clinic-types/aesthetics-clinics", description: "Multi-treatment clinics" },
      { label: "Skin clinics", href: "/clinic-types/skin-clinics", description: "Skin journeys and courses" },
      { label: "Med spas", href: "/clinic-types/med-spas", description: "Packages and memberships" },
      { label: "Aesthetic nurses", href: "/clinic-types/aesthetic-nurses", description: "Solo practitioners" },
      { label: "Beauty salons", href: "/clinic-types/beauty-salons", description: "Menus, prices and booking" },
      { label: "Lash & brow studios", href: "/clinic-types/lash-and-brow-studios", description: "Small, booking-led studios" },
    ],
  },
  { label: "Pricing", href: routes.pricing },
  { label: "Work", href: routes.work },
  { label: "Blog", href: routes.blog },
];

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Services",
    links: [
      ...services.map((s) => ({ label: s.short, href: s.href })),
      { label: "Clinic websites in London", href: routes.london },
      { label: "Clinic websites in Bristol", href: routes.bristol },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: routes.blog },
      { label: "FAQ", href: routes.faq },
      { label: "Free clinic website audit", href: routes.freeAudit },
      { label: "Clinic website pricing guide", href: "/blog/aesthetic-clinic-website-cost-uk" },
      { label: "Treatment pages that rank", href: routes.treatmentPages },
      { label: "Clinic types", href: routes.clinicTypes },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: routes.pricing },
      { label: "Work", href: routes.work },
      { label: "About", href: routes.about },
      { label: "Contact", href: routes.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: routes.privacy },
      { label: "Cookies", href: routes.cookies },
      { label: "Terms", href: routes.terms },
      { label: "Complaints", href: routes.complaints },
      { label: "Accessibility", href: routes.accessibility },
      { label: "Site map", href: routes.htmlSitemap },
    ],
  },
];

// Core admin-dashboard messaging (Section I), reused across pages.
export const dashboardLines = {
  core: "Update treatments, prices and before-and-after photos yourself, with no developer, no waiting and no extra invoice for small changes.",
  tagline: "Your clinic website. Your control.",
  proof: "Developers are for big changes. Price updates and new photos shouldn't need one.",
  comparison:
    "Most clinic websites need a developer for every edit. With Option A, you make day-to-day changes yourself.",
} as const;

// UK search keywords surfaced in the footer and hero strips, so every page
// reinforces what the site should rank for.
export const ukKeywords = [
  "Aesthetic clinic website design UK",
  "Beauty salon websites",
  "Clinic website with admin dashboard",
  "Local SEO for aesthetic clinics",
  "AI search visibility",
  "Meta ads for aesthetics clinics",
  "Instagram reels for clinics",
  "Med spa web design",
  "Aesthetic nurse websites",
  "Skin clinic web design",
] as const;
