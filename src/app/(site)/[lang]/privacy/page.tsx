import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PrivacyPolicyPage, {
  PRIVACY_LAST_UPDATED,
} from "@/components/marketing/pages/PrivacyPolicyPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { siteOrigin, breadcrumbSchema } from "@/lib/schema";

const PATH = "privacy";
const TITLE = "Privacy Policy | Zyverra Labs";
const DESCRIPTION =
  "How Zyverra Labs collects, uses, and protects personal data across our website, enquiry form, and AI assistant — including cookies, analytics, sub-processors, international transfers, retention, and your GDPR and CCPA rights.";

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
            about: `Privacy practices of Zyverra Labs LLC, last updated ${PRIVACY_LAST_UPDATED}.`,
          },
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "Privacy Policy", path: "/privacy" },
          ]),
        ]}
      />
      <PrivacyPolicyPage dict={dict} lang={lang} />
    </>
  );
}
