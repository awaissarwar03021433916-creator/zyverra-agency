import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import {
  CardGrid,
  CtaBand,
  DashboardCallout,
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
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.beautySalonWebsites;

export const metadata = pageMetadata({
  title: "Beauty Salon Website Design UK | From £300 | Zyverra",
  description:
    "Beauty salon website design UK: menu, prices, gallery and booking, with a dashboard to update it. From £300, live in 7–10 days. Get a quote today.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Beauty Salon Website Design", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Beauty salon website design",
          serviceType: "Website design for beauty salons",
          description:
            "Beauty salon websites with a treatment menu, prices, gallery and booking link, with an optional admin dashboard.",
          offers: true,
        })}
      />

      <PageHero
        eyebrow="Beauty salon websites"
        title={
          <>
            Beauty salon website design for <Accent>UK salons and therapists</Accent>
          </>
        }
        description={dashboardLines.core}
        actions={<HeroActions secondary={{ href: routes.pricing, label: "See pricing" }} />}
        chips={[`From £${pricing.optionB.price}`, `Live in ${pricing.timeline}`, "Menu, prices & gallery", "Booking link on every page"]}
      />

      <Lead>
        We build beauty salon websites that show your full treatment menu and prices, show off your work in
        a gallery and send clients straight to booking. Choose Option B (£{pricing.optionB.price}) for a
        clean, fast site, or Option A (£{pricing.optionA.price}) to add an admin dashboard so you can change
        prices and offers yourself.
      </Lead>

      <Section id="needs">
        <SectionHeading
          eyebrow="What's included"
          title="What a salon website needs"
          description="The essentials clients look for before they book, built into every salon site."
        />
        <CardGrid
          columns={3}
          items={[
            { emoji: "clipboard", title: "Treatment menu", description: "Every treatment, grouped the way clients search for them." },
            { emoji: "pound", title: "Clear prices", description: "Prices on the page, so clients don't have to ask." },
            { emoji: "picture", title: "Gallery", description: "Your best work, shown off on a fast, mobile-friendly gallery." },
            { emoji: "calendar", title: "Booking", description: "A booking button on every page, linked to the system you already use." },
            { emoji: "star", title: "Reviews", description: "Genuine client reviews, displayed where they help clients decide." },
            { emoji: "pin", title: "Map & directions", description: "Your address, opening hours and a map, so clients can find you." },
          ]}
        />
      </Section>

      <Section id="front-door" tone="tint">
        <SectionHeading
          eyebrow="Your own front door"
          title="Reduce reliance on booking-platform commission"
          description="Marketplace platforms are useful for discovery, but every client who books through your own website books with you directly. Use your own site as the front door: your brand, your menu, your prices, with a booking link to the system you already use."
        />
        <Link
          href={routes.socialReels}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Send more clients to your site with social media & reels
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <DashboardCallout />

      <Section id="update">
        <SectionHeading
          eyebrow="Admin dashboard"
          title="Update your menu and offers yourself"
          description={`${dashboardLines.proof} With Option A you change prices, add treatments and publish seasonal offers yourself.`}
        />
        <Link
          href={routes.adminDashboard}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          See what the admin dashboard does
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="pricing" tone="muted">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Pricing"
              title="Pricing"
              description={`Option B: £${pricing.optionB.price} for a custom salon website. Option A: £${pricing.optionA.price} with the admin dashboard. Pay 50/50 or 30/40/30.`}
            />
            <Link href={routes.pricing} className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              Compare options
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div>
            <SectionHeading
              eyebrow="Examples"
              title="Examples"
              description="See the clinic and salon-style websites we've built, and promote your salon with Meta ads once it's live."
            />
            <div className="mt-6 flex flex-col gap-3">
              <Link href={routes.work} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                See our work
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link href={routes.metaAds} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Meta ads for salons
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="Salon website FAQs" />
        <FaqList faqs={faqsById(["options", "timeline", "booking", "best-platform", "instalments"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/instagram-profile-checklist-aesthetic-clinic", label: "Instagram profile checklist for clinics" },
          { href: "/blog/does-aesthetics-clinic-need-ai-chatbot", label: "Do clinics need an AI chatbot?" },
          { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/clinic-types/beauty-salons", label: "Beauty salon marketing UK" },
          { href: "/clinic-types/lash-and-brow-studios", label: "Lash and brow studio website" },
        ]}
      />

      <CtaBand title="Get your salon website quote" />
    </PageShell>
  );
}
