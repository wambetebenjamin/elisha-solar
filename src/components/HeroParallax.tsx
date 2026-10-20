"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HeroParallaxProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function HeroParallax({ src, alt, priority = false }: HeroParallaxProps) {
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imageWrapRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.to(element, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, element);

    return () => context.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div ref={imageWrapRef} className="absolute inset-0 -top-[12%] h-[124%]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--dark)]/85 via-[var(--dark)]/60 to-[var(--dark)]/20" />
    </div>
  );
}
