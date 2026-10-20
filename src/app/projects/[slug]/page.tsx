import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, MapPin, Sun } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { formatDate } from "@/data/blog";
import { getProject, projects } from "@/data/projects";
import { whatsappLink } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.title,
    description: project.outcome,
    openGraph: {
      title: `${project.title} | Elisha Solar`,
      description: project.outcome,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const others = projects.filter((item) => item.slug !== project.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`${project.solutionLabel} · ${project.county} County`}
        title={project.title}
        description={project.outcome}
        crumbs={[
          { href: "/projects", label: "Projects" },
          { href: `/projects/${project.slug}`, label: project.county },
        ]}
      />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-[var(--dark)]/65">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
            {project.county} County
          </span>
          <span className="inline-flex items-center gap-2">
            <Sun className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
            {project.sizeLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
            Completed {formatDate(project.completed)}
          </span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="prose-solar max-w-3xl">
            <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">
              Client background
            </h2>
            <p>{project.clientBackground}</p>

            <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">The challenge</h2>
            <p>{project.challenge}</p>

            <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">
              The solution deployed
            </h2>
            <p>{project.solutionDeployed}</p>

            <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">Results</h2>
            <div className="not-prose mt-4 grid gap-3 sm:grid-cols-2">
              {project.results.map((result) => (
                <div key={result.label} className="rounded-xl bg-[var(--light)] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--dark)]/50">
                    {result.label}
                  </p>
                  <p className="mt-1 font-[Roboto] text-lg font-black text-[var(--dark)]">
                    {result.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-wide text-[var(--dark)]">
                System specifications
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {project.systemSpecs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--dark)]/50">
                      {spec.label}
                    </dt>
                    <dd className="mt-0.5 text-[var(--dark)]/80">{spec.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/quote" className="btn-brand mt-6 w-full justify-center !py-3 text-sm">
                Request a similar system
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-3 w-full justify-center !py-3 text-sm"
              >
                Ask about this project
              </a>
            </div>

            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-wide text-[var(--dark)]">
                More projects
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/projects/${item.slug}`}
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

        <section className="mt-16">
          <h2 className="font-[Roboto] text-2xl font-bold text-[var(--dark)]">Image gallery</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
