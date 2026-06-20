import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostPage from "@/components/marketing/pages/BlogPostPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { blogSlugs, getPost } from "@/data/blog";
import { siteOrigin, breadcrumbSchema } from "@/lib/schema";

export function generateStaticParams() {
  return locales.flatMap((lang) => blogSlugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const post = getPost(slug);
  if (!post) return {};

  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/blog/${slug}`]));

  return {
    title: `${post.title} | Zyverra Labs`,
    description: post.metaDescription,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: { ...languages, "x-default": `/${defaultLocale}/blog/${slug}` },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `/${locale}/blog/${slug}`,
      siteName: "Zyverra Labs",
      locale,
      type: "article",
      publishedTime: post.date,
      images: [post.image],
    },
    twitter: {
      card: "summary_large_image",
      images: [post.image],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const post = getPost(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);

  const origin = siteOrigin();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    image: `${origin}${post.image}`,
    mainEntityOfPage: `${origin}/${lang}/blog/${slug}`,
    author: { "@type": "Organization", name: "Zyverra Labs" },
    publisher: {
      "@type": "Organization",
      name: "Zyverra Labs",
      logo: { "@type": "ImageObject", url: `${origin}/icon-192.png` },
    },
  };

  return (
    <>
      <JsonLd
        data={[
          articleSchema,
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
      <BlogPostPage dict={dict} lang={lang} post={post} />
    </>
  );
}
