"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  FileText,
  PenTool,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";

type FilterKey = "all" | "client" | "systems" | "ai" | "innovation";
type Category = "client" | "systems" | "ai";

type Project = {
  id: string;
  name: string;
  category: Category;
  image: string;
  alt: string;
  url: string;
  caseStudy: string; // file in /public/case-studies
  problem: string;
  solution: string;
  features: string[];
  outcome: string;
  // Optional per-project overrides for the two card CTAs (default to dict labels).
  liveLabel?: string;
  caseLabel?: string;
  // When true, the live CTA opens the on-page chat widget instead of navigating.
  openChat?: boolean;
};

// Project case-study copy lives in code (English brand content); the UI chrome
// - titles, filters, labels, metrics, CTAs - comes from the locale dictionary.
// Order matches the approved grid: Row1 Aura/VAREZA, Row2 CRM/AI Proposal,
// Row3 PDF Merger / Future Innovation Slot.
const PROJECTS: Project[] = [
  {
    id: "ai-sales-engineer",
    name: "AI Sales Engineer",
    category: "ai",
    image: "/portfolio/chatbot.PNG",
    alt: "AI Sales Engineer chatbot built by Zyverra Labs",
    url: "/",
    caseStudy: "/case-studies/ai-sales-engineer",
    liveLabel: "Try Live Experience",
    caseLabel: "View Case Study",
    openChat: true,
    problem:
      "Businesses lose leads because website visitors leave without ever speaking to a salesperson.",
    solution:
      "An AI-powered sales assistant that engages visitors, qualifies leads, answers questions, captures contact details, and stores every conversation automatically.",
    features: [
      "AI Chat Assistant",
      "Lead Qualification",
      "Lead Scoring",
      "CRM Integration",
      "Conversation Memory",
      "RAG Retrieval",
    ],
    outcome:
      "Converts website visitors into qualified leads while reducing manual sales effort.",
  },
  {
    id: "aura",
    name: "Aura Manufacturers",
    category: "client",
    image: "/portfolio/aura.PNG",
    alt: "Aura Manufacturers website built by Zyverra Labs",
    url: "https://www.auramanufacturers.com/",
    caseStudy: "/case-studies/aura-manufacturers",
    problem:
      "An established manufacturer was invisible to modern B2B buyers - no credible digital presence to win supplier research.",
    solution:
      "A fast, conversion-focused web platform that presents Aura's capabilities and turns research into enquiries.",
    features: ["Capability showcase", "Performance-optimized", "SEO-ready", "Lead capture"],
    outcome:
      "A credible digital front door that competes with larger players and generates inbound enquiries.",
  },
  {
    id: "vareza",
    name: "VAREZA",
    category: "client",
    image: "/portfolio/vareza.PNG",
    alt: "VAREZA e-commerce store built by Zyverra Labs",
    url: "https://vareza.pk/",
    caseStudy: "/case-studies/vareza",
    problem:
      "An online store risked losing customers to slow pages, a clunky checkout, and a generic look.",
    solution:
      "A performance-engineered, premium storefront with a short, friction-free path to purchase.",
    features: ["Mobile-first store", "Streamlined checkout", "Premium UI", "Optimized speed"],
    outcome:
      "A smoother browse-to-buy journey that reduces drop-off and elevates the brand.",
  },
  {
    id: "crm",
    name: "Employee Management CRM",
    category: "systems",
    image: "/portfolio/crms.PNG",
    alt: "Employee Management CRM dashboard built by Zyverra Labs",
    url: "https://crms-tan.vercel.app/",
    caseStudy: "/case-studies/employee-management-crm",
    problem:
      "Employee records and operations were managed manually across scattered files - slow, risky, no access control.",
    solution:
      "A custom CRM that centralizes employee data, enforces role-based access, and tracks operations.",
    features: ["Centralized records", "Role-based access", "Operations tracking", "Admin dashboard"],
    outcome:
      "Centralized operations, secured data, and faster, more reliable day-to-day administration.",
  },
  {
    id: "ai-proposal",
    name: "AI Proposal Generator",
    category: "ai",
    image: "/portfolio/proposal-generator.PNG",
    alt: "AI Proposal Generator app built by Zyverra Labs",
    url: "https://ai-proposal-generator-eta-three.vercel.app/",
    caseStudy: "/case-studies/ai-proposal-generator",
    problem:
      "Writing tailored proposals by hand was slow, inconsistent, and a bottleneck on closing deals.",
    solution:
      "An AI product that drafts customized, professional proposals in seconds from a few inputs.",
    features: ["AI-generated drafts", "Custom templates", "Consistent tone", "Instant turnaround"],
    outcome:
      "Proposals from hours to seconds, standardized quality, and faster responses to opportunities.",
  },
  {
    id: "pdf-merger",
    name: "PDF Merger",
    category: "systems",
    image: "/portfolio/mergepdf.PNG",
    alt: "PDF Merger web app built by Zyverra Labs",
    url: "https://pdf-merger-liard.vercel.app/",
    caseStudy: "/case-studies/pdf-merger",
    problem:
      "Merging PDFs meant clunky installs, paywalls, or uploading sensitive files to unknown servers.",
    solution:
      "A fast, zero-install web tool that merges PDFs privately, right in the browser.",
    features: ["In-browser merge", "Private / no upload", "Instant output", "Zero-install"],
    outcome:
      "A recurring chore reduced to a fast, private, free task - practical, privacy-first engineering.",
  },
];

