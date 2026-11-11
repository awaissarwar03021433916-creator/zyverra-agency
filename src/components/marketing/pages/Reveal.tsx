"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Scroll-reveal wrapper, CSS-only (no animation library on the critical path).
//
// Content renders visible in the server HTML. After hydration, only elements
// that start *below* the viewport are hidden and then faded in as they scroll
// into view — so nothing on screen at load ever flashes, LCP is unaffected,
// and if JavaScript fails everything simply stays visible. Reduced motion is
// handled by the global prefers-reduced-motion rule.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "pending" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    // Hiding happens in the observer callback (not synchronously in the effect)
    // so the element is never hidden while it could be visible.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("shown");
            io.disconnect();
          } else {
            setState((s) => (s === "static" ? "pending" : s));
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={state}
      style={delay && state !== "static" ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </div>
  );
}
