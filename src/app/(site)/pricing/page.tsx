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
} from "@/components/marketing/blocks";
import { TrackView } from "@/components/analytics/TrackView";
import { WhatsAppInlineLink } from "@/components/contact/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing } from "@/config/business";
import { dashboardLines, routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.pricing;

export const metadata = pageMetadata({
  title: "Clinic Website Pricing UK: £400 or £300 | Zyverra Labs",
  description:
    "Clear GBP pricing: £400 clinic website with admin dashboard or £300 without. Live in 7–10 working days. Pay 50/50 or in three parts (30/40/30).",
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
      "Content changes made by us on request",
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
        title="Clinic website pricing"
        description={dashboardLines.comparison}
        actions={<HeroActions />}
        chips={[`Option A £${pricing.optionA.price}`, `Option B £${pricing.optionB.price}`, "Pay 50/50 or 30/40/30"]}
      />

      <Lead>
        Option A costs £{pricing.optionA.price} and includes a custom clinic website plus an admin dashboard
        for updating it yourself. Option B costs £{pricing.optionB.price} for the same custom website without
        the dashboard. Both go live in {pricing.timeline}. Pay 50% upfront and 50% at launch, or split it
        30/40/30.
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
            { label: "Small changes after launch", a: "Do it yourself", b: "By request" },
          ]}
        />
        {/* TODO [CONFIRM]: blog included in Option A/B; fee for Option B changes; hosting/domain costs; page count per option. */}
        <DevConfirm>
          confirm the blog row for each option, the fee for small changes on Option B, hosting/domain costs and how
          many pages each option includes — then add those rows.
        </DevConfirm>
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
              30% to start, 40% at design approval and 30% at launch.
            </p>
          </div>
        </div>
        {/* TODO [CONFIRM]: the 30/40/30 milestones. */}
        <DevConfirm>confirm the 30/40/30 milestones (start / design approval / launch).</DevConfirm>
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
              description="Local SEO, Meta ads and social media management are quoted separately, based on what your clinic needs."
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

      <CtaBand />
    </PageShell>
  );
}
