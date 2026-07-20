"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";
import { SectionHeading } from "@/components/ui/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <Button type="submit" disabled={pending} className="w-full">
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
        <Card className="mt-10 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(10)]">
          <CardContent>
            <form ref={formRef} action={formAction}>
              <FieldGroup>
                <ContactField id="name" label="Name" errors={state.errors?.name}>
                  <Input id="name" name="name" placeholder="Your name" required />
                </ContactField>
                <ContactField id="email" label="Email" errors={state.errors?.email}>
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                </ContactField>
                <ContactField id="message" label="Message" errors={state.errors?.message}>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your event…"
                    rows={5}
                    required
                  />
                </ContactField>
                <SubmitButton />
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
