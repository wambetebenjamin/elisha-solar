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

## Motion and accessibility

Nine effects: Lenis smooth scroll, GSAP count up on the impact bar, animated recharts area draw,
Framer Motion card lift on solution cards, GSAP hero parallax, staggered project card entrance,
Framer Motion step transitions in the quote form, the WhatsApp entrance pulse and the preloader
ray animation.

All motion respects `prefers-reduced-motion`, including the preloader, which falls back to plain
percentage text. The voice tour never autoplays: it starts on the first scroll or click only.

## Verification

```bash
npm ci
npx tsc --noEmit
npx next build
npm audit --audit-level=high
```

All four pass with zero TypeScript errors, a successful Turbopack production build of 36 routes,
and `found 0 vulnerabilities`.

## Notes for the next developer

- The site is green and white, built only from the template tokens. The footer is dark because the
  template footer is dark; there is no dark theme anywhere else.
- No em dashes appear in any rendered string, class name, or data file.
- The savings calculator is deterministic and client side. The formula lives in
  `src/lib/savings.ts` with its assumptions documented at the top.
