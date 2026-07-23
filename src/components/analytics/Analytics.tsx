"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

import { useCookieConsent } from "@/hooks/useCookieConsent";

// Google Analytics 4. Activates only in production, only when
// NEXT_PUBLIC_GA_ID is set (e.g. "G-XXXXXXXXXX"), and only after the visitor
// has granted consent via the cookie banner — so dev/preview builds stay
// analytics-free and no measurement runs before an opt-in.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_ENABLED = !!GA_ID && process.env.NODE_ENV === "production";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Send a page_view on client-side route changes (App Router doesn't reload).
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ENABLED || typeof window.gtag !== "function") return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    window.gtag("event", "page_view", { page_path: url, page_location: window.location.href });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  const { status } = useCookieConsent();

  // No consent, no script. Nothing from Google is requested or executed until
  // the visitor actively opts in, so no analytics cookie can be set first.
  if (!GA_ENABLED || status !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      {/* useSearchParams needs a Suspense boundary in the App Router. */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
