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

  const rays = Array.from({ length: 9 }, (_, index) => index);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      style={{ animation: "preloader-fade 0.4s ease-in 3.15s forwards" }}
      role="status"
      aria-live="polite"
      aria-label="Loading Elisha Solar"
    >
      <div className="relative flex h-40 w-56 items-end justify-center">
        {!reducedMotion && (
          <svg
            aria-hidden="true"
            viewBox="0 0 224 120"
            className="absolute bottom-8 left-0 h-24 w-56"
          >
            {rays.map((ray) => {
              const angle = -80 + ray * 20;
              return (
                <line
                  key={ray}
                  x1="112"
                  y1="60"
                  x2="112"
                  y2="26"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 112 60)`}
                  className="preloader-ray"
                  style={{ animationDelay: `${120 + ray * 110}ms` }}
                />
              );
            })}
          </svg>
        )}
        <svg
          aria-hidden="true"
          viewBox="0 0 224 120"
          className={`absolute bottom-8 left-0 h-24 w-56 ${reducedMotion ? "" : "preloader-sun"}`}
        >
          <circle cx="112" cy="60" r="24" fill="var(--primary)" />
          <line
            x1="24"
            y1="92"
            x2="200"
            y2="92"
            stroke="var(--dark)"
            strokeOpacity="0.18"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <p className="mt-6 font-[Roboto] text-2xl font-bold tracking-tight text-[var(--dark)]">
        {reducedMotion ? `${progress} percent` : `${progress}%`}
      </p>
      <p className="mt-1 text-sm text-[var(--dark)]/60">{site.tagline}</p>

      {skippable && (
        <button
          type="button"
          onClick={() => setDone(true)}
          className="mt-6 rounded-full border border-[var(--dark)]/15 px-5 py-2 text-sm font-semibold text-[var(--dark)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          Skip intro
        </button>
      )}
    </div>
  );
}
