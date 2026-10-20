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
  sizes?: string;
  /** Adds a dark scrim when text sits directly on top of the image. */
  scrim?: boolean;
};

export default function HeroParallax({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  scrim = false,
}: HeroParallaxProps) {
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = imageWrapRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.to(element, {
        yPercent: 8,
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
      <div ref={imageWrapRef} className="absolute inset-x-0 -top-[10%] h-[120%]">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {scrim && <div className="absolute inset-0 bg-ink/70" />}
    </div>
  );
}
