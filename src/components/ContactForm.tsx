"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Check, Loader2, Send } from "lucide-react";
import { executeRecaptcha, recaptchaEnabled } from "@/lib/recaptcha-client";
import RecaptchaField from "@/components/RecaptchaField";

type FormState = {
  name: string;
  email: string;
  phone: string;
  topic: "quote" | "maintenance" | "support" | "partnership" | "other";
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "quote",
  message: "",
  consent: false,
};

const topics = [
  { value: "quote", label: "A new quote" },
  { value: "maintenance", label: "Maintenance or service" },
  { value: "support", label: "Support on an existing system" },
  { value: "partnership", label: "Partnership or supply" },
  { value: "other", label: "Something else" },
] as const;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState("");
  const [challenged, setChallenged] = useState(false);
  const [v2Token, setV2Token] = useState("");

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as string]) return current;
      const next = { ...current };
      delete next[key as string];
      return next;
    });
  };

  const handleV2Token = useCallback((token: string) => setV2Token(token), []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");

    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Enter your name";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address";
    if (!/^(?:\+?254|0)[17]\d{8}$/.test(form.phone.trim()))
      next.phone = "Use a Kenyan mobile number, for example 0712 345 678";
    if (form.message.trim().length < 20)
      next.message = "Please give us at least 20 characters";
    if (!form.consent) next.consent = "Please accept the privacy notice";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const token = v2Token || (await executeRecaptcha("contact_submit"));
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken: token }),
      });

      const data = (await response.json()) as {
        code?: string;
        error?: string;
        issues?: Array<{ field: string; message: string }>;
      };

      if (response.status === 400 && data.code === "recaptcha_challenge") {
        setChallenged(true);
        setV2Token("");
        setServerError("Please complete the quick check below, then send again.");
        return;
      }

      if (!response.ok) {
        if (data.issues?.length) {
          setErrors(Object.fromEntries(data.issues.map((issue) => [issue.field, issue.message])));
        }
        setServerError(data.error ?? "Message not sent. Please try again.");
        return;
      }

      setSent(true);
      setForm(initialState);
    } catch (error) {
      console.error(error);
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="card-surface p-8 text-center">
        <Check className="mx-auto h-8 w-8 text-brand-ink" aria-hidden="true" />
        <h2 className="mt-4 font-[Roboto] text-xl font-bold text-ink">
          Message received
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Thank you for reaching out. Our team replies within one working day. If it is urgent,
          message us on WhatsApp and we will pick it up sooner.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="btn-ghost mt-6 !py-2.5 text-sm"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Full name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="field mt-2"
          />
          {errors.name && <FieldError message={errors.name} />}
        </div>
        <div>
          <label htmlFor="contact-phone" className="field-label">
            Phone number
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="0712 345 678"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="field mt-2"
          />
          {errors.phone && <FieldError message={errors.phone} />}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-email" className="field-label">
          Email address
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          className="field mt-2"
        />
        {errors.email && <FieldError message={errors.email} />}
      </div>

      <div className="mt-4">
        <label htmlFor="contact-topic" className="field-label">
          What is this about?
        </label>
        <select
          id="contact-topic"
          value={form.topic}
          onChange={(event) => update("topic", event.target.value as FormState["topic"])}
          className="field mt-2"
        >
          {topics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Tell us about your property, your bill and what you would like to achieve."
          className="field mt-2"
        />
        {errors.message && <FieldError message={errors.message} />}
      </div>

      <label className="mt-5 flex items-start gap-3 text-[13px] leading-[1.65] text-muted">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-0.5 h-4 w-4 border-line accent-[var(--brand-ink)]"
        />
        <span>
          I agree that Elisha Solar may store and use these details to respond to me, under the{" "}
          <Link href="/legal/privacy-policy" className="font-semibold text-brand-ink">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {errors.consent && <FieldError message={errors.consent} />}

      <RecaptchaField challenged={challenged} onToken={handleV2Token} />

      {serverError && (
        <p role="alert" className="mt-4 border border-[#E7C3C3] bg-[#FDF3F3] px-4 py-3 text-[13px] font-medium text-[#8A1C1C]">
          {serverError}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-faint">
          Protected by reCAPTCHA v3
          {recaptchaEnabled ? "" : " (site key not set in this environment)"}.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-brand !py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Send className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 text-xs font-medium text-[#8A1C1C]">
      {message}
    </p>
  );
}
