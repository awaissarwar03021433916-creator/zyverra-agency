import Link from "next/link";
import { ArrowRight, Rss } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { Accent, PageHero } from "@/components/marketing/pages/PageHero";
import { CtaBand, Section } from "@/components/marketing/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { routes } from "@/config/site";
import { formatPostDate, getAllPosts, listingTitle, readingMinutes, type BlogCategory } from "@/data/blog";
import { blogSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.blog;

export const metadata = pageMetadata({
  title: "Aesthetics Clinic Marketing Blog | Zyverra Labs",
  description:
    "Practical guides for UK aesthetics clinic owners on websites, local SEO, AI search, Meta ads and advertising compliance. Written in plain English.",
  path: PATH,
});

const CATEGORY_ORDER: BlogCategory[] = ["Websites", "Compliance", "SEO & AI search", "AI & software"];
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Page() {
  const posts = getAllPosts();
  const categories = CATEGORY_ORDER.filter((c) => posts.some((p) => p.category === c));

  return (
    <PageShell breadcrumbs={[{ name: "Blog", path: PATH }]}>
      <JsonLd data={blogSchema(siteOrigin(), posts)} />

      <PageHero
        eyebrow="Blog"
        title={
          <>
            Guides for <Accent>aesthetics clinic owners</Accent>
          </>
        }
        description="Practical, plain-English guides on clinic websites, local SEO, AI search, Meta ads and UK advertising rules."
      >
        <nav aria-label="Blog categories" className="mt-8">
          <ul className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <li key={c}>
                <a
                  href={`#${slug(c)}`}
                  className="inline-flex rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {c}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/blog/rss.xml"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Rss aria-hidden className="h-3.5 w-3.5" />
                RSS
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      {categories.map((category) => (
        <Section key={category} id={slug(category)}>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">{category}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts
              .filter((p) => p.category === category)
              .map((post) => (
                <article
                  key={post.slug}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <div className="text-xs text-muted-foreground">
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {readingMinutes(post)} min read
                  </div>
                  <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-foreground">
                    <Link href={`${PATH}/${post.slug}`} className="after:absolute after:inset-0">
                      {listingTitle(post)}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <span aria-hidden className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
                    Read the guide
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </article>
              ))}
          </div>
        </Section>
      ))}

      <CtaBand />
    </PageShell>
  );
}
