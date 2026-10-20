"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projects";

type ProjectGridProps = {
  projects: Project[];
  counties: string[];
  solutionTypes: Array<{ slug: string; label: string }>;
};

export default function ProjectGrid({ projects, counties, solutionTypes }: ProjectGridProps) {
  const [type, setType] = useState("all");
  const [county, setCounty] = useState("all");

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const matchesType = type === "all" || project.solutionSlug === type;
        const matchesCounty = county === "all" || project.county === county;
        return matchesType && matchesCounty;
      }),
    [county, projects, type],
  );

  const hasFilters = type !== "all" || county !== "all";

  return (
    <div>
      <div className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="filter-type" className="field-label !mb-0 !text-[11px] uppercase tracking-[0.12em] text-faint">
              Solution type
            </label>
            <select
              id="filter-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="field !py-2.5"
            >
              <option value="all">All solutions</option>
              {solutionTypes.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-county" className="field-label !mb-0 !text-[11px] uppercase tracking-[0.12em] text-faint">
              County
            </label>
            <select
              id="filter-county"
              value={county}
              onChange={(event) => setCounty(event.target.value)}
              className="field !py-2.5"
            >
              <option value="all">All counties</option>
              {counties.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setType("all");
                setCounty("all");
              }}
              className="chip text-[12px]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div key={project.slug} layout exit={{ opacity: 0, scale: 0.96 }}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 rounded-[4px] border border-dashed border-line p-10 text-center">
          <p className="font-[Roboto] text-lg font-bold text-ink">
            No projects match that combination yet
          </p>
          <p className="mt-2 text-sm text-muted">
            We work in all 47 counties. Tell us where you are and we will share a nearby install.
          </p>
        </div>
      )}
    </div>
  );
}
