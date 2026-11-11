"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { track, type TrackEvent } from "@/lib/analytics";

/** A Next.js Link (or plain <a> for mailto:/external) that fires a consent-aware event. */
export function TrackedLink({
  event,
  params,
  href,
  onClick,
  ...rest
}: Omit<ComponentProps<"a">, "href"> & {
  href: string;
  event: TrackEvent;
  params?: Record<string, string>;
}) {
  const handle: ComponentProps<"a">["onClick"] = (e) => {
    track(event, { page_path: window.location.pathname, ...params });
    onClick?.(e);
  };
  if (/^(mailto:|tel:|https?:)/.test(href)) {
    return <a href={href} onClick={handle} {...rest} />;
  }
  return <Link href={href} onClick={handle} {...rest} />;
}
