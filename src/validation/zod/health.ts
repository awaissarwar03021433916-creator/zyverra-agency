import { z } from "zod";

export const healthQuerySchema = z
  .object({
    verbose: z.coerce.boolean().optional(),
  })
  .partial()
  .strict();

