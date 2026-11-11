import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import { CtaBand, FaqList, HeroActions, Section } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { allFaqs, faqGroups, schemaFaqs } from "@/data/faqs";
import { faqPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.faq;

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website & Marketing FAQs | Zyverra Labs",
  description:
    "Straight answers on clinic website costs, admin dashboards, timelines, SEO, ChatGPT visibility, Meta ads and ASA rules for UK aesthetics clinics.",
  path: PATH,
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "FAQ", path: PATH }]}>
      {/* FAQPage text comes from the same data as the visible answers below.
          Answers still awaiting owner confirmation are shown but not marked up. */}
      <JsonLd data={faqPageSchema(schemaFaqs(allFaqs))} />

      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Straight answers about clinic websites, the admin dashboard, SEO and AI search, marketing and UK advertising rules."
        actions={<HeroActions secondary={{ href: routes.pricing, label: "Pricing" }} />}
      >
        <nav aria-label="FAQ topics" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2">
            {faqGroups.map((g) => (
              <li key={g.title}>
                <a
                  href={`#${slug(g.title)}`}
                  className="inline-flex rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <Section narrow>
        <div className="grid gap-14">
          {faqGroups.map((group) => (
            <section key={group.title} id={slug(group.title)} aria-labelledby={`${slug(group.title)}-h`}>
              <h2 id={`${slug(group.title)}-h`} className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {group.title}
              </h2>
              <FaqList faqs={group.items} />
            </section>
          ))}
        </div>
      </Section>

      <CtaBand title="Still have a question?" />
    </PageShell>
  );
}
