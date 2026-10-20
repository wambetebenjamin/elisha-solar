import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  crumbs?: Array<{ href: string; label: string }>;
};

export default function PageHero({ eyebrow, title, description, crumbs }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-light">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-ink">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-line">
                    /
                  </span>
                  <Link href={crumb.href} className="transition-colors hover:text-brand-ink">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-[Roboto] text-[2.1rem] font-bold leading-[1.06] text-ink sm:text-[2.9rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-[1.7] text-muted">{description}</p>
      </div>
    </section>
  );
}
