"use server";

import * as z from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const ContactFormSchema = z.object({
  firstName: z.string().trim().min(2, { error: "First name must be at least 2 characters." }),
  lastName: z.string().trim().min(2, { error: "Last name must be at least 2 characters." }),
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
  eventDate: z.iso.date({ error: "Please select an event date." }),
  guestCount: z.coerce
    .number({ error: "Please enter your guest count." })
    .int()
    .positive({ error: "Guest count must be at least 1." }),
  eventType: z.string().trim().optional(),
  location: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, { error: "Message must be at least 10 characters." }),
});

export type ContactFormState = {
  success?: boolean;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    eventDate?: string[];
    guestCount?: string[];
    eventType?: string[];
    location?: string[];
    message?: string[];
  };
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventDate: formData.get("eventDate"),
    guestCount: formData.get("guestCount"),
    eventType: formData.get("eventType") || undefined,
    location: formData.get("location") || undefined,
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return { errors: z.flattenError(validatedFields.error).fieldErrors };
  }

  await db.insert(contactMessages).values(validatedFields.data);

  return { success: true };
}
