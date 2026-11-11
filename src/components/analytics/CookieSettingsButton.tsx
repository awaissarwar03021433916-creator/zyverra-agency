"use client";

import { openCookieSettings } from "@/lib/cookieConsent";

/** Reopens the cookie banner so a visitor can change their choice at any time. */
export function CookieSettingsButton({
  className,
  children = "Cookie settings",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {children}
    </button>
  );
}
