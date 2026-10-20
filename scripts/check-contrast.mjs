#!/usr/bin/env node
/**
 * Guards the palette. Every text and icon pair used in src must reach
 * WCAG 2.2 AA contrast (4.5:1 for text, 3:1 for large text and icons).
 * Run with: npm run check:contrast
 */
const parse = (hex) => hex.replace("#", "").match(/../g).map((x) => parseInt(x, 16) / 255);
const linear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
const luminance = (hex) => {
  const [r, g, b] = parse(hex).map(linear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (hi + 0.05) / (lo + 0.05);
};

const PAIRS = [
  ["body text", "#12222C", "#FFFFFF", 4.5],
  ["muted text", "#46595F", "#FFFFFF", 4.5],
  ["fine print", "#5C6E74", "#FFFFFF", 4.5],
  ["brand text", "#0B6B3A", "#FFFFFF", 4.5],
  ["placeholder", "#63747A", "#FFFFFF", 4.5],
  ["primary button label", "#FFFFFF", "#0B6B3A", 4.5],
  ["muted on tint", "#46595F", "#F6F7F8", 4.5],
  ["fine print on tint", "#5C6E74", "#F6F7F8", 4.5],
  ["brand text on tint", "#0B6B3A", "#F6F7F8", 4.5],
  ["text on brand wash", "#12222C", "#EAF5EF", 4.5],
  ["muted on brand wash", "#46595F", "#EAF5EF", 4.5],
  ["brand on brand wash", "#0B6B3A", "#EAF5EF", 4.5],
  ["footer text", "#FFFFFF", "#1A2A36", 4.5],
  ["footer muted", "#C3CFD3", "#1A2A36", 4.5],
  ["footer fine print", "#93A7AD", "#1A2A36", 4.5],
  ["mint on ink", "#9EE7BA", "#12222C", 4.5],
  ["ink panel body", "#DCE5E8", "#12222C", 4.5],
  ["form error", "#A32222", "#FFFFFF", 4.5],
  ["alert text", "#8A1C1C", "#FDF3F3", 4.5],
  ["WhatsApp glyph", "#07301A", "#25D366", 4.5],
];

let failed = 0;
const rows = PAIRS.map(([name, fg, bg, min]) => {
  const ratio = contrast(fg, bg);
  const pass = ratio >= min;
  if (!pass) failed += 1;
  return { name, fg, bg, ratio, min, pass };
});

for (const row of rows) {
  console.log(
    `${row.pass ? "pass" : "FAIL"}  ${row.ratio.toFixed(2).padStart(5)}:1  ${row.name} (${row.fg} on ${row.bg})`,
  );
}

if (failed > 0) {
  console.error(`\n${failed} pair(s) below the ${rows[0].min}:1 threshold.`);
  process.exit(1);
}

console.log(`\nAll ${rows.length} pairs meet WCAG AA.`);
