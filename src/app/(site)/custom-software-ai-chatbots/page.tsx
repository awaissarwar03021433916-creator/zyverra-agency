import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bot, Boxes, FileText, LayoutDashboard, MessageSquare, Workflow } from "lucide-react";

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
} from "@/components/marketing/blocks";
import { OpenChatButton } from "@/components/chat/OpenChatButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";
import { featuredProject, projects } from "@/data/projects";
import { serviceSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.customSoftware;

export const metadata = pageMetadata({
  title: "AI Chatbots & Custom Software for Clinics | Zyverra Labs",
  description:
    "AI chatbots that answer treatment questions and capture enquiries 24/7, plus custom booking tools, CRMs and SaaS for clinics and growing businesses.",
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
            AI chatbots and custom software for <Accent>clinics and growing businesses</Accent>
          </>
        }
        description="Chatbots that capture enquiries out of hours, and custom tools that replace spreadsheets."
        actions={<HeroActions secondary={{ href: "#work", label: "Selected work" }} />}
        chips={["AI chatbots", "CRMs & dashboards", "SaaS products", "Built in-house"]}
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
            { icon: LayoutDashboard, title: "CRMs & dashboards", description: "Internal tools that replace scattered spreadsheets." },
            { icon: Workflow, title: "Automation", description: "Workflows that remove repetitive admin work." },
            { icon: Boxes, title: "SaaS products", description: "Secure, multi-tenant platforms built to scale." },
            { icon: Bot, title: "AI agents", description: "Assistants that use your tools and data, with guardrails." },
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
              <div className="relative aspect-[16/10] border-b border-border bg-secondary">
                <Image src={p.image} alt={p.alt} fill sizes={CARD_SIZES} className="object-cover object-top" />
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
            <div className="relative aspect-[16/10] border-b border-border bg-secondary md:aspect-auto md:w-1/2 md:border-b-0 md:border-r">
              <Image
                src={featuredProject.image}
                alt={featuredProject.alt}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover object-top"
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

      <CtaBand title="Tell us what you want to build" />
    </PageShell>
  );
}
