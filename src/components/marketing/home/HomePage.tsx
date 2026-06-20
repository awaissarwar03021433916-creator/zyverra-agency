"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, Bot, Boxes, Building2, CheckCircle2, Code2, Cpu, Eye, Gauge, GitBranch, Globe, GraduationCap, HeartPulse, Landmark, LayoutDashboard, MessageSquare, Palette, Phone, Plane, Rocket, Search, ShieldCheck, ShoppingBag, Truck, Users, Workflow, X } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

import Navbar from "@/components/marketing/navbar/Navbar";
import PortfolioSection from "@/components/marketing/home/PortfolioSection";
import Footer from "@/components/layout/Footer";
import { fadeIn } from "@/animations/motion/variants";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";

const ContactForm = dynamic(() => import("@/components/forms/ContactForm"), {
  ssr: false,
  loading: () => <div className="h-60 animate-pulse rounded-xl bg-muted/40" aria-hidden="true" />,
});

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}

// Icons live in code (not in the dictionaries); text comes from the dictionary
// and is merged by index.
const SERVICE_ICONS = [Bot, Workflow, LayoutDashboard, Globe, Code2] as const;
const HERO_ICONS = [Bot, Workflow, Boxes] as const;
const PROCESS_ICONS = [Search, Palette, Code2, Rocket] as const;
const ABOUT_ICONS = [Cpu, Workflow, ShieldCheck, MessageSquare] as const;
const WHY_ICONS = [Cpu, GitBranch, Gauge, MessageSquare, Eye, Users] as const;
// Industry icons + imagery for the "Businesses We Scale Every Day" marquee.
// Labels are translated and come from the dictionary; these are merged by index.
const INDUSTRY_ICONS = [ShoppingBag, HeartPulse, Landmark, Rocket, Truck, GraduationCap, Building2, Plane] as const;
const INDUSTRY_IMAGES = [
  "/industries/ecommerce.jpg",
  "/industries/healthcare.jpg",
  "/industries/fintech.jpg",
  "/industries/saas.jpg",
  "/industries/logistics.jpg",
  "/industries/education.jpg",
  "/industries/realestate.jpg",
  "/industries/hospitality.jpg",
] as const;
// Per-step color accents for the colored "How we work" section. Listed as full
// literal class strings so Tailwind's scanner generates them.
const PROCESS_ACCENTS = [
  { chip: "bg-sky-400", num: "text-sky-300", bar: "from-sky-400 to-blue-500" },
  { chip: "bg-cyan-400", num: "text-cyan-300", bar: "from-cyan-400 to-sky-500" },
  { chip: "bg-blue-400", num: "text-blue-300", bar: "from-blue-400 to-indigo-500" },
  { chip: "bg-indigo-400", num: "text-indigo-300", bar: "from-indigo-400 to-violet-500" },
] as const;

