import { prisma } from "@/database/prisma/client";

export async function createContactRequest(input: {
  name: string;
  email: string;
  message: string;
}) {
  return prisma.contact.create({
    data: {
      name: input.name,
      email: input.email,
      message: input.message,
    },
  });
}

