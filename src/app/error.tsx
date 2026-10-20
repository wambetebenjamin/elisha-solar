"use client";

import Link from "next/link";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import SunMark from "@/components/ui/SunMark";
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
      <SunMark className="h-10 w-10 text-brand-ink" />
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-ink">
        Error 500
      </p>
      <h1 className="mt-3 font-[Roboto] text-[2.25rem] font-bold leading-tight text-ink sm:text-[3rem] sm:text-5xl">
        Something went dark on our side.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
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
      <p className="mt-6 text-xs text-faint">
        Reference{" "}
        <span className="font-mono text-muted">{error.digest ?? "not assigned"}</span>
        . You can also{" "}
        <Link href="/" className="font-semibold text-brand-ink hover:underline">
          return home
        </Link>
        .
      </p>
    </section>
  );
}
