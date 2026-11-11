import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { CtaBand, DashboardCallout, HeroActions, Section, SectionHeading } from "@/components/marketing/blocks";
import { WorkShowcase } from "@/components/marketing/blocks/showcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { publishedCaseStudies } from "@/data/work";
import { siteOrigin, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.work;
const DESCRIPTION =
  "Live UK clinic websites we built: Serra Aesthetics in London, Penelope J Aesthetics and Belgrave Cosmetics in Bristol — what each needed and what we built.";

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Examples | Zyverra Labs Portfolio",
  description: DESCRIPTION,
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Work", path: PATH }]}>
      <JsonLd
        data={webPageSchema(origin, "CollectionPage", {
          path: PATH,
          name: "Clinic websites we've built",
          description: DESCRIPTION,
        })}
      />

      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Clinic websites <Accent>we&apos;ve built</Accent>
          </>
        }
        description="Live websites for real UK clinics in London and Bristol. Each case study covers what the clinic needed and what we built."
        actions={<HeroActions secondary={{ href: routes.pricing, label: "Pricing" }} />}
      />

      <Section id="clinics">
        <WorkShowcase items={publishedCaseStudies} />
      </Section>

      <DashboardCallout />

      <Section id="software" tone="muted">
        <SectionHeading
          eyebrow="Also"
          title="AI and software work"
          description="CRMs, AI products, e-commerce and web platforms we've built for other businesses."
        />
        <Link href={`${routes.customSoftware}#work`} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          See our AI & software work
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <CtaBand />
    </PageShell>
  );
}
