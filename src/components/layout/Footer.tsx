"use client";

import { useEffect, useState } from "react";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterProps = {
  companyDescription?: string;
  servicesLinks?: FooterLink[];
  socialLinks?: FooterLink[];
  copyrightName?: string;
};

export default function Footer({
  companyDescription = "We build premium AI experiences and ship them like production systems: fast, secure, and measurable.",
  servicesLinks = [
    { label: "AI Strategy", href: "#services" },
    { label: "Model Integration", href: "#services" },
    { label: "Automation & Workflows", href: "#services" },
    { label: "Product Delivery", href: "#services" },
  ],
  socialLinks = [
    { label: "X (Twitter)", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  copyrightName = "Zyverra Labs",
}: FooterProps) {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="mt-auto border-t border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="text-base font-semibold tracking-tight text-foreground">
              <span className="bg-gradient-to-r from-primary via-accent to-cyan-400 bg-clip-text text-transparent">
                {copyrightName}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {companyDescription}
            </p>
          </div>

          <div className="md:col-span-1">
            <div className="text-sm font-semibold text-foreground">
              Services
            </div>
            <ul className="mt-4 grid gap-3">
              {servicesLinks.map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <div className="text-sm font-semibold text-foreground">
              Social
            </div>
            <ul className="mt-4 grid gap-3">
              {socialLinks.map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/40 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-muted-foreground">
            © {year ?? "—"} {copyrightName}. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            Crafted with precision for premium AI products.
          </div>
        </div>
      </div>
    </footer>
  );
}

