import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../../styles/globals.css";
import { appConfig } from "@/config/app";
import { LazyChatWidget } from "@/components/chat/LazyChatWidget";
import { Analytics } from "@/components/analytics/Analytics";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";
import { WhatsAppButton } from "@/components/contact/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph, siteOrigin } from "@/lib/schema";

// Fonts: options must match global-not-found.tsx exactly, otherwise Next builds
// a second copy of each font and the 404 page's preload leaks onto every page.
// Only the heading font is preloaded; both swap over size-adjusted fallbacks.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const origin = siteOrigin();

// Search Console and Bing Webmaster Tools verification (HTML-tag method). Left
// out entirely when the env vars are empty.
const gscToken =
  process.env.NEXT_PUBLIC_GSC_VERIFICATION || process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingToken = process.env.NEXT_PUBLIC_BING_VERIFICATION;

// Site-wide defaults. Every page overrides title, description, canonical and
// Open Graph via pageMetadata(); these only fill gaps.
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: "Zyverra Labs",
  description: appConfig.description,
  applicationName: "Zyverra Labs",
  authors: [{ name: "Zyverra Labs", url: `${origin}/` }],
  creator: "Zyverra Labs",
  publisher: "Zyverra Labs",
  ...(gscToken || bingToken
    ? {
        verification: {
          ...(gscToken ? { google: gscToken } : {}),
          ...(bingToken ? { other: { "msvalidate.01": bingToken } } : {}),
        },
      }
    : {}),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "Zyverra Labs blog" }] },
  },
  openGraph: {
    siteName: "Zyverra Labs",
    locale: appConfig.ogLocale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zyverra Labs" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <JsonLd data={siteGraph(origin)} />
        {children}
        <WhatsAppButton />
        <LazyChatWidget />
        <Analytics />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
