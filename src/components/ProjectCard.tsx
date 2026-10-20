"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Project } from "@/data/projects";
import { formatDate } from "@/data/blog";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="card-surface group overflow-hidden shadow-[0_18px_40px_-34px_rgba(26,42,54,0.7)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-[var(--dark)]/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
          {project.solutionLabel}
        </span>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[var(--dark)]/60">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
            {project.county} County
          </span>
          <span>{project.sizeLabel}</span>
          <span>Completed {formatDate(project.completed)}</span>
        </div>
        <h3 className="mt-3 font-[Roboto] text-lg font-bold text-[var(--dark)]">
          <Link href={`/projects/${project.slug}`} className="hover:text-[#1f8b4a]">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--dark)]/70">{project.outcome}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-4 inline-block text-sm font-bold text-[#1f8b4a] hover:text-[var(--primary)]"
        >
          Read the case study
        </Link>
      </div>
    </motion.article>
  );
}
