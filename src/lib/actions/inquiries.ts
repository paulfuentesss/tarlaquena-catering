"use server";

import * as z from "zod";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { contactMessages, inquiryStatusEnum } from "@/db/schema";

async function requireAdmin() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email || email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
}

const UpdateStatusSchema = z.object({
  id: z.coerce.number().int().positive(),
  status: z.enum(inquiryStatusEnum.enumValues, { error: "Invalid status." }),
});

export type UpdateStatusState = { success?: boolean; error?: string };

export async function updateInquiryStatus(
  _prevState: UpdateStatusState,
  formData: FormData
): Promise<UpdateStatusState> {
  await requireAdmin();

  const parsed = UpdateStatusSchema.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
  });
  if (!parsed.success) {
    return { error: "Invalid status update." };
  }

  await db
    .update(contactMessages)
    .set({ status: parsed.data.status })
    .where(eq(contactMessages.id, parsed.data.id));

  revalidatePath("/admin");
  return { success: true };
}

const BulkUpdateStatusSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1),
  status: z.enum(inquiryStatusEnum.enumValues),
});

export type BulkUpdateStatusState = { success?: boolean; error?: string };

export async function bulkUpdateInquiryStatus(
  ids: number[],
  status: (typeof inquiryStatusEnum.enumValues)[number]
): Promise<BulkUpdateStatusState> {
  await requireAdmin();

  const parsed = BulkUpdateStatusSchema.safeParse({ ids, status });
  if (!parsed.success) {
    return { error: "Invalid bulk status update." };
  }

  await db
    .update(contactMessages)
    .set({ status: parsed.data.status })
    .where(inArray(contactMessages.id, parsed.data.ids));

  revalidatePath("/admin");
  return { success: true };
}

const UpdateNotesSchema = z.object({
  id: z.coerce.number().int().positive(),
  notes: z.string().trim().max(2000, { error: "Notes must be under 2000 characters." }),
});

export type UpdateNotesState = { success?: boolean; error?: string };

export async function updateInquiryNotes(
  _prevState: UpdateNotesState,
  formData: FormData
): Promise<UpdateNotesState> {
  await requireAdmin();

  const parsed = UpdateNotesSchema.safeParse({
    id: formData.get("id"),
    notes: formData.get("notes") ?? "",
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid notes." };
  }

  await db
    .update(contactMessages)
    .set({ notes: parsed.data.notes })
    .where(eq(contactMessages.id, parsed.data.id));

  revalidatePath("/admin");
  return { success: true };
}
