"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export type NavbarLink = {
  label: string;
  href: string;
};

export type NavbarProps = {
  brandLabel?: string;
  links?: NavbarLink[];
  contactLabel?: string;
  contactHref?: string;
};

const defaultLinks: NavbarLink[] = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
];

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
  brandLabel = "Zyverra Labs",
  links = defaultLinks,
  contactLabel = "Contact",
  contactHref = "#contact",
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>(typeof window !== "undefined" ? window.location.hash || "#top" : "#top");

  const linkIds = useMemo(() => links.map((l) => l.href).concat(contactHref), [
    links,
    contactHref,
  ]);

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

  function handleClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) return;
    e.preventDefault();

    setActiveHref(href);
    scrollToHash(href);
    // Ensure URL hash changes so any `:target`/hash-based styling works.
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
          const nextId = visible[0].target.id;
          setActiveHref(`#${nextId}`);
        }
      },
      {
        threshold: [0.2, 0.35, 0.5],
        rootMargin: "-20% 0px -65% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [linkIds]);

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-border/40 backdrop-blur-md"
      initial={false}
      animate={{
        backgroundColor: scrolled ? "rgba(5, 5, 17, 0.88)" : "rgba(5, 5, 17, 0.35)",
        borderColor: scrolled ? "rgba(158, 103, 255, 0.22)" : "rgba(158, 103, 255, 0.12)",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <a
          href="#top"
          className="group inline-flex items-center gap-2"
          onClick={(e) => handleClick(e, "#top")}
        >
          <span className="text-lg font-semibold tracking-tight text-foreground">
            <span className="bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-transparent">
              {brandLabel}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={`${link.label}-${link.href}`}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                aria-current={activeHref === link.href ? "page" : undefined}
                className={`text-sm font-medium transition-colors hover:text-foreground ${
                  activeHref === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={contactHref}
            onClick={(e) => handleClick(e, contactHref)}
            aria-current={activeHref === contactHref ? "page" : undefined}
            className={`inline-flex h-10 items-center justify-center rounded-xl border border-border/60 px-4 text-sm font-semibold transition hover:bg-primary/15 ${
              activeHref === contactHref
                ? "bg-primary/20 text-primary shadow-[0_0_25px_rgba(236,72,153,0.25)]"
                : "bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(99,102,241,0.25)]"
            }`}
          >
            {contactLabel}
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/40 md:hidden"
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

      {open && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-xl"
            role="presentation"
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-x-0 top-[68px] z-50 mx-auto w-[min(560px,100%)] rounded-2xl border border-border/60 bg-background/85 p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Navigate</span>
              <span className="text-xs text-muted-foreground">Smooth scroll enabled</span>
            </div>

            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  aria-current={activeHref === link.href ? "page" : undefined}
                  className={`rounded-xl border border-border/40 bg-primary/5 px-4 py-3 text-sm font-semibold transition hover:bg-primary/10 ${
                    activeHref === link.href ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={contactHref}
                onClick={(e) => handleClick(e, contactHref)}
                aria-current={activeHref === contactHref ? "page" : undefined}
                className={`rounded-xl border border-border/60 bg-primary/15 px-4 py-3 text-sm font-semibold ${
                  activeHref === contactHref ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {contactLabel}
              </a>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              {linkIds.length} sections ready.
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
