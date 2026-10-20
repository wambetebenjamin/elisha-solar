import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs?: Array<{ href: string; label: string }>;
};

export default function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  return (
    <section className="section-tint border-b border-[var(--dark)]/5">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-1 text-xs font-medium text-[var(--dark)]/55">
              <li>
                <Link href="/" className="hover:text-[var(--primary)]">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  <Link href={crumb.href} className="hover:text-[var(--primary)]">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-[Roboto] text-4xl font-black leading-[1.08] text-[var(--dark)] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--dark)]/70">
          {description}
        </p>
      </div>
    </section>
  );
}
