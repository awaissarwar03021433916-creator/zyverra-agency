"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, X } from "lucide-react";

import { mainNav, routes, type NavItem } from "@/config/site";

const BRAND = "Zyverra Labs";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop dropdown: opens on hover or click, fully keyboard operable. */
function Dropdown({
  item,
  pathname,
}: {
  item: Extract<NavItem, { children: unknown }>;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = item.children.some((c) => isActivePath(pathname, c.href));
  const menuId = `nav-${item.label.toLowerCase().replace(/\W+/g, "-")}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!ref.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={onBlur}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
          <div
            id={menuId}
            className="absolute left-0 top-full z-50 w-72 pt-2 animate-in fade-in slide-in-from-top-1 duration-150"
          >
            <ul className="overflow-hidden rounded-xl border border-border bg-popover p-1.5 shadow-lg">
              {item.children.map((child) => {
                const isActive = isActivePath(pathname, child.href);
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-2.5 transition-colors ${
                        isActive ? "bg-primary/10" : "hover:bg-muted"
                      }`}
                    >
                      <span className={`block text-sm font-semibold ${isActive ? "text-primary" : "text-foreground"}`}>
                        {child.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">{child.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  // The drawer is "open for a path", so navigating anywhere closes it without
  // an effect: once the pathname changes, `open` is false.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const setOpen = (next: boolean | ((v: boolean) => boolean)) =>
    setOpenFor((prev) => {
      const current = prev === pathname;
      const value = typeof next === "function" ? next(current) : next;
      return value ? pathname : null;
    });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFor(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
        >
          <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${BRAND}, home`}>
            <Image
              src="/zyverra-mark.png"
              alt=""
              width={256}
              height={219}
              sizes="52px"
              loading="eager"
              className="h-10 w-auto transition-transform duration-200 group-hover:scale-105 sm:h-11"
            />
            <span className="text-base font-semibold tracking-tight text-foreground sm:text-lg">{BRAND}</span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            {mainNav.map((item) =>
              "children" in item ? (
                <Dropdown key={item.label} item={item} pathname={pathname} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                  className={`group relative px-3 py-2 text-sm font-medium transition-colors ${
                    isActivePath(pathname, item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-3 bottom-1 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300 ${
                      isActivePath(pathname, item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:block">
            <Link
              href={routes.contact}
              className="group inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-all duration-200 hover:bg-primary/90 hover:shadow-md"
            >
              Get a quote
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs transition-colors hover:bg-muted lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden className="relative h-4 w-4">
              <span className={`absolute left-0 top-0 h-[2px] w-full bg-foreground transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-0 h-[2px] w-full bg-foreground transition-all ${open ? "opacity-0" : "translate-y-1.5"}`} />
              <span className={`absolute left-0 top-0 h-[2px] w-full bg-foreground transition-all ${open ? "translate-y-1.5 -rotate-45" : "translate-y-3"}`} />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile drawer — outside the header so `fixed` is relative to the viewport. */}
      {open && (
          <div className="lg:hidden" role="dialog" aria-modal="true" aria-label="Menu" id="mobile-menu">
            <div
              className="fixed inset-0 z-[60] bg-foreground/50 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={() => setOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 z-[70] flex h-full w-[min(21rem,88%)] flex-col border-l border-border bg-background shadow-2xl animate-in slide-in-from-right duration-300">
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="text-base font-semibold tracking-tight text-foreground">{BRAND}</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-xs transition-colors hover:bg-muted"
                >
                  <X aria-hidden className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {mainNav.map((item) =>
                  "children" in item ? (
                    <div key={item.label} className="pb-2">
                      <div className="px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </div>
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          aria-current={isActivePath(pathname, child.href) ? "page" : undefined}
                          className={`block rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                            isActivePath(pathname, child.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                      className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                        isActivePath(pathname, item.href) ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>

              <div className="border-t border-border p-4">
                <Link
                  href={routes.contact}
                  className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
                >
                  Get a quote
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
    </>
  );
}
