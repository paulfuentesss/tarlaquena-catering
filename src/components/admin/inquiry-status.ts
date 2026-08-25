import { inquiryStatusEnum } from "@/db/schema";

export type InquiryStatus = (typeof inquiryStatusEnum.enumValues)[number];

export const STATUS_ORDER: InquiryStatus[] = ["new", "contacted", "booked", "archived"];

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  archived: "Archived",
};

export const STATUS_BADGE_CLASSNAMES: Record<InquiryStatus, string> = {
  new: "border-transparent bg-terracotta/10 text-terracotta-dark",
  contacted: "border-transparent bg-muted text-muted-foreground",
  booked: "border-transparent bg-green/10 text-green-dark",
  archived: "border-border bg-transparent text-ink/40",
};

export const STATUS_TRIGGER_CLASSNAMES: Record<InquiryStatus, string> = {
  new: "rounded-full border-terracotta/20 bg-terracotta/15 text-terracotta-dark hover:bg-terracotta/20",
  contacted: "rounded-full border-ink/10 bg-ink/8 text-ink/70 hover:bg-ink/12",
  booked: "rounded-full border-green/20 bg-green/15 text-green-dark hover:bg-green/20",
  archived: "rounded-full border-border bg-transparent text-ink/40 hover:bg-muted/50",
};
