import { NextResponse } from "next/server";
import { getProject } from "@/data/projects";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found", slug }, { status: 404 });
  }

  return NextResponse.json({ project });
}
