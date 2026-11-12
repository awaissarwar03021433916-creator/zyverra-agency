import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
  CardGrid,
  CheckList,
  CtaBand,
  DashboardCallout,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
  RelatedLinks,
} from "@/components/marketing/blocks";
import { BrowserFrame } from "@/components/marketing/blocks/showcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing } from "@/config/business";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { getCaseStudy } from "@/data/work";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.london;

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Design London | Zyverra Labs",
  description:
    "Websites with a self-edit admin dashboard for London aesthetics clinics and practitioners. From £300, live in 7–10 working days. See our Walthamstow work.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();
  const serra = getCaseStudy("serra-aesthetics");

  return (
    <PageShell
      breadcrumbs={[
        { name: "Aesthetic Clinic Website Design", path: routes.aestheticClinicWebsites },
        { name: "London", path: PATH },
      ]}
    >
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Aesthetic clinic website design in London",
          serviceType: "Website design for aesthetics clinics",
          description: "Clinic websites with a self-edit admin dashboard for aesthetics clinics and practitioners in London.",
          offers: true,
          areaServed: { "@type": "City", name: "London" },
        })}
      />

      <PageHero
        eyebrow="London"
        title={
          <>
            Aesthetic clinic website design for <Accent>London clinics</Accent>
          </>
        }
        description="We already build for London clinics, including Serra Aesthetics in Walthamstow, E17."
        actions={<HeroActions secondary={{ href: `${routes.work}/serra-aesthetics`, label: "Read the Serra case study" }} />}
        chips={[`From £${pricing.optionB.price}`, `Live in ${pricing.timeline}`, "Self-edit admin dashboard"]}
      />

      <Lead>
        London is the most competitive aesthetics market in the UK. Clients compare several clinics on their
        phones before they book, often within their own borough. We build London clinic websites that earn trust
        quickly, show treatments and prices clearly and make booking easy, with an admin dashboard (Option A) so
        you can keep everything current yourself.
      </Lead>

      {serra && (
        <Section id="serra">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Case study" title="Serra Aesthetics, Walthamstow (E17)" description={serra.goal} />
              <CheckList items={serra.built.slice(0, 4)} />
              <Link
                href={`${routes.work}/${serra.slug}`}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Read the full Serra Aesthetics case study
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <BrowserFrame shot={serra.screenshot} url={serra.liveUrl} sizes="(max-width: 1024px) 100vw, 560px" />
          </div>
        </Section>
      )}

      <Section id="london-search" tone="tint">
        <SectionHeading
          eyebrow="Local search"
          title="Standing out in a crowded London market"
          description="In London, “near me” searches and borough names matter more than the word “London”."
        />
        <CardGrid
          columns={3}
          items={[
            {
              emoji: "pin",
              title: "Borough-level visibility",
              description: "Pages and Google Business Profile details that reflect the area you actually serve, such as Walthamstow or Hackney, where genuinely relevant.",
            },
            {
              emoji: "star",
              title: "Reviews that convert",
              description: "London clients read reviews before they book. We make genuine reviews easy to find and easy to leave.",
            },
            {
              emoji: "calendar",
              title: "Booking in two taps",
              description: "Busy London clients book on the go, so every treatment page leads straight to booking.",
            },
            {
              emoji: "shield",
              title: "Trust before the first visit",
              description: "Qualifications, insurance and a clear consultation process, up front.",
            },
            {
              emoji: "pound",
              title: "Clear prices",
              description: "Transparent prices, written to stay within UK advertising rules.",
            },
            {
              emoji: "search",
              title: "Found by AI assistants",
              description: "Answer-first pages and structured data so ChatGPT and Google can understand your clinic.",
              href: routes.seoAiSearch,
              linkLabel: "SEO & AI search",
            },
          ]}
        />
      </Section>

      <DashboardCallout />

      <Section id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing for London clinics"
          description={`The same prices wherever you are: Option A £${pricing.optionA.price} with the admin dashboard, Option B £${pricing.optionB.price} without. Pay 50/50 or 30/40/30.`}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">Compare options</Link>
          {" · "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">All work</Link>
          {" · "}
          <Link href={routes.adminDashboard} className="font-semibold text-primary hover:underline">Admin dashboard</Link>
          {" · "}
          <Link href={routes.bristol} className="font-semibold text-primary hover:underline">Bristol clinics</Link>
        </p>
      </Section>

      <Section id="faq" narrow tone="muted">
        <SectionHeading eyebrow="FAQ" title="Questions from London clinics" />
        <FaqList faqs={faqsById(["who-to-use", "location", "timeline", "cost"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/clinic-types/skin-clinics", label: "Skin clinic website design" },
        ]}
      />

      <CtaBand title="Tell us about your London clinic" />
    </PageShell>
  );
}
