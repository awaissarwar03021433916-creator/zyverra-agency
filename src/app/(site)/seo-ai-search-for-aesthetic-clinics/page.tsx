import Link from "next/link";
import { ArrowRight, BarChart3, Bot, Building2, FileSearch, Globe, MapPin } from "lucide-react";

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
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.seoAiSearch;

export const metadata = pageMetadata({
  title: "SEO & AI Search Visibility for Aesthetic Clinics | Zyverra",
  description:
    "Local SEO and AI search visibility for UK aesthetics clinics: Google Business Profile, schema, content and citations so Google and ChatGPT can find you.",
  path: PATH,
});

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "SEO & AI Search Visibility", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "Local SEO and AI search visibility for aesthetic clinics",
          serviceType: "Local SEO and AI search optimisation",
          description:
            "Local SEO and AI search visibility for UK aesthetics clinics: Google Business Profile, structured data, answer-first content, consistent listings and genuine mentions.",
        })}
      />

      <PageHero
        eyebrow="Local SEO & AI search"
        title={
          <>
            Local SEO and AI search visibility for <Accent>aesthetics clinics</Accent>
          </>
        }
        description="Built to be found and understood by Google, Bing, ChatGPT, Gemini and Perplexity."
        actions={<HeroActions secondary={{ href: `${routes.blog}/get-clinic-recommended-by-chatgpt`, label: "Read the guide" }} />}
        chips={["Google Business Profile", "Schema markup", "Bing & Google indexing", "No ranking guarantees"]}
      />

      <Lead>
        More clients now ask Google, ChatGPT, Gemini and Perplexity to recommend a clinic. We make your
        clinic easy for search engines and AI assistants to find, understand and trust. That means fast,
        crawlable treatment pages, answer-first content, accurate structured data, a well-maintained Google
        Business Profile, consistent listings and genuine mentions on other websites. Nobody can guarantee a
        recommendation, but these are the foundations every recommendation is built on.
      </Lead>

      <Section id="local-seo">
        <SectionHeading
          eyebrow="Local SEO"
          title="Local SEO for clinics"
          description="The groundwork that helps clients near you find your clinic when they search."
        />
        <CardGrid
          columns={4}
          items={[
            { icon: MapPin, title: "Google Business Profile", description: "Services, photos, opening hours and categories kept accurate and current." },
            { icon: Building2, title: "Reviews", description: "A simple routine for asking happy clients for genuine reviews." },
            { icon: Globe, title: "Consistent details", description: "The same name, address, phone and hours on every listing." },
            { icon: FileSearch, title: "Treatment & location pages", description: "One clear page per treatment or concern, written answer-first." },
          ]}
        />
      </Section>

      <Section id="ai-assistants" tone="tint">
        <SectionHeading
          eyebrow="AI search"
          title="How AI assistants choose which clinics to mention"
          description="AI search mostly rewards good SEO, done for more than one search engine."
        />
        <CheckList
          items={[
            "Google says its AI features rely on the same Search index and core SEO best practices as normal results.",
            "ChatGPT's live search leans heavily on Bing, so being indexed in Bing matters as much as Google.",
            "Mentions of your clinic's name on other reputable websites correlate with AI visibility in industry studies (a correlation, not proof of cause).",
          ]}
        />
        <Link
          href={`${routes.blog}/get-clinic-recommended-by-chatgpt`}
          className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          How to get your clinic recommended by ChatGPT and Google AI
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </Section>

      <Section id="monthly">
        <SectionHeading
          eyebrow="Ongoing work"
          title="What we do month to month"
          description="Ongoing local SEO and AI search work is quoted separately from your website, based on what your clinic needs."
        />
        <CheckList
          items={[
            "Keep your Google Business Profile and Bing Places details accurate",
            "Add and improve answer-first treatment pages and FAQs",
            "Maintain structured data as your treatments and prices change",
            "Find genuine opportunities for mentions on other websites",
          ]}
        />
        {/* TODO [CONFIRM]: monthly packages and prices. */}
        <DevConfirm>add monthly SEO packages and prices.</DevConfirm>
      </Section>

      <DashboardCallout />

      <Section id="measuring">
        <SectionHeading eyebrow="Reporting" title="Measuring it" />
        <CardGrid
          columns={3}
          items={[
            { icon: BarChart3, title: "Google Search Console", description: "Impressions, clicks and the generative AI performance report." },
            { icon: Bot, title: "Bing Webmaster Tools", description: "Indexing and search performance in Bing, which feeds ChatGPT search." },
            { icon: FileSearch, title: "Enquiry tracking", description: "Which pages turn visits into WhatsApp messages, calls and quote requests." },
          ]}
        />
        <p className="mt-8 text-sm text-muted-foreground">
          Start with a website built for search:{" "}
          <Link href={routes.aestheticClinicWebsites} className="font-semibold text-primary hover:underline">
            aesthetic clinic websites
          </Link>{" "}
          ·{" "}
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">
            pricing
          </Link>{" "}
          ·{" "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">
            our work
          </Link>
        </p>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="SEO & AI search FAQs" />
        <FaqList faqs={faqsById(["rank", "chatgpt", "ai-visibility"])} />
      </Section>

      <CtaBand title="Make your clinic easier to find" />
    </PageShell>
  );
}
