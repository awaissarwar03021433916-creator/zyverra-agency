import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1).max(80),
  email: z.string().email().max(254),
  message: z.string().min(1).max(2000),
});

