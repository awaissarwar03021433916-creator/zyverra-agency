import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import { CheckList, CtaBand, DashboardCallout, DevConfirm, HeroActions, Section, SectionHeading } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { getCaseStudy, publishedCaseStudies } from "@/data/work";
import { articleSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

// Case studies are written from verified facts; date of the content check.
const VERIFIED_ON = "2026-11-11";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} Website: ${c.location} | Zyverra Labs`.slice(0, 60),
    description: c.summary.slice(0, 155),
    path: `${routes.work}/${c.slug}`,
    type: "article",
    publishedTime: VERIFIED_ON,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const origin = siteOrigin();
  const path = `${routes.work}/${c.slug}`;

  return (
    <PageShell
      breadcrumbs={[
        { name: "Work", path: routes.work },
        { name: c.name, path },
      ]}
    >
      <JsonLd
        data={articleSchema(origin, {
          path,
          headline: `${c.name} website: ${c.location}`,
          description: c.summary,
          datePublished: VERIFIED_ON,
        })}
      />

      <PageHero
        eyebrow="Case study"
        title={`${c.name} website: ${c.location}`}
        description={c.summary}
        actions={
          <>
            <a
              href={c.liveUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
            >
              Visit the live site
              <ArrowUpRight aria-hidden className="h-4 w-4" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <HeroActions />
          </>
        }
        chips={[c.locationDetail]}
      />

      {c.screenshot ? (
        <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
          <Image
            src={c.screenshot.src}
            alt={c.screenshot.alt}
            width={c.screenshot.width}
            height={c.screenshot.height}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full rounded-2xl border border-border shadow-lg"
          />
        </div>
      ) : (
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* TODO [CONFIRM]: add a real screenshot of the live site to /public/work/ and set `screenshot` in src/data/work.ts. */}
          <DevConfirm>add a real screenshot of {c.name} to /public/work/ and reference it in src/data/work.ts.</DevConfirm>
        </div>
      )}

      <Section id="goal" narrow>
        <SectionHeading eyebrow="The client" title="The client and their goal" />
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{c.goal}</p>
      </Section>

      <Section id="built" tone="tint" narrow>
        <SectionHeading eyebrow="What we built" title="What we built" />
        <CheckList items={c.built} />
      </Section>

      {c.ownerCanUpdate.length > 0 ? (
        <Section id="owner-updates" narrow>
          <SectionHeading eyebrow="Admin dashboard" title="What the owner can update themselves" />
          <CheckList items={c.ownerCanUpdate} />
        </Section>
      ) : (
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* TODO [CONFIRM]: what this client edits themselves; fill `ownerCanUpdate` in src/data/work.ts. */}
          <DevConfirm>list what {c.name} can update themselves (ownerCanUpdate in src/data/work.ts).</DevConfirm>
        </div>
      )}

      <Section id="pages" narrow>
        <SectionHeading eyebrow="Pages & features" title="Pages and features" />
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {c.pages.map((p) => (
            <li key={p} className="rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-sm text-foreground">
              {p}
            </li>
          ))}
        </ul>
      </Section>

      {c.testimonial && (
        <Section narrow>
          <figure className="rounded-2xl border border-border bg-card p-8 shadow-xs">
            <blockquote className="text-lg leading-relaxed text-foreground">“{c.testimonial.quote}”</blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">{c.testimonial.author}</figcaption>
          </figure>
        </Section>
      )}

      <DashboardCallout />

      <Section narrow>
        <p className="text-sm text-muted-foreground">
          <Link href={routes.work} className="font-semibold text-primary hover:underline">All clinic websites</Link>
          {" · "}
          <Link href={routes.aestheticClinicWebsites} className="font-semibold text-primary hover:underline">Aesthetic clinic website design</Link>
          {" · "}
          <Link href={routes.pricing} className="group inline-flex items-center gap-1 font-semibold text-primary hover:underline">
            Pricing <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </p>
      </Section>

      <CtaBand title="Want a website like this for your clinic?" />
    </PageShell>
  );
}
