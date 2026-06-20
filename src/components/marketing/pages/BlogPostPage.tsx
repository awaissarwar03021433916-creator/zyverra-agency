"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { type BlogPost, formatPostDate, getAllPosts } from "@/data/blog";
import PageShell from "./PageShell";
import { Reveal } from "./Reveal";

export default function BlogPostPage({
  dict,
  lang,
  post,
}: {
  dict: Dictionary;
  lang: Locale;
  post: BlogPost;
}) {
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <PageShell dict={dict} lang={lang}>
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <Reveal>
          <a
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            All articles
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-semibold text-primary">
              {post.tag}
            </span>
            <span className="text-muted-foreground">{formatPostDate(post.date)}</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min read
            </span>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
        </Reveal>

        <Reveal className="mt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>

        <div className="mt-10">
          {post.body.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="mt-9 font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="mt-4 space-y-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-4 text-[15px] leading-7 text-muted-foreground">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-6 text-center sm:p-8">
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us what you are building. We will reply with honest feedback, a clear plan, and the
            next steps.
          </p>
          <a
            href={`/${lang}#contact`}
            className="group mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
          >
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
          </a>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/20">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Keep reading
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.06}>
                  <a
                    href={`/${lang}/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-semibold text-primary">{p.tag}</span>
                      <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
