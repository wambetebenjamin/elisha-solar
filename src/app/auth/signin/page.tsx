import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import { isGoogleAuthConfigured } from "@/auth";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Elisha Solar account to track quotes, monitoring and service visits.",
};

export default function SignInPage() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="eyebrow">
          Welcome back
        </p>
        <h1 className="mt-3 font-[Roboto] text-4xl font-bold leading-tight text-ink">
          Sign in to your Elisha Solar account
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Track your quote, download system documents, view monitoring history and book
          maintenance visits without retyping your details.
        </p>
        <ul className="mt-7 space-y-3 text-sm text-muted">
          {[
            "Quote references and saved designs in one place",
            "Service history for every system you own",
            "Direct line to the engineer who commissioned it",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-faint">
          New here?{" "}
          <Link href="/auth/signup" className="font-semibold text-brand-ink hover:underline">
            Create an account
          </Link>{" "}
          or{" "}
          <a href={whatsappLink} className="font-semibold text-brand-ink hover:underline">
            message us on WhatsApp
          </a>
          .
        </p>
      </div>

      <AuthForm mode="signin" googleConfigured={isGoogleAuthConfigured} callbackUrl="/" />
    </div>
  );
}
