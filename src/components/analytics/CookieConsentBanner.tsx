"use client";

import { useEffect, useId, useState } from "react";
import { Cookie } from "lucide-react";

import { useCookieConsent } from "@/hooks/useCookieConsent";
import { subscribeOpenSettings } from "@/lib/cookieConsent";
import { routes } from "@/config/site";

// Step 8 banner. "Accept" and "Reject" have equal prominence, nothing is
// pre-ticked, and the statistics objection is a plain unticked "opt out" box.
// The footer "Cookie settings" link and the /cookies page reopen it.
export function CookieConsentBanner() {
  const consent = useCookieConsent();
  const [reopened, setReopened] = useState(false);
  const [optOut, setOptOut] = useState(false);
  const optOutId = useId();

  const visible = !consent.decided || reopened;

  useEffect(
    () =>
      subscribeOpenSettings(() => {
        setOptOut(consent.statisticsOptOut);
        setReopened(true);
      }),
    [consent.statisticsOptOut]
  );

  // Lets other fixed UI (the WhatsApp button) step out of the way on small
  // screens while the banner is showing.
  useEffect(() => {
    document.documentElement.dataset.cookieBanner = visible ? "open" : "closed";
  }, [visible]);

  const choose = (accept: boolean) => {
    if (accept) consent.accept(optOut);
    else consent.reject(optOut);
    setReopened(false);
  };

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-heading"
          aria-describedby="cookie-consent-description"
          className="fixed inset-x-4 bottom-24 z-[60] sm:inset-x-auto sm:bottom-5 sm:start-5 sm:max-w-md"
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
                  Cookie settings
                </h2>
                <p
                  id="cookie-consent-description"
                  className="mt-1.5 text-sm leading-relaxed text-muted-foreground"
                >
                  Strictly necessary storage is always on. We also use cookieless, first-party
                  statistics to count visits in aggregate, which you can opt out of below.
                  Marketing cookies (Google Analytics and the Meta Pixel) only load if you
                  press Accept.
                </p>
              </div>
            </div>

            <label
              htmlFor={optOutId}
              className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background/70 px-3.5 py-3 text-sm text-foreground"
            >
              <input
                id={optOutId}
                type="checkbox"
                checked={optOut}
                onChange={(e) => {
                  setOptOut(e.target.checked);
                  consent.setStatisticsOptOut(e.target.checked);
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
              />
              <span>
                <span className="font-semibold">Opt out of statistics</span>
                <span className="block text-xs text-muted-foreground">
                  Stops our anonymous, aggregate visit counting on this browser.
                </span>
              </span>
            </label>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => choose(true)}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-muted"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => choose(false)}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-muted"
              >
                Reject
              </button>
            </div>

            <a
              href={routes.cookies}
              className="mt-3.5 inline-block text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Read our cookie policy
            </a>
          </div>
        </div>
      )}
    </>
  );
}