export default function HomePage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const shouldReduceMotion = useReducedMotion();

  const services = dict.services.items.map((item, i) => ({
    ...item,
    icon: SERVICE_ICONS[i] ?? Bot,
  }));
  const heroOfferings = dict.hero.offerings.map((item, i) => ({
    ...item,
    icon: HERO_ICONS[i] ?? Bot,
  }));
  const processSteps = dict.process.steps.map((item, i) => ({
    ...item,
    icon: PROCESS_ICONS[i] ?? Search,
  }));
  const aboutPrinciples = dict.about.principles.map((item, i) => ({
    ...item,
    icon: ABOUT_ICONS[i] ?? Cpu,
  }));
  const whyReasons = dict.why.items.map((item, i) => ({
    ...item,
    icon: WHY_ICONS[i] ?? Cpu,
  }));
  const industries = dict.industries.items.map((label, i) => ({
    label,
    icon: INDUSTRY_ICONS[i] ?? Boxes,
    image: INDUSTRY_IMAGES[i] ?? INDUSTRY_IMAGES[0],
  }));

  const testimonials = [
    {
      quote:
        "Zyverra Labs delivered a workflow automation system that our team can actually trust and scale.",
      name: "Ava Thompson",
      role: "Head of Operations",
      company: "NimbusHQ",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
    {
      quote:
        "The UI polish and motion design felt premium from day one, and our conversions improved immediately.",
      name: "Noah Kim",
      role: "Founder",
      company: "Arcadia AI",
      avatar: "https://i.pravatar.cc/120?img=33",
    },
    {
      quote:
        "They engineered the platform like a real product: clean contracts, reliable data, strong performance.",
      name: "Maya Patel",
      role: "Product Lead",
      company: "HelioSaaS",
      avatar: "https://i.pravatar.cc/120?img=5",
    },
  ] as const;

  const heroContainer: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const heroItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const offeringCount = heroOfferings.length;
  const [activeOffering, setActiveOffering] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveOffering((prev) => (prev + 1) % offeringCount);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, offeringCount]);

  // "Free 30-min call" modal: reuses the existing ContactForm in a popup.
  const [callOpen, setCallOpen] = useState(false);

  useEffect(() => {
    if (!callOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCallOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [callOpen]);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, testimonials.length]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar dict={dict.nav} lang={lang} />

      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
          <div className="pointer-events-none absolute inset-0 animate-hero-grid opacity-60 [background-image:linear-gradient(rgba(15,26,36,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,26,36,0.045)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
          <motion.div
            className="absolute left-1/2 top-[-24%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            animate={shouldReduceMotion ? {} : { y: [0, 22, 0], opacity: [0.55, 0.85, 0.55] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-8rem] top-[16%] hidden h-[26rem] w-[26rem] rounded-full bg-sky-400/10 blur-3xl md:block"
            animate={shouldReduceMotion ? {} : { x: [0, -18, 0], y: [0, 16, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
        </div>

        <section
          id="top"
          className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 md:pb-28 md:pt-20"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Copy */}
            <motion.div initial="hidden" animate="visible" variants={heroContainer}>
              <motion.div
                variants={heroItem}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {dict.hero.badge}
              </motion.div>

              <motion.h1
                variants={heroItem}
                className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                {dict.hero.headingPrefix}{" "}
                <span className="relative inline-flex">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={heroOfferings[activeOffering].label}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                      transition={{ duration: 0.32, ease: "easeOut" }}
                      className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent"
                    >
                      {heroOfferings[activeOffering].label}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <br />
                {dict.hero.headingSuffix}
              </motion.h1>

              <motion.p
                variants={heroItem}
                className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
              >
                {dict.hero.paragraph}
              </motion.p>

              <motion.div
                variants={heroItem}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#contact"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md active:translate-y-0"
                >
                  {dict.hero.ctaPrimary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted active:translate-y-0"
                >
                  {dict.hero.ctaSecondary}
                </a>
              </motion.div>

              <motion.div variants={heroItem} className="mt-10 border-t border-border pt-6">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {dict.hero.trust.map((item) => (
                    <div
                      key={item}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Visual: the three offerings, explicit */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/10 via-sky-400/5 to-transparent blur-2xl" />

              <div className="rounded-2xl border border-border bg-card p-2 shadow-xl">
                <div className="flex items-center gap-1.5 px-3 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  <span className="ms-3 text-xs font-medium text-muted-foreground">
                    zyverralabs.com
                  </span>
                </div>

                <div className="rounded-xl bg-secondary/60 p-3">
                  <div className="grid gap-2.5">
                    {heroOfferings.map((offering, i) => {
                      const isActive = i === activeOffering;
                      return (
                        <div
                          key={offering.label}
                          className={`flex items-start gap-3 rounded-xl border p-4 transition-all duration-300 ${
                            isActive
                              ? "border-primary/40 bg-background shadow-sm"
                              : "border-transparent bg-background/50"
                          }`}
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${
                              isActive
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-primary"
                            }`}
                          >
                            <offering.icon className="h-5 w-5" />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-foreground">
                              {offering.label}
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                              {offering.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">
                      {dict.hero.panelNote}
                    </span>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:block"
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="font-heading text-xl font-semibold text-foreground">3</div>
                <div className="text-[11px] text-muted-foreground">{dict.hero.capabilities}</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Industries marquee */}
      <section
        id="industries"
        className="relative overflow-hidden border-y border-border bg-gradient-to-b from-primary/[0.06] via-primary/[0.03] to-background py-14 md:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              {dict.industries.eyebrow}
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {dict.industries.title}
            </h2>
          </motion.div>
        </div>

        {/* dir=ltr keeps the loop math identical in RTL locales (Urdu/Arabic),
            so the strip scrolls and wraps seamlessly in every language. */}
        <div
          dir="ltr"
          className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
        >
          <div className="flex w-max animate-marquee gap-5 pr-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...industries, ...industries].map((item, idx) => (
              <div
                key={`${item.label}-${idx}`}
                className="relative h-40 w-64 shrink-0 overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm sm:h-44 sm:w-72"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="288px"
                  className="object-cover"
                  loading="lazy"
                  aria-hidden={idx >= industries.length}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04121f]/90 via-[#04121f]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-white">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-16">
        <SectionHeading
          eyebrow={dict.services.eyebrow}
          title={dict.services.title}
          description={dict.services.description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
            >
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-sky-500 transition-transform duration-300 group-hover:scale-x-100" />
                <span className="absolute end-6 top-6 font-heading text-sm font-semibold text-border">
                  {`0${idx + 1}`}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {s.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-foreground/80"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="group/link mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary"
                >
                  {dict.services.learnMore}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-16">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              {dict.about.eyebrow}
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {dict.about.title}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              {dict.about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {dict.about.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <h3 className="font-heading text-lg font-semibold text-foreground">
              {dict.about.panelTitle}
            </h3>
            <div className="mt-6 space-y-5">
              {aboutPrinciples.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio — problem-led case-study showcase */}
      <PortfolioSection dict={dict.portfolio} />

      {/* Development Process — full-color section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#062746] via-[#0a5aa0] to-[#007acc]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-6rem] h-80 w-80 rounded-full bg-sky-400/20 blur-3xl"
        />

        <section
          id="process"
          className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-20"
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-300">
              {dict.process.eyebrow}
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              {dict.process.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-sky-100/80">{dict.process.description}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, idx) => {
              const accent = PROCESS_ACCENTS[idx] ?? PROCESS_ACCENTS[0];
              return (
                <motion.div
                  key={step.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/30 hover:bg-white/15">
                    <span
                      className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent.bar}`}
                    />

                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${accent.chip} text-white shadow-md`}
                      >
                        <step.icon className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">{step.title}</span>
                      </span>
                      <span
                        className={`font-heading text-5xl font-bold leading-none ${accent.num}`}
                      >
                        {idx + 1}
                      </span>
                    </div>

                    <div className="mt-5 text-xs font-bold uppercase tracking-widest text-sky-300">
                      {`${dict.process.stepLabel} 0${idx + 1}`}
                    </div>
                    <h3 className="mt-1 text-lg font-bold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-sky-100/80">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Why Choose Us */}
      <div className="border-y border-border bg-gradient-to-b from-primary/[0.05] to-background">
      <section id="why" className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 md:pb-28 md:pt-20">
        <SectionHeading
          eyebrow={dict.why.eyebrow}
          title={dict.why.title}
          description={dict.why.description}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyReasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.06 }}
            >
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <reason.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </div>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 md:pb-28 md:pt-16"
      >
        <SectionHeading
          eyebrow={dict.testimonials.eyebrow}
          title={dict.testimonials.title}
          description={dict.testimonials.description}
        />

        <motion.div
          className="mt-10"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeTestimonial].name}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: shouldReduceMotion ? 0.2 : 0.42, ease: "easeOut" }}
              >
                <Card className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                  <div className="flex items-center gap-4">
                    <Avatar size="lg" className="ring-2 ring-primary/25">
                      <AvatarImage
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        loading="lazy"
                      />
                      <AvatarFallback>
                        {testimonials[activeTestimonial].name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base font-semibold text-foreground">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonials[activeTestimonial].role}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
                    {testimonials[activeTestimonial].company}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                    “{testimonials[activeTestimonial].quote}”
                  </p>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="mt-5 flex items-center justify-center gap-2"
            aria-label="Testimonial carousel indicators"
          >
            {testimonials.map((t, idx) => {
              const isActive = idx === activeTestimonial;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    isActive ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-primary/70"
                  }`}
                  aria-label={t.name}
                  aria-current={isActive}
                />
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Free call CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-6 pt-4 sm:px-6 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062746] via-[#0a5aa0] to-[#007acc] px-6 py-12 text-center shadow-xl sm:px-12 sm:py-14"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"
            animate={shouldReduceMotion ? {} : { x: [0, 20, 0], y: [0, -16, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              {dict.callCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sky-100/85 sm:text-base">
              {dict.callCta.description}
            </p>

            <motion.button
              type="button"
              onClick={() => setCallOpen(true)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group relative mt-8 inline-flex h-13 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-lg sm:text-base"
            >
              <span
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-white"
              />
              {!shouldReduceMotion && (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/40"
                />
              )}
              <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
              {dict.callCta.button}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 md:pb-32 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10"
        >
          <div className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                {dict.contact.eyebrow}
              </div>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {dict.contact.title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {dict.contact.description}
              </p>

              <ul className="mt-7 space-y-3">
                {dict.contact.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6">
              <div className="text-sm font-semibold text-foreground">{dict.contact.formTitle}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {dict.contact.formDescription}
              </p>
              <div className="mt-4">
                <ContactForm dict={dict.contactForm} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer dict={dict.footer} lang={lang} />

      {/* Free 30-min call modal — same ContactForm, shown in a popup */}
      <AnimatePresence>
        {callOpen && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={dict.callCta.formTitle}
          >
            <div
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setCallOpen(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                    <Phone className="h-3.5 w-3.5" />
                    {dict.callCta.formTitle}
                  </div>
                  <h3 className="mt-2 font-heading text-xl font-bold tracking-tight text-foreground">
                    {dict.callCta.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCallOpen(false)}
                  aria-label="Close"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs transition-colors hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5">
                <ContactForm dict={dict.contactForm} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
