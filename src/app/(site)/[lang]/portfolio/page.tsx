import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PortfolioPage from "@/components/marketing/pages/PortfolioPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { siteOrigin, breadcrumbSchema } from "@/lib/schema";
import { projects } from "@/data/projects";

const PATH = "portfolio";
const TITLE = "Portfolio | Zyverra Labs";
const DESCRIPTION =
  "Selected work from Zyverra Labs: AI products, business systems, and client web platforms — each documented with the problem it solved, the solution built, and the outcome it created.";

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
  const origin = siteOrigin();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: TITLE,
            description: DESCRIPTION,
            url: `${origin}/${lang}/${PATH}`,
            inLanguage: lang,
            isPartOf: { "@type": "WebSite", url: origin, name: "Zyverra Labs" },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: projects.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: project.name,
                description: project.outcome,
                ...(project.url ? { url: project.url } : {}),
              })),
            },
          },
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
        ]}
      />
      <PortfolioPage dict={dict} lang={lang} />
    </>
  );
}
