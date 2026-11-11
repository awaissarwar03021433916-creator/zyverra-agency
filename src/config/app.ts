// Canonical host. The hosting layer (Vercel) permanently redirects the bare
// domain to www (zyverralabs.com -> 308 -> www.zyverralabs.com), so www is the
// host that actually serves pages and therefore the only one that can be
// canonical. Adding an app-level www -> apex redirect would create a redirect
// loop with the hosting rule.
export const CANONICAL_ORIGIN = "https://www.zyverralabs.com";

export const appConfig = {
  name: "Zyverra Labs",
  description:
    "Websites with a built-in admin dashboard, local SEO, AI search visibility and Meta ads for UK aesthetics clinics.",
  url: CANONICAL_ORIGIN,
  locale: "en-GB",
  ogLocale: "en_GB",
};
