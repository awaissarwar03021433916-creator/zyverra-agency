import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Camera,
  Code2,
  FileCode2,
  Globe,
  ImageIcon,
  LayoutDashboard,
  Megaphone,
  PoundSterling,
  Scissors,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
  CardGrid,
  CheckList,
  CtaBand,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
  Steps,
  type CardItem,
} from "@/components/marketing/blocks";
import { pricing } from "@/config/business";
import { dashboardLines, routes, services } from "@/config/site";
import { allFaqs } from "@/data/faqs";
import { publishedCaseStudies } from "@/data/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Websites & Marketing UK | Zyverra Labs",
  description:
    "Websites for UK aesthetics clinics with a built-in admin dashboard, so you update prices, treatments and photos yourself. From £400, live in 7–10 days.",
  path: "/",
});

const SERVICE_ICONS = {
  aestheticClinicWebsites: Sparkles,
  beautySalonWebsites: Scissors,
  adminDashboard: LayoutDashboard,
  seoAiSearch: Search,
  metaAds: Megaphone,
  socialReels: Camera,
  customSoftware: Bot,
} as const;

const serviceCards: CardItem[] = services.map((s) => ({
  title: s.name,
  description: s.description,
  href: s.href,
  icon: SERVICE_ICONS[s.key],
  linkLabel: `Explore ${s.short.toLowerCase()}`,
}));

const steps = [
  {
    title: "Free call",
    description: "A short video call about your clinic, your treatments and what you want the website to do.",
  },
  {
    title: "Content & design",
    description: "You send your logo, treatment list, prices and photos. We shape the pages and design around them.",
  },
  {
    title: "Build & review",
    description: "We build the site and you review it on your own phone and laptop before anything goes live.",
  },
  {
    title: "Launch & handover",
    description: "We launch, connect your booking link, and walk you through the admin dashboard (Option A).",
  },
];

export default function HomePage() {
  const work = publishedCaseStudies;

  return (
    <PageShell>
      <PageHero
        eyebrow="Websites & marketing for UK aesthetics clinics"
        title={
          <>
            Websites for UK aesthetics clinics that <Accent>you can update yourself</Accent>
          </>
        }
        description={dashboardLines.core}
        actions={
          <HeroActions
            primary={{ href: routes.contact, label: "Get a quote" }}
            secondary={{ href: routes.work, label: "See clinic websites we've built" }}
          />
        }
        chips={[
          `From £${pricing.optionA.price} with admin dashboard`,
          `Live in ${pricing.timeline}`,
          "Pay 50/50 or 30/40/30",
          "UK English, prices in £",
        ]}
      />

      <Lead>
        Zyverra Labs builds websites, local SEO, AI search visibility and Meta ads for UK aesthetics
        clinics, aesthetic nurses, med spas and beauty salons. Every Option A site includes an admin
        dashboard, so you can change treatments, prices, before-and-after photos, offers and blog posts
        yourself, without paying a developer for small changes. Websites start at £{pricing.optionB.price},
        go live in {pricing.timeline}, and you can pay 50/50 or in three parts.
      </Lead>

      <Section id="services">
        <SectionHeading
          eyebrow="Services"
          title="Everything your clinic needs online, from one team"
          description="Start with a website, then add the marketing that brings consultations in. Every service links back to a site you control."
        />
        <CardGrid items={serviceCards} columns={4} />
      </Section>

      <Section id="dashboard" tone="tint">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="The Zyverra admin dashboard"
              title="Your website, your control: the Zyverra admin dashboard"
              description={dashboardLines.proof}
            />
            <CheckList
              items={[
                "Add, edit or hide treatments",
                "Change prices the moment they change",
                "Upload before-and-after photos to your gallery",
                "Publish offers and blog posts",
              ]}
            />
            <Link
              href={routes.adminDashboard}
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              See how the admin dashboard works
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What you can change yourself
            </div>
            <ul className="mt-4 grid gap-2.5">
              {[
                { icon: Tag, label: "Treatments & prices" },
                { icon: ImageIcon, label: "Images & before-and-afters" },
                { icon: PoundSterling, label: "Offers & promotions" },
                { icon: FileCode2, label: "Blog posts" },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon aria-hidden className="h-4 w-4" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Major changes, such as new features or a redesign, are still handled by us.
            </p>
          </div>
        </div>
      </Section>

      <Section id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          description={dashboardLines.comparison}
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { opt: pricing.optionA, highlight: true, note: "Custom website + admin dashboard" },
            { opt: pricing.optionB, highlight: false, note: "Custom website, changes made by us on request" },
          ].map(({ opt, highlight, note }) => (
            <div
              key={opt.name}
              className={`rounded-2xl border p-7 shadow-xs ${
                highlight ? "border-primary/40 bg-primary/[0.04]" : "border-border bg-card"
              }`}
            >
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {opt.name}: {opt.label}
              </h3>
              <p className="mt-3 font-heading text-4xl font-bold text-foreground">£{opt.price}</p>
              <p className="mt-2 text-sm text-muted-foreground">{note}</p>
              <p className="mt-1 text-sm text-muted-foreground">Live in {pricing.timeline}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Pay 50% to start and 50% at launch, or split it 30/40/30.{" "}
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">
            Compare options and payment plans
          </Link>
        </p>
      </Section>

      <Section id="work" tone="muted">
        <SectionHeading
          eyebrow="Work"
          title="Clinic websites we've built"
          description="Live sites for real clinics. Each case study shows what the clinic needed and what we built."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {work.map((c) => (
            <Link
              key={c.slug}
              href={`${routes.work}/${c.slug}`}
              className="group rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">{c.location}</div>
              <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read the case study
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <Link href={routes.work} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          See all clinic websites
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="ai-search">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Search"
              title="Built to be found on Google and AI assistants"
              description="Every site is built to be found and understood by Google, Bing, ChatGPT, Gemini and Perplexity. Nobody can guarantee a ranking or a recommendation, but these foundations are what every recommendation is built on."
            />
            <CheckList
              items={[
                "Accurate schema markup for your clinic, services and prices",
                "Answer-first treatment pages and FAQs written in plain UK English",
                "Google Search Console and Bing Webmaster Tools set up and indexed",
              ]}
            />
            <Link
              href={routes.seoAiSearch}
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Local SEO & AI search visibility
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Written with UK advertising rules in mind"
              description="Prescription-only medicines can't be advertised to the public under ASA and CAP rules, and that includes your website and social media. We build treatment pages around concerns and consultations, use consented before-and-after photos, and explain the rules before launch."
            />
            <Link
              href={`${routes.blog}/botox-advertising-rules-clinic-website`}
              className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              Read our guide to the ASA rules for clinic websites
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Section>

      <Section id="process" tone="tint">
        <SectionHeading eyebrow="Process" title="How it works" description={`From first call to launch in ${pricing.timeline}.`} />
        <Steps steps={steps} />
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <FaqList faqs={allFaqs.slice(0, 6)} />
        <Link href={routes.faq} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          See all questions
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href={routes.customSoftware}
          className="group flex flex-col gap-3 rounded-2xl border border-border bg-secondary/40 p-5 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex items-center gap-3 text-sm text-foreground">
            <Code2 aria-hidden className="h-5 w-5 text-primary" />
            <span>
              <strong className="font-semibold">Also: AI chatbots & custom software.</strong> CRMs, dashboards, SaaS
              products and the AI assistant running on this site.
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
            <Globe aria-hidden className="h-4 w-4" />
            AI & software work
          </span>
        </Link>
      </div>

      <CtaBand title="Tell us about your clinic" />
    </PageShell>
  );
}
