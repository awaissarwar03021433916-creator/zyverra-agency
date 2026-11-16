"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";

import { Reveal } from "@/components/marketing/pages/Reveal";

const MOBILE_QUERY = "(max-width: 767.98px)";
// Each card rests ~1s on top, then takes EXIT_MS to fly out.
const INTERVAL_MS = 1600;
const EXIT_MS = 600;

// Testimonial cards. On desktop/tablet (md+) this is a plain grid. On phones
// it becomes a stacked card deck: the front card flies off to the left every
// few seconds and rejoins at the back. All cards stay in the HTML at all times
// (crawlers see every review); the deck is only CSS transforms on the same
// elements, so there is no layout shift. Auto-rotation pauses when the deck is
// off screen, the tab is hidden, the user interacts, or prefers-reduced-motion.
export function TestimonialDeck({ cards, labels }: { cards: ReactNode[]; labels: string[] }) {
  const n = cards.length;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [resetting, setResetting] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const busy = useRef(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setIsMobile(mq.matches);
      setReducedMotion(rm.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    rm.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      rm.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const el = deckRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    const prev = active;
    setActive((prev + 1) % n);
    setLeaving(prev);
    window.setTimeout(() => {
      setLeaving(null);
      setResetting(prev); // jump (no transition) to a hidden slot behind the deck…
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setResetting(null); // …then ease into the back position.
          busy.current = false;
        })
      );
    }, EXIT_MS);
  }, [active, n]);

  const prevCard = useCallback(() => {
    if (busy.current) return;
    setActive((a) => (a - 1 + n) % n);
  }, [n]);

  // Rotation is automatic and keeps going after swipes and dot taps. It only
  // holds while someone has a review expanded with "Read more" (so the card
  // they're reading doesn't fly away) or has pressed the pause button.
  const [reading, setReading] = useState(false);
  useEffect(() => {
    if (!isMobile || !playing || reading || !inView || reducedMotion) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") next();
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [isMobile, playing, reading, inView, reducedMotion, next]);

  const syncReading = () =>
    requestAnimationFrame(() => setReading(Boolean(deckRef.current?.querySelector('[aria-expanded="true"]'))));

  const pos = (i: number) =>
    i === leaving ? "exit" : i === resetting ? "reset" : String((i - active + n) % n);

  return (
    <div className="max-md:-mx-4 max-md:overflow-x-clip max-md:px-4">
      <div
        ref={deckRef}
        role="region"
        aria-label="Client reviews"
        className="t-deck mt-10 grid gap-5 max-md:items-stretch max-md:pb-8 md:grid-cols-2 md:items-start lg:grid-cols-3"
        onClick={syncReading}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (!isMobile || touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (dx < -40) next();
          else if (dx > 40) prevCard();
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`t-card ${
              i === 2
                ? "md:col-span-2 md:mx-auto md:w-[calc(50%-0.625rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
                : ""
            }`}
            data-pos={pos(i)}
            inert={isMobile && pos(i) !== "0" ? true : undefined}
          >
            <Reveal delay={i * 0.12} className="h-full">
              {card}
            </Reveal>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 md:hidden">
        <div className="flex items-center gap-1">
          {labels.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-label={`Show review ${i + 1} by ${label}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => {
                if (!busy.current) setActive(i);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full"
            >
              <span
                aria-hidden
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-primary" : "w-2 bg-foreground/25"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause automatic rotation" : "Play automatic rotation"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground/70"
        >
          {playing ? <Pause aria-hidden className="h-3.5 w-3.5" /> : <Play aria-hidden className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
