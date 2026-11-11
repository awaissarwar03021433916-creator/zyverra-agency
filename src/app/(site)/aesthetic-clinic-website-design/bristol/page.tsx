import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
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
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing } from "@/config/business";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { getCaseStudy, publishedCaseStudies } from "@/data/work";
import { WorkShowcase } from "@/components/marketing/blocks/showcase";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.bristol;

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Design Bristol | Zyverra Labs",
  description:
    "Websites with a self-edit admin dashboard for Bristol aesthetics clinics and practitioners. From £300, live in 7–10 working days. See our Bristol work.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();
  const belgrave = getCaseStudy("belgrave-cosmetics");

  return (
    <PageShell
      breadcrumbs={[
        { name: "Aesthetic Clinic Website Design", path: routes.aestheticClinicWebsites },
        { name: "Bristol", path: PATH },
      ]}
    >
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Aesthetic clinic website design in Bristol",
          serviceType: "Website design for aesthetics clinics",
          description: "Clinic websites with a self-edit admin dashboard for aesthetics clinics and practitioners in Bristol.",
          offers: true,
          areaServed: { "@type": "City", name: "Bristol" },
        })}
      />

      <PageHero
        eyebrow="Bristol"
        title={
          <>
            Aesthetic clinic website design for <Accent>Bristol clinics</Accent>
          </>
        }
        description="We already build for Bristol clinics, including Belgrave Cosmetics in Whitchurch and Penelope J Aesthetics in Hanham."
        actions={<HeroActions secondary={{ href: `${routes.work}/belgrave-cosmetics`, label: "Read the Belgrave case study" }} />}
        chips={[`From £${pricing.optionB.price}`, `Live in ${pricing.timeline}`, "Self-edit admin dashboard"]}
      />

      <Lead>
        Bristol clients compare clinics on their phones, often by neighbourhood, before they ever call. We
        build Bristol clinic websites that load fast, show treatments and prices up front, and send clients
        straight to booking, with an admin dashboard (Option A) so you can keep them current yourself.
      </Lead>

      {belgrave && (
        <Section id="belgrave">
          <SectionHeading
            eyebrow="Case study"
            title="Belgrave Cosmetics, Whitchurch (BS14)"
            description={belgrave.goal}
          />
          <CheckList items={belgrave.built.slice(0, 4)} />
          <Link
            href={`${routes.work}/${belgrave.slug}`}
            className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Read the full Belgrave Cosmetics case study
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </Section>
      )}

      <Section id="bristol-work" tone="muted">
        <SectionHeading eyebrow="Bristol work" title="Bristol clinic websites we've built" />
        <WorkShowcase items={publishedCaseStudies.filter((c) => c.location === "Bristol")} />
      </Section>

      <Section id="local-search" tone="tint">
        <SectionHeading
          eyebrow="Local search"
          title="Getting found by clients in Bristol"
          description="Local search for a Bristol clinic is about more than the word “Bristol”."
        />
        <CheckList
          items={[
            "A complete Google Business Profile, with the right categories, services, photos and opening hours",
            "Pages and wording that reflect the areas clients actually search for, such as Clifton or Whitchurch, where they're genuinely relevant to your clinic",
            "Directions, parking and transport details on your Visit or Contact page",
            "The same clinic name, address and phone number on your website, Google, Bing and booking platforms",
          ]}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          See{" "}
          <Link href={routes.seoAiSearch} className="font-semibold text-primary hover:underline">
            local SEO & AI search visibility
          </Link>
          .
        </p>
      </Section>

      <DashboardCallout />

      <Section id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing for Bristol clinics"
          description={`The same prices wherever you are: Option A £${pricing.optionA.price} with the admin dashboard, Option B £${pricing.optionB.price} without. Pay 50/50 or 30/40/30.`}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">Compare options</Link>
          {" · "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">All work</Link>
          {" · "}
          <Link href={routes.adminDashboard} className="font-semibold text-primary hover:underline">Admin dashboard</Link>
        </p>
      </Section>

      <Section id="faq" narrow tone="muted">
        <SectionHeading eyebrow="FAQ" title="Questions from Bristol clinics" />
        <FaqList faqs={faqsById(["location", "timeline", "cost"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/clinic-types/aesthetics-clinics", label: "Aesthetics clinic marketing" },
        ]}
      />

      <CtaBand title="Tell us about your Bristol clinic" />
    </PageShell>
  );
}
