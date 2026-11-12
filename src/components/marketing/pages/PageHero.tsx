import Image from "next/image";
import type { ReactNode } from "react";

// Hero shared by every marketing page.
//
// Background: /background.jpg (a dark navy digital-wave image) shown faintly
// under a light white wash, so the hero reads as a soft, light texture with a
// hint of blue. It is the largest element in the hero, so it is a next/image
// (not a CSS background): it appears in the initial HTML, is preloaded with
// high priority and served as AVIF/WebP at a modest quality. The copy itself is fully static on first paint (no entrance animation
// or opacity:0), which is what keeps LCP fast. Pass `aside` for a two-column
// hero with a visual on the right.
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  chips,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  chips?: string[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  const split = Boolean(aside);

  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/background.jpg"
          alt=""
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          quality={60}
          className="object-cover object-center"
        />
        {/* Light wash: keeps the image as a subtle texture and text at full contrast. */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.86] via-white/[0.9] to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(0,122,204,0.10),transparent)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(15,26,36,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,26,36,0.04)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div
        className={
          split
            ? "mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.05fr_0.95fr]"
            : "mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28"
        }
      >
        <div>
          <div className={split ? "flex" : "flex justify-center"}>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p
            className={`mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg ${split ? "" : "mx-auto"}`}
          >
            {description}
          </p>

          {actions && (
            <div
              className={`mt-8 flex flex-row flex-wrap items-center gap-2.5 sm:gap-3 ${split ? "" : "justify-center"}`}
            >
              {actions}
            </div>
          )}

          {chips && chips.length > 0 && (
            <ul className={`mt-10 hidden flex-wrap items-center gap-2.5 sm:flex ${split ? "" : "justify-center"}`}>
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground/90 shadow-xs"
                >
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {chip}
                </li>
              ))}
            </ul>
          )}

          {children}
        </div>

        {aside && <div className="relative">{aside}</div>}
      </div>
    </section>
  );
}

/** Gradient accent used inside hero titles (both ends pass 3:1 on white).
 *  Static: animating background-position can't run on the compositor. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary via-sky-600 to-indigo-600 bg-clip-text text-transparent">
      {children}
    </span>
  );
}
