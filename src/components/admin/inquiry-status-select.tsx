"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateInquiryStatus } from "@/lib/actions/inquiries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  STATUS_LABELS,
  STATUS_ORDER,
  STATUS_TRIGGER_CLASSNAMES,
  type InquiryStatus,
} from "./inquiry-status";

export function InquiryStatusSelect({ id, status }: { id: number; status: InquiryStatus }) {
  const [state, formAction] = useActionState(updateInquiryStatus, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state.error]);

  return (
    <Select
      value={status}
      onValueChange={(value) => {
        const formData = new FormData();
        formData.set("id", String(id));
        formData.set("status", value as string);
        formAction(formData);
      }}
    >
      <SelectTrigger
        size="sm"
        className={cn("h-8 w-28 text-xs", STATUS_TRIGGER_CLASSNAMES[status])}
      >
        <SelectValue>{(value: InquiryStatus) => STATUS_LABELS[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {STATUS_ORDER.map((value) => (
          <SelectItem key={value} value={value}>
            {STATUS_LABELS[value]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
