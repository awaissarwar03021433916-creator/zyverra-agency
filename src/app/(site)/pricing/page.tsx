import Link from "next/link";
import { Check } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import {
  CompareTable,
  CtaBand,
  DashboardCallout,
  DevConfirm,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
  RelatedLinks,
} from "@/components/marketing/blocks";
import { TrackView } from "@/components/analytics/TrackView";
import { WhatsAppInlineLink } from "@/components/contact/WhatsAppButton";
import { PackageCards } from "@/components/marketing/blocks/showcase";
import { ColorIcon } from "@/components/marketing/ColorIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { marketingPackages, pricing } from "@/config/business";
import { dashboardLines, routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.pricing;

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Cost UK: £300 or £400 | Zyverra",
  description:
    "Aesthetic clinic website cost UK: £300, or £400 with an admin dashboard. Live in 7–10 days, pay 50/50 or over 45 days. Compare plans and get a quote.",
  path: PATH,
});

const OPTIONS = [
  {
    opt: pricing.optionA,
    event: "pricing_view_option_a" as const,
    highlight: true,
    points: [
      "Custom clinic website, designed around your treatments",
      "Admin dashboard: edit treatments, prices, photos, offers and blogs yourself",
      `${pricing.blogPostsIncluded} SEO-optimised blog posts included, and add as many as you like`,
      "Mobile-first design, SEO and schema setup",
      "WhatsApp and booking buttons",
      `Live in ${pricing.timeline}`,
    ],
  },
  {
    opt: pricing.optionB,
    event: "pricing_view_option_b" as const,
    highlight: false,
    points: [
      "The same custom clinic website",
      `${pricing.blogPostsIncluded} blog posts included`,
      `Content changes made by us on request (${pricing.updateFee} per update)`,
      "Mobile-first design, SEO and schema setup",
      "WhatsApp and booking buttons",
      `Live in ${pricing.timeline}`,
    ],
  },
];

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Pricing", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Clinic website design",
          serviceType: "Website design for aesthetics clinics and beauty salons",
          description: "Custom clinic websites with (Option A) or without (Option B) an admin dashboard.",
          offers: true,
        })}
      />

      <PageHero
        eyebrow="Pricing in pounds sterling"
        title="Aesthetic clinic website cost in the UK"
        description={dashboardLines.comparison}
        actions={<HeroActions />}
        chips={[`Option A £${pricing.optionA.price}`, `Option B £${pricing.optionB.price}`, "Pay 50/50 or 30/40/30"]}
      />

      <Lead>
        Option A costs £{pricing.optionA.price} and includes a custom clinic website plus an admin dashboard
        for updating it yourself. Option B costs £{pricing.optionB.price} for the same custom website without
        the dashboard. Both go live in {pricing.timeline}. Pay 50% upfront and 50% at launch, or split it
        30/40/30 over 45 days.
      </Lead>

      <Section id="options">
        <div className="grid gap-6 md:grid-cols-2">
          {OPTIONS.map(({ opt, event, highlight, points }) => (
            <TrackView key={opt.name} event={event} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border p-7 shadow-xs ${
                  highlight ? "border-primary/40 bg-primary/[0.04] shadow-md" : "border-border bg-card"
                }`}
              >
                {highlight && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Includes the admin dashboard
                  </span>
                )}
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  {opt.name}: {opt.label}
                </h2>
                <p className="mt-4 font-heading text-5xl font-bold text-foreground">£{opt.price}</p>
                <ul className="mt-6 grid gap-3">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                      <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    href={routes.contact}
                    className={`inline-flex h-11 w-full items-center justify-center rounded-lg px-5 text-sm font-semibold transition-colors ${
                      highlight
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "border border-border bg-background text-foreground hover:bg-muted"
                    }`}
                  >
                    Get a quote for {opt.name}
                  </Link>
                </div>
              </div>
            </TrackView>
          ))}
        </div>
      </Section>

      <Section id="compare" tone="muted">
        <SectionHeading eyebrow="Compare" title="Option A vs Option B" />
        <CompareTable
          caption="Option A compared with Option B"
          rows={[
            { label: "Price", a: `£${pricing.optionA.price}`, b: `£${pricing.optionB.price}` },
            { label: "Admin dashboard", a: true, b: false },
            { label: "Edit treatments, prices and before-and-afters yourself", a: true, b: false },
            { label: "Mobile-first design", a: true, b: true },
            { label: "SEO and schema setup", a: true, b: true },
            { label: "WhatsApp and booking buttons", a: true, b: true },
            { label: "Timeline", a: pricing.timeline, b: pricing.timeline },
            { label: "Blog", a: `${pricing.blogPostsIncluded} SEO-optimised posts + add your own`, b: `${pricing.blogPostsIncluded} posts` },
            { label: "Small changes after launch", a: "Do it yourself", b: `By request, ${pricing.updateFee} per update` },
            { label: "Major changes (new features, layouts)", a: `${pricing.updateFee} per update`, b: `${pricing.updateFee} per update` },
            { label: "Dashboard training", a: `Live on ${pricing.trainingFormat}`, b: false },
          ]}
        />
        {/* TODO [CONFIRM]: hosting/domain costs and how many pages each option includes — then add those rows. */}
        <DevConfirm>confirm hosting/domain costs and how many pages each option includes — then add those rows.</DevConfirm>
      </Section>

      <DashboardCallout />

      <Section id="payment-plans">
        <SectionHeading
          eyebrow="Payment plans"
          title="Payment plans explained"
          description="Choose whichever suits your cash flow."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="font-heading text-lg font-semibold text-foreground">50/50</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">50% to start, and 50% at launch.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
            <h3 className="font-heading text-lg font-semibold text-foreground">30/40/30</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Spread over 45 days: {pricing.instalments}.
            </p>
          </div>
        </div>
      </Section>

      <Section id="not-included" tone="tint">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Extras"
              title="What's not included"
              description="Ad spend is always paid directly to the advertising platform. Anything outside the website itself, such as copywriting or photography, is agreed and quoted before work starts."
            />
            {/* TODO [CONFIRM]: the full list of exclusions. */}
          </div>
          <div>
            <SectionHeading
              eyebrow="Marketing"
              title="Ongoing marketing"
              description="Local SEO, Meta ads and social media management are separate monthly packages — see the prices below."
            />
            <p className="mt-4 text-sm text-muted-foreground">
              <Link href={routes.seoAiSearch} className="font-semibold text-primary hover:underline">SEO & AI search</Link>
              {" · "}
              <Link href={routes.metaAds} className="font-semibold text-primary hover:underline">Meta ads</Link>
              {" · "}
              <Link href={routes.socialReels} className="font-semibold text-primary hover:underline">Social & reels</Link>
            </p>
          </div>
        </div>
      </Section>

      <Section id="marketing">
        <SectionHeading
          eyebrow="Monthly marketing"
          title="Marketing packages"
          description="Add marketing when you're ready. Simple monthly fees in pounds sterling; Meta ad spend is paid directly to Meta."
        />
        {(
          [
            { key: "metaAds", title: "Meta ads", href: routes.metaAds, emoji: "megaphone" },
            { key: "seo", title: "Local SEO & AI search", href: routes.seoAiSearch, emoji: "search" },
            { key: "social", title: "Social media & reels", href: routes.socialReels, emoji: "movie-camera" },
          ] as const
        ).map((g) => (
          <div key={g.key} className="mt-12">
            <h3 className="flex items-center gap-3 font-heading text-xl font-bold text-foreground">
              <ColorIcon name={g.emoji} size={32} />
              <Link href={g.href} className="hover:text-primary">{g.title}</Link>
            </h3>
            <PackageCards packages={marketingPackages[g.key]} />
          </div>
        ))}
      </Section>

      <Section id="compare-uk">
        <SectionHeading
          eyebrow="Context"
          title="How we compare to typical UK prices"
          description="UK clinic website prices range from a few hundred pounds for template sites to many thousands for bespoke agency builds. The question that matters most is who can edit the site after launch."
        />
        <p className="mt-6 text-sm text-muted-foreground">
          Read{" "}
          <Link href={`${routes.blog}/aesthetic-clinic-website-cost-uk`} className="font-semibold text-primary hover:underline">
            how much an aesthetic clinic website costs in the UK
          </Link>{" "}
          or see{" "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">
            clinic websites we&apos;ve built
          </Link>
          .
        </p>
        <div className="mt-8">
          <WhatsAppInlineLink>Ask a pricing question on WhatsApp</WhatsAppInlineLink>
        </div>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Cost and payment questions" />
        <FaqList faqs={faqsById(["cost", "options", "instalments", "monthly-fees"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
          { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
          { href: "/clinic-types/aesthetic-nurses", label: "Aesthetic nurse marketing" },
          { href: routes.redesign, label: "Clinic website redesign UK" },
        ]}
      />

      <CtaBand />
    </PageShell>
  );
}
