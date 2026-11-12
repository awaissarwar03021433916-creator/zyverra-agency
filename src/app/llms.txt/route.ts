import { business, marketingPackages, pricing } from "@/config/business";
import { routes, services } from "@/config/site";
import { blogPosts, listingTitle } from "@/data/blog";
import { siteOrigin } from "@/lib/schema";
import { ENTITY_DESCRIPTION } from "@/config/app";

// /llms.txt (Section G6). Optional and low-cost: Google says it is not needed
// for Search, so this is generated from the site data and left at that.
export const dynamic = "force-static";

export function GET() {
  const origin = siteOrigin();
  const u = (path: string) => `${origin}${path}`;

  const serviceLines: Record<string, string> = {
    [routes.aestheticClinicWebsites]: "custom websites for UK aesthetics clinics and practitioners",
    [routes.beautySalonWebsites]: "salon websites with menu, prices, gallery and booking",
    [routes.adminDashboard]: "what clients can edit themselves",
  };

  // Every clinic guide (software articles excluded), listed by its neutral title.
  const guides = blogPosts
    .filter((p) => p.category !== "AI & software")
    .map((p) => `- [${listingTitle(p)}](${u(`${routes.blog}/${p.slug}`)}): ${p.excerpt}`)
    .join("\n");

  const text = `# Zyverra Labs

> ${ENTITY_DESCRIPTION} Founder-led. With the admin dashboard, clients update treatments, prices, images, before-and-after photos, offers and blogs themselves. Prices: £${pricing.optionA.price} website with admin dashboard; £${pricing.optionB.price} without. Live in ${pricing.timeline}. Payment plans: 50/50 or 30/40/30 over 45 days. Option A includes 3 SEO-optimised blog posts; major changes cost ${pricing.updateFee} per update. Hosting is free; a domain costs ${pricing.domainCost}. Booking via ${pricing.bookingSystems.join(", ")}, or an enquiry form plus WhatsApp. Monthly marketing: Meta ads management from £${marketingPackages.metaAds[0].price}/month (ad spend separate), local SEO from £${marketingPackages.seo[0].price}/month, social media and reels from £${marketingPackages.social[0].price}/month. Clinic websites built for clients in London and Bristol. Contact: ${business.email}, WhatsApp ${business.phoneDisplay}.

## Services
${services
  .map((s) => {
    const extra = serviceLines[s.href];
    return `- [${s.short.charAt(0).toUpperCase()}${s.short.slice(1)}](${u(s.href)})${extra ? `: ${extra}` : ""}`;
  })
  .join("\n")}

## More for clinics
- [Website for aesthetic nurses](${u(routes.nurseWebsites)})
- [Clinic website redesign](${u(routes.redesign)})
- [Google Business Profile for aesthetic clinics](${u(routes.googleBusinessProfile)})
- [Treatment pages that rank](${u(routes.treatmentPages)})
- [Free clinic website audit](${u(routes.freeAudit)})
- [Websites and marketing by clinic type](${u(routes.clinicTypes)})

## Locations
- [Aesthetic clinic website design in London](${u(routes.london)})
- [Aesthetic clinic website design in Bristol](${u(routes.bristol)})

## Key pages
- [Pricing](${u(routes.pricing)})
- [Clinic website examples](${u(routes.work)})
- [FAQ](${u(routes.faq)})
- [About and founder](${u(routes.about)})
- [Contact](${u(routes.contact)})

## Guides
${guides}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
