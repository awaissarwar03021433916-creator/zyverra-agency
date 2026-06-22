"use client";

import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Compass,
  LifeBuoy,
  MessageSquare,
  PenTool,
  Rocket,
  ShieldCheck,
  Code2,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { howWeDeliverFaqs } from "@/data/faqs";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

const PHASES = [
  {
    icon: Compass,
    step: "01",
    title: "Discovery & Scope",
    duration: "Week 1",
    description:
      "We learn your business, define the outcome, and agree the exact scope. You leave this phase with a clear plan, a timeline, and a fixed understanding of what success looks like.",
    deliverables: ["Product scope & roadmap", "Architecture plan", "Clear timeline & milestones"],
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    duration: "Weeks 1–2",
    description:
      "We shape the user experience and a scalable design system, then validate the key flows before a line of production code is written, so we build the right thing once.",
    deliverables: ["UX flows & wireframes", "Design system", "Clickable prototype of key journeys"],
  },
  {
    icon: Code2,
    step: "03",
    title: "Engineering",
    duration: "Ongoing",
    description:
      "We build in vertical slices on secure, proven architecture, shipping working software every week, with testing and performance treated as features, not afterthoughts.",
    deliverables: ["Weekly working builds", "Tested, typed codebase", "Secure APIs & data models"],
  },
  {
    icon: Rocket,
    step: "04",
    title: "Launch",
    duration: "Launch week",
    description:
      "We ship with monitoring in place, a proper handover, and documentation, so going live is a calm, controlled event, not a leap of faith.",
    deliverables: ["Production deployment", "Monitoring & handover", "Documentation"],
  },
];

const COMMITMENTS = [
  {
    icon: MessageSquare,
    title: "Direct, weekly communication",
    description:
      "You talk to the engineers building your product, with a working demo and a plain-language update every week. No account managers, no jargon, no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Security by default",
    description:
      "Validated inputs, least-privilege access, isolated data, and secrets kept out of the codebase. Security is built in from the first commit, not bolted on before launch.",
  },
  {
    icon: CalendarClock,
    title: "Honest scope and timelines",
    description:
      "We commit to a clear scope and tell you early if anything threatens it. If something is risky or unnecessary, we say so before it costs you time or money.",
  },
  {
    icon: LifeBuoy,
    title: "Support past launch",
    description:
      "We stay with your product after it ships, monitoring, fixing, and improving, so launch is the start of the relationship, not the end of it.",
  },
];

const ENGAGEMENTS = [
  {
    title: "Fixed-scope build",
    description:
      "A defined product with a clear scope, timeline, and price. Best when you know what you need and want certainty on cost and delivery.",
  },
  {
    title: "Discovery sprint",
    description:
      "A short, focused engagement to turn an idea into a validated plan, architecture, and prototype, so you can build with confidence.",
  },
  {
    title: "Ongoing partnership",
    description:
      "A continuous engagement where we design, build, and improve your product over time, acting as your dedicated engineering partner.",
  },
];

// FAQ content lives in src/data/faqs.ts so the visible FAQ and the FAQ schema match.
const FAQS = howWeDeliverFaqs;

export default function HowWeDeliverPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="How We Deliver"
        title={
          <>
            A delivery process you can{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              actually trust.
            </span>
          </>
        }
        description="Great software is the result of a clear process, not luck. Here is exactly how we take your idea from first call to a product that is live, secure, and earning, with no surprises along the way."
        actions={
          <>
            <a
              href={`/${lang}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href={`/${lang}#portfolio`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              See our work
            </a>
          </>
        }
        chips={["Clear scope & timeline", "Weekly demos", "Security by default", "Support past launch"]}
      />

      {/* Phases */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            The Process
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Four phases, clear deliverables at each one.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            You always know what we are building, why, and what you will have in your hands at the
            end of each stage.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {PHASES.map((phase, i) => (
            <Reveal key={phase.step} delay={i * 0.06}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <phase.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-4xl font-bold text-border">{phase.step}</span>
                </div>
                <div className="mt-5 text-[11px] font-bold uppercase tracking-widest text-primary">
                  {phase.duration}
                </div>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {phase.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-foreground/80">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Commitments */}
      <section className="border-y border-border bg-gradient-to-b from-primary/[0.05] to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              What you can count on
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              The commitments behind every project.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement models */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Ways to work together
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            An engagement that fits where you are.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ENGAGEMENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Questions clients ask us.
            </h2>
          </Reveal>
          <div className="mt-10 space-y-4">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-foreground">{f.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <a
              href={`/${lang}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Let&apos;s talk through your project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
