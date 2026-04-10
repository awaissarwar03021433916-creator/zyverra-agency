"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Code2, Palette, Rocket, Search, ShieldCheck, Sparkles, Wand2, Zap } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

import Navbar from "@/components/marketing/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import { fadeIn, scaleHover, scrollReveal, slideUp } from "@/animations/motion/variants";

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
      <div className="text-xs font-semibold tracking-widest text-primary/80">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function AnimatedHeadline({ text }: { text: string }) {
  const seed = useId();

  return (
    <motion.h1
      key={seed}
      className="text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <span className="animate-gradient bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {text}
      </span>
    </motion.h1>
  );
}

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  const services = [
    {
      title: "AI Automation",
      description:
        "From lead capture to internal workflows, we build AI systems that deliver measurable outcomes.",
      icon: Sparkles,
      href: "#contact",
    },
    {
      title: "AI Agents Development",
      description:
        "We design and deploy intelligent AI agents that automate workflows, interact with customers, analyze data, and operate autonomously across your systems.",
      icon: Zap,
      href: "#contact",
    },
    {
      title: "SaaS Development",
      description:
        "Premium product engineering for modern teams: scalable, secure, and delightful to use.",
      icon: Wand2,
      href: "#contact",
    },
    {
      title: "Startup Websites",
      description:
        "High-conversion marketing sites with motion, performance, and a premium visual language.",
      icon: Sparkles,
      href: "#portfolio",
    },
  ] as const;

  const portfolio = [
    {
      title: "SupportFlow AI Suite",
      description: "AI-first customer support platform that reduced first-response time by 62% in 8 weeks.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Team reviewing analytics dashboard on a large screen",
      href: "#contact",
    },
    {
      title: "PulseBoard SaaS Analytics",
      description: "Premium B2B analytics dashboard with real-time insights and role-aware data views.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Modern product analytics charts on desktop and tablet devices",
      href: "#contact",
    },
    {
      title: "CloudGrid Workflow OS",
      description: "Enterprise automation workspace streamlining approvals, alerts, and cross-team delivery.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Professionals collaborating over a workflow process diagram",
      href: "#contact",
    },
  ] as const;

  const process = [
    {
      title: "Discovery",
      description:
        "We align on business goals, user pain points, and success metrics before a single screen is built.",
      icon: Search,
    },
    {
      title: "Design",
      description:
        "We shape premium UX, scalable design systems, and high-converting interaction flows.",
      icon: Palette,
    },
    {
      title: "Development",
      description:
        "We implement robust architecture with clean APIs, testing, and production-ready performance.",
      icon: Code2,
    },
    {
      title: "Launch",
      description:
        "We release with monitoring, optimization loops, and handoff support for sustained growth.",
      icon: Rocket,
    },
  ] as const;

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
        "The UI polish and motion design felt premium from day one—our conversions improved immediately.",
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

  const quickProof = [
    "Launch-ready architecture",
    "Security-first API patterns",
    "Conversion-focused UX",
  ] as const;
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
      <Navbar />

      {/* Animated background for hero */}
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 animate-hero-grid opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:48px_48px]"
            aria-hidden
          />
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(130deg, rgba(63,79,255,0.18), rgba(139,92,246,0.16), rgba(217,70,239,0.18))",
              backgroundSize: "180% 180%",
            }}
            animate={shouldReduceMotion ? { backgroundPosition: "0% 50%" } : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute left-1/2 top-[-30%] hidden h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-3xl md:block"
            initial={{ x: "-50%", y: 0 }}
            animate={shouldReduceMotion ? { x: "-50%", y: 0 } : { x: "-50%", y: [0, 18, 0] }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute -left-24 top-[-10%] hidden h-[24rem] w-[24rem] rounded-full bg-accent/20 blur-3xl md:block"
            initial={{ x: 0, y: 0 }}
            animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, 20, 0], y: [0, 12, 0] }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: "easeInOut" }
            }
          />
          <motion.div
            className="absolute right-[-6rem] top-[10%] hidden h-[30rem] w-[30rem] rounded-full bg-accent/20 blur-3xl md:block"
            initial={{ x: 0, y: 0 }}
            animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, -18, 0], y: [0, 14, 0] }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 15, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 10%, rgba(99,102,241,0.35), transparent 35%), radial-gradient(circle at 80% 30%, rgba(139,92,246,0.25), transparent 40%), radial-gradient(circle at 60% 90%, rgba(34,211,238,0.18), transparent 45%)",
            }}
            animate={{ opacity: [0.55, 0.7, 0.55] }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,rgba(2,6,23,0.85)_55%,rgba(2,6,23,1)_100%)]" />
        </div>

        <section
          id="top"
          className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 md:pb-20 md:pt-28"
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(99,102,241,0.2)]" />
                Premium AI delivery for product teams
              </div>

              <div className="mt-6">
                <AnimatedHeadline text="AI Automation and SaaS Development that scales with confidence." />
              </div>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Zyverra Labs designs and ships high-converting AI products with strong architecture,
                polished interactions, and production-ready engineering.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.a
                  href="#contact"
                  className="inline-flex group/cta1"
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                >
                  <Button className="h-11 px-6">
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.a>
                <motion.a
                  href="#portfolio"
                  className="inline-flex group/cta2"
                  whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.01 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                >
                  <Button className="h-11">
                    View Our Work
                  </Button>
                </motion.a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <div className="rounded-full border border-border/40 bg-background/30 px-4 py-2">
                  Response time: <span className="text-foreground">same day</span>
                </div>
                <div className="rounded-full border border-border/40 bg-background/30 px-4 py-2">
                  Engineering quality: <span className="text-foreground">production-grade</span>
                </div>
              </div>

              <div className="mt-6 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
                {quickProof.map((item) => (
                  <div
                    key={item}
                    className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-background/20 px-3 py-2"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            >
              <motion.div
                className="pointer-events-none absolute -left-6 top-6 h-20 w-20 rounded-full bg-primary/30 blur-2xl"
                animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, 12, 0], y: [0, -10, 0] }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 7, repeat: Infinity, ease: "easeInOut" }
                }
              />
              <motion.div
                className="pointer-events-none absolute -right-4 bottom-10 h-16 w-16 rounded-full bg-[#22D3EE]/30 blur-2xl"
                animate={shouldReduceMotion ? { x: 0, y: 0 } : { x: [0, -10, 0], y: [0, 10, 0] }}
                transition={
                  shouldReduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
                }
              />
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 via-violet-500/15 to-fuchsia-500/15 blur-xl" />

              <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-background/50 p-6 backdrop-blur">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/30 blur-2xl" />
                  <div className="absolute right-0 top-8 h-28 w-28 rounded-full bg-accent/25 blur-2xl" />
                  <div className="absolute bottom-0 left-1/3 h-24 w-24 rounded-full bg-[#22D3EE]/15 blur-2xl" />
                </div>

                <div className="relative">
                  <div className="text-xs font-semibold tracking-widest text-primary/80">
                    LIVE DELIVERY SIGNALS
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                    Premium velocity for AI products
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    We combine validated schemas, rate limiting, and clean service layers so your AI features
                    behave predictably in production.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        Validation
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Zod contracts at the edges</div>
                    </div>
                    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold">
                        <Zap className="h-4 w-4 text-primary" />
                        Rate Limits
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Quota-aware, resilient APIs</div>
                    </div>
                    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
                      <div className="text-sm font-semibold">Observability</div>
                      <div className="mt-1 text-xs text-muted-foreground">Track quality & latency</div>
                    </div>
                    <div className="rounded-2xl border border-border/40 bg-background/30 p-4">
                      <div className="text-sm font-semibold">Delivery</div>
                      <div className="mt-1 text-xs text-muted-foreground">Fast iterations with polish</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 pb-20 pt-12 md:pb-28 md:pt-18">
        <SectionHeading
          eyebrow="SERVICES"
          title="Everything you need to launch premium AI."
          description="Four core offerings built for speed, quality, and long-term scalability."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, idx) => (
            <motion.div
              key={s.title}
              className="group relative transform-gpu"
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={shouldReduceMotion ? {} : { y: -14, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, duration: 0.45 }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl p-[1px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(59,130,246,0.92), rgba(168,85,247,0.75), rgba(236,72,153,0.75), rgba(34,211,238,0.85))",
                  backgroundSize: "220% 220%",
                }}
                animate={
                  shouldReduceMotion ? { backgroundPosition: "0% 50%" } : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
                }
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 5, repeat: Infinity, ease: "linear", delay: idx * 0.15 }}
              >
                <div className="h-full w-full rounded-3xl bg-background/78 backdrop-blur-sm" />
              </motion.div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(closest-side,rgba(217,70,239,0.3),transparent)] blur-md" />
              </div>

              <Card className="relative h-full rounded-3xl border-border/60 bg-background/55 p-7 backdrop-blur-md shadow-[0_0_0_1px_rgba(139,92,246,0.22),0_16px_44px_rgba(2,6,23,0.30)] transition-all duration-300 group-hover:shadow-[0_0_0_1px_rgba(236,72,153,0.28),0_26px_70px_rgba(217,70,239,0.24)]">
                <div className="flex items-start justify-between gap-3">
                  <motion.div
                    className="rounded-xl border border-border/50 bg-background/30 p-3"
                    whileHover={shouldReduceMotion ? {} : { rotate: [0, -6, 6, 0], scale: 1.08 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <s.icon className="h-5 w-5 text-primary transition-colors group-hover:text-fuchsia-400" />
                  </motion.div>
                </div>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{s.description}</p>
                <a href={s.href} className="mt-5 inline-flex group/link">
                  <Button
                    variant="outline"
                    className="border-border/60 bg-background/20 hover:bg-background/30"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Button>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-28 md:pt-14"
      >
        <SectionHeading
          eyebrow="PORTFOLIO"
          title="Work that feels premium—and performs."
          description="A few examples of the kinds of AI and SaaS platforms we deliver."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {portfolio.map((p, i) => (
            <motion.div
              key={p.title}
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              whileHover={shouldReduceMotion ? {} : { y: -8 }}
              className="group transform-gpu"
            >
              <Card className="relative overflow-hidden rounded-2xl border-border/60 bg-background/35 p-6 shadow-[0_12px_30px_rgba(2,6,23,0.25)] backdrop-blur transition-shadow duration-300 group-hover:shadow-[0_18px_46px_rgba(217,70,239,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border/40">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
                    animate={
                      shouldReduceMotion
                        ? { opacity: 0.7 }
                        : {
                            opacity: [0.6, 0.75, 0.6],
                          }
                    }
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {p.description}
                </p>
                <motion.a
                  href={p.href}
                  className="mt-6 inline-flex group/button"
                  variants={scaleHover}
                  initial="initial"
                  whileHover="hover"
                >
                  <Button
                    variant="outline"
                    className="h-10 border-border/60 bg-background/20 transition-all duration-300 hover:bg-background/30 group-hover/button:shadow-[0_0_18px_rgba(99,102,241,0.35)]"
                  >
                    View Case Study
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                  </Button>
                </motion.a>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Development Process */}
      <section id="process" className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-28 md:pt-14">
        <SectionHeading
          eyebrow="DEVELOPMENT PROCESS"
          title="A disciplined workflow built for shipping."
          description="Clear stages, strong contracts, and smooth execution from discovery to launch."
        />

        <div className="relative mt-10">
          <div className="pointer-events-none absolute left-[1.15rem] top-0 h-full w-px bg-border/60 md:hidden" />
          <motion.div
            className="pointer-events-none absolute left-[1.15rem] top-0 w-px origin-top bg-gradient-to-b from-violet-500 via-fuchsia-500 to-pink-500 md:hidden"
            initial={{ scaleY: 0, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ height: "100%" }}
          />

          <div className="pointer-events-none absolute left-0 top-5 hidden h-px w-full bg-border/60 md:block" />
          <motion.div
            className="pointer-events-none absolute left-0 top-5 hidden h-px origin-left bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 md:block"
            initial={{ scaleX: 0, opacity: 0.4 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ width: "100%" }}
          />

          <div className="grid gap-7 md:grid-cols-4 md:gap-5">
          {process.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.09 }}
              className="group relative pl-10 md:pl-0 md:pt-10"
            >
              <motion.div
                className="absolute left-0 top-1.5 z-10 md:left-1/2 md:top-0 md:-translate-x-1/2"
                animate={shouldReduceMotion ? {} : { y: [0, -5, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.15,
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/50 bg-background/90 shadow-[0_0_0_4px_rgba(99,102,241,0.18)]">
                  <step.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="sr-only">{step.title} step icon</span>
                </div>
              </motion.div>

              <div className="relative h-full rounded-2xl border border-border/60 bg-background/35 p-5 backdrop-blur md:p-6">
                <div className="pointer-events-none absolute -right-2 -top-3 text-5xl font-semibold text-primary/10">
                  {idx + 1}
                </div>
                <div className="text-sm font-semibold tracking-wide text-primary/90">
                  {step.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-28 md:pt-14"
      >
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="Trusted by teams who ship."
          description="Premium execution backed by reliable engineering and thoughtful design."
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
                <Card className="group rounded-2xl border-border/60 bg-background/35 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_42px_rgba(99,102,241,0.22)] md:p-8">
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
                      <div className="text-base font-semibold">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonials[activeTestimonial].role}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-semibold tracking-widest text-primary/80">
                    {testimonials[activeTestimonial].company}
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                    "{testimonials[activeTestimonial].quote}"
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
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={isActive}
                />
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Call To Action */}
      <section id="contact" className="mx-auto max-w-6xl px-4 pb-20 pt-8 md:pb-32 md:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/35 p-7 backdrop-blur md:p-10"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-[-20%] top-[-40%] h-[42rem] w-[42rem] rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute right-[-10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute bottom-[-20%] left-[20%] h-[26rem] w-[26rem] rounded-full bg-[#22D3EE]/10 blur-3xl" />
          </div>

          <div className="relative grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="text-xs font-semibold tracking-widest text-primary/80">
                READY WHEN YOU ARE
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Let’s build your next premium AI product.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
                Tell us what you’re shipping. We’ll respond with a focused plan and next steps.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-12 px-7 shadow-[0_0_0_1px_rgba(99,102,241,0.3)]">
                  <a href="#services">Start with Services</a>
                </Button>
                <Button variant="outline" asChild className="h-12 border-border/60 bg-background/15 hover:bg-background/25">
                  <a href="#top">Back to Top</a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-background/30 p-5">
              <div className="text-sm font-semibold">Project Inquiry</div>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                Share your goals and timeline. We will get back with clear next steps.
              </p>
              <div className="mt-4">
                <ContactForm />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

