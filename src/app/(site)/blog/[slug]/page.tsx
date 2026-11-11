import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";

import PageShell from "@/components/marketing/pages/PageShell";
import { RichText } from "@/components/blog/RichText";
import { WhatsAppInlineLink } from "@/components/contact/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { founder } from "@/config/founder";
import { routes, services } from "@/config/site";
import {
  blogSlugs,
  formatPostDate,
  getPost,
  headingId,
  listingTitle,
  readingMinutes,
  relatedPosts,
  tableOfContents,
  type BlogBlock,
} from "@/data/blog";
import { blogPostingSchema, siteOrigin } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle,
    description: post.metaDescription,
    path: `${routes.blog}/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.updated,
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "answer":
      return (
        <div className="rounded-2xl border border-primary/25 bg-primary/[0.05] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Short answer</p>
          <p className="mt-2 text-base leading-relaxed text-foreground">
            <RichText text={block.text} />
          </p>
        </div>
      );
    case "heading":
      return (
        <h2 id={headingId(block.text)} className="pt-4 font-heading text-2xl font-bold tracking-tight text-foreground">
          {block.text}
        </h2>
      );
    case "subheading":
      return <h3 className="font-heading text-xl font-semibold text-foreground">{block.text}</h3>;
    case "paragraph":
      return (
        <p className="text-base text-muted-foreground">
          <RichText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="ml-5 list-disc space-y-2 text-base text-muted-foreground marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ordered":
      return (
        <ol className="ml-5 list-decimal space-y-2 text-base text-muted-foreground marker:font-semibold marker:text-primary">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "checklist":
      return (
        <ul className="space-y-2.5 rounded-2xl border border-border bg-card p-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-foreground">
              <span aria-hidden className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-primary/50">
                <Check className="h-3 w-3 text-primary" />
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <p className="flex items-start gap-2 text-sm italic text-muted-foreground">
          <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <RichText text={block.text} />
        </p>
      );
    case "cta":
      return (
        <aside className="rounded-2xl bg-gradient-to-br from-[#062746] via-[#0a5aa0] to-[#007acc] p-7 text-white shadow-lg">
          <p className="font-heading text-xl font-bold">{block.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/90">{block.text}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href={routes.contact}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-bold text-[#0a4f8c] no-underline hover:no-underline"
            >
              Get a quote
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <WhatsAppInlineLink location="blog_cta">Message us on WhatsApp</WhatsAppInlineLink>
          </div>
        </aside>
      );
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = tableOfContents(post);
  const related = relatedPosts(post);
  const service = services.find((s) => s.href === post.servicePath);
  const path = `${routes.blog}/${post.slug}`;

  return (
    <PageShell
      breadcrumbs={[
        { name: "Blog", path: routes.blog },
        { name: post.title, path },
      ]}
    >
      <JsonLd data={blogPostingSchema(siteOrigin(), post)} />

      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        <header className="mx-auto max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">{post.category}</div>
          <h1 className="mt-3 font-heading text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>
              By{" "}
              <Link href={founder.profilePath} className="font-semibold text-foreground hover:text-primary">
                {founder.name}
              </Link>
            </span>
            <span>
              Published <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </span>
            <span>
              Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
            </span>
            <span>{readingMinutes(post)} min read</span>
          </div>
        </header>

        <div className="mx-auto mt-10 grid max-w-5xl gap-10 lg:grid-cols-[1fr_15rem]">
          <div className="prose-zyverra min-w-0 space-y-5 lg:order-1">
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            {/* Author box */}
            <aside className="mt-10 flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <Image
                src={founder.image}
                alt={founder.imageAlt}
                width={64}
                height={64}
                sizes="64px"
                className="h-16 w-16 shrink-0 rounded-full"
              />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {founder.name}, {founder.role} at {founder.company}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Builds websites, admin dashboards and AI search foundations for UK aesthetics clinics.{" "}
                  <Link href={founder.profilePath}>About the founder</Link>
                </p>
              </div>
            </aside>
          </div>

          {toc.length > 0 && (
            <nav aria-label="Table of contents" className="lg:order-2">
              <div className="rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-24">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">On this page</p>
                <ol className="mt-3 space-y-2 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="text-muted-foreground transition-colors hover:text-primary">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
                {service && (
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Related service</p>
                    <Link href={service.href} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      {service.name}
                      <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/30">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">Related guides</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`${routes.blog}/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">{p.category}</span>
                  <span className="mt-2 font-heading text-base font-semibold leading-snug text-foreground">{listingTitle(p)}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-primary">
                    Read
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
