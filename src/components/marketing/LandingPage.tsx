import type { ReactNode } from "react";

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
  RelatedLinks,
  Section,
  SectionHeading,
  type CardItem,
  type RelatedLink,
} from "@/components/marketing/blocks";
import type { Crumb } from "@/components/marketing/blocks/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import type { Faq } from "@/data/faqs";
import { serviceSchema, siteOrigin } from "@/lib/schema";

export type LandingSection = {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  bullets?: string[];
  cards?: CardItem[];
  cardColumns?: 2 | 3 | 4;
  tone?: "plain" | "tint" | "muted";
};

export type LandingContent = {
  path: string;
  breadcrumbs: Crumb[];
  eyebrow: string;
  /** H1 split so the second part gets the gradient accent. */
  h1: [string, string];
  heroLine: string;
  chips?: string[];
  /** Answer-first opening: the first two sentences are quotable on their own. */
  lead: string;
  schema: { name: string; serviceType: string; description: string; offers?: boolean };
  sections: LandingSection[];
  faqs: Faq[];
  related: RelatedLink[];
  ctaTitle: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string; short?: string };
  showDashboardCallout?: boolean;
};

export function LandingPage({ content, children }: { content: LandingContent; children?: ReactNode }) {
  const c = content;
  return (
    <PageShell breadcrumbs={c.breadcrumbs}>
      <JsonLd
        data={serviceSchema(siteOrigin(), {
          path: c.path,
          name: c.schema.name,
          serviceType: c.schema.serviceType,
          description: c.schema.description,
          offers: c.schema.offers,
        })}
      />

      <PageHero
        eyebrow={c.eyebrow}
        title={
          <>
            {c.h1[0]} <Accent>{c.h1[1]}</Accent>
          </>
        }
        description={c.heroLine}
        actions={
          <HeroActions
            primary={c.primaryCta ?? { href: routes.contact, label: "Get a quote" }}
            secondary={c.secondaryCta ?? { href: routes.freeAudit, label: "Free website audit", short: "Free audit" }}
          />
        }
        chips={c.chips}
      />

      <Lead>{c.lead}</Lead>

      {c.sections.map((s) => (
        <Section key={s.id} id={s.id} tone={s.tone}>
          <SectionHeading eyebrow={s.eyebrow} title={s.title} description={s.intro} />
          {s.paragraphs?.map((p) => (
            <p key={p.slice(0, 32)} className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
          {s.bullets && <CheckList items={s.bullets} />}
          {s.cards && <CardGrid items={s.cards} columns={s.cardColumns ?? 3} />}
        </Section>
      ))}

      {children}

      {c.showDashboardCallout !== false && <DashboardCallout />}

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Questions we're asked" />
        <FaqList faqs={c.faqs} />
      </Section>

      <RelatedLinks links={c.related} />

      <CtaBand title={c.ctaTitle} />
    </PageShell>
  );
}
