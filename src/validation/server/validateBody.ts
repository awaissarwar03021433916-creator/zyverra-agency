import type { ZodType } from "zod";

export async function validateBody<T>(req: Request, schema: ZodType<T>) {
  const data = await req.json();
  return schema.parse(data);
}

