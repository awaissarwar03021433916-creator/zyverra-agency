"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Small scroll-reveal wrapper used across the content pages. Respects
// prefers-reduced-motion by skipping the transform/opacity animation.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: shouldReduceMotion ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}
