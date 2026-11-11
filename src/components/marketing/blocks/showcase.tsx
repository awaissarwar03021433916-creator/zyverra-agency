import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";

import { Reveal } from "@/components/marketing/pages/Reveal";
import { ColorIcon } from "@/components/marketing/ColorIcon";
import type { MarketingPackage } from "@/config/business";
import { routes, ukKeywords } from "@/config/site";
import type { ClinicCaseStudy } from "@/data/work";

/* ------------------------------------------------------------------ */
/* Browser-framed screenshot                                           */
/* ------------------------------------------------------------------ */

export function BrowserFrame({
  shot,
  url,
  sizes,
  eager = false,
}: {
  shot: ClinicCaseStudy["screenshot"];
  url: string;
  sizes: string;
  eager?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-lg sm:rounded-2xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/70 px-2.5 py-1.5 sm:px-3 sm:py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
        <span className="ms-2 hidden truncate text-[11px] font-medium text-muted-foreground sm:inline">
          {url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
      </div>
      {/* Natural aspect ratio: the whole screenshot is shown, never cropped. */}
      <div className="overflow-hidden">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Client work grid — 2 per row on mobile                              */
/* ------------------------------------------------------------------ */

export function WorkShowcase({ items }: { items: ClinicCaseStudy[] }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {items.map((c, i) => (
        <Reveal key={c.slug} delay={i * 0.08} className="h-full">
          <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-2 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:hover:translate-y-0 sm:rounded-3xl sm:p-3">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
              style={{ background: c.accent }}
            />
            <BrowserFrame
              shot={c.screenshot}
              url={c.liveUrl}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 380px"
            />
            <div className="flex flex-1 flex-col px-1 pb-1 pt-3 sm:px-2 sm:pt-4">
              <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-primary sm:text-xs">
                <MapPin aria-hidden className="h-3 w-3 shrink-0" />
                {c.location}
              </div>
              <h3 className="mt-1 font-heading text-sm font-semibold leading-snug text-foreground sm:text-lg">
                <Link href={`${routes.work}/${c.slug}`} className="after:absolute after:inset-0">
                  {c.name}
                </Link>
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground sm:text-sm">{c.type}</p>
              <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex" aria-label="Highlights">
                {c.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="relative z-10 mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3 text-xs font-semibold sm:pt-4 sm:text-sm">
                <span className="inline-flex items-center gap-1 text-primary">
                  Case study
                  <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
                <a
                  href={c.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-foreground hover:text-primary"
                >
                  Live site
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                  <span className="sr-only"> for {c.name} (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero collage of client screenshots (gently floating)                */
/* ------------------------------------------------------------------ */

export function ScreenshotCollage({ items }: { items: ClinicCaseStudy[] }) {
  const [a, b, c] = items;
  if (!a) return null;
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-xl" aria-label="Clinic websites built by Zyverra Labs">
      <div aria-hidden className="absolute inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/25 via-sky-300/20 to-fuchsia-300/25 blur-3xl" />
      {b && (
        <div className="animate-float-slow absolute left-0 top-[6%] w-[64%] -rotate-3">
          <BrowserFrame shot={b.screenshot} url={b.liveUrl} sizes="(max-width: 1024px) 60vw, 360px" eager />
        </div>
      )}
      {c && (
        <div className="animate-float-slower absolute right-0 top-0 w-[58%] rotate-3">
          <BrowserFrame shot={c.screenshot} url={c.liveUrl} sizes="(max-width: 1024px) 55vw, 330px" eager />
        </div>
      )}
      <div className="animate-float absolute bottom-0 left-[14%] w-[72%]">
        <BrowserFrame shot={a.screenshot} url={a.liveUrl} sizes="(max-width: 1024px) 70vw, 410px" eager />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Monthly marketing packages                                          */
/* ------------------------------------------------------------------ */

export function PackageCards({ packages, note }: { packages: MarketingPackage[]; note?: string }) {
  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {packages.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className="h-full">
            <div
              className={`relative flex h-full flex-col rounded-3xl border p-7 shadow-xs transition-shadow duration-300 hover:shadow-xl ${
                p.highlight ? "border-primary/40 bg-gradient-to-b from-primary/[0.07] to-white" : "border-border bg-card"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-primary to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow">
                  Most popular
                </span>
              )}
              <h3 className="font-heading text-xl font-bold text-foreground">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              <p className="mt-5 flex items-baseline gap-1">
                <span className="font-heading text-5xl font-bold text-foreground">£{p.price}</span>
                <span className="text-sm font-medium text-muted-foreground">/month</span>
              </p>
              <ul className="mt-6 grid gap-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href={routes.contact}
                  className={`inline-flex h-11 w-full items-center justify-center rounded-lg px-5 text-sm font-semibold transition-colors ${
                    p.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Start with {p.name}
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        {/* TODO [CONFIRM]: contract length/notice period and VAT status, then state them here. */}
        {note ?? "Monthly prices in pounds sterling. Everything is agreed in writing before you start."}
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Scrolling UK keyword strip                                          */
/* ------------------------------------------------------------------ */

export function KeywordMarquee() {
  const list = [...ukKeywords];
  return (
    <div className="group relative overflow-hidden border-y border-border bg-white py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="animate-marquee flex w-max gap-3 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-3 pr-3" aria-hidden={copy === 1 ? true : undefined}>
            {list.map((k) => (
              <li
                key={`${copy}-${k}`}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground"
              >
                <ColorIcon name="sparkles" size={16} />
                {k}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Real admin-dashboard screenshots                                    */
/* ------------------------------------------------------------------ */

export function AdminGallery({ shots }: { shots: NonNullable<ClinicCaseStudy["adminShots"]> }) {
  return (
    <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
      {shots.map((s, i) => (
        <Reveal key={s.src} delay={(i % 2) * 0.08}>
          <figure className="group">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-xl sm:rounded-2xl">
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes="(max-width: 640px) 50vw, 560px"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-2 text-xs font-semibold text-foreground sm:mt-3 sm:text-sm">{s.caption}</figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}
