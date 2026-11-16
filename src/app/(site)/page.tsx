import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { Reveal } from "@/components/marketing/pages/Reveal";
import { ColorIcon, IconTile, type IconName } from "@/components/marketing/ColorIcon";
import {
  CardGrid,
  CtaBand,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
  Steps,
  type CardItem,
  KeyFacts,
} from "@/components/marketing/blocks";
import { KeywordMarquee, ScreenshotCollage, WorkShowcase } from "@/components/marketing/blocks/showcase";
import { marketingPackages, pricing, keyFacts } from "@/config/business";
import { dashboardLines, routes, services, type ServiceKey } from "@/config/site";
import { allFaqs, faqsById } from "@/data/faqs";
import { publishedCaseStudies } from "@/data/work";
import { pageMetadata } from "@/lib/seo";
import { Testimonials } from "@/components/marketing/blocks/Testimonials";
import { JsonLd } from "@/components/seo/JsonLd";
import { testimonials } from "@/data/testimonials";
import { siteOrigin, testimonialReviewsSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Design UK | Zyverra Labs",
  description:
    "Aesthetic clinic website design UK: websites for aesthetics clinics you can update yourself, plus SEO and ads. From £300, live in 7–10 days. Get a quote.",
  path: "/",
});

const SERVICE_EMOJI: Record<ServiceKey, IconName> = {
  aestheticClinicWebsites: "sparkles",
  beautySalonWebsites: "scissors",
  adminDashboard: "mobile",
  seoAiSearch: "search",
  metaAds: "megaphone",
  socialReels: "movie-camera",
  customSoftware: "robot",
};

const serviceCards: CardItem[] = services.map((s) => ({
  title: s.name,
  description: s.description,
  href: s.href,
  emoji: SERVICE_EMOJI[s.key],
  linkLabel: "Explore",
}));

const steps: { title: string; description: string; emoji: IconName }[] = [
  {
    title: "Free call",
    emoji: "speech",
    description: "A short video call about your clinic, your treatments and what you want the website to do.",
  },
  {
    title: "Content & design",
    emoji: "paintbrush",
    description: "You send your logo, treatment list, prices and photos. We shape the pages and design around them.",
  },
  {
    title: "Build & review",
    emoji: "tools",
    description: "We build the site and you review it on your own phone and laptop before anything goes live.",
  },
  {
    title: "Launch & handover",
    emoji: "rocket",
    description: "We launch, connect your booking link, and walk you through the admin dashboard (Option A).",
  },
];

const AUDIENCE: CardItem[] = [
  { emoji: "sparkles", title: "Aesthetics clinics", description: "Single-room clinics to multi-room practices." },
  { emoji: "heart", title: "Aesthetic nurses", description: "Independent practitioners who want to look as established as they are." },
  { emoji: "lotus", title: "Skin clinics", description: "Treatment menus, skin journeys and consultation-first pages." },
  { emoji: "bubbles", title: "Med spas", description: "Packages, memberships and seasonal offers you can update." },
  { emoji: "scissors", title: "Beauty salons", description: "Menus, prices, gallery and one-tap booking.", href: routes.beautySalonWebsites, linkLabel: "Salon websites" },
  { emoji: "lipstick", title: "Lash, brow & nail studios", description: "A clean, fast site that sends clients straight to booking." },
];

const DASHBOARD: { emoji: IconName; label: string }[] = [
  { emoji: "pound", label: "Treatments & prices" },
  { emoji: "camera", label: "Images & before-and-afters" },
  { emoji: "gem", label: "Offers & promotions" },
  { emoji: "memo", label: "Blog posts" },
];

