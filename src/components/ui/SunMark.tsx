/**
 * Brand mark: a sun disc resting on the horizon.
 *
 * Deliberately drawn with one disc and one rule. No radial rays, no star or
 * diamond glyphs, so it reads as sunrise rather than as a sparkle icon.
 */
export default function SunMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="15" r="7.5" fill="currentColor" />
      <path d="M2.5 24.5h27" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M6.5 28.5h5M13 28.5h6M21.5 28.5h4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
