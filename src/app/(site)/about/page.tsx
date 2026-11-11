import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { BRAND_ICONS } from "@/components/marketing/BrandIcons";
import {
  CardGrid,
  CtaBand,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
  Steps,
} from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { founder, founderSocialLinks } from "@/config/founder";
import { routes } from "@/config/site";
import { siteOrigin, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.about;
const DESCRIPTION =
  "Zyverra Labs is a founder-led web studio run by Muhammad Awais, building websites, dashboards and AI search visibility for UK aesthetics clinics.";

export const metadata = pageMetadata({
  title: "About Zyverra Labs | Founder-Led Clinic Web Studio",
  description: DESCRIPTION,
  path: PATH,
});

// The four delivery phases, carried over from the former "How we deliver" page
// and rewritten for clinic websites.
const PROCESS = [
  {
    title: "Discovery & scope",
    description: "A free call to understand your clinic, your treatments and what the website needs to do. You get a clear scope, price and timeline.",
  },
  {
    title: "Content & design",
    description: "You send your logo, treatment list, prices and photos. We design the pages around how your clients choose a practitioner.",
  },
  {
    title: "Build & review",
    description: "We build the site and you review it on your own devices. Changes are discussed directly with the person building it.",
  },
  {
    title: "Launch & support",
    description: "We launch, connect your booking link, hand over the admin dashboard (Option A) and stay available after launch.",
  },
];

const FOR_YOU = [
  "You want a professional clinic website without a bespoke-agency price",
  "You want to update treatments, prices and photos yourself",
  "You value direct access to the person building your site",
  "You want honest advice, including on what the advertising rules allow",
];

const NOT_FOR_YOU = [
  "You want the cheapest possible option, quality aside",
  "You want a large agency team in a UK office",
  "You want a supplier who says yes to everything without pushback",
  "You want wording that promotes prescription-only medicines",
];

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "About", path: PATH }]}>
      <JsonLd data={webPageSchema(origin, "AboutPage", { path: PATH, name: "About Zyverra Labs", description: DESCRIPTION })} />

      <PageHero
        eyebrow="About Zyverra Labs"
        title={
          <>
            A founder-led studio building <Accent>websites for UK clinics</Accent>
          </>
        }
        description="You work directly with the person who designs and builds your website. No account managers, no hand-offs."
        actions={<HeroActions secondary={{ href: routes.work, label: "See our work" }} />}
      />

      <Lead>
        Zyverra Labs is a founder-led web studio working with aesthetics clinics,
        aesthetic nurses, med spas and beauty salons across the UK. We build clinic websites with a built-in
        admin dashboard, plus local SEO, AI search visibility, Meta ads and social media.
      </Lead>

      <Section id="who-we-are">
        <SectionHeading
          eyebrow="Who we are"
          title="Built for UK clinics"
          description="We work remotely by video call, email and WhatsApp, available 6am to 8pm UK time. Prices are in pounds sterling, copy is written in UK English, and every site is built with UK advertising and data-protection rules in mind. Working remotely never means a hand-off to someone you haven't met: you deal with the person building your site."
        />
      </Section>

      <Section id="founder" tone="tint">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
          <div>
            {/* The source photo is a circular crop on a square canvas, so it is framed as a circle. */}
            <div className="relative mx-auto w-full max-w-[16rem]">
              <div className="rounded-full bg-gradient-to-tr from-primary via-sky-400 to-primary/30 p-[3px] shadow-lg">
                <div className="overflow-hidden rounded-full bg-card">
                  <Image
                    src={founder.image}
                    alt={founder.imageAlt}
                    width={560}
                    height={560}
                    sizes="16rem"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
              <div className="font-heading text-xl font-bold tracking-tight text-foreground">{founder.name}</div>
              <div className="mt-0.5 text-sm font-semibold text-primary">
                {founder.role}, {founder.company}
              </div>
              <ul className="mt-4 flex items-center justify-center gap-2.5" aria-label={`${founder.name}'s profiles`}>
                {founderSocialLinks.map((s) => {
                  const Icon = BRAND_ICONS[s.key];
                  return (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${founder.name} on ${s.label} (opens in a new tab)`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground shadow-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Icon className="h-[18px] w-[18px]" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="min-w-0">
            <SectionHeading eyebrow="Founder" title={`Meet ${founder.name}`} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I started Zyverra Labs because too much software is delivered by people who never spoke to the
                business paying for it. Requirements pass through account managers, intent gets lost in
                translation, and what ships is technically correct but commercially useless.
              </p>
              <p>
                So I built the studio the other way round. I take the first call, design the site, write the
                code that matters and stay on after launch. I keep the project list deliberately short, so every
                clinic gets direct attention rather than a status report.
              </p>
              <p>
                For clinics, that means a website built around how your clients actually choose a practitioner,
                written with UK advertising rules in mind, and an admin dashboard so you&apos;re never waiting on a
                developer to change a price. The same engineering runs the AI assistant on this site.
              </p>
              <p>
                Clinics I&apos;ve designed and built websites for include{" "}
                <Link href="/work/belgrave-cosmetics" className="font-semibold text-primary hover:underline">Belgrave Cosmetics</Link> and{" "}
                <Link href="/work/penelope-j-aesthetics" className="font-semibold text-primary hover:underline">Penelope J Aesthetics</Link> in Bristol, and{" "}
                <Link href="/work/serra-aesthetics" className="font-semibold text-primary hover:underline">Serra Aesthetics</Link> in London. Alongside
                clinic websites, I&apos;ve built CRMs, AI products and e-commerce platforms, which you can see on our{" "}
                <Link href="/custom-software-ai-chatbots#work" className="font-semibold text-primary hover:underline">AI &amp; software</Link> page.
              </p>
              <p>
                My approach is simple: understand how your clients choose and book, build the site around that, keep
                the wording honest and within UK advertising rules, and hand you the controls so the website keeps up
                with your clinic.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="process">
        <SectionHeading eyebrow="How we deliver" title="How we deliver" description="Four clear steps from first call to launch." />
        <Steps steps={PROCESS} />
      </Section>

      <Section id="why" tone="muted">
        <SectionHeading eyebrow="Why clinics choose us" title="Why clinics choose us" />
        <CardGrid
          columns={3}
          items={[
            { emoji: "handshake", title: "Founder-led, end to end", description: "The person who designs your site is the one who builds it." },
            { emoji: "mobile", title: "You stay in control", description: "With Option A you update treatments, prices and photos yourself." },
            { emoji: "shield", title: "Compliance-aware", description: "Consultation-led wording and consented before-and-afters, by default." },
            { emoji: "light-bulb", title: "Real transparency", description: "Clear prices in pounds, honest timelines and no ranking guarantees." },
            { emoji: "speech", title: "Direct communication", description: "Plain-English updates by WhatsApp, email and video call." },
            { emoji: "pin", title: "Built for UK clinics", description: "UK English, £ pricing and UK GDPR-ready cookie and privacy pages." },
          ]}
        />
      </Section>

      <Section id="fit">
        <SectionHeading eyebrow="Honest fit" title="Is Zyverra Labs right for your clinic?" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/25 bg-primary/[0.04] p-7">
            <h3 className="font-heading text-lg font-semibold text-foreground">A great fit if…</h3>
            <ul className="mt-4 grid gap-3">
              {FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <h3 className="font-heading text-lg font-semibold text-foreground">Probably not for you if…</h3>
            <ul className="mt-4 grid gap-3">
              {NOT_FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <X aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand title="Talk to the founder about your clinic" />
    </PageShell>
  );
}
