import { NextResponse } from "next/server";
import { projects } from "@/data/projects";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type")?.toLowerCase();
  const county = searchParams.get("county")?.toLowerCase();

  const filtered = projects.filter((project) => {
    const matchesType =
      !type || type === "all" || project.solutionSlug.toLowerCase() === type;
    const matchesCounty =
      !county || county === "all" || project.county.toLowerCase() === county;
    return matchesType && matchesCounty;
  });

  return NextResponse.json({
    count: filtered.length,
    filters: {
      type: type ?? "all",
      county: county ?? "all",
    },
    projects: filtered.map((project) => ({
      slug: project.slug,
      title: project.title,
      county: project.county,
      solutionType: project.solutionSlug,
      solutionLabel: project.solutionLabel,
      systemSize: project.sizeLabel,
      systemSizeKw: project.sizeKw,
      completed: project.completed,
      outcome: project.outcome,
      image: project.image,
    })),
  });
}
