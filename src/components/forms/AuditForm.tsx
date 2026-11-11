"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { routes } from "@/config/site";
import { track } from "@/lib/analytics";

const schema = z.object({
  clinic: z.string().trim().min(1, "Please enter your clinic name.").max(120, "Please keep this under 120 characters."),
  website: z
    .string()
    .trim()
    .min(4, "Please enter your website address.")
    .max(200, "Please keep this under 200 characters.")
    .refine((v) => /\.[a-z]{2,}/i.test(v), "Please enter a valid website address, e.g. yourclinic.co.uk"),
  town: z.string().trim().min(1, "Please enter your town or city.").max(80, "Please keep this under 80 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(254, "That email address is too long."),
});

type Values = z.infer<typeof schema>;
const initial: Values = { clinic: "", website: "", town: "", email: "" };
const labelClass = "text-xs font-semibold tracking-wide text-muted-foreground";

/** Free clinic website audit request — sent through the existing contact API. */
export default function AuditForm() {
  const uid = useId();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: initial });
  const { register, formState } = form;
  const err = (k: keyof Values) => formState.errors[k]?.message;

  const onSubmit = form.handleSubmit(async (v) => {
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: v.clinic,
          email: v.email,
          clinic: v.clinic,
          town: v.town,
          website: v.website,
          services: ["Clinic website"],
          message: "FREE CLINIC WEBSITE AUDIT REQUEST",
        }),
      });
      const payload = (await res.json().catch(() => null)) as { success?: boolean } | null;
      if (!res.ok || !payload?.success) {
        setError(
          res.status === 429
            ? "Too many requests from this connection. Please try again shortly, or message us on WhatsApp."
            : "Sorry, something went wrong. Please try again, or message us on WhatsApp."
        );
        return;
      }
      track("audit_form_submit", { page_path: window.location.pathname });
      setDone(true);
      form.reset(initial);
    } catch {
      setError("We couldn't reach the server. Please check your connection and try again.");
    }
  });

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-sm text-emerald-900">
        <p className="font-semibold">Thank you — your audit request is in.</p>
        <p className="mt-1">We&apos;ll review your website and send your personalised audit to your email.</p>
      </div>
    );
  }

  const field = (k: keyof Values) => `${uid}-${k}`;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={field("clinic")} className={labelClass}>Clinic name</label>
          <Input id={field("clinic")} autoComplete="organization" aria-invalid={Boolean(err("clinic"))} {...register("clinic")} />
          {err("clinic") && <p className="text-xs text-destructive">{err("clinic")}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor={field("website")} className={labelClass}>Website address</label>
          <Input id={field("website")} inputMode="url" autoComplete="url" placeholder="yourclinic.co.uk" aria-invalid={Boolean(err("website"))} {...register("website")} />
          {err("website") && <p className="text-xs text-destructive">{err("website")}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor={field("town")} className={labelClass}>Town or city</label>
          <Input id={field("town")} autoComplete="address-level2" aria-invalid={Boolean(err("town"))} {...register("town")} />
          {err("town") && <p className="text-xs text-destructive">{err("town")}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor={field("email")} className={labelClass}>Email</label>
          <Input id={field("email")} type="email" autoComplete="email" aria-invalid={Boolean(err("email"))} {...register("email")} />
          {err("email") && <p className="text-xs text-destructive">{err("email")}</p>}
        </div>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        We use your details only to send your audit and reply to you. See our{" "}
        <Link href={routes.privacy} className="font-semibold text-primary hover:underline">privacy policy</Link>.
      </p>
      <Button type="submit" disabled={formState.isSubmitting} className="h-11 w-full">
        {formState.isSubmitting ? (
          <>
            <Loader2 aria-hidden className="me-2 h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Get my free audit
            <Send aria-hidden className="ms-2 h-4 w-4" />
          </>
        )}
      </Button>
      <div aria-live="polite">{error && <p className="text-sm text-destructive">{error}</p>}</div>
    </form>
  );
}
