"use client";

import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EVENT_TYPES = ["Wedding", "Birthday", "Corporate", "Debut", "Other"];

const selectTriggerClassName =
  "w-full justify-between rounded-md border-transparent bg-muted/25 px-3.5 text-[15px] font-normal focus-visible:bg-card md:text-sm data-[size=default]:h-11";

const initialState: ContactFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-11 w-full hover:scale-100">
      {pending ? "Sending…" : "Send Inquiry"}
    </Button>
  );
}

function ContactField({
  id,
  label,
  errors,
  children,
}: {
  id: string;
  label: string;
  errors?: string[];
  children: ReactNode;
}) {
  return (
    <Field data-invalid={!!errors}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      <FieldError errors={errors?.map((message) => ({ message }))} />
    </Field>
  );
}

export function ContactForm({
  onSuccess,
  scrollableFields = false,
}: {
  onSuccess?: () => void;
  scrollableFields?: boolean;
}) {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showFooterShadow, setShowFooterShadow] = useState(false);

  const updateFooterShadow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowFooterShadow(el.scrollHeight - el.scrollTop - el.clientHeight > 1);
  }, []);

  useEffect(() => {
    if (!scrollableFields) return;
    updateFooterShadow();
    window.addEventListener("resize", updateFooterShadow);
    return () => window.removeEventListener("resize", updateFooterShadow);
  }, [scrollableFields, updateFooterShadow, state]);

  useEffect(() => {
    if (state.success) {
      toast.success("Thanks! We'll be in touch soon.");
      formRef.current?.reset();
      onSuccess?.();
    }
  }, [state.success, onSuccess]);

  const fields = (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContactField id="firstName" label="First Name" errors={state.errors?.firstName}>
          <Input id="firstName" name="firstName" placeholder="Juan" required />
        </ContactField>
        <ContactField id="lastName" label="Last Name" errors={state.errors?.lastName}>
          <Input id="lastName" name="lastName" placeholder="Dela Cruz" required />
        </ContactField>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContactField id="email" label="Email" errors={state.errors?.email}>
          <Input id="email" name="email" type="email" placeholder="you@example.com" required />
        </ContactField>
        <ContactField id="phone" label="Phone Number" errors={state.errors?.phone}>
          <Input id="phone" name="phone" type="tel" placeholder="0917 000 0000" required />
        </ContactField>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContactField id="eventDate" label="Event Date" errors={state.errors?.eventDate}>
          <Input id="eventDate" name="eventDate" type="date" required />
        </ContactField>
        <ContactField id="guestCount" label="Guest Count" errors={state.errors?.guestCount}>
          <Input
            id="guestCount"
            name="guestCount"
            type="number"
            min={1}
            placeholder="e.g. 80"
            required
          />
        </ContactField>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ContactField id="eventType" label="Event Type" errors={state.errors?.eventType}>
          <Select name="eventType">
            <SelectTrigger id="eventType" className={selectTriggerClassName}>
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </ContactField>
        <ContactField id="location" label="Location / Venue" errors={state.errors?.location}>
          <Input id="location" name="location" placeholder="e.g. Makati City" />
        </ContactField>
      </div>
      <ContactField id="message" label="Message" errors={state.errors?.message}>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your event…"
          rows={5}
          required
        />
      </ContactField>
    </>
  );

  if (scrollableFields) {
    return (
      <form ref={formRef} action={formAction} className="flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          onScroll={updateFooterShadow}
          className="flex-1 overflow-y-auto px-6 py-6"
        >
          <FieldGroup>{fields}</FieldGroup>
        </div>
        <div
          className={`shrink-0 bg-card px-6 py-4 transition-shadow duration-200 ${
            showFooterShadow ? "shadow-[0_-10px_15px_-10px_rgba(26,26,22,0.18)]" : ""
          }`}
        >
          <SubmitButton />
        </div>
      </form>
    );
  }

  return (
    <form ref={formRef} action={formAction}>
      <FieldGroup>
        {fields}
        <SubmitButton />
      </FieldGroup>
    </form>
  );
}
