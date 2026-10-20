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
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--dark)]/45">
              On this page
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-[var(--dark)]/65 transition hover:text-[#1f8b4a]"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="prose-solar max-w-3xl">
            <p className="not-prose mb-6 rounded-xl bg-[var(--light)] px-4 py-3 text-xs font-medium text-[var(--dark)]/60">
              Last updated {updated}. Elisha Solar Limited, {site.address}.
            </p>

            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="font-[Roboto] text-xl font-bold text-[var(--dark)]">
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

            <p className="mt-10 text-sm text-[var(--dark)]/65">
              Questions about this document? Email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-[var(--primary)]">
                {site.email}
              </a>{" "}
              or call{" "}
              <a href={`tel:${site.phone}`} className="font-semibold text-[var(--primary)]">
                {site.phoneDisplay}
              </a>
              . You can also read our{" "}
              <Link href="/legal/privacy-policy" className="font-semibold text-[var(--primary)]">
                privacy policy
              </Link>
              ,{" "}
              <Link href="/legal/terms" className="font-semibold text-[var(--primary)]">
                terms of service
              </Link>{" "}
              and{" "}
              <Link href="/legal/cookie-policy" className="font-semibold text-[var(--primary)]">
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
