import { IconTile } from "@/components/marketing/ColorIcon";
import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { LazyContactForm as ContactForm } from "@/components/forms/LazyForms";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { WhatsAppGlyph, WhatsAppInlineLink } from "@/components/contact/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { business, pricing } from "@/config/business";
import { routes } from "@/config/site";
import { siteOrigin, webPageSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.contact;
const DESCRIPTION =
  "Message us on WhatsApp, email hello@zyverralabs.com or book a free 30-minute call about your clinic website, SEO, ads or AI search.";

export const metadata = pageMetadata({
  title: "Contact Zyverra Labs | WhatsApp, Email or Book a Call",
  description: DESCRIPTION,
  path: PATH,
});

const cardClass =
  "group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0";

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "Contact", path: PATH }]}>
      <JsonLd data={webPageSchema(origin, "ContactPage", { path: PATH, name: "Contact Zyverra Labs", description: DESCRIPTION })} />

      <PageHero
        eyebrow="Contact"
        title="Talk to us about your clinic"
        description="WhatsApp, email or a free 30-minute call — whichever suits you. You'll always speak to the person who builds your site."
      />

      <Section id="ways">
        <h2 className="sr-only">Ways to contact us</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <div className={cardClass}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C7E]">
              <WhatsAppGlyph className="h-5 w-5" />
            </span>
            <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">WhatsApp</h3>
            <p className="mt-2 text-sm text-muted-foreground">{business.phoneDisplay}</p>
            <div className="mt-auto pt-6">
              <WhatsAppInlineLink>Message us on WhatsApp</WhatsAppInlineLink>
            </div>
          </div>

          <div className={cardClass}>
            <IconTile name="envelope" tint="#e0f2fe" />
            <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">Email</h3>
            <p className="mt-2 text-sm text-muted-foreground">{business.email}</p>
            <div className="mt-auto pt-6">
              <TrackedLink
                href={`mailto:${business.email}`}
                event="email_click"
                params={{ location: "contact_card" }}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground shadow-xs transition-colors hover:bg-muted"
              >
                Email us
              </TrackedLink>
            </div>
          </div>

          <div className={cardClass}>
            <IconTile name="calendar" tint="#fce7f3" />
            <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">Book a free 30-minute call</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us a little about your clinic in the form below and we&apos;ll arrange a time.
            </p>
            <div className="mt-auto pt-6">
              <TrackedLink
                href="#enquiry"
                event="book_call_click"
                params={{ location: "contact_card" }}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                Book a free call
              </TrackedLink>
            </div>
          </div>
        </div>
      </Section>

      <Section id="enquiry" tone="tint" narrow>
        <SectionHeading
          eyebrow="Enquiry"
          title="Send us an enquiry"
          description="Tell us about your clinic and what you need. We'll reply by email with next steps."
        />
        <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </Section>

      <Section id="details" narrow>
        <h2 className="font-heading text-xl font-semibold text-foreground">Our details</h2>
        <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
          Zyverra Labs · Aesthetic clinic websites, local SEO and Meta ads · Serving clinics across the UK · {business.email} · WhatsApp{" "}
          {business.phoneDisplay}
        </address>
        <p className="mt-3 text-sm text-muted-foreground">Available {pricing.hours}.</p>
        {/* TODO [CONFIRM]: the days you're available and a reply-time promise (e.g. "we reply within 2 working hours"). */}
      </Section>
    </PageShell>
  );
}
