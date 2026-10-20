import { NextResponse } from "next/server";
import { getSolution } from "@/data/solutions";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return NextResponse.json(
      { error: "Solution not found", slug },
      { status: 404 },
    );
  }

  return NextResponse.json({ solution });
}
