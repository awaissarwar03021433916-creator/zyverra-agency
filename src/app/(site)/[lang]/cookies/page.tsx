import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CookiePolicyPage, {
  COOKIE_POLICY_LAST_UPDATED,
} from "@/components/marketing/pages/CookiePolicyPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { siteOrigin, breadcrumbSchema } from "@/lib/schema";

const PATH = "cookies";
const TITLE = "Cookie Policy | Zyverra Labs";
const DESCRIPTION =
  "Every cookie Zyverra Labs sets, named: two essential first-party cookies, Google Analytics 4, and no marketing or cross-site tracking cookies at all — plus how to manage or block them in your browser.";

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
            "@type": "WebPage",
            name: TITLE,
            description: DESCRIPTION,
            url: `${origin}/${lang}/${PATH}`,
            inLanguage: lang,
            dateModified: "2026-07-23",
            isPartOf: { "@type": "WebSite", url: origin, name: "Zyverra Labs" },
            publisher: { "@type": "Organization", name: "Zyverra Labs LLC", url: origin },
            about: `Cookie practices of Zyverra Labs LLC, last updated ${COOKIE_POLICY_LAST_UPDATED}.`,
          },
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "Cookie Policy", path: "/cookies" },
          ]),
        ]}
      />
      <CookiePolicyPage dict={dict} lang={lang} />
    </>
  );
}
