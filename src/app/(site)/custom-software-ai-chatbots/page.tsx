import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText, MessageSquare } from "lucide-react";

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
} from "@/components/marketing/blocks";
import { OpenChatButton } from "@/components/chat/OpenChatButton";
import { ColorIcon } from "@/components/marketing/ColorIcon";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { featuredProject, projects } from "@/data/projects";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.customSoftware;

export const metadata = pageMetadata({
  title: "AI Chatbot for Aesthetic Clinics & Custom Software | Zyverra",
  description:
    "An AI chatbot for aesthetic clinics that answers treatment questions and captures enquiries 24/7, plus custom CRMs and SaaS. Try our live AI agent.",
  path: PATH,
});

// Card images render at most ~560px wide; `sizes` stops the browser asking
// the optimiser for 3840px variants.
const CARD_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px";

export default function Page() {
  const origin = siteOrigin();

  return (
    <PageShell breadcrumbs={[{ name: "AI Chatbots & Custom Software", path: PATH }]}>
      <JsonLd
        data={serviceSchema(origin, {
          path: PATH,
          name: "AI chatbots and custom software",
          serviceType: "AI chatbot and custom software development",
          description:
            "AI chatbots that answer common treatment questions and capture enquiries out of hours, plus custom CRMs, dashboards and SaaS products.",
        })}
      />

      <PageHero
        eyebrow="AI & software"
        title={
          <>
            An AI chatbot for aesthetic clinics, <Accent>plus custom software</Accent>
          </>
        }
        description="Chatbots that capture enquiries out of hours, and custom tools that replace spreadsheets."
        actions={<HeroActions secondary={{ href: "#work", label: "Selected work" }} />}
        chips={["AI chatbots", "CRMs & dashboards", "SaaS products", "Built in-house"]}
        aside={
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/25 via-sky-300/20 to-fuchsia-300/25 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-border shadow-xl">
              <Image
                src="/industries/saas.jpg"
                alt="A software team reviewing code together"
                width={640}
                height={427}
                sizes="(max-width: 1024px) 100vw, 520px"
                className="block h-auto w-full"
              />
            </div>
            <div className="animate-float absolute -bottom-5 -left-3 flex items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 shadow-lg">
              <ColorIcon name="robot" size={30} />
              <div className="text-xs">
                <div className="font-semibold text-foreground">AI assistant live</div>
                <div className="text-muted-foreground">On this website</div>
              </div>
            </div>
          </div>
        }
      />

      <Lead>
        Beyond websites, we build AI chatbots that answer common treatment questions and capture enquiries
        out of hours, plus custom tools such as CRMs, dashboards and SaaS products.
      </Lead>

      <Section id="chatbots">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="AI chatbots"
              title="AI chatbots for clinics"
              description="A chatbot on your website that answers the questions clients ask most, any time of day."
            />
            <CheckList
              items={[
                "Answers common questions about treatments, prices and opening hours",
                "Captures enquiries out of hours, with a clear handover to you",
                "Never gives medical advice: clinical questions go to your team",
              ]}
            />
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-xs">
            <MessageSquare aria-hidden className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">Try our live AI agent</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              The assistant on this site was designed and built by us, with conversation memory, a knowledge
              base and lead qualification. Ask it anything about our services.
            </p>
            <div className="mt-6">
              <OpenChatButton />
            </div>
          </div>
        </div>
      </Section>

      <Section id="software" tone="tint">
        <SectionHeading
          eyebrow="Custom software"
          title="Custom software and SaaS"
          description="When off-the-shelf tools don't fit, we build software around how your business actually works."
        />
        <CardGrid
          columns={4}
          items={[
            { emoji: "laptop", title: "CRMs & dashboards", description: "Internal tools that replace scattered spreadsheets." },
            { emoji: "gear", title: "Automation", description: "Workflows that remove repetitive admin work." },
            { emoji: "rocket", title: "SaaS products", description: "Secure, multi-tenant platforms built to scale." },
            { emoji: "robot", title: "AI agents", description: "Assistants that use your tools and data, with guardrails." },
          ]}
        />
      </Section>

      <Section id="work">
        <SectionHeading
          eyebrow="Selected work"
          title="Selected work"
          description="Software, AI products and web platforms we've designed and built in-house."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
              {/* Screenshots vary in shape (one is portrait), so each is shown whole
                  and centred in a uniform frame rather than cropped. */}
              <div className="relative aspect-[16/10] border-b border-border bg-gradient-to-br from-sky-50 via-white to-fuchsia-50">
                <Image src={p.image} alt={p.alt} fill sizes={CARD_SIZES} className="object-contain p-3 sm:p-4" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{p.categoryLabel}</div>
                <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.solution}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{p.outcome}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                  {p.tech.map((t) => (
                    <li key={t} className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-4 pt-6">
                  {p.caseStudy && (
                    <a href={p.caseStudy} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Case study
                      <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  )}
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
                    >
                      Visit live site
                      <ArrowUpRight aria-hidden className="h-4 w-4" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs md:col-span-2 md:flex-row">
            <div className="relative aspect-[16/10] border-b border-border bg-gradient-to-br from-sky-50 via-white to-fuchsia-50 md:aspect-auto md:min-h-72 md:w-1/2 md:border-b-0 md:border-r">
              <Image
                src={featuredProject.image}
                alt={featuredProject.alt}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-contain p-3 sm:p-4"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-8">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">{featuredProject.categoryLabel}</div>
              <h3 className="mt-2 font-heading text-xl font-semibold text-foreground">{featuredProject.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{featuredProject.solution}</p>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{featuredProject.outcome}</p>
              <a
                href={featuredProject.documentation}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                <FileText aria-hidden className="h-4 w-4" />
                Read the documentation (PDF)
              </a>
            </div>
          </article>
        </div>
      </Section>

      <DashboardCallout />

      <Section id="next" tone="muted">
        <SectionHeading eyebrow="Clinic websites" title="Running a clinic?" description="Most clinics start with a website they can update themselves, then add a chatbot." />
        <p className="mt-6 text-sm text-muted-foreground">
          <Link href={routes.aestheticClinicWebsites} className="font-semibold text-primary hover:underline">Aesthetic clinic websites</Link>
          {" · "}
          <Link href={routes.pricing} className="font-semibold text-primary hover:underline">Pricing</Link>
          {" · "}
          <Link href={routes.work} className="font-semibold text-primary hover:underline">Clinic work</Link>
        </p>
      </Section>

      <Section id="faq" narrow>
        <SectionHeading eyebrow="FAQ" title="AI chatbot FAQs" />
        <FaqList faqs={faqsById(["chatbot", "location", "start"])} />
      </Section>

      <RelatedLinks
        links={[
          { href: "/blog/does-aesthetics-clinic-need-ai-chatbot", label: "Do clinics need an AI chatbot?" },
          { href: "/blog/check-ai-assistants-mention-clinic", label: "Check if AI assistants mention your clinic" },
          { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
          { href: "/blog/ai-agents-vs-automation", label: "AI agents vs AI automation" },
          { href: "/clinic-types/aesthetics-clinics", label: "Aesthetics clinic marketing" },
        ]}
      />

      <CtaBand title="Tell us what you want to build" />
    </PageShell>
  );
}
