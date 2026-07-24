ALTER TABLE "contact_messages" ADD COLUMN "event_date" date;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "guest_count" integer;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "event_type" text;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "location" text;--> statement-breakpoint
UPDATE "contact_messages" SET "event_date" = CURRENT_DATE, "guest_count" = 1 WHERE "event_date" IS NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ALTER COLUMN "event_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ALTER COLUMN "guest_count" SET NOT NULL;