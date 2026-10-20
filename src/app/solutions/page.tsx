import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/Reveal";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solar solutions and packages",
  description:
    "Residential, commercial, water heating, battery backup and off grid solar systems for Kenya. System sizes, indicative costs and what each solution suits.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="A solar package for every roof and every budget"
        description="Five core systems, each sized on your own consumption. Prices below are indicative for 2026 and confirmed after a free site assessment."
        crumbs={[{ href: "/solutions", label: "Solutions" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <nav aria-label="Jump to a solution" className="mb-12 flex flex-wrap gap-2">
          {solutions.map((solution) => (
            <a
              key={solution.slug}
              href={`#${solution.slug}`}
              className="chip text-[13px]"
            >
              {solution.title}
            </a>
          ))}
        </nav>

        <div className="space-y-20">
          {solutions.map((solution, index) => (
            <section
              key={solution.slug}
              id={solution.slug}
              className="scroll-mt-32 border-t border-line pt-12 first:border-t-0 first:pt-0"
            >
              <Reveal>
                <div
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
                    <Image
                      src={solution.image}
                      alt={solution.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="eyebrow">
                      Solution {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 font-[Roboto] text-[1.9rem] font-bold text-ink">
                      {solution.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted">
                      {solution.description}
                    </p>

                    <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[3px] bg-light p-4">
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-faint">
                          Typical system size
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-ink">
                          {solution.typicalSize}
                        </dd>
                      </div>
                      <div className="rounded-[3px] bg-light p-4">
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-faint">
                          Estimated cost range
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-ink">
                          {solution.costRange}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6">
                      <h3 className="text-sm font-bold text-ink">Who it suits</h3>
                      <ul className="mt-2 space-y-1.5 text-sm text-muted">
                        {solution.suits.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span className="mt-[0.45rem] h-1 w-1 shrink-0 bg-brand-ink" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-sm font-bold text-ink">Benefits</h3>
                      <ul className="mt-2 grid gap-1.5 text-sm text-muted sm:grid-cols-2">
                        {solution.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" aria-hidden="true" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link href="/quote" className="btn-brand !py-2.5 text-sm">
                        Get a quote
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <Link href={`/solutions/${solution.slug}`} className="btn-ghost !py-2.5 text-sm">
                        Technical detail
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
