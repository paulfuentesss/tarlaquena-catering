"use client";

import { useActionState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import type { ContactMessage } from "@/db/schema";
import { updateInquiryNotes } from "@/lib/actions/inquiries";
import { Dialog, DialogPopup, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { InquiryStatusSelect } from "./inquiry-status-select";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-muted-foreground uppercase">{label}</div>
      <div className="text-sm text-ink">{value}</div>
    </div>
  );
}

export function AdminInquiryDetailDialog({
  inquiry,
  open,
  onOpenChange,
}: {
  inquiry: ContactMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, formAction] = useActionState(updateInquiryNotes, {});
  const notesRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (state.success) toast.success("Note saved.");
    if (state.error) toast.error(state.error);
  }, [state.success, state.error]);

  if (!inquiry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-lg bg-card">
        <div className="max-h-[85vh] overflow-y-auto px-6 py-6">
          <DialogTitle>
            {inquiry.firstName} {inquiry.lastName}
          </DialogTitle>
          <DialogDescription>Submitted {inquiry.createdAt.toLocaleString()}</DialogDescription>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <DetailRow label="Email" value={inquiry.email} />
            <DetailRow label="Phone" value={inquiry.phone} />
            <DetailRow label="Event date" value={inquiry.eventDate} />
            <DetailRow label="Guests" value={String(inquiry.guestCount)} />
            <DetailRow label="Event type" value={inquiry.eventType ?? "—"} />
            <DetailRow label="Location" value={inquiry.location ?? "—"} />
          </div>

          <div className="mt-4">
            <div className="text-xs font-medium text-muted-foreground uppercase">Message</div>
            <p className="mt-1 text-sm whitespace-pre-wrap text-ink">{inquiry.message}</p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground uppercase">Status</span>
            <InquiryStatusSelect id={inquiry.id} status={inquiry.status} />
          </div>

          <form action={formAction} className="mt-5">
            <input type="hidden" name="id" value={inquiry.id} />
            <Field>
              <FieldLabel
                htmlFor="notes"
                className="text-xs font-medium text-muted-foreground uppercase"
              >
                Admin notes
              </FieldLabel>
              <Textarea
                ref={notesRef}
                id="notes"
                name="notes"
                defaultValue={inquiry.notes}
                key={inquiry.id}
                placeholder="Internal notes — not visible to the customer."
                rows={3}
              />
            </Field>
            <div className="mt-3 flex items-center gap-2">
              <Button type="submit" size="sm" variant="secondary">
                Save note
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                render={
                  <a
                    href={`mailto:${inquiry.email}?subject=${encodeURIComponent("Re: Your catering inquiry")}`}
                    aria-label="Reply via email"
                  />
                }
              >
                <Mail className="size-4" />
                Reply via email
              </Button>
            </div>
          </form>
        </div>
      </DialogPopup>
    </Dialog>
  );
}
