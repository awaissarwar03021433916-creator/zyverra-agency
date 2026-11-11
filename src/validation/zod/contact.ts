import { z } from "zod";

// Services a visitor can tick on the contact form. Shared by the client form
// and the API so only known values are ever accepted.
export const contactServiceOptions = [
  "Clinic website",
  "Admin dashboard",
  "Local SEO & AI search",
  "Meta ads",
  "Social media & reels",
  "AI chatbot / custom software",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  clinic: z.string().trim().min(1).max(120),
  town: z.string().trim().min(1).max(80),
  website: z.string().trim().max(200).optional().default(""),
  services: z.array(z.enum(contactServiceOptions)).max(contactServiceOptions.length).optional().default([]),
  message: z.string().trim().min(1).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
