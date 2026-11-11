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

const PATH = routes.socialReels;

export const metadata = pageMetadata({
  title: "Social Media Management for Aesthetic Clinics | Zyverra",
  description:
    "Social media management for aesthetic clinics: Instagram reels, posts and calendars written within ASA rules. From £300/month. Start this month.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Social Media & Reels", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          monthlyOffers: marketingPackages.social,
          name: "Social media management and reels for aesthetics clinics",
          serviceType: "Social media management and short-form video",
          description:
            "Reels, posts and content calendars for UK aesthetics clinics and beauty salons, planned, scripted, edited and scheduled.",
        })}
      />

      <PageHero
        eyebrow="Social media & reels"
        title={
          <>
            Social media management <Accent>for aesthetic clinics</Accent>
          </>
        }
        description="Reels and posts that show your clinic, your results (with consent) and your expertise."
        actions={<HeroActions secondary={{ href: routes.work, label: "See our work" }} />}
        chips={["Instagram & TikTok", "Planned, scripted & edited", "UK English", "Checked against UK ad rules"]}
      />

      <Lead>
        We plan, script, edit and schedule reels and posts that show your clinic, your results (with
        consent) and your expertise. Posts are written in UK English and checked against UK advertising
        rules.
      </Lead>

      <Section id="create">
        <SectionHeading eyebrow="What we create" title="What we create" />
        <CardGrid
          columns={4}
          items={[
            { emoji: "movie-camera", title: "Reels", description: "Short videos about treatments, your clinic and your team." },
            { emoji: "memo", title: "Posts & captions", description: "Written in your voice, in UK English." },
            { emoji: "spiral-calendar", title: "Content calendars", description: "A planned month of content, agreed in advance." },
            { emoji: "camera", title: "Editing & scheduling", description: "Edited, captioned and scheduled for you." },
          ]}
        />
      </Section>

      <Section id="website-seo" tone="tint">
        <SectionHeading
          eyebrow="Website & SEO"
          title="How it connects to your website and SEO"
          description="Your best reels shouldn't disappear after 24 hours. We repurpose them into blog posts and FAQs on your website, which helps search engines and AI assistants understand your clinic."
        />
        <p className="mt-6 text-sm text-muted-foreground">
          See{" "}
          <Link href={routes.seoAiSearch} className="font-semibold text-primary hover:underline">
            local SEO & AI search visibility
          </Link>
          .
        </p>
      </Section>

      <Section id="compliance">
        <SectionHeading eyebrow="Compliance" title="Compliance" />
        <CheckList
          items={[
            "No promotion of prescription-only medicines, in captions, hashtags or on-screen text",
            "Before-and-after content only with written consent, never edited",
            "No fake urgency, and no content aimed at under-18s",
          ]}
        />
      </Section>

      <DashboardCallout />

      <Section id="packages" tone="muted">
        <SectionHeading
          eyebrow="Packages"
          title="Social media & reels packages"
          description="Pick a monthly package. Both include planning, writing, editing and scheduling, checked against UK advertising rules."
        />
        <PackageCards packages={marketingPackages.social} />
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">Website pricing</Link>
          {" · "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">Our work</Link>
        </p>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Social media FAQs" />
        <FaqList faqs={faqsById(["reels", "before-after", "meta-ads"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/clinic-types/aesthetic-nurses", label: "Aesthetic nurse marketing" },
        ]}
      />

      <CtaBand title="Talk to us about your social media" />
    </PageShell>
  );
}
