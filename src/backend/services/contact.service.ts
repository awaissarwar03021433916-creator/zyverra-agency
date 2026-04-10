import { createContactRequest as createContactRepository } from "@/database/repositories/contact.repository";

export async function createContactRequest(input: {
  name: string;
  email: string;
  message: string;
}) {
  return createContactRepository(input);
}

