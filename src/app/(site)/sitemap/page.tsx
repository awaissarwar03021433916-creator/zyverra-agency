import Link from "next/link";

import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import { Section } from "@/components/marketing/blocks";
import { footerColumns, routes, services } from "@/config/site";
import { clinicTypes } from "@/data/clinicTypes";
import { getAllPosts, listingTitle } from "@/data/blog";
import { publishedCaseStudies } from "@/data/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Site Map | Zyverra Labs",
  description:
    "A full list of pages on zyverralabs.com: clinic website services, marketing, clinic types, pricing, our work, guides and legal pages. Find any page fast.",
  path: routes.htmlSitemap,
});

function Group({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section aria-labelledby={`sm-${title}`}>
      <h2 id={`sm-${title}`} className="font-heading text-xl font-bold text-foreground">
        {title}
      </h2>
      <ul className="mt-3 grid gap-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted-foreground hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Page() {
  const legal = footerColumns.find((c) => c.title === "Legal")?.links ?? [];
  return (
    <PageShell breadcrumbs={[{ name: "Site Map", path: routes.htmlSitemap }]}>
      <PageHero eyebrow="Site map" title="Site map" description="Every page on our website, in one place." />
      <Section>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <Group
            title="Main"
            links={[
              { href: routes.home, label: "Home" },
              { href: routes.pricing, label: "Pricing" },
              { href: routes.work, label: "Our work" },
              { href: routes.about, label: "About" },
              { href: routes.contact, label: "Contact" },
              { href: routes.faq, label: "FAQ" },
              { href: routes.freeAudit, label: "Free clinic website audit" },
            ]}
          />
          <Group
            title="Services"
            links={[
              ...services.map((s) => ({ href: s.href, label: s.name })),
              { href: routes.nurseWebsites, label: "Websites for aesthetic nurses" },
              { href: routes.redesign, label: "Clinic website redesign" },
              { href: routes.googleBusinessProfile, label: "Google Business Profile" },
              { href: routes.treatmentPages, label: "Treatment pages" },
            ]}
          />
          <Group
            title="Locations & clinic types"
            links={[
              { href: routes.london, label: "Clinic websites in London" },
              { href: routes.bristol, label: "Clinic websites in Bristol" },
              { href: routes.clinicTypes, label: "All clinic types" },
              ...clinicTypes.map((t) => ({ href: t.content.path, label: t.name })),
            ]}
          />
          <Group
            title="Case studies"
            links={publishedCaseStudies.map((c) => ({ href: `${routes.work}/${c.slug}`, label: `${c.name}, ${c.location}` }))}
          />
          <Group
            title="Guides"
            links={[{ href: routes.blog, label: "All guides" }, ...getAllPosts().map((p) => ({ href: `${routes.blog}/${p.slug}`, label: listingTitle(p) }))]}
          />
          <Group title="Legal" links={legal} />
        </div>
      </Section>
    </PageShell>
  );
}
