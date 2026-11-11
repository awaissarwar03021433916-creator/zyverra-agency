import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { CardGrid, CtaBand, HeroActions, Lead, RelatedLinks, Section, SectionHeading } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { clinicTypes } from "@/data/clinicTypes";
import { siteOrigin, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Websites and marketing for every type of UK clinic: aesthetics clinics, skin clinics, med spas, aesthetic nurses, salons and lash studios. Find yours.";

export const metadata = pageMetadata({
  title: "Websites & Marketing by Clinic Type | Zyverra Labs",
  description: DESCRIPTION,
  path: routes.clinicTypes,
});

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Clinic Types", path: routes.clinicTypes }]}>
      <JsonLd
        data={webPageSchema(siteOrigin(), "CollectionPage", {
          path: routes.clinicTypes,
          name: "Websites and marketing by clinic type",
          description: DESCRIPTION,
        })}
      />
      <PageHero
        eyebrow="Clinic types"
        title={
          <>
            Websites and marketing <Accent>by clinic type</Accent>
          </>
        }
        description="Every kind of clinic sells differently. Pick yours to see what your website and marketing need."
        actions={<HeroActions secondary={{ href: routes.freeAudit, label: "Free website audit", short: "Free audit" }} />}
      />
      <Lead>
        Websites and marketing for clinics work best when they&apos;re built around how your clients choose and book.
        An aesthetics clinic with twelve treatment menus needs a different website from a solo aesthetic nurse or a
        lash studio, so we plan each one around the business it serves.
      </Lead>
      <Section id="types">
        <SectionHeading eyebrow="Who we work with" title="Choose your clinic type" />
        <CardGrid
          columns={3}
          items={clinicTypes.map((t) => ({
            emoji: t.emoji,
            title: t.name,
            description: t.short,
            href: t.content.path,
            linkLabel: "See what you need",
          }))}
        />
      </Section>
      <RelatedLinks
        links={[
          { href: routes.aestheticClinicWebsites, label: "Aesthetic clinic website design" },
          { href: routes.treatmentPages, label: "Treatment pages that rank" },
        ]}
      />
      <CtaBand title="Not sure which fits? Tell us about your clinic" />
    </PageShell>
  );
}
