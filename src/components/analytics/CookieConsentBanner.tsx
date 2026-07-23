"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Cookie } from "lucide-react";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { defaultLocale, isLocale } from "@/i18n/config";

// Analytics is the only optional category on this site, so the banner is a
// single yes/no decision rather than a category matrix. Accept and Decline are
// given equal visual weight — refusing must be exactly as easy as agreeing.
export function CookieConsentBanner() {
  const { status, accept, reject } = useCookieConsent();
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  // Link to the cookie policy in the locale the visitor is actually reading.
  const segment = pathname?.split("/")[1] ?? "";
  const lang = isLocale(segment) ? segment : defaultLocale;

  return (
    <AnimatePresence>
      {status === "unset" && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          aria-describedby="cookie-consent-description"
          // Sits above the chat launcher (z-50) and, on small screens, clears
          // it vertically so both stay usable.
          className="fixed inset-x-4 bottom-24 z-[60] sm:inset-x-auto sm:bottom-5 sm:start-5 sm:max-w-md"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.6 }}
        >
          <div className="rounded-2xl border border-border bg-card/95 p-5 shadow-xl backdrop-blur sm:p-6">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h2
                  id="cookie-consent-heading"
                  className="font-heading text-base font-semibold tracking-tight text-foreground"
                >
                  A quick word on cookies
                </h2>
                <p
                  id="cookie-consent-description"
                  className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                >
                  We use analytics cookies to understand which pages are useful. They are optional,
                  and the site works exactly the same if you decline. We run no advertising or
                  tracking cookies of any kind.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={accept}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
              >
                Accept analytics
              </button>
              <button
                type="button"
                onClick={reject}
                className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-border bg-background/70 px-5 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
              >
                Decline
              </button>
            </div>

            <a
              href={`/${lang}/cookies`}
              className="mt-3.5 inline-block text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Read our cookie policy
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
