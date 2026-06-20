import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogIndexPage from "@/components/marketing/pages/BlogIndexPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { siteOrigin, breadcrumbSchema } from "@/lib/schema";

const PATH = "blog";
const TITLE = "Blog | Zyverra Labs";
const DESCRIPTION =
  "Insights on AI agents, automation, SaaS engineering, and shipping reliable software, honest, no-hype perspective from the Zyverra Labs team.";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/${PATH}`]));

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: `/${locale}/${PATH}`,
      languages: { ...languages, "x-default": `/${defaultLocale}/${PATH}` },
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `/${locale}/${PATH}`,
      siteName: "Zyverra Labs",
      locale,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zyverra Labs" }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(siteOrigin(), lang, [
          { name: "Home", path: "" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogIndexPage dict={dict} lang={lang} />
    </>
  );
}
