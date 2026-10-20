# Elisha Solar

Marketing site for Elisha Solar, a Kenya wide solar installation and maintenance company with a
Nairobi headquarters. Built on top of the uploaded `solartec-1.0.0` static template, which is kept
in the repository root untouched.

Tagline: Power your home. Power your future.
WhatsApp: +254 112 272 061

## Stack

`next 16.4.2`, `react 19.2.0`, `react-dom 19.2.0`, `typescript 5.8.3`, `tailwindcss 4.1.10`,
`framer-motion 12.18.0`, `gsap 3.12.7`, `lenis 1.3.4`, `recharts 2.15.3`, `zustand 5.0.6`,
`react-hook-form 7.57.0`, `zod 3.25.67`, `next-auth 5.0.0-beta.32`, `nodemailer 10.1.7`,
`jspdf 4.2.1`, `@vercel/kv 3.0.0`, `@vercel/blob 2.8.2`, `qrcode 1.5.4`, `html2canvas 1.4.1`,
`@vercel/analytics 1.5.0`, `@vercel/speed-insights 1.2.0`.

Every version is pinned exactly, with no carets or tildes.

### Version deviations required by the security gate

The brief pinned four packages at versions that carry known critical or high severity advisories.
Step 18 requires zero critical and zero high findings, so those four were raised to the first
patched release. Nothing else was changed.

| Package | Brief | Installed | Why |
| --- | --- | --- | --- |
| `next-auth` | 5.0.0-beta.28 | 5.0.0-beta.32 | three critical advisories in `@auth/core` (fail open auth checks, homoglyph email bypass) |
| `nodemailer` | 6.10.1 | 10.1.7 | high severity addressparser denial of service and SSRF advisories |
| `jspdf` | 3.0.1 | 4.2.1 | critical path traversal and HTML injection advisories |
| `@vercel/blob` | 0.29.4 | 2.8.2 | the pinned version does not exist on npm, and later releases carry high severity `undici` and `@fastify/busboy` advisories |

Two extra `overrides` entries were also added. `framer-motion 12.18.0` declares
`motion-dom ^12.17.3`, and npm resolves the newest 12.x, which removed the `activeAnimations`
export and breaks the Turbopack build. Pinning `motion-dom` to `12.18.2` and `motion-utils` to
`12.18.1` restores a matching set without changing `framer-motion` itself:

```json
"overrides": {
  "postcss": "8.5.30",
  "sharp": "0.35.5",
  "sprintf-js": "1.1.3",
  "motion-dom": "12.18.2",
  "motion-utils": "12.18.1"
}
```

A `.npmrc` sets `legacy-peer-deps=true` because `next-auth` declares a peer range of
`next ^14 || ^15` while the project is pinned to Next 16.

## Template audit (Step 1)

The uploaded archive is `solartec-1.0.0.zip`, a static Bootstrap 5 template. Full tree printed
before any code was written. Findings:

- **CSS custom properties**: three, in `css/style.css`, reproduced verbatim in `src/app/globals.css`:
  `--primary: #32C36C`, `--light: #F6F7F8`, `--dark: #1A2A36`.
- **@font-face rules**: none exist anywhere in the archive. The template loads Open Sans and
  Roboto through Google Fonts `<link>` tags, and the Next layout reproduces exactly that approach
  with the same families and weights. No font was swapped.
- **API routes**: none.
- **Env variables**: none.
- **Loading screen**: present, `#spinner` in every HTML file, a Bootstrap border spinner dismissed
  after 1 ms. Replaced by an SVG sun preloader (see below), which the brief specifies when the
  template's own loader is a generic spinner.
- **Cookie consent**: absent. Built from scratch.
- **CAPTCHA**: absent. reCAPTCHA v3 added.
- **Legal pages**: absent. Privacy, terms and cookie policy added.
- **404**: `404.html` exists as a static page with no sun motif. Next `not-found.tsx` replaces it.
  **500**: no 500 page in the archive. `error.tsx` and `global-error.tsx` added.

The original template files remain in the repository root (`index.html`, `css/`, `img/`, `js/`,
`lib/`, `scss/` and so on). Nothing was renamed or deleted, and `css/style.css` is byte for byte
the uploaded file. They stay in the repository as the design reference; the live Next app serves
its own pages and reads its styles from `src/app/globals.css`, which carries the template tokens
and fonts.

## Pages built

`/`, `/solutions`, `/solutions/[slug]`, `/quote`, `/quote-confirmation`, `/projects`,
`/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/auth/signin`, `/auth/signup`,
`/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`, `not-found` (404) and
`error` plus `global-error` (500).

## API routes

| Route | Method | Notes |
| --- | --- | --- |
| `/api/solutions` | GET | static list |
| `/api/solutions/[slug]` | GET | 404 on unknown slug |
| `/api/projects` | GET | filters by `type` (solution slug) and `county` |
| `/api/projects/[slug]` | GET | full case study |
| `/api/quote/submit` | POST | zod validated, reCAPTCHA v3 verified, nodemailer, returns `ES-YYYY-XXXXXX` reference |
| `/api/quote/[ref]` | GET | reads KV when configured, otherwise an in-memory store |
| `/api/contact` | POST | zod validated, reCAPTCHA verified, nodemailer |
| `/api/recaptcha/verify` | POST | server side score check, returns `requiresChallenge` below 0.5 |
| `/api/auth/[...nextauth]` | GET, POST | NextAuth with Google OAuth |

