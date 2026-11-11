import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { business } from "@/config/business";
import { ENTITY_DESCRIPTION } from "@/config/app";
import { founderSocialLinks } from "@/config/founder";
import { dashboardLines, footerColumns, routes } from "@/config/site";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { WhatsAppInlineLink } from "@/components/contact/WhatsAppButton";

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-primary";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Zyverra Labs, home">
              <Image src="/zyverra-mark.png" alt="" width={256} height={219} sizes="44px" className="h-9 w-auto" />
              <span className="text-base font-semibold tracking-tight text-foreground">{business.name}</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-semibold text-foreground">{dashboardLines.tagline}</p>

            {/* NAP block — identical wording to the schema and contact page. */}
            <address className="mt-3 max-w-xs text-sm not-italic leading-relaxed text-muted-foreground">
              {ENTITY_DESCRIPTION} Serving clinics across England, Scotland, Wales and Northern Ireland ·{" "}
              <a href={`mailto:${business.email}`} className="hover:text-primary">
                {business.email}
              </a>{" "}
              · WhatsApp{" "}
              <a
                href={`https://wa.me/${business.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                {business.phoneDisplay}
              </a>
            </address>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={routes.contact}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
              >
                Get a quote
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <WhatsAppInlineLink
                location="footer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
              >
                WhatsApp
              </WhatsAppInlineLink>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground">{col.title}</h2>
              <ul className="mt-4 grid gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.title === "Legal" && (
                  <li>
                    <CookieSettingsButton className={`${linkClass} text-left`} />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-muted-foreground">© {year} Zyverra Labs</div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Social profiles">
            {founderSocialLinks.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
