"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, ExternalLink, FileText, Sparkles } from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { projects, featuredProject } from "@/data/projects";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

// Headline figures, derived from the project list rather than hard-coded, so
// they cannot drift out of step with the work shown below.
const STATS = [
  { value: String(projects.length), label: "Production systems" },
  {
    value: String(projects.filter((p) => p.category === "client").length),
    label: "Live client platforms",
  },
  { value: String(projects.filter((p) => p.category === "ai").length), label: "AI products" },
  { value: "100%", label: "Built in-house" },
];

export default function PortfolioPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Real problems,{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              solved with software.
            </span>
          </>
        }
        description="Every system here is live, built in-house, and documented with the problem it solved and the outcome it created. No mockups, no slideware, no work we cannot stand behind."
        actions={
          <>
            <a
              href={`/${lang}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href={`/${lang}/founder`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              Meet the founder
            </a>
          </>
        }
        chips={["AI Products", "Business Systems", "Client Platforms", "Innovation & R&D"]}
      />

      {/* Stats */}
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.05}>
                <div className="text-center">
                  <div className="font-heading text-3xl font-bold tracking-tight text-primary md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Selected work
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Problem, solution, outcome.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Each project is presented the way we scope one: what was broken, what we built, and what
            changed as a result.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                {/* Preview */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1024px) 36rem, 100vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute end-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-foreground backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {project.status === "live" ? "Live" : "R&D"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    {project.categoryLabel}
                  </div>
                  <h3 className="mt-1.5 font-heading text-xl font-bold tracking-tight text-foreground">
                    {project.name}
                  </h3>

                  <dl className="mt-5 space-y-4 text-sm leading-relaxed">
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Problem
                      </dt>
                      <dd className="mt-1 text-muted-foreground">{project.problem}</dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                        Solution
                      </dt>
                      <dd className="mt-1 text-muted-foreground">{project.solution}</dd>
                    </div>
                    <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-4">
                      <dt className="text-[11px] font-bold uppercase tracking-widest text-primary">
                        Outcome
                      </dt>
                      <dd className="mt-1 text-foreground/90">{project.outcome}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold text-foreground/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
                      >
                        Visit project
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {project.caseStudy && (
                      <a
                        href={project.caseStudy}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-4 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
                      >
                        Case study
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Innovation & R&D */}
      <section className="border-y border-border bg-gradient-to-b from-primary/[0.05] to-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {featuredProject.categoryLabel}
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Research that pressure-tests new technology.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-12">
            <div className="group grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg lg:grid-cols-2">
              <div className="relative min-h-[16rem] overflow-hidden border-b border-border lg:border-b-0 lg:border-e">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.alt}
                  fill
                  sizes="(min-width: 1024px) 36rem, 100vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                  {featuredProject.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {featuredProject.problem}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {featuredProject.solution}
                </p>

                <div className="mt-5 rounded-xl border border-primary/20 bg-primary/[0.06] p-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Outcome
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/90">
                    {featuredProject.outcome}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredProject.tech.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-border bg-background/70 px-3 py-1 text-[11px] font-semibold text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 border-t border-border pt-5">
                  <a
                    href={featuredProject.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View LandChain documentation (PDF, opens in new tab)"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-4 text-sm font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    View documentation
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-24">
        <Reveal>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            What&rsquo;s next
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Want something like this for your business?
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Tell us the problem. You will get a direct answer on whether it is worth building, what
            it would take, and whether we are the right people for it.
          </p>
          <a
            href={`/${lang}#contact`}
            className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
        </Reveal>
      </section>
    </PageShell>
  );
}
