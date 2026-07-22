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
      <DialogPopup>
        <DialogTitle>Send an Inquiry</DialogTitle>
        <div className="mt-6">
          <ContactForm onSuccess={close} />
        </div>
      </DialogPopup>
    </Dialog>
  );
}
