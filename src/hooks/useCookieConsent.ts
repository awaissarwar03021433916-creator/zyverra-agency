"use client";

import { useSyncExternalStore } from "react";

import {
  denyConsent,
  getConsentSnapshot,
  getServerConsentSnapshot,
  grantConsent,
  resetConsent,
  subscribeConsent,
  type ConsentStatus,
} from "@/lib/cookieConsent";

/**
 * Reads the visitor's analytics consent decision.
 *
 * Backed by useSyncExternalStore so the server render and the hydrating client
 * render agree ("unset"), and every consumer updates together the moment a
 * choice is made — in this tab or another one.
 */
export function useCookieConsent(): {
  status: ConsentStatus;
  accept: () => void;
  reject: () => void;
  reset: () => void;
} {
  const status = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot
  );

  return { status, accept: grantConsent, reject: denyConsent, reset: resetConsent };
}
