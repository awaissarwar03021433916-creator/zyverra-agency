import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WhyUsPage from "@/components/marketing/pages/WhyUsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { whyUsFaqs } from "@/data/faqs";
import { siteOrigin, faqPageSchema, breadcrumbSchema } from "@/lib/schema";

const PATH = "why-us";
const TITLE = "Why Zyverra Labs | Senior-Led AI & Software Engineering";
const DESCRIPTION =
  "Why choose Zyverra Labs for custom software, AI, and SaaS development: senior-led delivery, business-first engineering, security by default, and a partnership that lasts past launch.";

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
          faqPageSchema(whyUsFaqs),
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "Why Us", path: "/why-us" },
          ]),
        ]}
      />
      <WhyUsPage dict={dict} lang={lang} />
    </>
  );
}
