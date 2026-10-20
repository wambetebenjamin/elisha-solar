"use client";

import { useLayoutEffect, useRef } from "react";
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
  const finalText = value.toLocaleString("en-KE");

  useLayoutEffect(() => {
    const element = numberRef.current;
    const wrapper = wrapperRef.current;
    if (!element || !wrapper) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      element.textContent = finalText;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const counter = { current: 0 };
    element.textContent = "0";

    const context = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          element.textContent = Math.round(counter.current).toLocaleString("en-KE");
        },
        onComplete: () => {
          element.textContent = finalText;
        },
      });
    }, wrapper);

    return () => {
      context.revert();
      element.textContent = finalText;
    };
  }, [value, finalText]);

  return (
    <div ref={wrapperRef} className="border-t border-line pt-4">
      <p className="tnum font-[Roboto] text-[2rem] font-bold leading-none text-ink sm:text-[2.25rem]">
        <span ref={numberRef}>{finalText}</span>
        <span className="text-brand-ink">{suffix}</span>
      </p>
      <p className="mt-2.5 text-[13px] leading-snug text-muted">{label}</p>
    </div>
  );
}
