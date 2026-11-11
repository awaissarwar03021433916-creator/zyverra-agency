import { business, pricing } from "@/config/business";
import { routes, services } from "@/config/site";
import { blogPosts } from "@/data/blog";
import { siteOrigin } from "@/lib/schema";

// /llms.txt (Section G6). Optional and low-cost: Google says it is not needed
// for Search, so this is generated from the site data and left at that.
export const dynamic = "force-static";

const GUIDE_LABELS: Record<string, string> = {
  "aesthetic-clinic-website-cost-uk": "Aesthetic clinic website cost in the UK",
  "botox-advertising-rules-clinic-website": "Prescription-only medicines and ASA advertising rules for clinic websites",
  "get-clinic-recommended-by-chatgpt": "Getting your clinic recommended by ChatGPT and Google AI",
};

export function GET() {
  const origin = siteOrigin();
  const u = (path: string) => `${origin}${path}`;

  const serviceLines: Record<string, string> = {
    [routes.aestheticClinicWebsites]: "custom websites for UK aesthetics clinics and practitioners",
    [routes.beautySalonWebsites]: "salon websites with menu, prices, gallery and booking",
    [routes.adminDashboard]: "what clients can edit themselves",
  };

  const guides = blogPosts
    .filter((p) => GUIDE_LABELS[p.slug])
    .map((p) => `- [${GUIDE_LABELS[p.slug]}](${u(`${routes.blog}/${p.slug}`)})`)
    .join("\n");

  const text = `# Zyverra Labs

> Zyverra Labs is a founder-led web studio based in Lahore, Pakistan, serving UK aesthetics clinics, aesthetic nurses and practitioners, med spas and beauty salons. We build custom clinic websites with a built-in admin dashboard (clients update treatments, prices, images, before-and-after photos, offers and blogs themselves), plus local SEO, AI search visibility, Meta ads, social media and reels, AI chatbots and custom software. Prices: £${pricing.optionA.price} website with admin dashboard; £${pricing.optionB.price} without. Live in ${pricing.timeline}. Payment plans: 50/50 or 30/40/30. Contact: ${business.email}, WhatsApp ${business.phoneDisplay}.

## Services
${services
  .map((s) => {
    const extra = serviceLines[s.href];
    return `- [${s.short.charAt(0).toUpperCase()}${s.short.slice(1)}](${u(s.href)})${extra ? `: ${extra}` : ""}`;
  })
  .join("\n")}

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
