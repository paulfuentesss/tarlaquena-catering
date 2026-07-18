"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

const initialState: ContactFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-fit">
      {pending ? "Sending…" : "Send Inquiry"}
    </Button>
  );
}

export function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Thanks! We'll be in touch soon.");
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section id="contact" className="bg-cream px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-2xl">
        <SectionHeading eyebrow="Get in touch" title="Send an Inquiry" align="center" />
        <form ref={formRef} action={formAction} className="mt-10">
          <FieldGroup>
            <Field data-invalid={!!state.errors?.name}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input id="name" name="name" placeholder="Your name" required />
              <FieldError errors={state.errors?.name?.map((message) => ({ message }))} />
            </Field>
            <Field data-invalid={!!state.errors?.email}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              <FieldError errors={state.errors?.email?.map((message) => ({ message }))} />
            </Field>
            <Field data-invalid={!!state.errors?.message}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your event…"
                rows={5}
                required
              />
              <FieldError errors={state.errors?.message?.map((message) => ({ message }))} />
            </Field>
            <SubmitButton />
          </FieldGroup>
        </form>
      </div>
    </section>
  );
}
