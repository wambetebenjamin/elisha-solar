import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { site } from "@/lib/site";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
  crumbs: string;
};

export default function LegalPage({
  eyebrow,
  title,
  description,
  updated,
  sections,
  crumbs,
}: LegalPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        crumbs={[{ href: "#", label: crumbs }]}
      />

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
              On this page
            </p>
            <ul className="mt-4 space-y-2.5 border-l border-line pl-4 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted transition hover:text-brand-ink"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="prose-solar max-w-3xl">
            <p className="not-prose mb-8 border-y border-line py-3 text-[12px] font-medium text-muted">
              Last updated {updated}. Elisha Solar Limited, {site.address}.
            </p>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mt-8 font-[Roboto] text-xl font-bold text-ink">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <p className="mt-10 text-sm text-muted">
              Questions about this document? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-ink">
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${site.phone}`} className="font-semibold text-brand-ink">
                {site.phoneDisplay}
              </a>
              . You can also read our{" "}
              <Link href="/legal/privacy-policy" className="font-semibold text-brand-ink">
                privacy policy
              </Link>
              ,{" "}
              <Link href="/legal/terms" className="font-semibold text-brand-ink">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="/legal/cookie-policy" className="font-semibold text-brand-ink">
                cookie policy
              </Link>
              .
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
