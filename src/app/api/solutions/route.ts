import { NextResponse } from "next/server";
import { solutions } from "@/data/solutions";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    count: solutions.length,
    solutions: solutions.map((solution) => ({
      slug: solution.slug,
      title: solution.title,
      shortDescription: solution.shortDescription,
      typicalSize: solution.typicalSize,
      costRange: solution.costRange,
      image: solution.image,
    })),
  });
}
