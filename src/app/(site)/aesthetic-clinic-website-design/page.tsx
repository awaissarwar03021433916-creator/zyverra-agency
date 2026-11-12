import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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
  KeyFacts,
} from "@/components/marketing/blocks";
import { WorkShowcase } from "@/components/marketing/blocks/showcase";
import { ColorIcon } from "@/components/marketing/ColorIcon";
import { clinicTypes } from "@/data/clinicTypes";
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing, keyFacts } from "@/config/business";
import { dashboardLines, routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { publishedCaseStudies } from "@/data/work";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.aestheticClinicWebsites;

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Design from £300 | Zyverra",
  description:
    "Aesthetic clinic website design for UK clinics, nurses and med spas. Edit treatments and prices yourself. From £300, live in 7–10 days. Get a quote.",
  path: PATH,
});

const UK_CITIES = ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Edinburgh", "Glasgow", "Cardiff", "Belfast"];

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Aesthetic Clinic Website Design", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Aesthetic clinic website design",
          serviceType: "Website design for aesthetics clinics",
          description:
            "Custom, mobile-first websites for UK aesthetics clinics, aesthetic nurses, skin clinics and med spas, with an optional admin dashboard.",
          offers: true,
        })}
      />

      <PageHero
        eyebrow="Aesthetic clinic websites"
        title={
          <>
            Aesthetic clinic website design for <Accent>UK clinics and practitioners</Accent>
          </>
        }
        description={dashboardLines.core}
        actions={<HeroActions primary={{ href: routes.contact, label: "Get your clinic website quote" }} secondary={{ href: routes.work, label: "See examples" }} />}
        chips={[`From £${pricing.optionB.price}`, `Live in ${pricing.timeline}`, "Mobile-first", "ASA-aware wording"]}
      />

      <Lead>
        We design and build fast, mobile-first websites for UK aesthetics clinics, aesthetic nurses, skin
        clinics and med spas. Each site has treatment pages, clear prices, a before-and-after gallery,
        booking or enquiry buttons, and, with Option A, an admin dashboard so you can keep everything up to
        date yourself. From £400, live in {pricing.timeline}.
      </Lead>

      <KeyFacts facts={keyFacts.map((f) => ({ label: f.label, value: f.value }))} />

      <Section id="diy-template-custom" tone="muted">
        <SectionHeading
          eyebrow="Compare"
          title="DIY, template or custom: which clinic website is right for you?"
          description="An honest comparison of the three main routes to a clinic website."
        />
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <caption className="sr-only">DIY builder vs template vs custom clinic website</caption>
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th scope="col" className="px-5 py-4 font-semibold text-foreground"></th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">DIY builder</th>
                <th scope="col" className="px-5 py-4 font-semibold text-foreground">Template site</th>
                <th scope="col" className="px-5 py-4 font-semibold text-primary">Custom (Zyverra)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Who builds it", "You", "You or a freelancer", "Us, in 7–10 working days"],
                ["Treatment pages with prices", "Possible, often inconsistent", "Limited by the template", "Built around your treatments"],
                ["Speed on mobile", "Varies with add-ons", "Varies", "Built for speed"],
                ["Who edits it", "You", "You or the freelancer", "You, via the admin dashboard (Option A)"],
                ["UK advertising rules", "Your responsibility", "Your responsibility", "Wording reviewed against ASA rules"],
                ["Ongoing cost", "Monthly subscription", "Hosting + paid changes", "Hosting + optional £50–£100 updates"],
              ].map(([label, ...cells]) => (
                <tr key={label} className="border-b border-border last:border-0">
                  <th scope="row" className="px-5 py-3.5 font-medium text-foreground">{label}</th>
                  {cells.map((c, i) => (
                    <td key={i} className="px-5 py-3.5 text-muted-foreground">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/blog/wix-squarespace-or-custom-clinic-website" className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Wix, Squarespace or custom? Read the full comparison
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="included">
        <SectionHeading
          eyebrow="What's included"
          title="What's included in every clinic website"
          description="Everything a client needs to choose you, trust you and book, on one fast site."
        />
        <div className="mt-8 grid gap-x-10 md:grid-cols-2">
          <CheckList
            items={[
              "Treatment pages for each treatment or concern",
              "A clear price list",
              "Practitioner bio and qualifications",
              "Before-and-after gallery",
              "Booking link or enquiry form",
            ]}
          />
          <CheckList
            items={[
              "Google Maps and directions",
              "A reviews section (real reviews only)",
              "Privacy, cookie and terms pages",
              "SEO setup and schema markup",
              "WhatsApp and booking buttons on every page",
            ]}
          />
        </div>
      </Section>

      <DashboardCallout />

      <Section id="dashboard">
        <SectionHeading
          eyebrow="Admin dashboard"
          title="Update it yourself with the admin dashboard"
          description={`${dashboardLines.comparison} Add treatments, change prices, upload before-and-afters, publish offers and write blog posts, all from your phone or laptop.`}
        />
        <Link
          href={routes.adminDashboard}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          How the clinic admin dashboard works
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="clients-choose" tone="tint">
        <SectionHeading
          eyebrow="Designed for your clients"
          title="Designed for how clients choose a practitioner"
          description="In aesthetics, trust is the purchase. Every page is built to answer the questions clients ask before they book."
        />
        <CardGrid
          columns={4}
          items={[
            {
              emoji: "shield",
              title: "Trust signals",
              description: "Qualifications, insurance and genuine reviews where clients look for them.",
            },
            {
              emoji: "trophy",
              title: "Qualifications first",
              description: "A practitioner page that explains who treats clients and how they trained.",
            },
            {
              emoji: "calendar",
              title: "Consultation-first journeys",
              description: "Treatment pages lead to a consultation, not a hard sell.",
            },
            {
              emoji: "mobile",
              title: "Mobile speed",
              description: "Most clients find you on their phone, so pages are built to load fast on mobile.",
            },
          ]}
        />
      </Section>

      <Section id="compliance">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Compliance"
              title="Compliant by design"
              description="Your website counts as advertising, so it follows the same rules as your ads."
            />
            <CheckList
              items={[
                "No promotion of prescription-only medicines",
                "Consultation-led wording for injectable treatments",
                "Consented, genuine before-and-after photos",
                "A cookie banner where marketing cookies load only after consent",
              ]}
            />
            <Link
              href={`${routes.blog}/botox-advertising-rules-clinic-website`}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              The ASA rules for clinic websites, explained
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div>
            <SectionHeading
              eyebrow="Booking"
              title="Booking that fits your clinic"
              description={`We link or embed the booking system you already use, including ${pricing.bookingSystems.join(", ")} and others, so clients can go from a treatment page to booking in a couple of taps.`}
            />
          </div>
        </div>
      </Section>

      <Section id="who" tone="muted">
        <SectionHeading eyebrow="Who we build for" title="Who we build for" />
        <CardGrid
          columns={3}
          items={clinicTypes.map((t) => ({
            emoji: t.emoji,
            title: t.name,
            description: t.short,
            href: t.content.path,
            linkLabel: "Learn more",
          }))}
        />
      </Section>

      <Section id="uk">
        <SectionHeading eyebrow="Across the UK" title="We work with clinics across the UK" />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          We build aesthetic clinic websites for clinics in England, Scotland, Wales and Northern Ireland, including{" "}
          {UK_CITIES.slice(0, -1).join(", ")} and {UK_CITIES.at(-1)}. Everything is done remotely by video call, email
          and WhatsApp, and we&apos;re available {pricing.hours}.
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="UK nations we work with">
          {["England", "Scotland", "Wales", "Northern Ireland"].map((n) => (
            <li key={n} className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
              <ColorIcon name="pin" size={22} />
              {n}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {[
            { href: routes.london, label: "Aesthetic clinic website design in London" },
            { href: routes.bristol, label: "Aesthetic clinic website design in Bristol" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              <MapPin aria-hidden className="h-4 w-4" />
              {l.label}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>
      </Section>

      <Section id="examples" tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Examples" title="Clinic websites we've built" description="Live sites for clinics in London and Bristol." />
          <Link href={routes.work} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            All work
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <WorkShowcase items={publishedCaseStudies} />
      </Section>

      <Section id="pricing">
        <SectionHeading
          eyebrow="Pricing"
          title="Pricing"
          description={`Option A costs £${pricing.optionA.price} with the admin dashboard. Option B costs £${pricing.optionB.price} without it. Both go live in ${pricing.timeline}, and you can pay 50/50 or 30/40/30.`}
        />
        <Link href={routes.pricing} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Compare Option A and Option B
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Clinic website FAQs" />
        <FaqList faqs={faqsById(["who-to-use", "best-designer", "cost", "under-500", "best-platform", "timeline", "booking", "redesign"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
          { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
          { href: "/clinic-types/aesthetics-clinics", label: "Aesthetics clinic marketing" },
          { href: routes.nurseWebsites, label: "Website for aesthetic nurses" },
          { href: routes.redesign, label: "Clinic website redesign UK" },
        ]}
      />

      <CtaBand title="Get your clinic website quote" primaryLabel="Get your clinic website quote" />
    </PageShell>
  );
}
