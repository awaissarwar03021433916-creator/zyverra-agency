import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
  CardGrid,
  CompareTable,
  CtaBand,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
  RelatedLinks,
} from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing } from "@/config/business";
import { dashboardLines, routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { clinicCaseStudies } from "@/data/work";
import { AdminGallery } from "@/components/marketing/blocks/showcase";
import Image from "next/image";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.adminDashboard;

export const metadata = pageMetadata({
  title: "Clinic Website You Can Update Yourself | Zyverra Labs",
  description:
    "A clinic website you can update yourself: edit treatments, prices, photos and blogs in our admin dashboard. Included in Option A, £400. See it in action.",
  path: PATH,
});

// Confirmed by the owner: clients can change everything on their site.
const CAN_CHANGE: { item: string; what: string }[] = [
  { item: "Service categories", what: "Add a new category, rename, reorder or remove one" },
  { item: "Treatments & services", what: "Add a new service to any category, edit it or remove it" },
  { item: "Prices", what: "Change any price, any time" },
  { item: "Pages & sections", what: "Edit every section, add new treatment pages, hide or remove them" },
  { item: "Images and galleries", what: "Upload, replace or remove images" },
  { item: "Before-and-after photos", what: "Add new results and choose which show on the home page" },
  { item: "Offers and promotions", what: "Publish and remove offers" },
  { item: "Blog posts", what: "Write, edit, publish and delete posts" },
  { item: "Opening hours & contact details", what: "Update hours, clinics, phone and email" },
  { item: "Reviews & FAQs", what: "Add, edit, reorder or hide them" },
];

const SHOTS = clinicCaseStudies.flatMap((c) => c.adminShots ?? []);

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Clinic Website Admin Dashboard", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Clinic website admin dashboard",
          serviceType: "Website content management dashboard for clinics",
          description:
            "An admin dashboard included with Option A clinic websites, for updating treatments, prices, images, before-and-after photos, offers and blog posts without a developer.",
        })}
      />

      <PageHero
        eyebrow={dashboardLines.tagline}
        title={
          <>
            A clinic website <Accent>you can update yourself</Accent>
          </>
        }
        description={dashboardLines.core}
        actions={<HeroActions primary={{ href: routes.contact, label: "See the dashboard on a free call" }} secondary={{ href: routes.pricing, label: "Pricing" }} />}
        chips={["Included with Option A", "Works on phone and laptop", "Changes go live straight away"]}
        aside={
          SHOTS[1] && (
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/25 via-sky-300/20 to-fuchsia-300/25 blur-2xl" />
              <div className="animate-float overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
                <Image
                  src={SHOTS[1].src}
                  alt={SHOTS[1].alt}
                  width={SHOTS[1].width}
                  height={SHOTS[1].height}
                  sizes="(max-width: 1024px) 100vw, 540px"
                  className="block h-auto w-full"
                />
              </div>
            </div>
          )
        }
      />

      <Lead>
        Every Option A website comes with a simple admin dashboard. Log in from your phone or laptop to add
        a new treatment, change a price, upload before-and-after photos, publish an offer or write a blog
        post. Changes go live straight away, and you don&apos;t need to call or pay a developer. You only need
        us for major changes, such as a new feature or a redesign.
      </Lead>

      <Section id="what-you-can-change">
        <SectionHeading eyebrow="Do it yourself" title="What you can change yourself" />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <caption className="sr-only">Content you can change yourself with the admin dashboard</caption>
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">Content</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">What you can do</th>
              </tr>
            </thead>
            <tbody>
              {CAN_CHANGE.map((row) => (
                <tr key={row.item} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-medium text-foreground">{row.item}</th>
                  <td className="px-5 py-3.5 text-muted-foreground">{row.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="screenshots" tone="tint">
        <SectionHeading
          eyebrow="Real screenshots"
          title="Inside the dashboard"
          description="Real admin dashboards from clinic websites we've built for Belgrave Cosmetics and Penelope J Aesthetics."
        />
        <AdminGallery shots={SHOTS} />
      </Section>

      <Section id="developer" tone="muted">
        <SectionHeading
          eyebrow="When you need us"
          title="What still needs a developer"
          description={`${dashboardLines.proof} Major changes, such as new features, new page layouts, integrations and redesigns, are handled by us at ${pricing.updateFee} per update, depending on the change. We always confirm the price before we start.`}
        />
      </Section>

      <Section id="why">
        <SectionHeading eyebrow="Why it matters" title="Why it matters for clinics" />
        <CardGrid
          columns={3}
          items={[
            { emoji: "pound", title: "Prices change", description: "Update a price the day it changes, not when a developer is free." },
            { emoji: "sparkles", title: "New treatments launch", description: "Add a new treatment page as soon as you start offering it." },
            { emoji: "gem", title: "Seasonal offers", description: "Publish and remove offers on your own timetable." },
            { emoji: "chart-up", title: "Fresh content helps SEO", description: "An up-to-date site is easier for Google and AI assistants to trust." },
            { emoji: "money-bag", title: "No extra invoices", description: "Small edits don't come with a bill or a wait." },
            { emoji: "memo", title: "Your words, your way", description: "Write blog posts and treatment updates in your own voice." },
          ]}
        />
      </Section>

      <Section id="compliance" tone="tint">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Built with compliance in mind"
              description="Before-and-after photos must be genuine, consented and representative. At handover we show you how to add new photos and treatment content in a way that stays within UK advertising rules."
            />
            {/* TODO [CONFIRM]: if an in-dashboard consent reminder for before-and-after uploads is built, say so here. */}
          </div>
          <div>
            <SectionHeading
              eyebrow="Handover"
              title="Dashboard training at handover"
              description={`When your site launches, we walk you through the dashboard live on ${pricing.trainingFormat}, so you know how to make every everyday change yourself.`}
            />
          </div>
        </div>
      </Section>

      <Section id="compare">
        <SectionHeading
          eyebrow="Compare"
          title="Option A vs Option B"
          description={dashboardLines.comparison}
        />
        <CompareTable
          caption="Option A compared with Option B"
          rows={[
            { label: "Price", a: `£${pricing.optionA.price}`, b: `£${pricing.optionB.price}` },
            { label: "Admin dashboard", a: true, b: false },
            { label: "Edit treatments, prices and before-and-afters yourself", a: true, b: false },
            { label: "Small changes after launch", a: "Do it yourself", b: `By request, ${pricing.updateFee} per update` },
            { label: "Major changes (new features, layouts)", a: `${pricing.updateFee} per update`, b: `${pricing.updateFee} per update` },
            { label: "Timeline", a: pricing.timeline, b: pricing.timeline },
          ]}
        />
        <Link href={routes.pricing} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Full pricing and payment plans
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
        <span className="mx-3 text-muted-foreground" aria-hidden>·</span>
        <Link href={routes.work} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          See clinic websites we&apos;ve built
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Admin dashboard FAQs" />
        <FaqList faqs={faqsById(["best-platform", "fed-up-developer", "dashboard-edits", "developer", "options", "before-after"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/clinic-types/aesthetic-nurses", label: "Aesthetic nurse marketing" },
        ]}
      />

      <CtaBand title="See the dashboard on a free call" primaryLabel="Book a free call" />
    </PageShell>
  );
}
