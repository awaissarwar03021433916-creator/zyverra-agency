"use client";

import {
  ArrowRight,
  Check,
  Cpu,
  Eye,
  Gauge,
  GitBranch,
  Handshake,
  MessageSquare,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { whyUsFaqs } from "@/data/faqs";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

const DIFFERENTIATORS = [
  {
    icon: Users,
    title: "Founder-led, end to end",
    description:
      "The engineer who designs your product is the one who builds it. No handoff to a junior bench, no context lost in translation, just one experienced engineer accountable for the result.",
  },
  {
    icon: Cpu,
    title: "Business-first engineering",
    description:
      "We build around your goals and your users, not a feature checklist. Every technical decision is made in service of the outcome you actually care about.",
  },
  {
    icon: ShieldCheck,
    title: "Secure and built to scale",
    description:
      "Clean architecture, validated inputs, isolated data, and secure defaults from day one, so your product stays reliable as it grows instead of cracking under success.",
  },
  {
    icon: Eye,
    title: "Real transparency",
    description:
      "Honest scope, honest timelines, honest trade-offs. If something is risky or unnecessary, we tell you before it costs you, not after.",
  },
  {
    icon: MessageSquare,
    title: "Direct communication",
    description:
      "You talk to the people doing the work, with steady updates in plain language at every step. No account managers sitting between you and progress.",
  },
  {
    icon: Handshake,
    title: "Long-term partnership",
    description:
      "We keep our project list short so each one gets real attention, and we stay with your product well past launch, like part of your team.",
  },
];

const EXPERTISE = [
  { icon: Cpu, label: "AI agents & automation" },
  { icon: GitBranch, label: "SaaS & multi-tenant platforms" },
  { icon: Gauge, label: "High-performance web apps" },
  { icon: ShieldCheck, label: "Secure APIs & data models" },
];

const FOR_YOU = [
  "You want a product built properly, not just quickly",
  "You value direct access to the people doing the work",
  "You want honest advice, even when it is not what you hoped to hear",
  "You are building something you intend to grow and maintain",
];

const NOT_FOR_YOU = [
  "You want the absolute cheapest option, quality aside",
  "You need a large team purely to look impressive",
  "You want a vendor who says yes to everything without pushback",
  "You are after a throwaway build you will never maintain",
];

const COMPARISON = [
  { point: "Who builds it", zyverra: "The founder you hired", agency: "Often a junior bench" },
  { point: "Who you talk to", zyverra: "The founder directly", agency: "An account manager" },
  { point: "Scope & pricing", zyverra: "Honest and clear up front", agency: "Padded for overhead" },
  { point: "After launch", zyverra: "Ongoing partnership", agency: "Handover and goodbye" },
  { point: "Attention", zyverra: "A short, focused project list", agency: "One of many accounts" },
];

// FAQ content lives in src/data/faqs.ts so the visible FAQ and the FAQ schema match.
const FAQS = whyUsFaqs;

export default function WhyUsPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="Why Zyverra Labs"
        title={
          <>
            A founder who treats your product{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              like their own.
            </span>
          </>
        }
        description="Most teams can write code. Far fewer combine senior-level engineering, business judgment, and real honesty in one place. That combination is what makes the difference between software that ships and software that lasts."
        actions={
          <>
            <a
              href={`/${lang}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Work with us
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href={`/${lang}/how-we-deliver`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              How we deliver
            </a>
          </>
        }
        chips={["Founder-led delivery", "Business-first", "Honest & transparent", "Built to scale"]}
      />

      {/* Differentiators */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            What sets us apart
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Six reasons clients choose us, and stay.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <d.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertise band */}
      <section className="border-y border-border bg-gradient-to-b from-primary/[0.05] to-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Deep expertise where it counts.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Hands-on, production experience across the stack that modern products are built on.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE.map((e, i) => (
              <Reveal key={e.label} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <e.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold text-foreground">{e.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Honest fit */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Honest fit
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            We are a great fit for some, and not for others.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            We would rather be honest about this up front than oversell and disappoint.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.05] p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">You&apos;ll love working with us if…</h3>
              <ul className="mt-5 space-y-3">
                {FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">We&apos;re probably not for you if…</h3>
              <ul className="mt-5 space-y-3">
                {NOT_FOR_YOU.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-foreground/50">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              The difference
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Founder-led vs. the typical agency.
            </h2>
          </Reveal>
          <Reveal className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 border-b border-border bg-secondary/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <div className="p-4" />
              <div className="p-4 text-primary">Zyverra Labs</div>
              <div className="p-4">Typical agency</div>
            </div>
            {COMPARISON.map((row) => (
              <div
                key={row.point}
                className="grid grid-cols-3 border-b border-border text-sm last:border-b-0"
              >
                <div className="p-4 font-semibold text-foreground">{row.point}</div>
                <div className="flex items-start gap-2 p-4 text-foreground/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  {row.zyverra}
                </div>
                <div className="p-4 text-muted-foreground">{row.agency}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Still deciding? Start here.
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
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
        </Reveal>
      </section>
    </PageShell>
  );
}
