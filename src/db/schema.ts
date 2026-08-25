import { date, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "contacted",
  "booked",
  "archived",
]);

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventDate: date("event_date").notNull(),
  guestCount: integer("guest_count").notNull(),
  eventType: text("event_type"),
  location: text("location"),
  message: text("message").notNull(),
  status: inquiryStatusEnum("status").notNull().default("new"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type ContactMessage = typeof contactMessages.$inferSelect;
