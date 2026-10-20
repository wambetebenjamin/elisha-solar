"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw, Sun } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10">
        <Sun className="h-10 w-10 text-[var(--primary)]" aria-hidden="true" />
      </span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">
        Error 500
      </p>
      <h1 className="mt-3 font-[Roboto] text-4xl font-black leading-tight text-[var(--dark)] sm:text-5xl">
        Something went dark on our side.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--dark)]/70">
        This is our fault, not yours. Try the page again. If it keeps failing, call or message us
        and we will finish what you were doing.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-brand !px-7 !py-3.5 text-base">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost !px-7 !py-3.5 text-base"
        >
          WhatsApp {site.phone}
        </a>
      </div>
      <p className="mt-6 text-xs text-[var(--dark)]/50">
        Reference{" "}
        <span className="font-mono text-[var(--dark)]/70">{error.digest ?? "not assigned"}</span>
        . You can also{" "}
        <Link href="/" className="font-semibold text-[var(--primary)] hover:underline">
          return home
        </Link>
        .
      </p>
    </section>
  );
}
