import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Cpu, MapPin, Sun } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { getSolution, solutions } from "@/data/solutions";
import { whatsappLink } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return { title: "Solution not found" };
  }

  return {
    title: solution.title,
    description: solution.shortDescription,
    openGraph: {
      title: `${solution.title} | Elisha Solar`,
      description: solution.shortDescription,
      images: [{ url: solution.image }],
    },
  };
}

export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const others = solutions.filter((item) => item.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Solution detail"
        title={solution.title}
        description={solution.shortDescription}
        crumbs={[
          { href: "/solutions", label: "Solutions" },
          { href: `/solutions/${solution.slug}`, label: solution.title },
        ]}
      />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={solution.image}
                alt={solution.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>

            <div className="prose-solar mt-8 max-w-3xl">
              <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">
                What this system does
              </h2>
              <p>{solution.description}</p>

              <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">
                Who it suits
              </h2>
              <ul>
                {solution.suits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">
                Benefits you can measure
              </h2>
              <ul>
                {solution.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>

            <section className="mt-12">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/12">
                  <Cpu className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                </span>
                <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">
                  Technical specifications
                </h2>
              </div>
              <dl className="mt-6 overflow-hidden rounded-2xl border border-[var(--dark)]/10">
                {[
                  { label: "Panel type", value: solution.specs.panels },
                  { label: "Battery type", value: solution.specs.battery },
                  { label: "Inverter", value: solution.specs.inverter },
                  { label: "Mounting", value: solution.specs.mounting },
                  { label: "Monitoring", value: solution.specs.monitoring },
                ].map((row, index) => (
                  <div
                    key={row.label}
                    className={`grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] ${
                      index % 2 === 0 ? "bg-[var(--light)]" : "bg-white"
                    }`}
                  >
                    <dt className="text-xs font-bold uppercase tracking-wide text-[var(--dark)]/55">
                      {row.label}
                    </dt>
                    <dd className="text-sm text-[var(--dark)]/80">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-12 rounded-2xl border border-[var(--primary)]/25 bg-[var(--primary)]/5 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f8b4a]">
                Case study example
              </p>
              <h2 className="mt-3 font-[Roboto] text-2xl font-bold text-[var(--dark)]">
                {solution.caseStudy.title}
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[var(--dark)]/65">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                  {solution.caseStudy.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                  {solution.caseStudy.size}
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--dark)]/75">
                {solution.caseStudy.summary}
              </p>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-[var(--dark)]">
                {solution.caseStudy.result}
              </p>
              <Link href="/projects" className="mt-5 inline-flex text-sm font-bold text-[#1f8b4a] hover:text-[var(--primary)]">
                See the full project
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card-surface p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
                At a glance
              </p>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--dark)]/50">
                    Typical size
                  </dt>
                  <dd className="mt-0.5 font-bold text-[var(--dark)]">{solution.typicalSize}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--dark)]/50">
                    Estimated cost
                  </dt>
                  <dd className="mt-0.5 font-bold text-[var(--dark)]">{solution.costRange}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--dark)]/50">
                    Installation time
                  </dt>
                  <dd className="mt-0.5 font-bold text-[var(--dark)]">
                    Two to four days for most homes
                  </dd>
                </div>
              </dl>
              <Link href="/quote" className="btn-brand mt-6 w-full justify-center !py-3 text-sm">
                Get a quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-3 w-full justify-center !py-3 text-sm"
              >
                Ask on WhatsApp
              </a>
            </div>

            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-wide text-[var(--dark)]">
                Included as standard
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--dark)]/70">
                {[
                  "Free site assessment and shading study",
                  "Written design and fixed price",
                  "Surge and earthing protection",
                  "Commissioning report at handover",
                  "First year of monitoring support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-wide text-[var(--dark)]">
                Other solutions
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/solutions/${item.slug}`}
                      className="text-[var(--dark)]/70 hover:text-[#1f8b4a]"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
