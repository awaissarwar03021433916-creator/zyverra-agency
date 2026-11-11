import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { routes } from "@/config/site";

const LINKS = [
  { href: routes.home, label: "Home" },
  { href: routes.aestheticClinicWebsites, label: "Clinic websites" },
  { href: routes.pricing, label: "Pricing" },
  { href: routes.blog, label: "Blog" },
  { href: routes.contact, label: "Contact" },
];

/** Shared 404 body used by both the in-site not-found and the global one. */
export function NotFoundContent() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 md:py-32">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Error 404</p>
      <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        We can&apos;t find that page
      </h1>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">
        It may have moved when we reorganised the site. Try one of these instead:
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex h-11 items-center gap-1.5 rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:text-primary"
            >
              {l.label}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
