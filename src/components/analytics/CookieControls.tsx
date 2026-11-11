"use client";

import { useId } from "react";

import { useCookieConsent } from "@/hooks/useCookieConsent";

/** Live cookie controls on the /cookies page: current state + change it. */
export function CookieControls() {
  const consent = useCookieConsent();
  const statsId = useId();

  const marketingLabel = !consent.decided
    ? "No choice made yet (off)"
    : consent.marketing
      ? "On — you pressed Accept"
      : "Off — you pressed Reject";

  return (
    <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-foreground">Marketing cookies</div>
          <div className="text-sm text-muted-foreground" aria-live="polite">
            {marketingLabel}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => consent.accept(consent.statisticsOptOut)}
            className="inline-flex h-10 items-center rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => consent.reject(consent.statisticsOptOut)}
            className="inline-flex h-10 items-center rounded-lg border border-border bg-background px-4 text-sm font-semibold text-foreground hover:bg-muted"
          >
            Reject
          </button>
        </div>
      </div>

      <label htmlFor={statsId} className="flex cursor-pointer items-start gap-3 border-t border-border pt-4 text-sm text-foreground">
        <input
          id={statsId}
          type="checkbox"
          checked={consent.statisticsOptOut}
          onChange={(e) => consent.setStatisticsOptOut(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]"
        />
        <span>
          <span className="font-semibold">Opt out of statistics</span>
          <span className="block text-xs text-muted-foreground">
            Stops our cookieless, aggregate visit counting (Vercel Web Analytics) on this browser.
          </span>
        </span>
      </label>
    </div>
  );
}
