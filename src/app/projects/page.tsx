import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ProjectGrid from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solar projects across Kenya",
  description:
    "Completed Elisha Solar installations in Nairobi, Kajiado, Kisumu, Nakuru and Mombasa. Filter by solution type and county.",
};

export default function ProjectsPage() {
  const counties = Array.from(new Set(projects.map((project) => project.county))).sort();
  const solutionTypes = solutions
    .filter((solution) => projects.some((project) => project.solutionSlug === solution.slug))
    .map((solution) => ({ slug: solution.slug, label: solution.title }));

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Evidence, not adjectives"
        description="Every project below was surveyed, designed and commissioned by our own crews. Filter by solution type or county to see work closest to you."
        crumbs={[{ href: "/projects", label: "Projects" }]}
      />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <ProjectGrid projects={projects} counties={counties} solutionTypes={solutionTypes} />
      </div>
    </>
  );
}
