import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  index?: string;
  children?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  index,
  children,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      <div
        className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      >
        <p className="eyebrow">{eyebrow}</p>
        {index && (
          <span className="tnum text-[11px] font-semibold tracking-[0.14em] text-faint">
            {index}
          </span>
        )}
      </div>
      <h2 className="mt-4 font-[Roboto] text-[1.75rem] font-bold leading-[1.14] text-ink sm:text-[2.15rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[0.9375rem] leading-[1.7] text-muted">{description}</p>
      )}
      {children}
    </div>
  );
}