Quote references are stored in Vercel KV when `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set,
with a 120 day expiry. Without KV the submission still succeeds and is held in process memory,
which is enough for local review but does not survive a restart.

## Environment

Copy `.env.example` to `.env.local` and fill in what you have. The site runs without any of them:
email delivery and reCAPTCHA are skipped and logged when the secrets are absent.

One optional variable is used but not listed in the brief: `NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY`.
It is only needed if the visible v2 fallback should use a different site key from the v3 key.
When unset, the v3 site key is used for the challenge.

## Images

Twelve Pexels photographs in `public/images/`, all free licence with no watermark. Credits,
source URLs and photographer names are in `image-credits.md`. The contact page uses a schematic
SVG placeholder for the coverage map (`public/images/kenya-coverage-map.svg`); replace it with a
licensed county map before launch.

Pexels free photos of solar installation work in Kenya or East Africa were not available at build
time. Rather than show installers who do not reflect the communities served, the photography
shows equipment, rooftops and aerial installations, and keeps people out of frame. Swap the files
in `public/images/` and update the `image` fields in `src/data/solutions.ts` and
`src/data/projects.ts` when commissioned photography exists.

## Design language

The visual system is editorial rather than decorative, and it is built only from the template
tokens plus a contrast safe set of working values.

- **Type.** Roboto for headings at weight 700 with tight tracking, Open Sans for body text.
  Headings no longer use weight 900, which was the heaviest contributor to the generic look.
- **Shape.** Every radius is 2 to 4 pixels. There are no pill badges, no fully rounded cards and
  no rotated or diamond shaped ornaments. The only remaining circles are the two floating action
  buttons, which the brief specifies at 50 percent radius, and the WhatsApp glyph.
- **Surface.** Hairline borders in place of soft shadows and coloured glows. No glassmorphism, no
  `backdrop-blur`, no gradient overlays on cards. Photography is either full bleed or framed by a
  single hairline.
- **Hierarchy.** Section eyebrows are short uppercase labels preceded by a 22 pixel rule. Major
  home sections carry a two digit index. Numbered process steps sit on a 2 pixel ink rule instead
  of inside icon circles.
- **Colour.** Bright template green `#32C36C` is now a graphic accent only, used for the loader
  and the brand mark. All green text uses `#0B6B3A`, and all primary buttons are that deep green
  with white text.

### Contrast

Text can no longer disappear into its background, because every pair in use is verified.

| Token | Value | Used on | Ratio |
| --- | --- | --- | --- |
| `--ink` | `#12222C` | white, tint | 16.27:1, 15.17:1 |
| `--muted` | `#46595F` | white, tint, brand wash | 7.36:1 or better |
| `--faint` | `#5C6E74` | white, tint | 5.33:1, 4.97:1 |
| `--brand-ink` | `#0B6B3A` | white, tint, brand wash | 6.61:1 or better |
| `--on-dark-muted` | `#C3CFD3` | ink, template dark | 9.23:1 or better |
| Mint link | `#9EE7BA` | ink, dark | 11.30:1 or better |

Run `npm run check:contrast` to verify all 20 pairs. It exits non zero if any pair drops below
WCAG AA.

The old build used `#32C36C` for text on white, which is 2.29:1, and scores of `text-[...]/45` to
`/70` opacity utilities that faded into the page. Both are gone. Placeholder text, form labels,
disabled states and chart axes were raised to the same standard.

### Text cannot be stranded invisible

The reveal animation used to server render at `opacity: 0`. Anything that failed to hydrate, or
any element the observer missed, stayed invisible. `src/components/Reveal.tsx` now renders children
fully visible, and only applies the hidden state after the browser confirms JavaScript, an
intersection observer and motion permission. A four second safety timer reveals anything the
observer missed. No component in `src` sets `initial={{ opacity: 0 }}` on content any more, which
is why the served HTML contains no `opacity:0` at all.

## Motion and accessibility

Nine effects: Lenis smooth scroll, GSAP count up on the impact bar, animated recharts area draw,
Framer Motion card lift on solution cards, GSAP hero parallax, staggered project card entrance,
Framer Motion step transitions in the quote form, the WhatsApp entrance pulse and the preloader
sunrise animation.

All motion respects `prefers-reduced-motion`, including the preloader, which falls back to plain
percentage text. The voice tour never autoplays: it starts on the first scroll or click only.

## Verification

```bash
npm ci
npx tsc --noEmit
npx next build
npm audit --audit-level=high
```

All four pass with zero TypeScript errors, a successful Turbopack production build of 39 routes,
and `found 0 vulnerabilities`. `npm run check:contrast` passes all 20 pairs, and a crawl of 28
linked pages finds no broken links or images.

## Notes for the next developer

- The site is green and white, built only from the template tokens. The template footer stays
  dark, and the top contact strip and one closing call to action band use the same ink. Everything
  else, including the home hero, is white or the template tint. There is no dark theme.
- No em dashes appear in any rendered string, class name, or data file.
- The savings calculator is deterministic and client side. The formula lives in
  `src/lib/savings.ts` with its assumptions documented at the top.
