"use client";

import { useActionState } from "react";

import { sendContactMessage, type ContactState } from "@/app/[lang]/contacto/actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    invalidEmail: string;
    honeypot: string;
  };
}) {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const disabled = pending || state.status === "success";
  const errorFor = (field: "name" | "email" | "message") => {
    const key = state.fieldErrors?.[field];
    return key === "invalidEmail" ? labels.invalidEmail : key ? labels.required : undefined;
  };

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-foreground">{labels.name}</label>
        <input id="contact-name" name="name" type="text" required maxLength={100} disabled={disabled} aria-invalid={Boolean(errorFor("name"))} className="min-h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted focus:border-accent" />
        {errorFor("name") ? <p className="mt-2 text-sm text-red-600 dark:text-red-300" role="alert">{errorFor("name")}</p> : null}
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-foreground">{labels.email}</label>
        <input id="contact-email" name="email" type="email" required maxLength={254} disabled={disabled} aria-invalid={Boolean(errorFor("email"))} className="min-h-12 w-full rounded-xl border border-border bg-background px-4 text-foreground outline-none transition placeholder:text-muted focus:border-accent" />
        {errorFor("email") ? <p className="mt-2 text-sm text-red-600 dark:text-red-300" role="alert">{errorFor("email")}</p> : null}
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-foreground">{labels.message}</label>
        <textarea id="contact-message" name="message" required maxLength={5000} rows={7} disabled={disabled} aria-invalid={Boolean(errorFor("message"))} className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted focus:border-accent" />
        {errorFor("message") ? <p className="mt-2 text-sm text-red-600 dark:text-red-300" role="alert">{errorFor("message")}</p> : null}
      </div>
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">{labels.honeypot}</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {state.status === "success" ? <p className="rounded-xl bg-accent/10 p-4 text-sm text-accent-strong dark:text-accent" role="status">{labels.success}</p> : null}
      {state.status === "error" ? <p className="rounded-xl bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300" role="alert">{labels.error}</p> : null}
      <button type="submit" disabled={disabled} className="btn btn-primary w-full">
        {pending ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
