"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

import { useCookieConsent } from "@/hooks/useCookieConsent";

// Statistics: Vercel Web Analytics — first-party, cookieless, aggregate only.
// Runs unless the visitor opts out (see src/lib/cookieConsent.ts).
//
// Marketing: GA4 (NEXT_PUBLIC_GA_ID) and the Meta Pixel
// (NEXT_PUBLIC_META_PIXEL_ID). Production only, and only after the visitor
// presses Accept — nothing from Google or Meta is requested before that.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const IS_PROD = process.env.NODE_ENV === "production";

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: url, page_location: window.location.href });
    }
    if (typeof window.fbq === "function") window.fbq("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  const { marketing, statisticsOptOut } = useCookieConsent();
  const loadGa = IS_PROD && !!GA_ID && marketing;
  const loadPixel = IS_PROD && !!META_PIXEL_ID && marketing;

  return (
    <>
      {!statisticsOptOut && <VercelAnalytics />}

      {loadGa && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {loadPixel && (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      )}

      {(loadGa || loadPixel) && (
        // useSearchParams needs a Suspense boundary in the App Router.
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      )}
    </>
  );
}
