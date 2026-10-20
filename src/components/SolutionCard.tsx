"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/data/solutions";

export default function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group card-surface overflow-hidden shadow-[0_18px_40px_-34px_rgba(26,42,54,0.7)] transition-shadow hover:shadow-[0_28px_54px_-32px_rgba(26,42,54,0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={solution.image}
          alt={solution.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--dark)]">
          {solution.typicalSize}
        </span>
      </div>
      <div className="flex h-full flex-col p-6">
        <h3 className="font-[Roboto] text-xl font-bold text-[var(--dark)]">{solution.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--dark)]/70">
          {solution.shortDescription}
        </p>
        <div className="mt-5 flex items-center justify-between pt-1">
          <Link
            href={`/solutions/${solution.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1f8b4a] transition-colors hover:text-[var(--primary)]"
          >
            Learn more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <span className="text-xs font-medium text-[var(--dark)]/50">{solution.costRange}</span>
        </div>
      </div>
    </motion.article>
  );
}
