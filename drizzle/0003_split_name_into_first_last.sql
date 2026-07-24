ALTER TABLE "contact_messages" ADD COLUMN "first_name" text;--> statement-breakpoint
ALTER TABLE "contact_messages" ADD COLUMN "last_name" text;--> statement-breakpoint
UPDATE "contact_messages"
SET
  "first_name" = split_part("name", ' ', 1),
  "last_name" = COALESCE(NULLIF(trim(substring("name" from position(' ' in "name") + 1)), ''), split_part("name", ' ', 1))
WHERE "first_name" IS NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_messages" DROP COLUMN "name";