"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useUiStore } from "@/lib/store";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [skippable, setSkippable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const setCookieBannerOpen = useUiStore((state) => state.setCookieBannerOpen);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);

    const stored = window.localStorage.getItem(site.consentKey);
    if (!stored) {
      setCookieBannerOpen(true);
    }

    const started = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - started;
      const next = Math.min(100, Math.round((elapsed / 2400) * 100));
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(tick);
      }
    }, 60);

    const skipTimer = window.setTimeout(() => setSkippable(true), 1000);
    const finishTimer = window.setTimeout(() => setDone(true), 3000);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(skipTimer);
      window.clearTimeout(finishTimer);
    };
  }, [setCookieBannerOpen]);

  if (done) {
    return null;
  }

  const bands = [0, 1, 2, 3];

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ animation: "preloader-fade 0.4s ease-in 3.15s forwards" }}
      role="status"
      aria-live="polite"
      aria-label="Loading Elisha Solar"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 200 96"
        className={`h-24 w-48 ${reducedMotion ? "" : "preloader-sun"}`}
      >
        <path d="M60 68a40 40 0 0 1 80 0z" fill="var(--primary)" />
        <line
          x1="0"
          y1="68"
          x2="200"
          y2="68"
          stroke="var(--dark)"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        {bands.map((band) => (
          <line
            key={band}
            x1={48 - band * 12}
            y1={76 + band * 6}
            x2={152 + band * 12}
            y2={76 + band * 6}
            stroke="var(--primary)"
            strokeOpacity={0.55 - band * 0.1}
            strokeWidth="2"
            strokeLinecap="round"
            className={reducedMotion ? undefined : "preloader-ray"}
            style={{ animationDelay: `${200 + band * 130}ms` }}
          />
        ))}
      </svg>

      <p className="tnum mt-6 font-[Roboto] text-2xl font-bold tracking-[-0.02em] text-ink">
        {reducedMotion ? `${progress} percent` : `${progress}%`}
      </p>
      <p className="mt-1 text-sm text-muted">{site.tagline}</p>

      {skippable && (
        <button
          type="button"
          onClick={() => setDone(true)}
          className="btn-ghost mt-6 !px-4 !py-2 text-[13px]"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
