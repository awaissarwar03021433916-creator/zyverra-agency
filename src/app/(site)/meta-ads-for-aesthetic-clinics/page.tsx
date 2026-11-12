import Link from "next/link";

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
import { PackageCards } from "@/components/marketing/blocks/showcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { marketingPackages } from "@/config/business";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.metaAds;

export const metadata = pageMetadata({
  title: "Facebook & Instagram Ads for Aesthetic Clinics | Zyverra",
  description:
    "Facebook and Instagram ads for aesthetic clinics: consultation-led Meta campaigns within ASA rules. Management from £350/month. Plan your campaign.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Meta Ads for Aesthetic Clinics", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          monthlyOffers: marketingPackages.metaAds,
          name: "Meta ads for aesthetic clinics",
          serviceType: "Facebook and Instagram advertising management",
          description:
            "Consultation-led Facebook and Instagram advertising for UK aesthetics clinics and beauty salons, with landing pages and monthly reporting.",
        })}
      />

      <PageHero
        eyebrow="Meta ads"
        title={
          <>
            Facebook and Instagram ads <Accent>for aesthetic clinics</Accent>
          </>
        }
        description="Facebook and Instagram campaigns built around consultations, written with UK advertising rules in mind."
        actions={<HeroActions secondary={{ href: routes.pricing, label: "Pricing" }} />}
        chips={["Consultation-led", "ASA-aware", "Landing pages on your own site", "Monthly reporting"]}
      />

      <Lead>
        We plan, create and manage Facebook and Instagram ads that bring UK clinics consultation enquiries,
        not just likes. Campaigns are consultation-led, avoid promoting prescription-only medicines, and point
        to a fast landing page on your own site.
      </Lead>

      <Section id="included">
        <SectionHeading eyebrow="What's included" title="What's included" />
        <CardGrid
          columns={3}
          items={[
            { emoji: "light-bulb", title: "Strategy", description: "Which treatments to promote, to whom, and what a good enquiry looks like." },
            { emoji: "paintbrush", title: "Creative", description: "Ad images, video and copy that show your clinic honestly." },
            { emoji: "handshake", title: "Audiences", description: "Local, adult audiences built around your treatment area." },
            { emoji: "desktop", title: "Landing page", description: "A fast page on your own website for each campaign." },
            { emoji: "locked", title: "Tracking with consent", description: "The Meta Pixel only loads after a visitor accepts marketing cookies." },
            { emoji: "bar-chart", title: "Reporting", description: "A plain-English monthly report on spend, enquiries and what's next." },
          ]}
        />
      </Section>

      <Section id="rules" tone="tint">
        <SectionHeading
          eyebrow="Compliance"
          title="Staying within ASA and Meta rules"
          description="Ads for cosmetic treatments are watched closely. Every campaign is planned to stay within the rules."
        />
        <CheckList
          items={[
            "No promotion of prescription-only medicines",
            "No targeting of under-18s for cosmetic procedures",
            "Realistic, consented imagery, never edited results",
            "No fake urgency or pressure to book",
          ]}
        />
        <p className="mt-6 text-sm text-muted-foreground">
          Read{" "}
          <Link href={`${routes.blog}/botox-advertising-rules-clinic-website`} className="font-semibold text-primary hover:underline">
            our guide to the ASA rules for clinics
          </Link>
          .
        </p>
      </Section>

      <Section id="website">
        <SectionHeading
          eyebrow="Ads + website"
          title="Ads plus a website you control"
          description="Ads work best when the page they land on is up to date. With the Option A admin dashboard you can update an offer on your site the same day the campaign changes."
        />
      </Section>

      <DashboardCallout />

      <Section id="pricing" tone="muted">
        <SectionHeading
          eyebrow="Pricing"
          title="Meta ads management pricing"
          description="Simple monthly management fees. Ad spend is separate and paid directly to Meta, so you always see exactly what is spent."
        />
        <PackageCards packages={marketingPackages.metaAds} note="Monthly management fee in pounds sterling. Ad spend is paid directly to Meta and is not included." />
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">Website pricing</Link>
          {" · "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">Our work</Link>
        </p>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Meta ads FAQs" />
        <FaqList faqs={faqsById(["meta-ads", "best-fb-agency", "ad-spend", "compliant-website", "gdpr"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/clinic-types/aesthetics-clinics", label: "Aesthetics clinic marketing" },
        ]}
      />

      <CtaBand title="Plan your next campaign" />
    </PageShell>
  );
}
