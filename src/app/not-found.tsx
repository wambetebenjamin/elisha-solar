import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { navLinks } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--primary)]/10">
        <Sun className="h-10 w-10 text-[var(--primary)]" aria-hidden="true" />
      </span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)]">
        Error 404
      </p>
      <h1 className="mt-3 font-[Roboto] text-4xl font-black leading-tight text-[var(--dark)] sm:text-5xl">
        This page is off the grid.
      </h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--dark)]/70">
        The link you followed does not exist anymore, or it never did. Nothing is broken on your
        side. Head back home or jump straight to what you were looking for.
      </p>
      <Link href="/" className="btn-brand mt-8 !px-7 !py-3.5 text-base">
        Back to home
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <nav aria-label="Useful pages" className="mt-10">
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-[var(--dark)]/60">
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="hover:text-[var(--primary)]">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/quote" className="hover:text-[var(--primary)]">
              Get a quote
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
