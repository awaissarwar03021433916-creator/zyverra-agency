"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { track, type TrackEvent } from "@/lib/analytics";

/** Fires a consent-aware event once, the first time its content is half visible. */
export function TrackView({
  event,
  params,
  children,
  className,
}: {
  event: TrackEvent;
  params?: Record<string, string>;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track(event, { page_path: window.location.pathname, ...params });
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [event, params]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
