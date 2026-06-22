"use client";

import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { getAllPosts, formatPostDate } from "@/data/blog";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

export default function BlogIndexPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="The Zyverra Labs Blog"
        title={
          <>
            Practical writing on AI, automation, and{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              shipping software.
            </span>
          </>
        }
        description="Honest, no-hype perspective from a founder-led studio, what we have learned building AI agents, automation, and SaaS that holds up in production."
        chips={["AI", "Automation", "SaaS", "Delivery", "Engineering"]}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        {/* Featured post */}
        {featured && (
          <Reveal>
            <a
              href={`/${lang}/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                    {featured.tag}
                  </span>
                  <span className="text-muted-foreground">{formatPostDate(featured.date)}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {featured.readingMinutes} min
                  </span>
                </div>
                <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read article
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
                </span>
              </div>
            </a>
          </Reveal>
        )}

        {/* Rest of posts */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <a
                href={`/${lang}/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
                      {post.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
