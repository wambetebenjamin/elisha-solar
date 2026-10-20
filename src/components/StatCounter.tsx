"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export default function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    const wrapper = wrapperRef.current;
    if (!element || !wrapper) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      element.textContent = value.toLocaleString("en-KE");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const counter = { current: 0 };

    const context = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 88%",
          once: true,
        },
        onUpdate: () => {
          element.textContent = Math.round(counter.current).toLocaleString("en-KE");
        },
      });
    }, wrapper);

    return () => {
      context.revert();
    };
  }, [value]);

  return (
    <div ref={wrapperRef} className="text-center sm:text-left">
      <p className="font-[Roboto] text-3xl font-black text-[var(--dark)] sm:text-4xl">
        <span ref={numberRef}>0</span>
        <span className="text-[var(--primary)]">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-medium text-[var(--dark)]/65">{label}</p>
    </div>
  );
}
