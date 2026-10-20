import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import { isGoogleAuthConfigured } from "@/auth";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create an Elisha Solar account to keep quotes, warranty documents and monitoring history together.",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
          Create an account
        </p>
        <h1 className="mt-3 font-[Roboto] text-4xl font-black leading-tight text-[var(--dark)]">
          Keep everything about your system in one place
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--dark)]/70">
          An account takes under a minute. It also lets us send you the commissioning report and
          warranty certificate digitally instead of on paper.
        </p>
        <ul className="mt-7 space-y-3 text-sm text-[var(--dark)]/70">
          {[
            "Warranty certificates stored against your property",
            "Monitoring alerts sent to your account email",
            "Preferred contact method remembered for every request",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-[var(--dark)]/50">
          Already registered?{" "}
          <Link href="/auth/signin" className="font-semibold text-[var(--primary)] hover:underline">
            Sign in instead
          </Link>
          .
        </p>
      </div>

      <AuthForm mode="signup" googleConfigured={isGoogleAuthConfigured} callbackUrl="/" />
    </div>
  );
}
