"use client";

import { useCallback, useState, type ReactElement } from "react";
import { ContactForm } from "@/components/contact-form";
import { Dialog, DialogTrigger, DialogPopup, DialogTitle } from "@/components/ui/dialog";

export function ContactDialog({ trigger }: { trigger: ReactElement }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogPopup className="max-w-lg bg-card">
        <div className="shrink-0 px-6 pt-6 pb-4">
          <DialogTitle>Send an Inquiry</DialogTitle>
        </div>
        <ContactForm onSuccess={close} scrollableFields />
      </DialogPopup>
    </Dialog>
  );
}
