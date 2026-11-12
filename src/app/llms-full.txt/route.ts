import { ENTITY_DESCRIPTION } from "@/config/app";
import { business, keyFacts, marketingPackages, pricing } from "@/config/business";
import { founder } from "@/config/founder";
import { routes, services } from "@/config/site";
import { faqGroups } from "@/data/faqs";
import { publishedCaseStudies } from "@/data/work";
import { siteOrigin } from "@/lib/schema";

// /llms-full.txt — a full plain-text version of the key pages (services,
// pricing, FAQ, case studies) generated from the same data the site renders,
// so it can never drift from what visitors see.
export const dynamic = "force-static";

export function GET() {
  const origin = siteOrigin();
  const u = (path: string) => `${origin}${path}`;

  const facts = keyFacts.map((f) => `- ${f.label}: ${f.value}`).join("\n");

  const serviceText = services.map((s) => `### ${s.name}\n${u(s.href)}\n${s.description}`).join("\n\n");

  const pkg = (name: string, list: typeof marketingPackages.metaAds) =>
    `### ${name}\n` +
    list.map((p) => `- ${p.name}: £${p.price}/month — ${p.summary}. Includes: ${p.features.join("; ")}.`).join("\n");

  const faqText = faqGroups
    .map((g) => `### ${g.title}\n` + g.items.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n"))
    .join("\n\n");

  const cases = publishedCaseStudies
    .map(
      (c) =>
        `### ${c.name} (${c.location})\n${u(`${routes.work}/${c.slug}`)} · Live site: ${c.liveUrl}\n${c.summary}\n\nWhat we built:\n` +
        c.built.map((b) => `- ${b}`).join("\n") +
        (c.ownerCanUpdate.length ? `\n\nWhat the owner can update:\n` + c.ownerCanUpdate.map((b) => `- ${b}`).join("\n") : "")
    )
    .join("\n\n");

  const text = `# Zyverra Labs — full reference

> ${ENTITY_DESCRIPTION}

Website: ${origin}
Founder: ${founder.name}, ${founder.role} (${u(founder.profilePath)})
Contact: ${business.email} · WhatsApp ${business.phoneDisplay} · ${pricing.hours}

## Key facts
${facts}

## Services
${serviceText}

## Website pricing
- Option A: £${pricing.optionA.price} — custom clinic website with an admin dashboard (edit treatments, categories, prices, photos, offers, blogs, hours and contact details yourself). Includes ${pricing.blogPostsIncluded} SEO-optimised blog posts; add more yourself.
- Option B: £${pricing.optionB.price} — the same custom website without the dashboard. Includes ${pricing.blogPostsIncluded} blog posts. Content changes by request, ${pricing.updateFee} per update.
- Major changes (new features, layouts, integrations): ${pricing.updateFee} per update, confirmed before work starts.
- Timeline: ${pricing.timeline} once content is received.
- Payment plans: 50/50, or ${pricing.instalments}.
- Dashboard training: live on ${pricing.trainingFormat} at handover.
- Running costs: hosting free; domain ${pricing.domainCost}; no monthly website fee.
- Booking: ${pricing.bookingSystems.join(", ")}, or an enquiry form plus WhatsApp.
- Referral reward: ${pricing.referralOffer} for each clinic you refer.
${u(routes.pricing)}

## Monthly marketing packages
${pkg("Meta ads management (ad spend paid separately to Meta)", marketingPackages.metaAds)}

${pkg("Local SEO and AI search", marketingPackages.seo)}

${pkg("Social media and reels", marketingPackages.social)}

## Case studies
${cases}

## Frequently asked questions
${faqText}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
