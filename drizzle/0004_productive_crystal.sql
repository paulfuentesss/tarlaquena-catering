CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'contacted', 'booked', 'archived');--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "status" "inquiry_status" DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "notes" text DEFAULT '' NOT NULL;