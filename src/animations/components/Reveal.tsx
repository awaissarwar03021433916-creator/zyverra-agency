"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & {
  once?: boolean;
};

/**
 * Simple reveal wrapper used as a placeholder.
 * Later it can be replaced with a production-grade intersection observer approach.
 */
export function Reveal({ once = true, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    />
  );
}

