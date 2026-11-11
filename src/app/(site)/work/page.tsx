import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { CtaBand, DashboardCallout, HeroActions, Section, SectionHeading } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { publishedCaseStudies } from "@/data/work";
import { siteOrigin, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.work;
const DESCRIPTION =
  "See live UK clinic websites we built, including Belgrave Cosmetics in Bristol — what each clinic needed, what we built and what the owner can edit.";

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
        description="Live websites for real UK clinics. Each case study covers what the clinic needed and what we built."
        actions={<HeroActions secondary={{ href: routes.pricing, label: "Pricing" }} />}
      />

      <Section id="clinics">
        <div className="grid gap-6 md:grid-cols-2">
          {publishedCaseStudies.map((c) => (
            <article key={c.slug} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-xs">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                <MapPin aria-hidden className="h-3.5 w-3.5" />
                {c.location}
              </div>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground">{c.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
              <div className="mt-auto flex flex-wrap gap-5 pt-6">
                <Link href={`${PATH}/${c.slug}`} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read the case study
                  <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={c.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
                >
                  Visit the live site
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </article>
          ))}
        </div>
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