const FEATURED = {
  name: "LandChain",
  image: "/portfolio/landchain.PNG",
  alt: "LandChain blockchain land-record system built by Zyverra Labs",
  problem:
    "Land records are paper-based and centrally controlled - vulnerable to tampering, fraud, and slow disputes.",
  solution:
    "A blockchain land-record system with on-chain ownership and smart-contract-enforced transfers.",
  tech: ["Blockchain", "Smart Contracts", "Web3", "Distributed Ledger"],
  outcome:
    "Property records that are transparent, tamper-resistant, and verifiable in seconds - not days.",
};

const PROCESS_ICONS = [Search, PenTool, Code2, Rocket] as const;
const FILTER_ORDER: FilterKey[] = ["all", "client", "systems", "ai", "innovation"];

// Ask the floating chat widget to open in-place (no navigation / new tab).
function openChatWidget() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("zyverra:open-chat"));
  }
}

// Animated number for the trust metrics. Counts up once when scrolled into view;
// renders the final value immediately under reduced-motion.
function StatValue({ value, animate }: { value: string; animate: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  // once: false so the count-up replays every time the metric scrolls into view.
  const inView = useInView(ref, { once: false, amount: 0.6 });
  // Parse once into primitives. Keeping only primitives in the effect deps is
  // essential: a regex-match object would change identity every render and
  // restart the animation forever.
  const parsed = value.match(/^(\d+)(.*)$/);
  const isNumeric = parsed !== null;
  const target = isNumeric ? parseInt(parsed[1], 10) : 0;
  const suffix = isNumeric ? parsed[2] : "";
  const [display, setDisplay] = useState(() => (isNumeric && animate ? 0 : target));

  useEffect(() => {
    if (!isNumeric || !animate) {
      setDisplay(target);
      return;
    }
    // Reset to zero whenever it leaves the viewport so re-entry replays the count.
    if (!inView) {
      setDisplay(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1000;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, animate, isNumeric, target]);

  return (
    <div ref={ref} className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
      {isNumeric ? `${display}${suffix}` : value}
    </div>
  );
}

export default function PortfolioSection({ dict }: { dict: Dictionary["portfolio"] }) {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState<FilterKey>("all");

  const counts: Record<FilterKey, number> = {
    all: PROJECTS.length,
    client: PROJECTS.filter((p) => p.category === "client").length,
    systems: PROJECTS.filter((p) => p.category === "systems").length,
    ai: PROJECTS.filter((p) => p.category === "ai").length,
    innovation: 1, // LandChain, shown as the featured anchor
  };

  const visible =
    active === "all"
      ? PROJECTS
      : active === "innovation"
        ? []
        : PROJECTS.filter((p) => p.category === active);

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-16"
    >
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">
          {dict.eyebrow}
        </div>
        <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {dict.title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">{dict.description}</p>
      </div>

      {/* Trust metrics */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {dict.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
            className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm"
          >
            <StatValue value={m.value} animate={!shouldReduceMotion} />
            <div className="mt-1.5 text-xs leading-snug text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Process strip */}
      <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-5 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.map((step, i) => {
            const Icon = PROCESS_ICONS[i] ?? Search;
            return (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
                className="relative flex items-start gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-xs font-bold text-border">{`0${i + 1}`}</span>
                    <h3 className="text-sm font-semibold text-foreground">{step.label}</h3>
                  </div>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{step.caption}</p>
                </div>
                {i < dict.process.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-2.5 top-5 hidden h-px w-5 bg-border lg:block"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Featured - LandChain (permanent anchor) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#062746] via-[#0a5aa0] to-[#007acc] shadow-xl"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]"
        />
        <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-100">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {dict.featured.tag}
            </span>
            <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {FEATURED.name}
            </h3>

            <div className="mt-4 space-y-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-amber-300">
                  {dict.card.problem}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-sky-50">{FEATURED.problem}</p>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-sky-300">
                  {dict.card.solution}
                </div>
                <p className="mt-1 text-sm leading-relaxed text-sky-100/90">{FEATURED.solution}</p>
              </div>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {FEATURED.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-5">
              <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-300">
                {dict.card.outcome}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-white">{FEATURED.outcome}</p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <motion.a
                href="#contact"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                {dict.featured.discuss}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
              </motion.a>
              <motion.a
                href="/case-studies/LandChain_Client_Documentation.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
                aria-label={`${dict.featured.documentation} (PDF, opens in new tab)`}
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                {dict.featured.documentation}
              </motion.a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white shadow-lg">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src={FEATURED.image}
                alt={FEATURED.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-1.5"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category filters */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="mt-10 hidden flex-wrap justify-center gap-2 sm:flex"
      >
        {FILTER_ORDER.map((key) => {
          const isActive = key === active;
          return (
            <motion.button
              key={key}
              type="button"
              onClick={() => setActive(key)}
              aria-pressed={isActive}
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-foreground hover:border-primary/30"
              }`}
            >
              {dict.filters[key]}
              <span className={`ms-2 text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {counts[key]}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Live region announces filtered result count for assistive tech */}
      <p className="sr-only" aria-live="polite">
        {visible.length} projects shown
      </p>

      {/* Project grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <motion.article
              key={p.id}
              layout={!shouldReduceMotion}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: shouldReduceMotion ? 0 : i * 0.05 }}
              className="group flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border bg-gradient-to-br from-secondary/70 to-muted">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    {!shouldReduceMotion && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  {dict.statusLive}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm">
                  {dict.filters[p.category]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-amber-600">
                    {dict.card.problem}
                  </div>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">{p.problem}</p>
                </div>

                <div className="mt-3">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    {dict.card.solution}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.solution}</p>
                </div>

                <div className="mt-3 hidden sm:block">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {dict.card.features}
                  </div>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {p.features.map((f) => (
                      <motion.li
                        key={f}
                        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.06 }}
                        transition={{ type: "spring", stiffness: 420, damping: 18 }}
                        className="cursor-default rounded-full border border-border bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                      >
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">
                    {dict.card.outcome}
                  </div>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">{p.outcome}</p>
                </div>

                <div className="mt-4 flex flex-col items-start gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="max-w-full truncate text-sm font-semibold text-foreground">{p.name}</span>
                  <div className="flex shrink-0 items-center gap-3">
                    <a
                      href={p.caseStudy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                      aria-label={`${p.name} - ${p.caseLabel ?? dict.caseStudy} (opens in new tab)`}
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      {p.caseLabel ?? dict.caseStudy}
                    </a>
                    {p.openChat ? (
                      <button
                        type="button"
                        onClick={openChatWidget}
                        className="group/btn inline-flex items-center gap-1 text-sm font-semibold text-primary"
                        aria-label={`${p.liveLabel ?? dict.visit}: ${p.name}`}
                      >
                        {p.liveLabel ?? dict.visit}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 rtl:rotate-180" aria-hidden="true" />
                      </button>
                    ) : (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center gap-1 text-sm font-semibold text-primary"
                        aria-label={`${p.liveLabel ?? dict.visit}: ${p.name} (opens in new tab)`}
                      >
                        {p.liveLabel ?? dict.visit}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Closing CTA */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
        <span className="text-sm font-medium text-muted-foreground">{dict.closing.text}</span>
        <a
          href="#contact"
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
        >
          {dict.closing.cta}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
        </a>
      </div>
    </section>
  );
}
