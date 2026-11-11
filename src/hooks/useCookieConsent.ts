"use client";

import { useSyncExternalStore } from "react";

import {
  acceptAll,
  getConsentSnapshot,
  getServerConsentSnapshot,
  openCookieSettings,
  rejectMarketing,
  setStatisticsOptOut,
  subscribeConsent,
  type ConsentState,
} from "@/lib/cookieConsent";

/**
 * Reads the visitor's cookie choices. Server and hydrating client renders agree
 * (undecided), and every consumer updates together when a choice is made.
 */
export function useCookieConsent(): ConsentState & {
  accept: typeof acceptAll;
  reject: typeof rejectMarketing;
  setStatisticsOptOut: typeof setStatisticsOptOut;
  openSettings: typeof openCookieSettings;
} {
  const state = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerConsentSnapshot);
  return {
    ...state,
    accept: acceptAll,
    reject: rejectMarketing,
    setStatisticsOptOut,
    openSettings: openCookieSettings,
  };
}
