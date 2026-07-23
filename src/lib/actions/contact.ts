"use server";

import * as z from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const ContactFormSchema = z.object({
  name: z.string().trim().min(2, { error: "Name must be at least 2 characters." }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Please enter a valid email." })),
  phone: z
    .string()
    .trim()
    .refine((val) => /^(?:\+63|0)\d{9,10}$/.test(val.replace(/[\s()-]/g, "")), {
      error: "Please enter a valid PH phone number (e.g. 0917 000 0000).",
    }),
  message: z
    .string()
    .trim()
    .min(10, { error: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  success?: boolean;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors };
  }

  await db.insert(contactMessages).values(validatedFields.data);

  return { success: true };
}
