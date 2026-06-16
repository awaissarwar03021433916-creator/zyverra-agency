"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";

import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

export type NavbarProps = {
  dict: Dictionary["nav"];
  lang: Locale;
  brandLabel?: string;
  contactHref?: string;
};

/* ------------------------------------------------------------------ */
/* Language selector                                                   */
/* ------------------------------------------------------------------ */

type Language = { code: Locale; label: string; short: string };

const LANGUAGES: Language[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "ur", label: "اردو", short: "UR" },
  { code: "ar", label: "العربية", short: "AR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "es", label: "Español", short: "ES" },
];

/**
 * Inline SVG flags (24×16) so they render crisply on every platform,
 * unlike emoji flags, which don't display on Windows/Chrome.
 */
function FlagIcon({ code, className }: { code: Locale; className?: string }) {
  const cls = className ?? "h-3.5 w-5";

  const flag = (() => {
    switch (code) {
      case "en":
        return (
          <>
            <rect width="24" height="16" fill="#012169" />
            <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
            <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.4" />
            <rect x="9.6" width="4.8" height="16" fill="#fff" />
            <rect y="5.6" width="24" height="4.8" fill="#fff" />
            <rect x="10.8" width="2.4" height="16" fill="#C8102E" />
            <rect y="6.8" width="24" height="2.4" fill="#C8102E" />
          </>
        );
      case "ur":
        return (
          <>
            <rect width="24" height="16" fill="#01411C" />
            <rect width="6" height="16" fill="#fff" />
            <circle cx="15.4" cy="8" r="3.6" fill="#fff" />
            <circle cx="16.7" cy="8" r="3.1" fill="#01411C" />
            <polygon points="18.7,4.8 19.5,6 18.7,7.2 17.9,6" fill="#fff" />
          </>
        );
      case "ar":
        return (
          <>
            <rect width="24" height="16" fill="#006C35" />
            <rect x="4" y="6" width="16" height="1.6" rx="0.8" fill="#fff" />
            <rect x="4" y="9" width="12" height="1.4" rx="0.7" fill="#fff" />
          </>
        );
      case "de":
        return (
          <>
            <rect width="24" height="5.34" fill="#000" />
            <rect y="5.33" width="24" height="5.34" fill="#DD0000" />
            <rect y="10.66" width="24" height="5.34" fill="#FFCE00" />
          </>
        );
      case "fr":
        return (
          <>
            <rect width="8" height="16" fill="#0055A4" />
            <rect x="8" width="8" height="16" fill="#fff" />
            <rect x="16" width="8" height="16" fill="#EF4135" />
          </>
        );
      case "es":
        return (
          <>
            <rect width="24" height="4" fill="#AA151B" />
            <rect y="4" width="24" height="8" fill="#F1BF00" />
            <rect y="12" width="24" height="4" fill="#AA151B" />
          </>
        );
      default:
        return <rect width="24" height="16" fill="#cbd5e1" />;
    }
  })();

  return (
    <span
      className={`inline-block shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/5 ${cls}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 16" className="h-full w-full" preserveAspectRatio="none">
        {flag}
      </svg>
    </span>
  );
}

function LanguageSelector({
  current,
  label,
  onSelect,
}: {
  current: Locale;
  label: string;
  onSelect: (code: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const active = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${active.label}`}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-muted"
      >
        <FlagIcon code={active.code} />
        <span className="hidden sm:inline">{active.short}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <motion.ul
          role="listbox"
          aria-label={label}
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="absolute end-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          {LANGUAGES.map((language) => {
            const selected = language.code === current;
            return (
              <li key={language.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(language.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    selected
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <FlagIcon code={language.code} />
                  <span className="flex-1 text-start">{language.label}</span>
                  {selected ? <Check className="h-4 w-4" /> : null}
                </button>
              </li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

function scrollToHash(hash: string) {
  if (!hash.startsWith("#")) return;
  const id = hash.slice(1);
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar({
  dict,
  lang,
  brandLabel = "Zyverra Labs",
  contactHref = "#contact",
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const links = dict.links;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(
    typeof window !== "undefined" ? window.location.hash || "#top" : "#top"
  );

  const linkIds = useMemo(
    () => links.map((l) => l.href).concat(contactHref),
    [links, contactHref]
  );

  const switchLocale = useCallback(
    (code: Locale) => {
      if (code === lang) return;
      document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000; samesite=lax`;

      // Remember the exact scroll position so we can keep the user in place
      // across the locale change (see the restore effect below).
      if (typeof window !== "undefined") {
        sessionStorage.setItem("zyverra:scrollY", String(window.scrollY));
      }

      const segments = (pathname || "/").split("/");
      if (isLocale(segments[1] ?? "")) {
        segments[1] = code;
      } else {
        segments.splice(1, 0, code);
      }
      const nextPath = segments.join("/") || `/${code}`;
      // scroll: false stops Next from jumping to the top on navigation; the
      // hash is intentionally dropped so it never snaps to a stale section.
      router.push(nextPath, { scroll: false });
    },
    [lang, pathname, router]
  );

  // After a language switch the page re-renders under the new locale; restore
  // the saved scroll position once the new content has painted.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = sessionStorage.getItem("zyverra:scrollY");
    if (saved === null) return;
    sessionStorage.removeItem("zyverra:scrollY");
    const y = Number.parseInt(saved, 10);
    if (Number.isNaN(y)) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.scrollTo(0, y));
    });
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function handleClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setActiveHref(href);
    scrollToHash(href);
    window.history.replaceState(null, "", href);
    setOpen(false);
  }

  useEffect(() => {
    const ids = linkIds.map((h) => h.replace(/^#/, ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible[0]?.target instanceof HTMLElement) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [linkIds]);

  return (
    <>
    <motion.nav
      className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl"
      initial={false}
      animate={{
        boxShadow: scrolled
          ? "0 1px 3px 0 rgba(15,26,36,0.08), 0 1px 2px -1px rgba(15,26,36,0.06)"
          : "0 0 0 0 rgba(15,26,36,0)",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      aria-label="Primary"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand */}
        <a
          href="#top"
          className="group inline-flex items-center gap-2.5"
          aria-label={`${brandLabel}, home`}
          onClick={(e) => handleClick(e, "#top")}
        >
          <Image
            src="/zyverra-mark.png"
            alt={`${brandLabel} logo`}
            width={256}
            height={219}
            priority
            sizes="(max-width: 640px) 47px, 52px"
            className="h-10 w-auto transition-transform duration-200 group-hover:scale-105 sm:h-11"
          />
          <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {brandLabel}
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Right cluster */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSelector current={lang} label={dict.languageLabel} onSelect={switchLocale} />

          <a
            href={contactHref}
            onClick={(e) => handleClick(e, contactHref)}
            className="group inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {dict.contact}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector current={lang} label={dict.languageLabel} onSelect={switchLocale} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs transition-colors hover:bg-muted"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="relative h-4 w-4">
              <div
                className={[
                  "absolute left-0 top-0 h-[2px] w-full bg-foreground transition-all",
                  open ? "translate-y-1.5 rotate-45" : "",
                ].join(" ")}
              />
              <div
                className={[
                  "absolute left-0 top-0 h-[2px] w-full bg-foreground transition-all",
                  open ? "opacity-0" : "translate-y-1.5",
                ].join(" ")}
              />
              <div
                className={[
                  "absolute left-0 top-0 h-[2px] w-full bg-foreground transition-all",
                  open ? "translate-y-1.5 -rotate-45" : "translate-y-3",
                ].join(" ")}
              />
            </div>
          </button>
        </div>
      </div>

    </motion.nav>

    {/* Mobile drawer — rendered outside <nav> so its fixed positioning is
        relative to the viewport, not the blurred/transformed navbar. */}
    <AnimatePresence>
      {open && (
        <div className="md:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
            className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="fixed inset-y-0 end-0 z-[70] flex h-full w-[min(20rem,85%)] flex-col border-s border-border bg-background shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="text-base font-semibold tracking-tight text-foreground">
                {brandLabel}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs transition-colors hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-4">
              {links.map((link) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="border-t border-border p-4">
              <a
                href={contactHref}
                onClick={(e) => handleClick(e, contactHref)}
                className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
              >
                {dict.contact}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}
