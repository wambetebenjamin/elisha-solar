"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { blogCategories, formatDate, type BlogPost } from "@/data/blog";

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(
    () => (category === "All" ? posts : posts.filter((post) => post.category === category)),
    [category, posts],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
        {["All", ...blogCategories].map((option) => {
          const active = category === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[#1f8b4a]"
                  : "border-[var(--dark)]/12 text-[var(--dark)]/65 hover:border-[var(--primary)]/50"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {filtered.map((post, index) => (
            <motion.article
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="card-surface group flex h-full flex-col overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--dark)]">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-[var(--dark)]/55">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {post.readMinutes} min read
                  </span>
                </div>
                <h2 className="mt-2 font-[Roboto] text-lg font-bold leading-snug text-[var(--dark)]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#1f8b4a]">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--dark)]/65">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#1f8b4a] hover:text-[var(--primary)]"
                >
                  Read more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 rounded-2xl border border-dashed border-[var(--dark)]/15 p-8 text-center text-sm text-[var(--dark)]/60">
          Nothing published in this category yet. Try another filter.
        </p>
      )}
    </div>
  );
}