export default function HomePage() {
  const work = publishedCaseStudies;
  const fromMeta = Math.min(...marketingPackages.metaAds.map((p) => p.price));
  const fromSeo = Math.min(...marketingPackages.seo.map((p) => p.price));
  const fromSocial = Math.min(...marketingPackages.social.map((p) => p.price));

  return (
    <PageShell>
      <PageHero
        eyebrow="Aesthetic clinic website design UK"
        title={
          <>
            UK aesthetic clinic website design <Accent>you can update yourself</Accent>
          </>
        }
        description={dashboardLines.core}
        actions={
          <HeroActions
            primary={{ href: routes.contact, label: "Get a quote" }}
            secondary={{ href: routes.work, label: "See our clinic websites", short: "Our work" }}
          />
        }
        chips={[`From £${pricing.optionB.price}`, `Live in ${pricing.timeline}`, "Pay 50/50 or 30/40/30"]}
        aside={<ScreenshotCollage items={work} />}
      />

      <KeywordMarquee />

      <Lead>
        Zyverra Labs is a clinic marketing agency for UK clinics, building websites for aesthetics clinics, aesthetic
        nurses, med spas and beauty salons, plus local SEO, AI search visibility and Meta ads. Every Option A site includes an admin dashboard, so you
        can change treatments, prices, before-and-after photos, offers and blog posts yourself, without paying a
        developer for small changes. Websites start at £{pricing.optionB.price}, go live in {pricing.timeline},
        and you can pay 50/50 or in three parts.
      </Lead>

      <KeyFacts facts={keyFacts.map((f) => ({ label: f.label, value: f.value }))} />

      <Testimonials items={testimonials} />
      <JsonLd data={testimonialReviewsSchema(siteOrigin(), testimonials)} />

      <Section id="services">
        <SectionHeading
          eyebrow="Services"
          title="Everything your clinic needs online, from one team"
          description="Start with a website, then add the marketing that brings consultations in. Every service links back to a site you control."
        />
        <CardGrid items={serviceCards} columns={4} />
      </Section>

      <Section id="work" tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Our work"
            title="Clinic websites we've built"
            description="Live websites for real clinics in London and Bristol."
          />
          <Link href={routes.work} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            All case studies
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <WorkShowcase items={work} />
      </Section>

      <Section id="dashboard">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="The Zyverra admin dashboard"
              title="Your website, your control"
              description={dashboardLines.proof}
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {DASHBOARD.map((d) => (
                <li
                  key={d.label}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-sm font-semibold text-foreground shadow-xs"
                >
                  <ColorIcon name={d.emoji} size={32} />
                  {d.label}
                </li>
              ))}
            </ul>
            <Link
              href={routes.adminDashboard}
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              See how the admin dashboard works
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-border bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">Treatments</div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">Saved · live</span>
              </div>
              <ul className="mt-4 grid gap-2.5">
                {[
                  { name: "Hydrating facial", price: "£65" },
                  { name: "Skin booster course", price: "£180" },
                  { name: "Lip enhancement (1ml)", price: "£150" },
                  { name: "Chemical peel", price: "£75" },
                ].map((t, i) => (
                  <li
                    key={t.name}
                    className={`flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm ${
                      i === 1 ? "border-primary/50 ring-2 ring-primary/15" : "border-border"
                    }`}
                  >
                    <span className="font-medium text-foreground">{t.name}</span>
                    <span className="font-semibold text-foreground">{t.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Illustration of the editing view. Major changes, such as new features or a redesign, are still handled by us.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="pricing" tone="muted">
        <SectionHeading eyebrow="Pricing" title="Simple, transparent pricing" description={dashboardLines.comparison} />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { opt: pricing.optionA, highlight: true, note: "Custom website + admin dashboard", emoji: "trophy" as IconName },
            { opt: pricing.optionB, highlight: false, note: "Custom website, changes made by us on request", emoji: "desktop" as IconName },
          ].map(({ opt, highlight, note, emoji }, i) => (
            <Reveal key={opt.name} delay={i * 0.08}>
              <div
                className={`flex h-full items-start gap-5 rounded-3xl border p-7 shadow-xs transition-shadow duration-300 hover:shadow-xl ${
                  highlight ? "border-primary/40 bg-gradient-to-b from-primary/[0.07] to-white" : "border-border bg-card"
                }`}
              >
                <IconTile name={emoji} tint={highlight ? "#e0f2fe" : "#ede9fe"} />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {opt.name}: {opt.label}
                  </h3>
                  <p className="mt-2 font-heading text-4xl font-bold text-foreground">£{opt.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{note}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Live in {pricing.timeline}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { href: routes.metaAds, emoji: "megaphone" as IconName, label: "Meta ads", from: fromMeta },
            { href: routes.seoAiSearch, emoji: "search" as IconName, label: "Local SEO & AI search", from: fromSeo },
            { href: routes.socialReels, emoji: "movie-camera" as IconName, label: "Social & reels", from: fromSocial },
          ].map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <ColorIcon name={m.emoji} size={36} />
              <span className="text-sm">
                <span className="block font-semibold text-foreground">{m.label}</span>
                <span className="text-muted-foreground">from £{m.from}/month</span>
              </span>
              <ArrowRight aria-hidden className="ms-auto h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Pay 50% to start and 50% at launch, or split it 30/40/30 over 45 days.{" "}
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">
            Compare all prices
          </Link>
        </p>
      </Section>

      <Section id="who">
        <SectionHeading
          eyebrow="Who we build for"
          title="Built for clinics, practitioners and salons"
          description="Websites for aesthetics and beauty businesses of every size across the UK."
        />
        <CardGrid items={AUDIENCE} columns={3} />
      </Section>

      <Section id="ai-search" tone="tint">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-xs">
              <IconTile name="search" tint="#e0f2fe" />
              <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Built to be found on Google and AI assistants
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Accurate schema markup, answer-first treatment pages and FAQs, and Google Search Console and Bing
                Webmaster Tools set up from day one. Nobody can guarantee a ranking or a recommendation, but these are
                the foundations every recommendation is built on.
              </p>
              <Link href={routes.seoAiSearch} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Local SEO & AI search visibility
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="h-full rounded-3xl border border-border bg-card p-8 shadow-xs">
              <IconTile name="shield" tint="#dcfce7" />
              <h2 className="mt-5 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Written with UK advertising rules in mind
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                Prescription-only medicines can&apos;t be advertised to the public under ASA and CAP rules, and that
                includes your website and social media. We build treatment pages around concerns and consultations,
                use consented before-and-after photos, and explain the rules before launch.
              </p>
              <Link
                href={`${routes.blog}/botox-advertising-rules-clinic-website`}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Read our guide to the ASA rules
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="process">
        <SectionHeading eyebrow="Process" title="How it works" description={`From first call to launch in ${pricing.timeline}.`} />
        <Steps steps={steps} />
      </Section>

      <Section id="faq" narrow tone="muted">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <FaqList faqs={[...allFaqs.slice(0, 6), ...faqsById(["quiet-clinic"])]} />
        <Link href={routes.faq} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          See all questions
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <div className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <Link
          href={routes.customSoftware}
          className="group flex flex-col gap-3 rounded-3xl border border-border bg-gradient-to-r from-sky-50 to-fuchsia-50 p-5 transition-shadow hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-center gap-4 text-sm text-foreground">
            <ColorIcon name="robot" size={40} />
            <span>
              <strong className="font-semibold">Also: AI chatbots & custom software.</strong> CRMs, dashboards, SaaS
              products and the AI assistant running on this site.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
            AI & software work
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </Link>
      </div>

      <CtaBand title="Tell us about your clinic" />
    </PageShell>
  );
}
