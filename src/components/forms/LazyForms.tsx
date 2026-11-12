"use client";

import dynamic from "next/dynamic";

// The contact and audit forms pull in react-hook-form and zod (~80 KB gzipped).
// Importing them through next/dynamic puts that code in its own chunk, loaded
// only when a form actually renders. Without this, every page that links to
// /contact (the hero "Get a quote" button, the navbar) downloaded it during
// Link prefetching. Server rendering is kept (ssr is on by default), so the
// form HTML is unchanged.
export const LazyContactForm = dynamic(() => import("./ContactForm"));
export const LazyAuditForm = dynamic(() => import("./AuditForm"));
