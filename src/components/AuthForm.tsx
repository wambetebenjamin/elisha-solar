"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AlertCircle, ArrowRight, Loader2, Lock } from "lucide-react";
import { executeRecaptcha } from "@/lib/recaptcha-client";

type AuthFormProps = {
  mode: "signin" | "signup";
  googleConfigured: boolean;
  callbackUrl?: string;
};

export default function AuthForm({ mode, googleConfigured, callbackUrl = "/" }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const isSignup = mode === "signup";

  const handleGoogle = async () => {
    setError("");
    setPending(true);
    try {
      // The reCAPTCHA token is requested immediately before the redirect so a
      // scripted attempt cannot reach the provider without a fresh score.
      await executeRecaptcha(isSignup ? "signup_google" : "signin_google");
      if (!googleConfigured) {
        setError(
          "Google sign in is not configured in this environment. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, then try again.",
        );
        setPending(false);
        return;
      }
      await signIn("google", { callbackUrl });
    } catch (caught) {
      console.error(caught);
      setError("Google sign in could not start. Please try again.");
      setPending(false);
    }
  };

  const handleEmailContinue = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (isSignup && name.trim().length < 2) {
      setError("Enter your name so we know who to greet.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    setPending(true);
    try {
      await executeRecaptcha(isSignup ? "signup_google" : "signin_google");
      if (!googleConfigured) {
        setError(
          "Accounts are secured by Google, which is not configured in this environment yet. Add the Google credentials to enable sign in.",
        );
        setPending(false);
        return;
      }
      await signIn("google", { callbackUrl, login_hint: email.trim() });
    } catch (caught) {
      console.error(caught);
      setError("Sign in could not start. Please try again.");
      setPending(false);
    }
  };

  return (
    <div className="card-surface p-6 sm:p-8">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={pending}
        className="btn-ghost w-full !py-3 text-sm disabled:opacity-70"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.54 5.54 0 0 1-2.4 3.63v3h3.86c2.26-2.08 3.56-5.14 3.56-8.87Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.72-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.99-3.09Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.62l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
          or use your email
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleEmailContinue} noValidate className="space-y-4">
        {isSignup && (
          <div>
            <label htmlFor="auth-name" className="text-sm font-semibold text-ink">
              Full name
            </label>
            <input
              id="auth-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="field mt-2"
            />
          </div>
        )}
        <div>
          <label htmlFor="auth-email" className="text-sm font-semibold text-ink">
            Email address
          </label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="field mt-2"
          />
          <p className="mt-2 text-xs text-muted">
            We pass this to Google so the right account is pre-selected. We never see your
            password.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="flex items-start gap-2 rounded-[3px] bg-[#FEF2F2] px-4 py-3 text-sm text-[#9a3412]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="btn-brand w-full justify-center !py-3 text-sm disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Opening Google
            </>
          ) : (
            <>
              {isSignup ? "Create my account" : "Continue to my account"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-faint">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Protected by reCAPTCHA v3 and Google OAuth
      </p>

      <p className="mt-6 text-center text-sm text-muted">
        {isSignup ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          href={isSignup ? "/auth/signin" : "/auth/signup"}
          className="font-semibold text-brand-ink hover:underline"
        >
          {isSignup ? "Sign in" : "Create one"}
        </Link>
      </p>
    </div>
  );
}
