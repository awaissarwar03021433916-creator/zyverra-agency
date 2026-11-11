import Link from "next/link";
import { BarChart3, Crosshair, LayoutTemplate, Lightbulb, Palette, ShieldCheck } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
  CardGrid,
  CheckList,
  CtaBand,
  DashboardCallout,
  DevConfirm,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
} from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.metaAds;

export const metadata = pageMetadata({
  title: "Meta Ads for Aesthetic Clinics UK | Zyverra Labs",
  description:
    "ASA-aware Facebook and Instagram ads for UK aesthetics clinics and salons — consultation-led campaigns, landing pages and honest monthly reporting.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Meta Ads for Aesthetic Clinics", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
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
            Meta ads for <Accent>aesthetics clinics and beauty salons</Accent>
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
            { icon: Lightbulb, title: "Strategy", description: "Which treatments to promote, to whom, and what a good enquiry looks like." },
            { icon: Palette, title: "Creative", description: "Ad images, video and copy that show your clinic honestly." },
            { icon: Crosshair, title: "Audiences", description: "Local, adult audiences built around your treatment area." },
            { icon: LayoutTemplate, title: "Landing page", description: "A fast page on your own website for each campaign." },
            { icon: ShieldCheck, title: "Tracking with consent", description: "The Meta Pixel only loads after a visitor accepts marketing cookies." },
            { icon: BarChart3, title: "Reporting", description: "A plain-English monthly report on spend, enquiries and what's next." },
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
          title="Pricing"
          description="Meta ads management is quoted separately from your website, and ad spend is paid directly to Meta."
        />
        {/* TODO [CONFIRM]: Meta ads management pricing. Hidden until confirmed. */}
        <DevConfirm>add Meta ads management pricing.</DevConfirm>
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">Website pricing</Link>
          {" · "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">Our work</Link>
        </p>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Meta ads FAQs" />
        <FaqList faqs={faqsById(["meta-ads", "pom-wording", "gdpr"])} />
      </Section>

      <CtaBand title="Plan your next campaign" />
    </PageShell>
  );
}
