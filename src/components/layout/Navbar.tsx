"use client";

import type { MouseEvent } from "react";
import { useEffect, useMemo, useState } from "react";

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
  links = [
    { label: "Services", href: "#services" },
    { label: "Approach", href: "#approach" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ],
  contactLabel = "Contact",
  contactHref = "#contact",
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  const linkIds = useMemo(() => links.map((l) => l.href).concat(contactHref), [
    links,
    contactHref,
  ]);

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
    scrollToHash(href);
    setOpen(false);
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-xl"
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
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href={contactHref}
            onClick={(e) => handleClick(e, contactHref)}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border/60 bg-primary/10 px-4 text-sm font-semibold text-primary shadow-[0_0_0_1px_rgba(99,102,241,0.25)] transition hover:bg-primary/15"
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
              <span className="text-sm font-semibold text-foreground">
                Navigate
              </span>
              <span className="text-xs text-muted-foreground">
                Smooth scroll enabled
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {links.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="rounded-xl border border-border/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-primary/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={contactHref}
                onClick={(e) => handleClick(e, contactHref)}
                className="rounded-xl border border-border/60 bg-primary/15 px-4 py-3 text-sm font-semibold text-primary"
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
    </nav>
  );
}

