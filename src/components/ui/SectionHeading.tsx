import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  children,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-[Roboto] text-3xl font-black leading-tight text-[var(--dark)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--dark)]/70">{description}</p>
      )}
      {children}
    </div>
  );
}
