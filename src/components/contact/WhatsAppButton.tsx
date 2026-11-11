"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { whatsappHref } from "@/config/business";
import { track } from "@/lib/analytics";

/** Official WhatsApp glyph, inline so it renders crisply with no request. */
export function WhatsAppGlyph({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/**
 * Floating WhatsApp button (Section H). Sits 12px above the chat launcher
 * (20px + 56px + 12px), below the cookie banner and modals in z-order, and
 * hides on small screens while the cookie banner is open so it never covers
 * the banner's buttons. It is a plain link, so it works without JavaScript.
 */
export function WhatsAppButton() {
  const pathname = usePathname();

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Zyverra Labs on WhatsApp (opens in a new tab)"
      onClick={() => track("whatsapp_click", { page_path: pathname ?? "/", location: "floating_button" })}
      className="wa-float group fixed right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 motion-reduce:transition-none motion-reduce:hover:scale-100"
      style={{ bottom: "calc(88px + var(--cookie-banner-offset, 0px))" }}
    >
      <WhatsAppGlyph />
      <span
        role="tooltip"
        className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 md:block"
      >
        Chat on WhatsApp
      </span>
    </a>
  );
}

/** Inline WhatsApp CTA for /contact, /pricing and service pages. */
export function WhatsAppInlineLink({
  children = "Message us on WhatsApp",
  className,
  location = "inline_cta",
}: {
  children?: ReactNode;
  className?: string;
  location?: string;
}) {
  const pathname = usePathname();
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { page_path: pathname ?? "/", location })}
      className={
        className ??
        // Dark text on WhatsApp green (~9:1) — white text would fail 4.5:1.
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 text-sm font-semibold sm:h-12 sm:px-6 text-[#0f1a24] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2ee072] hover:shadow-md motion-reduce:hover:translate-y-0"
      }
    >
      <WhatsAppGlyph className="h-4 w-4" />
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
