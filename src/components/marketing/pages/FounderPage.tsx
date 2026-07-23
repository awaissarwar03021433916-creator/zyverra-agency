"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Compass,
  Globe,
  Mail,
  MapPin,
  Quote,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { founder, founderSocialLinks } from "@/config/founder";
import { BRAND_ICONS } from "@/components/marketing/BrandIcons";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

// The five disciplines the brief calls out, each stated as a point of view
// rather than a skill listing — that distinction is what separates a founder
// profile from a team card.
const EXPERTISE = [
  {
    icon: BrainCircuit,
    title: "AI Engineering",
    description:
      "Agents, retrieval systems, and structured-output pipelines built to survive contact with real users — with evaluation, guardrails, and a human in the loop wherever the stakes justify one.",
    points: ["AI agents & assistants", "RAG & knowledge retrieval", "Evaluation & guardrails"],
  },
  {
    icon: Code2,
    title: "Software Engineering",
    description:
      "Typed, tested, and secure by construction. Architecture chosen for the next three years of the product rather than the next sprint, so year two costs less than year one.",
    points: ["SaaS & platform architecture", "APIs & data modelling", "Security by default"],
  },
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Fast, accessible, search-visible web platforms. Performance and Core Web Vitals are treated as product features, because a slow page is a lost customer before anyone reads a word.",
    points: ["Next.js & React platforms", "Core Web Vitals", "Technical SEO & a11y"],
  },
  {
    icon: Workflow,
    title: "AI Automation",
    description:
      "Workflows that remove repetitive work and connect the systems a business already runs on, replacing manual steps with something measurable, auditable, and reliable.",
    points: ["Workflow orchestration", "Systems integration", "Measurable time saved"],
  },
  {
    icon: TrendingUp,
    title: "Business Leadership",
    description:
      "Engineering decisions are business decisions. Scope is shaped around the outcome being paid for, and the honest recommendation is sometimes to build less than was asked for.",
    points: ["Outcome-led scoping", "Pragmatic trade-offs", "Long-term partnership"],
  },
  {
    icon: Compass,
    title: "Product Strategy",
    description:
      "Turning a half-formed idea into a sequenced plan: what to build first, what to defer, and what to delete entirely so the first release can actually ship and be judged.",
    points: ["Discovery & validation", "Roadmap sequencing", "Launch planning"],
  },
];

// Grouped technology stack, drawn from what the studio actually builds with.
const TECHNOLOGIES = [
  {
    group: "Languages & Core",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "Node.js"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Radix UI"],
  },
  {
    group: "Backend & Data",
    items: ["PostgreSQL", "Prisma", "REST APIs", "Zod", "Redis"],
  },
  {
    group: "AI & Automation",
    items: ["OpenAI API", "RAG Pipelines", "Structured Outputs", "Prompt Engineering", "AI Agents"],
  },
  {
    group: "Infrastructure",
    items: ["Vercel", "Docker", "CI/CD", "Edge Functions", "Observability"],
  },
];

