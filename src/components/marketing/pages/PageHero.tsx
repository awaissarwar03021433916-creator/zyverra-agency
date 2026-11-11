import type { ReactNode } from "react";

// Hero shared by every marketing page: grid background, soft gradient blobs, a
// badge, the page's single H1, optional actions and trust chips.
//
// Server-rendered and fully static on first paint: no entrance animation or
// opacity:0 on anything in the hero, so the H1 and copy count for LCP the
// moment HTML arrives. The blurred background layers are static too
// (animating large blur-3xl elements repaints every frame). The only motion is
// the tiny decorative ping on the badge dot, disabled for reduced motion.
export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  chips,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  chips?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(15,26,36,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,26,36,0.045)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-22%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-7rem] top-[8%] hidden h-[26rem] w-[26rem] rounded-full bg-sky-400/10 blur-3xl md:block" />
        <div className="absolute bottom-[-26%] left-[-6rem] hidden h-[24rem] w-[24rem] rounded-full bg-indigo-400/10 blur-3xl md:block" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-28">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3.5 py-1.5 text-xs font-semibold text-foreground">
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

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>

        {actions && (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            {actions}
          </div>
        )}

        {chips && chips.length > 0 && (
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {chips.map((chip) => (
              <li
                key={chip}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-medium text-foreground/90 shadow-xs"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-primary" />
                {chip}
              </li>
            ))}
          </ul>
        )}

        {children}
      </div>
    </section>
  );
}

/** Gradient accent used inside hero titles. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary to-sky-600 bg-clip-text text-transparent">{children}</span>
  );
}
