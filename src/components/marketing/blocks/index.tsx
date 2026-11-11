// Server-rendered building blocks shared by every marketing page. They reuse
// the existing design language (tokens, radii, shadows, gradient bands) so new
// pages match the rest of the site.

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, LayoutDashboard, X as XIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/marketing/pages/Reveal";
import { WhatsAppInlineLink } from "@/components/contact/WhatsAppButton";
import { dashboardLines, routes } from "@/config/site";
import type { Faq } from "@/data/faqs";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  tone = "plain",
  narrow = false,
  children,
}: {
  id?: string;
  tone?: "plain" | "tint" | "muted";
  narrow?: boolean;
  children: ReactNode;
}) {
  const bg =
    tone === "tint"
      ? "border-y border-border bg-gradient-to-b from-primary/[0.05] to-background"
      : tone === "muted"
        ? "border-y border-border bg-secondary/30"
        : "";
  return (
    <section id={id} className={bg}>
      <div className={`mx-auto ${narrow ? "max-w-4xl" : "max-w-6xl"} px-4 py-16 sm:px-6 md:py-20`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</div>
      )}
      <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

/** Answer-first opening paragraph, directly under the hero. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 md:pt-16">
      <p className="rounded-2xl border border-border bg-card p-6 text-base leading-relaxed text-foreground shadow-xs sm:p-8 sm:text-lg">
        {children}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

const primaryBtn =
  "group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md motion-reduce:hover:translate-y-0";
const secondaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted motion-reduce:hover:translate-y-0";

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  return (
    <Link href={href} className={variant === "primary" ? primaryBtn : secondaryBtn}>
      {children}
      {variant === "primary" && (
        <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

/** The standard hero action row: quote + optional secondary + WhatsApp. */
export function HeroActions({
  primary = { href: routes.contact, label: "Get a quote" },
  secondary,
}: {
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <>
      <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
      {secondary && (
        <ButtonLink href={secondary.href} variant="secondary">
          {secondary.label}
        </ButtonLink>
      )}
      <WhatsAppInlineLink location="hero">WhatsApp</WhatsAppInlineLink>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export type CardItem = {
  title: string;
  description: ReactNode;
  href?: string;
  icon?: LucideIcon;
  linkLabel?: string;
};

export function CardGrid({ items, columns = 3 }: { items: CardItem[]; columns?: 2 | 3 | 4 }) {
  const cols =
    columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`mt-10 grid gap-5 ${cols}`}>
      {items.map((item, i) => {
        const Icon = item.icon;
        const body = (
          <>
            {Icon && (
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon aria-hidden className="h-5 w-5" />
              </span>
            )}
            <h3 className={`${Icon ? "mt-5" : ""} font-heading text-lg font-semibold text-foreground`}>
              {item.title}
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</div>
            {item.href && (
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {item.linkLabel ?? "Learn more"}
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            )}
          </>
        );
        return (
          <Reveal key={item.title} delay={Math.min(i, 5) * 0.05}>
            {item.href ? (
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg motion-reduce:hover:translate-y-0"
              >
                {body}
              </Link>
            ) : (
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xs">{body}</div>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}

export function CheckList({ items, className = "mt-6" }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={`${className} grid gap-3`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-base">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check aria-hidden className="h-3.5 w-3.5" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Steps({ steps }: { steps: { title: string; description: string }[] }) {
  return (
    <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title}>
          <Reveal delay={i * 0.06} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-xs">
              <div className="font-heading text-sm font-bold text-primary">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/** One-line admin-dashboard callout placed on every service page (Section I). */
export function DashboardCallout() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Link
        href={routes.adminDashboard}
        className="group flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/[0.05] p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between sm:p-6"
      >
        <span className="flex items-start gap-3">
          <LayoutDashboard aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span className="text-sm leading-relaxed text-foreground sm:text-base">
            <strong className="font-semibold">{dashboardLines.tagline}</strong> {dashboardLines.core}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary">
          See the admin dashboard
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing comparison                                                  */
/* ------------------------------------------------------------------ */

export type CompareValue = boolean | string;
export type CompareRow = { label: string; a: CompareValue; b: CompareValue };

function CompareCell({ value }: { value: CompareValue }) {
  if (value === true)
    return (
      <span className="inline-flex items-center gap-1.5 text-emerald-700">
        <Check aria-hidden className="h-4 w-4" />
        <span className="sr-only">Included</span>
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <XIcon aria-hidden className="h-4 w-4" />
        <span className="sr-only">Not included</span>
      </span>
    );
  return <span>{value}</span>;
}

export function CompareTable({ rows, caption }: { rows: CompareRow[]; caption: string }) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th scope="col" className="px-5 py-4 font-semibold text-foreground">
              Feature
            </th>
            <th scope="col" className="px-5 py-4 font-semibold text-primary">
              Option A
            </th>
            <th scope="col" className="px-5 py-4 font-semibold text-foreground">
              Option B
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <th scope="row" className="px-5 py-3.5 font-medium text-foreground">
                {row.label}
              </th>
              <td className="px-5 py-3.5 text-foreground">
                <CompareCell value={row.a} />
              </td>
              <td className="px-5 py-3.5 text-foreground">
                <CompareCell value={row.b} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

/**
 * Accessible FAQ accordion built on <details>/<summary>, so it is keyboard
 * operable and the full answer text is always present in the HTML.
 */
export function FaqList({
  faqs,
  headingLevel = "h3",
}: {
  faqs: Faq[];
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  return (
    <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {faqs.map((faq) => (
        <details key={faq.id} id={`faq-${faq.id}`} className="group px-5 py-1 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <Heading className="text-sm font-semibold text-foreground sm:text-base">{faq.q}</Heading>
            <span
              aria-hidden
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA band                                                      */
/* ------------------------------------------------------------------ */

export function CtaBand({
  title = "Tell us about your clinic",
  description = "Tell us what your clinic needs and we'll come back with a clear quote, or message us on WhatsApp to talk it through.",
  primaryLabel = "Get a quote",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062746] via-[#0a5aa0] to-[#007acc] px-6 py-12 text-center shadow-xl sm:px-12 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={routes.contact}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-bold text-[#0a4f8c] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              {primaryLabel}
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <WhatsAppInlineLink location="cta_band">WhatsApp us</WhatsAppInlineLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small "TODO [CONFIRM]" notice rendered only in development builds. */
export function DevConfirm({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p className="mt-3 rounded-lg border border-dashed border-amber-400 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-900">
      TODO [CONFIRM] (dev only): {children}
    </p>
  );
}