// Capability areas grounded in shipped work — no invented tenure or metrics.
const EXPERIENCE = [
  {
    period: "AI systems",
    title: "Production AI, not demos",
    description:
      "Conversational sales agents, proposal generation, and document automation — including the assistant running on this site, designed and built end to end, with conversation memory, retrieval, and lead qualification.",
  },
  {
    period: "Business systems",
    title: "Internal platforms teams keep using",
    description:
      "CRM and employee management systems, role-based admin dashboards, and operational tooling that replace scattered spreadsheets with software that holds up under daily use.",
  },
  {
    period: "Client platforms",
    title: "Web products that carry revenue",
    description:
      "Production websites and storefronts for manufacturing and commerce businesses, engineered for speed, search visibility, and a short path from interest to enquiry.",
  },
  {
    period: "Research",
    title: "Applied R&D",
    description:
      "Blockchain-based land records with on-chain ownership and smart-contract-enforced transfers — exploratory work that pressure-tests where emerging technology genuinely beats the status quo.",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Founded Zyverra Labs",
    description:
      "Built a founder-led software studio serving clients in Pakistan and internationally, deliberately kept small so every project gets senior attention.",
  },
  {
    title: "Shipped six production systems",
    description:
      "AI products, business platforms, and client web applications — every one live, documented as a case study, and built in-house rather than outsourced.",
  },
  {
    title: "AI agent running in production",
    description:
      "The sales assistant on this site handles qualification, memory, and retrieval end to end, and doubles as a working demonstration of what we build for clients.",
  },
  {
    title: "Engineering standard held publicly",
    description:
      "Typed codebases, validated inputs, least-privilege access, and security decisions documented openly across the site's own policies rather than asserted in a sales deck.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function FounderPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const shouldReduceMotion = useReducedMotion();

  const portfolioHref = `/${lang}${founder.portfolioPath}`;
  const [linkedin, github] = founderSocialLinks;

  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="Founder"
        title={
          <>
            The engineer behind{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              every line we ship.
            </span>
          </>
        }
        description="Muhammad Awais founded Zyverra Labs to close the gap between the people who understand a business and the people who write its software. He takes the first call, designs the architecture, and stays on after launch."
        actions={
          <>
            <a
              href={`/${lang}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Work with the founder
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href={portfolioHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              View portfolio
            </a>
          </>
        }
        chips={["AI Engineering", "Software Engineering", "Web Development", "AI Automation"]}
      />

      {/* Profile */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14">
          {/* Portrait */}
          <Reveal className="lg:sticky lg:top-24">
            {/* The source photo is already a circular crop on a square canvas,
                so it is framed as a circle — a rectangular card would expose the
                white corners of the original file. */}
            <div className="group relative mx-auto w-full max-w-[18rem]">
              <div
                className="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-primary/30 via-sky-400/20 to-transparent opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <div className="relative rounded-full bg-gradient-to-tr from-primary via-sky-400 to-primary/30 p-[3px] shadow-lg transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-xl">
                <div className="overflow-hidden rounded-full bg-card">
                  <Image
                    src={founder.image}
                    alt={founder.imageAlt}
                    width={560}
                    height={560}
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 18rem, 80vw"
                    priority
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </div>

            {/* Name plate */}
            <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-center shadow-sm lg:text-start">
              <div className="font-heading text-xl font-bold tracking-tight text-foreground">
                {founder.name}
              </div>
              <div className="mt-0.5 text-sm font-semibold text-primary">{founder.role}</div>
              <div className="mt-0.5 text-sm text-muted-foreground">{founder.company}</div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground lg:justify-start">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {founder.location}
              </div>
            </div>

            {/* Social profiles */}
            <div className="mt-4 flex items-center justify-center gap-2.5 lg:justify-start">
              {founderSocialLinks.map((social) => {
                const Icon = BRAND_ICONS[social.key];
                return (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${founder.name} on ${social.label}`}
                    title={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-md"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                );
              })}
            </div>
          </Reveal>

          {/* Introduction */}
          <div className="min-w-0">
            <Reveal>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Introduction
              </div>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Software should be built by people who understand the business paying for it.
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  I started Zyverra Labs because too much software is delivered by people who never
                  spoke to the business paying for it. Requirements pass through account managers,
                  intent gets lost in translation, and what ships is technically correct and
                  commercially useless.
                </p>
                <p>
                  So I built the studio the other way round. I take the first call, design the
                  architecture, write the code that matters, and stay on after launch. Clients get
                  an engineer who understands their P&amp;L, not a status report — and I keep the
                  project list deliberately short so that stays true rather than becoming a slogan.
                </p>
                <p>
                  My work sits where AI, software engineering, and business strategy meet. That
                  combination is the entire point: AI is only worth deploying when it moves a number
                  the business actually cares about, and knowing which number that is takes more
                  than an engineering background.
                </p>
              </div>
            </Reveal>

            {/* Mission & vision */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] to-transparent p-6 sm:p-7">
                  <Quote
                    className="absolute end-5 top-5 h-9 w-9 text-primary/15 rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                  <figcaption className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Target className="h-3.5 w-3.5" aria-hidden="true" />
                    Mission
                  </figcaption>
                  <blockquote className="mt-3 font-heading text-lg font-semibold leading-relaxed tracking-tight text-foreground">
                    &ldquo;To build AI and software that earns its place in a business — measured by
                    what it changes, not by what it demos.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Every engagement is judged on one question: is the client measurably better off
                    than before we started? If the honest answer is no, we scope it differently or
                    we say so.
                  </p>
                </figure>
              </Reveal>

              <Reveal delay={0.1}>
                <figure className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
                  <Compass
                    className="absolute end-5 top-5 h-9 w-9 text-primary/15"
                    aria-hidden="true"
                  />
                  <figcaption className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-primary">
                    <Compass className="h-3.5 w-3.5" aria-hidden="true" />
                    Vision
                  </figcaption>
                  <blockquote className="mt-3 font-heading text-lg font-semibold leading-relaxed tracking-tight text-foreground">
                    &ldquo;A studio small enough to care and senior enough to deliver — proving
                    world-class engineering can come from anywhere.&rdquo;
                  </blockquote>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    Zyverra Labs is built in Lahore and serves clients worldwide. The goal is not
                    headcount; it is a body of work where every system in the portfolio is one I
                    would put my own name against.
                  </p>
                </figure>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="border-y border-border bg-gradient-to-b from-primary/[0.05] to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Expertise
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Six disciplines, treated as one.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Specialists hand work between each other and lose the thread. A single engineer
              carrying the problem from first call to production keeps the intent intact.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERTISE.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg sm:p-7">
                  <span
                    className="absolute inset-x-0 top-0 h-1 scale-x-0 bg-gradient-to-r from-primary to-sky-500 transition-transform duration-300 group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <area.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {area.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Experience
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Where the work has actually been done.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {EXPERIENCE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group flex h-full gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg sm:p-7">
                <div className="flex flex-col items-center">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-125"
                    aria-hidden="true"
                  />
                  <span className="mt-2 w-px flex-1 bg-border" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    {item.period}
                  </div>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Technologies
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              The stack behind the work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Chosen for longevity and hiring depth, not novelty. Boring technology in the places
              that must not break, and modern tooling where it genuinely pays.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TECHNOLOGIES.map((group, i) => (
              <Reveal key={group.group} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    {group.group}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground/85 transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Achievements
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Milestones worth naming.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-heading text-base font-bold text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Portfolio teaser */}
      <section className="border-y border-border bg-gradient-to-b from-primary/[0.05] to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Portfolio
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Every claim above has a build behind it.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Six production systems — AI products, business platforms, and client web applications
              — each documented with the problem it solved and the outcome it created.
            </p>
            <a
              href={portfolioHref}
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Explore the portfolio
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm sm:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                Get in touch
              </div>
              <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Talk to the founder, not a funnel.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Bring the problem — half-formed is fine. You will get a direct answer on whether it
                is worth building, what it would take, and whether we are the right people for it.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
              >
                <BRAND_ICONS.linkedin className="h-4 w-4 text-primary" />
                LinkedIn
              </a>
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
              >
                <BRAND_ICONS.github className="h-4 w-4 text-primary" />
                GitHub
              </a>
              <a
                href={portfolioHref}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
              >
                <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
                Portfolio
              </a>
              <a
                href={`mailto:${founder.email}`}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                {founder.email}
              </a>
            </div>

            <motion.div
              className="mt-8 border-t border-border pt-6 text-center"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <a
                href={`/${lang}#contact`}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Or start a project brief
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
              </a>
            </motion.div>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
