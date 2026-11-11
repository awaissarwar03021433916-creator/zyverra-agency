"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { routes } from "@/config/site";
import { contactServiceOptions } from "@/validation/zod/contact";
import { track } from "@/lib/analytics";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(80, "Please keep your name under 80 characters."),
  email: z.string().trim().email("Please enter a valid email address.").max(254, "That email address is too long."),
  clinic: z.string().trim().min(1, "Please enter your clinic or salon name.").max(120, "Please keep this under 120 characters."),
  town: z.string().trim().min(1, "Please enter your town or city.").max(80, "Please keep this under 80 characters."),
  website: z.string().trim().max(200, "Please keep this under 200 characters."),
  services: z.array(z.string()).max(contactServiceOptions.length),
  message: z.string().trim().min(1, "Please tell us a little about what you need.").max(2000, "Please keep your message under 2,000 characters."),
});

type Values = z.infer<typeof schema>;

const initialValues: Values = { name: "", email: "", clinic: "", town: "", website: "", services: [], message: "" };

const labelClass = "text-xs font-semibold tracking-wide text-muted-foreground";

export default function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const uid = useId();

  useEffect(() => {
    if (!serverMessage) return;
    const timer = window.setTimeout(() => setServerMessage(null), 6000);
    return () => window.clearTimeout(timer);
  }, [serverMessage]);

  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: initialValues, mode: "onSubmit" });
  const { register, formState } = form;
  const errors = formState.errors;

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setServerMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;

      if (!res.ok || !payload?.success) {
        setServerError(
          res.status === 429
            ? "Too many messages from this connection. Please try again shortly, or message us on WhatsApp."
            : "Sorry, something went wrong. Please try again, or message us on WhatsApp."
        );
        return;
      }
      track("quote_form_submit", { page_path: window.location.pathname, services: values.services.join(",") });
      setServerMessage("Thank you — your message has been sent. We'll be in touch soon.");
      form.reset(initialValues);
    } catch {
      setServerError("We couldn't reach the server. Please check your connection and try again.");
    }
  });

  const field = (id: keyof Values) => `${uid}-${id}`;
  const err = (id: keyof Values) => errors[id]?.message as string | undefined;

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate aria-describedby={`${uid}-privacy`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={field("name")} className={labelClass}>Your name</label>
          <Input id={field("name")} autoComplete="name" aria-invalid={Boolean(err("name"))} aria-describedby={err("name") ? `${field("name")}-err` : undefined} {...register("name")} />
          {err("name") && <p id={`${field("name")}-err`} className="text-xs text-destructive">{err("name")}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor={field("email")} className={labelClass}>Email</label>
          <Input id={field("email")} type="email" autoComplete="email" aria-invalid={Boolean(err("email"))} aria-describedby={err("email") ? `${field("email")}-err` : undefined} {...register("email")} />
          {err("email") && <p id={`${field("email")}-err`} className="text-xs text-destructive">{err("email")}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor={field("clinic")} className={labelClass}>Clinic or salon name</label>
          <Input id={field("clinic")} autoComplete="organization" aria-invalid={Boolean(err("clinic"))} aria-describedby={err("clinic") ? `${field("clinic")}-err` : undefined} {...register("clinic")} />
          {err("clinic") && <p id={`${field("clinic")}-err`} className="text-xs text-destructive">{err("clinic")}</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor={field("town")} className={labelClass}>Town or city</label>
          <Input id={field("town")} autoComplete="address-level2" aria-invalid={Boolean(err("town"))} aria-describedby={err("town") ? `${field("town")}-err` : undefined} {...register("town")} />
          {err("town") && <p id={`${field("town")}-err`} className="text-xs text-destructive">{err("town")}</p>}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={field("website")} className={labelClass}>Current website (optional)</label>
        <Input id={field("website")} type="url" inputMode="url" autoComplete="url" placeholder="https://" aria-invalid={Boolean(err("website"))} {...register("website")} />
        {err("website") && <p className="text-xs text-destructive">{err("website")}</p>}
      </div>

      <fieldset className="grid gap-2">
        <legend className={`${labelClass} mb-2`}>Services you&apos;re interested in</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {contactServiceOptions.map((opt) => (
            <label key={opt} className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40">
              <input type="checkbox" value={opt} className="h-4 w-4 accent-[var(--primary)]" {...register("services")} />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-2">
        <label htmlFor={field("message")} className={labelClass}>Message</label>
        <Textarea id={field("message")} className="min-h-28" aria-invalid={Boolean(err("message"))} aria-describedby={err("message") ? `${field("message")}-err` : undefined} {...register("message")} />
        {err("message") && <p id={`${field("message")}-err`} className="text-xs text-destructive">{err("message")}</p>}
      </div>

      <p id={`${uid}-privacy`} className="text-xs leading-relaxed text-muted-foreground">
        We use your details only to reply to your enquiry. See our{" "}
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
            Send enquiry
            <Send aria-hidden className="ms-2 h-4 w-4" />
          </>
        )}
      </Button>

      <div aria-live="polite">
        {serverMessage && <p className="text-sm text-emerald-700">{serverMessage}</p>}
        {serverError && <p className="text-sm text-destructive">{serverError}</p>}
      </div>
    </form>
  );
}
