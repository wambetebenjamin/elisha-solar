import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import BlogGrid from "@/components/BlogGrid";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Solar insights and guides",
  description:
    "Practical guides on solar sizing, batteries, maintenance and Kenyan electricity bills, written by the Elisha Solar engineering team.",
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Solar education, written by the engineers who install it"
        description="No hype and no jargon. These are the explanations we give clients during site assessments, written down so you can use them before you buy anything."
        crumbs={[{ href: "/blog", label: "Insights" }]}
      />
      <div className="mx-auto max-w-7xl px-6 py-14">
        <BlogGrid posts={sorted} />
      </div>
    </>
  );
}
