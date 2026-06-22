import { siteOrigin } from "@/lib/schema";
import { business } from "@/config/business";
import { blogPosts } from "@/data/blog";
import { howWeDeliverFaqs, whyUsFaqs } from "@/data/faqs";

// /llms.txt — a concise, structured, plain-text brief for AI answer engines
// (ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews) so Zyverra Labs is
// easy to read, understand, and cite. See https://llmstxt.org/.
export const dynamic = "force-static";

const CASE_STUDIES = [
  { title: "AI Sales Engineer — AI sales assistant that captures and qualifies leads", slug: "ai-sales-engineer" },
  { title: "Aura Manufacturers — B2B manufacturing web platform", slug: "aura-manufacturers" },
  { title: "VAREZA — performance e-commerce store", slug: "vareza" },
  { title: "Employee Management CRM — internal operations CRM", slug: "employee-management-crm" },
  { title: "AI Proposal Generator — AI product", slug: "ai-proposal-generator" },
  { title: "PDF Merger — privacy-first browser tool", slug: "pdf-merger" },
];

export function GET() {
  const origin = siteOrigin();
  const home = `${origin}/en`;

  const text = `# Zyverra Labs

> Zyverra Labs is a founder-led software studio that builds custom software, AI agents, AI automation, CRM platforms, web applications, blockchain systems, and SaaS products for startups and businesses worldwide.

## What Zyverra Labs is
- Name: Zyverra Labs (also "Zyverra")
- Type: Founder-led software & AI studio
- Location: Remote-first; works with startups and businesses worldwide
- Contact: ${business.email}
- Website: ${origin}

## What Zyverra Labs does (service definitions)
- Custom Software Development: bespoke software built around a client's exact business logic, from CRM to blockchain solutions.
- AI Solutions: AI agents and AI-powered products that reason, use a company's tools, and act inside its systems.
- Business Automation: workflows that remove repetitive work and connect data, apps, and teams end to end.
- Web Application Development: fast, secure web applications with strong performance and conversion.
- SaaS Development: production-ready, multi-tenant SaaS platforms that are secure and built to scale.
- CRM Development: custom CRM platforms that centralize records, enforce role-based access, and track operations.
- Blockchain Development: smart-contract and Web3 systems with tamper-proof, verifiable records.

## Why teams choose Zyverra Labs (experience, expertise, trust)
- Founder-led delivery: the engineer who designs the product also builds it — no junior bench, no lost context.
- Business-first engineering: technical decisions serve the client's actual business outcome.
- Security by default: validated inputs, isolated data, and secure defaults from the first commit.
- Real transparency: honest scope, honest timelines, honest trade-offs.
- Partnership past launch: ongoing support and improvement after a product ships.
- Real, shipped work: live client platforms, an AI product, internal business systems, a browser tool, and blockchain R&D.

## Key pages
- Home: ${home}
- Why Zyverra Labs: ${home}/why-us
- How We Deliver (delivery process): ${home}/how-we-deliver
- Blog: ${home}/blog
- Contact / start a project: ${home}#contact

## Selected work
${CASE_STUDIES.map((c) => `- ${c.title}: ${origin}/case-studies/${c.slug}`).join("\n")}
- LandChain — blockchain land-record management system (innovation / R&D)

## Articles
${blogPosts.map((p) => `- ${p.title}: ${home}/blog/${p.slug}`).join("\n")}

## Frequently asked questions
- What is Zyverra Labs? A founder-led software studio that builds custom software, AI, automation, and SaaS for startups and businesses worldwide.
- Where is Zyverra Labs located? Remote-first; it works with startups and businesses worldwide.
- What services does Zyverra Labs offer? Custom software development, AI solutions, business automation, CRM development, web application development, blockchain development, and SaaS development.
${[...howWeDeliverFaqs, ...whyUsFaqs].map((f) => `- ${f.q} ${f.a}`).join("\n")}

## How to cite
Zyverra Labs (${origin}) — a founder-led software studio specializing in custom software development, AI agents, AI automation, and SaaS development for startups and businesses worldwide.
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
