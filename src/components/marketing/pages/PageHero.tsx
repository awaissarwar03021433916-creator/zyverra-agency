"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Premium, animated hero shared by the standalone marketing pages. Mirrors the
// home hero's visual language (animated grid + floating gradient blobs) so the
// pages feel like part of the same product, with a badge, gradient headline,
// optional actions, and trust chips so the hero never reads as empty.
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  chips,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  chips?: string[];
}) {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 animate-hero-grid opacity-60 [background-image:linear-gradient(rgba(15,26,36,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,26,36,0.045)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />

        <motion.div
          className="absolute left-1/2 top-[-22%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          animate={shouldReduceMotion ? {} : { y: [0, 26, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-7rem] top-[8%] hidden h-[26rem] w-[26rem] rounded-full bg-sky-400/10 blur-3xl md:block"
          animate={shouldReduceMotion ? {} : { x: [0, -22, 0], y: [0, 18, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-26%] left-[-6rem] hidden h-[24rem] w-[24rem] rounded-full bg-indigo-400/10 blur-3xl md:block"
          animate={shouldReduceMotion ? {} : { x: [0, 20, 0], y: [0, -16, 0] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>

      <motion.div
        className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 md:py-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              {!shouldReduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>

        {actions && (
          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {actions}
          </motion.div>
        )}

        {chips && chips.length > 0 && (
          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            {chips.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-medium text-foreground/90 shadow-xs backdrop-blur"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {chip}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
