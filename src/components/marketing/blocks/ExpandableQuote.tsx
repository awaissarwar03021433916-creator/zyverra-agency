"use client";

import { useState, type ReactNode } from "react";

// Clamps a long testimonial to ~5 lines with a soft fade. The full text is
// always in the server-rendered HTML (only visually clipped), so crawlers and
// screen readers get all of it. Expanding is user-initiated, so it never
// counts toward CLS.
export function ExpandableQuote({ id, children }: { id: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div id={id} className={`relative ${open ? "" : "max-h-[9.5rem] overflow-hidden"}`}>
        {children}
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card via-card/80 to-transparent"
          />
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="mt-3 inline-flex items-center self-start rounded-md text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        {open ? "Show less" : "Read more"}
      </button>
    </>
  );
}
