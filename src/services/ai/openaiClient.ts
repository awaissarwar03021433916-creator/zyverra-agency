import OpenAI from "openai";

import { env } from "@/config/env";

/**
 * Single shared OpenAI client. Both the sales-reply service and the upcoming
 * lead-extraction service (Phase 2) import this instead of constructing their
 * own client.
 */
export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
