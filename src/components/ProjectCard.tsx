"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { formatDate } from "@/data/blog";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      layout
      transition={{ duration: 0.35, delay: Math.min(index, 4) * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="card-surface card-interactive group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
        />
        <span className="absolute left-0 top-0 bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
          {project.solutionLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-faint">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">County</dt>
            <dd>{project.county} County</dd>
          </div>
          <span aria-hidden="true" className="text-line">
            /
          </span>
          <div>
            <dt className="sr-only">System size</dt>
            <dd>{project.sizeLabel}</dd>
          </div>
          <span aria-hidden="true" className="text-line">
            /
          </span>
          <div>
            <dt className="sr-only">Completed</dt>
            <dd>{formatDate(project.completed)}</dd>
          </div>
        </dl>
        <h3 className="mt-3 font-[Roboto] text-[1.0625rem] font-bold leading-snug text-ink">
          <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-brand-ink">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-[1.7] text-muted">{project.outcome}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="link-rule mt-5 self-start text-[13px]"
        >
          Read the case study
        </Link>
      </div>
    </motion.article>
  );
}
