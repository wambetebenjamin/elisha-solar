"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Solution } from "@/data/solutions";
import Reveal from "@/components/Reveal";

export default function SolutionCard({ solution, index = 0 }: { solution: Solution; index?: number }) {
  return (
    <Reveal delay={index * 0.05} className="h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="card-surface card-interactive group flex h-full flex-col overflow-hidden"
      >
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
          <Image
            src={solution.image}
            alt={solution.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
          />
          <span className="absolute left-0 top-0 bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
            {solution.typicalSize}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-[Roboto] text-[1.0625rem] font-bold leading-snug text-ink">
            {solution.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-[1.7] text-muted">{solution.shortDescription}</p>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <Link
              href={`/solutions/${solution.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-ink transition-colors hover:text-brand-deep"
            >
              Learn more
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <span className="tnum text-[12px] font-medium text-faint">{solution.costRange}</span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}
