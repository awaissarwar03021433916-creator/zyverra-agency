import Link from "next/link";
import { ArrowRight, CalendarCheck, Image as ImageIcon, MapPin, ShieldCheck, Smartphone, Stethoscope } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
  CardGrid,
  CheckList,
  CtaBand,
  DashboardCallout,
  DevConfirm,
  FaqList,
  HeroActions,
  Lead,
  Section,
  SectionHeading,
} from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing } from "@/config/business";
import { dashboardLines, routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { publishedCaseStudies } from "@/data/work";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.aestheticClinicWebsites;

export const metadata = pageMetadata({
  title: "Aesthetic Clinic Website Design UK from £400 | Zyverra",
  description:
    "Custom aesthetic clinic websites for UK clinics, nurses and med spas. Edit treatments, prices and before/afters yourself. Live in 7–10 working days.",
  path: PATH,
});

const UK_CITIES = ["London", "Manchester", "Birmingham", "Leeds", "Bristol", "Glasgow", "Cardiff", "Belfast"];

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
              icon: ShieldCheck,
              title: "Trust signals",
              description: "Qualifications, insurance and genuine reviews where clients look for them.",
            },
            {
              icon: Stethoscope,
              title: "Qualifications first",
              description: "A practitioner page that explains who treats clients and how they trained.",
            },
            {
              icon: CalendarCheck,
              title: "Consultation-first journeys",
              description: "Treatment pages lead to a consultation, not a hard sell.",
            },
            {
              icon: Smartphone,
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
              description="We link or embed the booking system you already use, so clients can go from a treatment page to booking in a couple of taps."
            />
            {/* TODO [CONFIRM]: the list of supported booking systems (e.g. Fresha, Treatwell, Timely, Phorest). */}
            <DevConfirm>list the booking systems you support (e.g. Fresha, Treatwell, Timely, Phorest).</DevConfirm>
          </div>
        </div>
      </Section>

      <Section id="who" tone="muted">
        <SectionHeading eyebrow="Who we build for" title="Who we build for" />
        <CardGrid
          columns={3}
          items={[
            { title: "Aesthetics clinics", description: "Single-room clinics to multi-room practices." },
            {
              title: "Aesthetic nurses & independent practitioners",
              description: "A professional site that makes a solo practice look as established as it is.",
            },
            { title: "Skin clinics & med spas", description: "Treatment menus, packages and consultation journeys." },
            {
              title: "Beauty salons",
              description: "Menus, prices, gallery and booking.",
              href: routes.beautySalonWebsites,
              linkLabel: "Beauty salon websites",
            },
          ]}
        />
      </Section>

      <Section id="uk">
        <SectionHeading eyebrow="Across the UK" title="We work with clinics across the UK" />
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
          We build websites for clinics in {UK_CITIES.slice(0, -1).join(", ")} and {UK_CITIES.at(-1)}, and
          everywhere in between. Everything is done remotely by video call, email and WhatsApp, during UK
          working hours.
        </p>
        {/* TODO [CONFIRM]: the exact UK hours you are available. */}
        <DevConfirm>state the exact UK hours you are available.</DevConfirm>
        <Link
          href={routes.bristol}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          <MapPin aria-hidden className="h-4 w-4" />
          Aesthetic clinic website design in Bristol
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="pricing-examples" tone="tint">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Pricing"
              title="Pricing"
              description={`Option A costs £${pricing.optionA.price} with the admin dashboard. Option B costs £${pricing.optionB.price} without it. Both go live in ${pricing.timeline}, and you can pay 50/50 or 30/40/30.`}
            />
            <Link href={routes.pricing} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Compare Option A and Option B
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div>
            <SectionHeading eyebrow="Examples" title="Examples" description="Live clinic websites we've built." />
            <ul className="mt-6 grid gap-3">
              {publishedCaseStudies.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`${routes.work}/${c.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/30"
                  >
                    <span className="flex items-center gap-3">
                      <ImageIcon aria-hidden className="h-4 w-4 text-primary" />
                      {c.name}, {c.location}
                    </span>
                    <ArrowRight aria-hidden className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={routes.work} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              All work
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Clinic website FAQs" />
        <FaqList faqs={faqsById(["cost", "timeline", "dashboard-edits", "booking", "redesign"])} />
      </Section>

      <CtaBand title="Get your clinic website quote" primaryLabel="Get your clinic website quote" />
    </PageShell>
  );
}
