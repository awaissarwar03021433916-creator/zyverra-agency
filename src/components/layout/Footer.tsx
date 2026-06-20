"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import type { Dictionary, NavLink } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { business, businessLocality } from "@/config/business";

const COPYRIGHT_NAME = "Zyverra Labs";

export default function Footer({ dict, lang }: { dict: Dictionary["footer"]; lang: Locale }) {
  const [year, setYear] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Resolve links so in-page anchors work from sub-pages (navigate home first)
  // and real page links carry the active locale. Placeholder "#" stays inert.
  const homePath = `/${lang}`;
  const isHome =
    pathname === homePath || pathname === `${homePath}/` || pathname === "/";
  const resolveHref = (href: string) => {
    if (href === "#") return href;
    if (href.startsWith("#")) return isHome ? href : `${homePath}${href}`;
    return `${homePath}${href}`;
  };

  const columns: { title: string; links: NavLink[] }[] = [
    { title: dict.columns.company, links: dict.companyLinks },
    { title: dict.columns.services, links: dict.servicesLinks },
    { title: dict.columns.connect, links: dict.socialLinks },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-heading text-base font-bold text-primary-foreground">
                Z
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">
                {COPYRIGHT_NAME}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {dict.description}
            </p>
            <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
              <div>{businessLocality}</div>
              <div>
                <a
                  href={`mailto:${business.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {business.email}
                </a>
              </div>
              {business.phone ? (
                <div>
                  <a
                    href={`tel:${business.phone}`}
                    className="transition-colors hover:text-primary"
                  >
                    {business.phone}
                  </a>
                </div>
              ) : null}
            </address>
            <a
              href={resolveHref("#contact")}
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              {dict.startProject}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-widest text-foreground">
                {col.title}
              </div>
              <ul className="mt-4 grid gap-3">
                {col.links.map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <a
                      href={resolveHref(link.href)}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">
            © {year ?? new Date().getFullYear()} {COPYRIGHT_NAME}. {dict.rights}
          </div>
          <div className="text-xs font-medium text-muted-foreground">{dict.tagline}</div>
        </div>
      </div>
    </footer>
  );
}
