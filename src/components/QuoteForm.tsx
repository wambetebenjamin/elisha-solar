"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { counties } from "@/lib/counties";
import {
  billBands,
  contactMethods,
  propertyTypes,
  type QuoteInput,
} from "@/lib/validations";
import { executeRecaptcha, recaptchaEnabled } from "@/lib/recaptcha-client";
import { formatKes } from "@/lib/savings";
import RecaptchaField from "@/components/RecaptchaField";

type FormState = {
  propertyType: QuoteInput["propertyType"] | "";
  monthlyBill: number;
  county: string;
  facilitySize: string;
  contactMethod: QuoteInput["contactMethod"] | "";
  name: string;
  phone: string;
  email: string;
  notes: string;
  consent: boolean;
};

const initialState: FormState = {
  propertyType: "",
  monthlyBill: 15000,
  county: "",
  facilitySize: "",
  contactMethod: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
  consent: false,
};

const steps = [
  { id: 1, title: "Your property" },
  { id: 2, title: "Your details" },
  { id: 3, title: "Review and send" },
];

export default function QuoteForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [challenged, setChallenged] = useState(false);
  const [v2Token, setV2Token] = useState("");

  const payload = useMemo<QuoteInput | null>(() => {
    if (!form.propertyType || !form.contactMethod) return null;
    return {
      propertyType: form.propertyType,
      monthlyBill: form.monthlyBill,
      county: form.county as QuoteInput["county"],
      facilitySize: form.facilitySize,
      contactMethod: form.contactMethod,
      name: form.name,
      phone: form.phone,
      email: form.email,
      notes: form.notes || undefined,
      consent: true,
    };
  }, [form]);

  const validateStep = (target: number): boolean => {
    const next: Record<string, string> = {};

    if (target >= 1) {
      if (!form.propertyType) next.propertyType = "Choose your property type";
      if (!form.county) next.county = "Select your county";
      if (form.facilitySize.trim().length < 1)
        next.facilitySize = "Tell us the number of rooms or facility size";
    }

    if (target >= 2) {
      if (!form.contactMethod) next.contactMethod = "Choose how we should reach you";
      if (form.name.trim().length < 2) next.name = "Enter your name";
      if (!/^(?:\+?254|0)[17]\d{8}$/.test(form.phone.trim()))
        next.phone = "Use a Kenyan mobile number, for example 0712 345 678";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
        next.email = "Enter a valid email address";
    }

    if (target >= 3) {
      if (!form.consent) next.consent = "Please accept the privacy notice to continue";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(3, current + 1));
  };

  const goBack = () => {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  };

  const handleV2Token = useCallback((token: string) => setV2Token(token), []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");

    if (!validateStep(3) || !payload) return;

    setSubmitting(true);
    try {
      const token = v2Token || (await executeRecaptcha("quote_submit"));
      const response = await fetch("/api/quote/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, recaptchaToken: token }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        reference?: string;
        emailDelivered?: boolean;
        code?: string;
        error?: string;
        issues?: Array<{ field: string; message: string }>;
        summary?: Record<string, unknown>;
        nextStep?: string;
      };

      if (response.status === 400 && data.code === "recaptcha_challenge") {
        setChallenged(true);
        setV2Token("");
        setServerError("Please complete the quick check below, then send again.");
        return;
      }

      if (!response.ok) {
        if (data.issues?.length) {
          setErrors(
            Object.fromEntries(data.issues.map((issue) => [issue.field, issue.message])),
          );
        }
        setServerError(data.error ?? "We could not send your request. Please try again.");
        return;
      }

      const summaryPayload = {
        reference: data.reference,
        emailDelivered: data.emailDelivered,
        summary: data.summary,
        nextStep: data.nextStep,
        submittedAt: new Date().toISOString(),
      };

      try {
        window.sessionStorage.setItem("elisha_quote_summary", JSON.stringify(summaryPayload));
        window.localStorage.setItem("elisha_quote_last", JSON.stringify(summaryPayload));
      } catch {
        // session storage can be unavailable in private modes, the page falls back to the API
      }

      router.push(`/quote-confirmation?ref=${data.reference ?? ""}`);
    } catch (error) {
      console.error(error);
      setServerError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as string]) return current;
      const next = { ...current };
      delete next[key as string];
      return next;
    });
  };

  return (
    <form onSubmit={submit} noValidate className="card-surface p-6 sm:p-8">
      <ol className="mb-8 flex items-center gap-3" aria-label="Quote form progress">
        {steps.map((item, index) => {
          const state = step === item.id ? "current" : step > item.id ? "done" : "upcoming";
          return (
            <li key={item.id} className="flex flex-1 items-center gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                  state === "current"
                    ? "bg-[var(--primary)] text-white"
                    : state === "done"
                      ? "bg-[var(--primary)]/15 text-[#1f8b4a]"
                      : "bg-[var(--light)] text-[var(--dark)]/45"
                }`}
                aria-current={state === "current" ? "step" : undefined}
              >
                {state === "done" ? <Check className="h-4 w-4" aria-hidden="true" /> : item.id}
              </span>
              <span
                className={`hidden text-xs font-semibold sm:block ${
                  state === "upcoming" ? "text-[var(--dark)]/45" : "text-[var(--dark)]"
                }`}
              >
                {item.title}
              </span>
              {index < steps.length - 1 && (
                <span
                  className={`h-px flex-1 ${step > item.id ? "bg-[var(--primary)]/45" : "bg-[var(--dark)]/10"}`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <fieldset>
              <legend className="text-sm font-semibold text-[var(--dark)]">
                Property type
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {propertyTypes.map((option) => {
                  const selected = form.propertyType === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        selected
                          ? "border-[var(--primary)] bg-[var(--primary)]/6 ring-brand"
                          : "border-[var(--dark)]/12 hover:border-[var(--primary)]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="propertyType"
                        value={option.value}
                        checked={selected}
                        onChange={() => update("propertyType", option.value)}
                        className="sr-only"
                      />
                      <span className="block text-sm font-bold text-[var(--dark)]">
                        {option.label}
                      </span>
                      <span className="mt-1 block text-xs text-[var(--dark)]/60">
                        {option.hint}
                      </span>
                    </label>
                  );
                })}
              </div>
              {errors.propertyType && <FieldError message={errors.propertyType} />}
            </fieldset>

            <div>
              <label htmlFor="bill" className="text-sm font-semibold text-[var(--dark)]">
                Average monthly electricity bill
              </label>
              <select
                id="bill"
                value={form.monthlyBill}
                onChange={(event) => update("monthlyBill", Number(event.target.value))}
                className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm text-[var(--dark)] focus:border-[var(--primary)] focus:outline-none"
              >
                {billBands.map((band) => (
                  <option key={band.label} value={band.value}>
                    {band.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-[var(--dark)]/55">
                We use the midpoint of your band to size the first draft, then refine it after
                the assessment. Currently {formatKes(form.monthlyBill)}.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="county" className="text-sm font-semibold text-[var(--dark)]">
                  County
                </label>
                <select
                  id="county"
                  value={form.county}
                  onChange={(event) => update("county", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm text-[var(--dark)] focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="">Select a county</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
                {errors.county && <FieldError message={errors.county} />}
              </div>
              <div>
                <label htmlFor="size" className="text-sm font-semibold text-[var(--dark)]">
                  Rooms or facility size
                </label>
                <input
                  id="size"
                  type="text"
                  value={form.facilitySize}
                  onChange={(event) => update("facilitySize", event.target.value)}
                  placeholder="For example 4 bedrooms, or 600 square metres"
                  className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm text-[var(--dark)] placeholder:text-[var(--dark)]/35 focus:border-[var(--primary)] focus:outline-none"
                />
                {errors.facilitySize && <FieldError message={errors.facilitySize} />}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <fieldset>
              <legend className="text-sm font-semibold text-[var(--dark)]">
                Preferred contact method
              </legend>
              <div className="mt-3 flex flex-wrap gap-3">
                {contactMethods.map((method) => {
                  const selected = form.contactMethod === method.value;
                  return (
                    <label
                      key={method.value}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition ${
                        selected
                          ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[#1f8b4a]"
                          : "border-[var(--dark)]/12 text-[var(--dark)]/65 hover:border-[var(--primary)]/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method.value}
                        checked={selected}
                        onChange={() => update("contactMethod", method.value)}
                        className="sr-only"
                      />
                      {method.label}
                    </label>
                  );
                })}
              </div>
              {errors.contactMethod && <FieldError message={errors.contactMethod} />}
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-semibold text-[var(--dark)]">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none"
                />
                {errors.name && <FieldError message={errors.name} />}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold text-[var(--dark)]">
                  Phone number
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="0712 345 678"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm placeholder:text-[var(--dark)]/35 focus:border-[var(--primary)] focus:outline-none"
                />
                {errors.phone && <FieldError message={errors.phone} />}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-[var(--dark)]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none"
              />
              {errors.email && <FieldError message={errors.email} />}
            </div>

            <div>
              <label htmlFor="notes" className="text-sm font-semibold text-[var(--dark)]">
                Anything we should know? <span className="font-normal text-[var(--dark)]/50">(optional)</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                value={form.notes}
                onChange={(event) => update("notes", event.target.value)}
                placeholder="Roof type, backup needs, best time to call"
                className="mt-2 w-full rounded-xl border border-[var(--dark)]/12 bg-white px-4 py-3 text-sm placeholder:text-[var(--dark)]/35 focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-[var(--dark)]/10 bg-[var(--light)] p-5">
              <h3 className="font-[Roboto] text-base font-bold text-[var(--dark)]">
                Please check your request
              </h3>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <Summary label="Property" value={form.propertyType || "Not set"} />
                <Summary label="County" value={form.county || "Not set"} />
                <Summary label="Monthly bill" value={formatKes(form.monthlyBill)} />
                <Summary label="Size" value={form.facilitySize || "Not set"} />
                <Summary label="Contact by" value={form.contactMethod || "Not set"} />
                <Summary label="Name" value={form.name || "Not set"} />
                <Summary label="Phone" value={form.phone || "Not set"} />
                <Summary label="Email" value={form.email || "Not set"} />
              </dl>
            </div>

            <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--dark)]/70">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(event) => update("consent", event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-[var(--dark)]/25 accent-[var(--primary)]"
              />
              <span>
                I agree that Elisha Solar may contact me about this request and store these
                details under the{" "}
                <Link href="/legal/privacy-policy" className="font-semibold text-[var(--primary)]">
                  privacy policy
                </Link>
                .
              </span>
            </label>
            {errors.consent && <FieldError message={errors.consent} />}

            <div className="flex items-start gap-3 rounded-xl border border-[var(--dark)]/10 p-4 text-xs text-[var(--dark)]/60">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
              <p>
                This form is protected by reCAPTCHA v3
                {recaptchaEnabled ? "" : " (add your site key to activate it)"}. Scores below
                0.5 are asked to complete a visible check.
              </p>
            </div>

            <RecaptchaField challenged={challenged} onToken={handleV2Token} />

            {serverError && (
              <p role="alert" className="rounded-xl bg-[#FEF2F2] px-4 py-3 text-sm text-[#9a3412]">
                {serverError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--dark)]/10 pt-6">
        <div>
          {step > 1 ? (
            <button type="button" onClick={goBack} className="btn-ghost !py-2.5 text-sm">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </button>
          ) : (
            <p className="text-xs text-[var(--dark)]/55">
              Takes about two minutes. No payment needed.
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {step < 3 ? (
            <button type="button" onClick={goNext} className="btn-brand !py-2.5 text-sm">
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="btn-brand !py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending request
                </>
              ) : (
                <>
                  Send my quote request
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-2 text-xs font-medium text-[#9a3412]">
      {message}
    </p>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-[var(--dark)]/50">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold capitalize text-[var(--dark)]">{value}</dd>
    </div>
  );
}
