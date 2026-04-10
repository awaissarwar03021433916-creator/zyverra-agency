"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(80, "Name is too long"),
  email: z.string().email("Enter a valid email").max(254, "Email is too long"),
  message: z.string().min(1, "Message is required").max(2000, "Message is too long"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    if (!serverMessage) return;

    const timer = window.setTimeout(() => {
      setServerMessage(null);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [serverMessage]);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    setServerMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string; message?: string }
        | null;

      if (!res.ok || !payload?.success) {
        if (res.status === 429) {
          setServerError(payload?.message ?? "Too many requests right now. Please try again in a minute.");
          return;
        }

        setServerError(payload?.message ?? "Could not send your message. Please try again.");
        return;
      }

      setServerMessage(payload.message ?? "Message sent successfully. We will get back to you soon.");
      form.reset({
        name: "",
        email: "",
        message: "",
      });
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  });

  const { register, formState } = form;
  const isSubmitting = formState.isSubmitting;

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <label htmlFor="contact-name" className="text-xs font-semibold tracking-wide text-muted-foreground">
          NAME
        </label>
        <Input
          id="contact-name"
          placeholder="Your name"
          aria-invalid={Boolean(formState.errors.name)}
          {...register("name")}
        />
        {formState.errors.name ? (
          <p className="text-xs text-destructive">{formState.errors.name.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-email" className="text-xs font-semibold tracking-wide text-muted-foreground">
          EMAIL
        </label>
        <Input
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          aria-invalid={Boolean(formState.errors.email)}
          {...register("email")}
        />
        {formState.errors.email ? (
          <p className="text-xs text-destructive">{formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor="contact-message" className="text-xs font-semibold tracking-wide text-muted-foreground">
          MESSAGE
        </label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your project, timeline, and goals."
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>

      {serverMessage ? <p className="text-xs text-emerald-500">{serverMessage}</p> : null}
      {serverError ? <p className="text-xs text-destructive">{serverError}</p> : null}
    </form>
  );
}
