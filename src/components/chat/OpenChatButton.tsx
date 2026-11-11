"use client";

import { ArrowRight } from "lucide-react";

/** Opens the floating chat widget in place (no navigation). */
export function OpenChatButton({ children = "Try our live AI agent" }: { children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("zyverra:open-chat"))}
      className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md motion-reduce:hover:translate-y-0"
    >
      {children}
      <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}
