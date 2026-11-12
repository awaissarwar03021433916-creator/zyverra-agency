import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { CardGrid, FaqList, Lead, RelatedLinks, Section, SectionHeading } from "@/components/marketing/blocks";
import { LazyAuditForm as AuditForm } from "@/components/forms/LazyForms";
import { JsonLd } from "@/components/seo/JsonLd";
import { pricing } from "@/config/business";
import { routes } from "@/config/site";
import { auditSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.freeAudit;

export const metadata = pageMetadata({
  title: "Free Clinic Website Audit | Zyverra Labs",
  description:
    "Get a free clinic website audit: speed, Google visibility, treatment pages, booking and ASA wording, reviewed for your clinic. Request yours in 1 minute.",
  path: PATH,
});

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Free Clinic Website Audit", path: PATH }]}>
      <JsonLd data={auditSchema(siteOrigin(), PATH)} />

      <PageHero
        eyebrow="Free · no obligation"
        title={
          <>
            Get a free <Accent>clinic website audit</Accent>
          </>
        }
        description={`Tell us your website and we'll send a short, personalised review within ${pricing.auditTurnaround}.`}
        chips={["Free", "Personalised", "No obligation"]}
      >
        <div id="request" className="mx-auto mt-10 max-w-2xl rounded-3xl border border-border bg-white p-5 text-left shadow-xl sm:p-7">
          <AuditForm />
        </div>
      </PageHero>
      {/* TODO [CONFIRM]: the audit turnaround (pricing.auditTurnaround in src/config/business.ts). */}

      <Lead>
        A free clinic website audit is a short, personalised review of your current website, sent to you as a
        written summary or short video. We look at what stops visitors becoming bookings and what keeps your clinic
        from showing on Google, then tell you the most important fixes first, whether or not you work with us.
      </Lead>

      <Section id="what">
        <SectionHeading eyebrow="What we check" title="What your free audit covers" />
        <CardGrid
          columns={3}
          items={[
            { emoji: "mobile", title: "Mobile speed", description: "How quickly your site loads on a phone, and what slows it down." },
            { emoji: "search", title: "Google visibility", description: "Titles, treatment pages, indexing and your Google Business Profile." },
            { emoji: "clipboard", title: "Treatment pages", description: "Whether each treatment has a clear page with prices and FAQs." },
            { emoji: "calendar", title: "Booking journey", description: "How many taps it takes to go from a treatment to a booking." },
            { emoji: "shield", title: "Advertising wording", description: "Wording that may conflict with ASA rules on prescription-only medicines." },
            { emoji: "robot", title: "AI search readiness", description: "Whether ChatGPT and Google's AI can understand your clinic." },
          ]}
        />
      </Section>

      <Section id="how" tone="tint">
        <SectionHeading
          eyebrow="How it works"
          title="Three simple steps"
          description={`Send your details above. We review your website and Google presence. Within ${pricing.auditTurnaround} you receive your audit, with the most important fixes first. There's no obligation to buy anything.`}
        />
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="About the free audit" />
        <FaqList
          faqs={[
            { id: "au-free", q: "Is the clinic website audit really free?", a: "Yes. There's no charge and no obligation to work with us." },
            { id: "au-format", q: "What will I receive?", a: "A short, personalised written review or video covering your website's biggest opportunities, most important first." },
            { id: "au-time", q: "How long does it take?", a: `We aim to send your audit within ${pricing.auditTurnaround}.` },
            { id: "au-nosite", q: "I don't have a website yet. Can I still ask?", a: "Yes. We'll review your Google Business Profile and social presence instead, and suggest what your first website needs." },
          ]}
        />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/get-more-bookings-aesthetics-clinic", label: "How to get more clinic bookings" },
          { href: "/blog/aesthetic-clinic-website-mistakes", label: "12 clinic website mistakes to fix" },
          { href: routes.redesign, label: "Clinic website redesign UK" },
          { href: routes.seoAiSearch, label: "SEO for aesthetic clinics" },
          { href: routes.treatmentPages, label: "Treatment pages that rank" },
        ]}
      />
    </PageShell>
  );
}
