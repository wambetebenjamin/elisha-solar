import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SunMark from "@/components/ui/SunMark";
import { navLinks } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <SunMark className="h-10 w-10 text-brand-ink" />
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-ink">
        Error 404
      </p>
      <h1 className="mt-3 font-[Roboto] text-[2.25rem] font-bold leading-tight text-ink sm:text-[3rem] sm:text-5xl">
        This page is off the grid.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
        The link you followed does not exist anymore, or it never did. Nothing is broken on your
        side. Head back home or jump straight to what you were looking for.
      </p>
      <Link href="/" className="btn-brand mt-8 !px-7 !py-3.5 text-base">
        Back to home
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <nav aria-label="Useful pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-muted">
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-brand-deep">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quote" className="hover:text-brand-deep">
              Get a quote
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
