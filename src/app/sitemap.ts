import type { MetadataRoute } from "next";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/solutions",
    "/projects",
    "/blog",
    "/quote",
    "/contact",
    "/legal/privacy-policy",
    "/legal/terms",
    "/legal/cookie-policy",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const solutionRoutes = solutions.map((solution) => ({
    url: `${site.url}/solutions/${solution.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: new Date(project.completed),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  const postRoutes = blogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...solutionRoutes, ...projectRoutes, ...postRoutes];
}
