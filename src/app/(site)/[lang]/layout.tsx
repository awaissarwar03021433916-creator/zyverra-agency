import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../../../styles/globals.css";
import { env } from "@/config/env";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { business } from "@/config/business";
import { locales, defaultLocale, isLocale, dir } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = env.APP_URL ? new URL(env.APP_URL) : new URL("https://zyverralabs.com");

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
  const dict = await getDictionary(locale);

  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}`]));

  // Google Search Console verification (HTML-tag method). Set
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token GSC gives you.
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: siteUrl,
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: "Zyverra Labs", url: siteUrl.origin }],
    creator: "Zyverra Labs",
    publisher: "Zyverra Labs",
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
    icons: {
      icon: [
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: "/apple-icon.png",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { ...languages, "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${locale}`,
      siteName: "Zyverra Labs",
      locale,
      type: "website",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: "Zyverra Labs" },
      ],
    },
    // Card type + default image cascade to every page; per-page title and
    // description fall back to each page's own metadata (no pinning).
    twitter: {
      card: "summary_large_image",
      images: ["/og-image.png"],
    },
    // Location signals for local SEO (single-location business).
    other: {
      "geo.region": "PK-PB",
      "geo.placename": business.address.city,
      "geo.position": `${business.geo.latitude};${business.geo.longitude}`,
      ICBM: `${business.geo.latitude}, ${business.geo.longitude}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <JsonLd
          data={[
            organizationSchema(siteUrl.origin),
            websiteSchema(siteUrl.origin, locale),
          ]}
        />
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
