"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import type { Dictionary } from "@/i18n/types";

type ContactDict = Dictionary["contactForm"];

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm({ dict }: { dict: ContactDict }) {
  const shouldReduceMotion = useReducedMotion();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, dict.nameRequired).max(80, dict.nameTooLong),
        email: z.string().email(dict.emailInvalid).max(254, dict.emailTooLong),
        message: z.string().min(1, dict.messageRequired).max(2000, dict.messageTooLong),
      }),
    [dict]
  );

  useEffect(() => {
    if (!serverMessage) return;
    const timer = window.setTimeout(() => setServerMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [serverMessage]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setServerMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string; message?: string }
        | null;

      if (!res.ok || !payload?.success) {
        if (res.status === 429) {
          setServerError(payload?.message ?? dict.errorRate);
          return;
        }
        setServerError(payload?.message ?? dict.errorGeneric);
        return;
      }

      setServerMessage(payload.message ?? dict.success);
      form.reset(initialValues);
    } catch {
      setServerError(dict.errorNetwork);
    }
  });

  const { register, formState } = form;
  const isSubmitting = formState.isSubmitting;

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-xs font-semibold tracking-wide text-muted-foreground">
          {dict.name}
        </label>
        <Input
          id="contact-name"
          placeholder={dict.namePlaceholder}
          aria-invalid={Boolean(formState.errors.name)}
          {...register("name")}
        />
        {formState.errors.name ? (
          <p className="text-xs text-destructive">{formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-xs font-semibold tracking-wide text-muted-foreground">
          {dict.email}
        </label>
        <Input
          id="contact-email"
          type="email"
          placeholder={dict.emailPlaceholder}
          aria-invalid={Boolean(formState.errors.email)}
          {...register("email")}
        />
        {formState.errors.email ? (
          <p className="text-xs text-destructive">{formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-xs font-semibold tracking-wide text-muted-foreground">
          {dict.message}
        </label>
        <Textarea
          id="contact-message"
          placeholder={dict.messagePlaceholder}
          className="min-h-28"
          aria-invalid={Boolean(formState.errors.message)}
          {...register("message")}
        />
        {formState.errors.message ? (
          <p className="text-xs text-destructive">{formState.errors.message.message}</p>
        ) : null}
      </div>

      <motion.div whileHover={shouldReduceMotion ? {} : { y: -1 }} whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}>
        <Button type="submit" disabled={isSubmitting} className="h-11 w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="me-2 h-4 w-4 animate-spin" />
              {dict.sending}
            </>
          ) : (
            <>
              {dict.submit}
              <Send className="ms-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>

      {serverMessage ? <p className="text-xs text-emerald-600">{serverMessage}</p> : null}
      {serverError ? <p className="text-xs text-destructive">{serverError}</p> : null}
    </form>
  );
}
