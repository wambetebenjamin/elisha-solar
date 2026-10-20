# Template audit: solartec-1.0.0

Printed before any code was written, as required by Step 1 of the brief, and kept here as the
durable record.

## 1. Complete extracted file tree (including hidden files)

Archive: `solartec-1.0.0.zip` (1,336,854 bytes). Extracted file count: 153. Directory entries are
included below, so the path count is 178.

```
.
404.html
LICENSE.txt
READ-ME.txt
about.html
contact.html
css
css/bootstrap.min.css
css/style.css
feature.html
img
img/about.jpg
img/carousel-1.jpg
img/carousel-2.jpg
img/carousel-3.jpg
img/feature.jpg
img/gallery-1.jpg
img/gallery-2.jpg
img/gallery-3.jpg
img/gallery-4.jpg
img/gallery-5.jpg
img/gallery-6.jpg
img/img-600x400-1.jpg
img/img-600x400-2.jpg
img/img-600x400-3.jpg
img/img-600x400-4.jpg
img/img-600x400-5.jpg
img/img-600x400-6.jpg
img/quote.jpg
img/team-1.jpg
img/team-2.jpg
img/team-3.jpg
img/testimonial-1.jpg
img/testimonial-2.jpg
img/testimonial-3.jpg
index.html
js
js/main.js
lib
lib/animate
lib/animate/animate.css
lib/animate/animate.min.css
lib/counterup
lib/counterup/counterup.min.js
lib/easing
lib/easing/easing.js
lib/easing/easing.min.js
lib/isotope
lib/isotope/isotope.pkgd.js
lib/isotope/isotope.pkgd.min.js
lib/lightbox
lib/lightbox/css
lib/lightbox/css/lightbox.css
lib/lightbox/css/lightbox.min.css
lib/lightbox/images
lib/lightbox/images/close.png
lib/lightbox/images/loading.gif
lib/lightbox/images/next.png
lib/lightbox/images/prev.png
lib/lightbox/js
lib/lightbox/js/lightbox.js
lib/lightbox/js/lightbox.min.js
lib/lightbox/links.php
lib/owlcarousel
lib/owlcarousel/LICENSE
lib/owlcarousel/assets
lib/owlcarousel/assets/ajax-loader.gif
lib/owlcarousel/assets/owl.carousel.css
lib/owlcarousel/assets/owl.carousel.min.css
lib/owlcarousel/assets/owl.theme.default.css
lib/owlcarousel/assets/owl.theme.default.min.css
lib/owlcarousel/assets/owl.theme.green.css
lib/owlcarousel/assets/owl.theme.green.min.css
lib/owlcarousel/assets/owl.video.play.png
lib/owlcarousel/owl.carousel.js
lib/owlcarousel/owl.carousel.min.js
lib/waypoints
lib/waypoints/links.php
lib/waypoints/waypoints.min.js
lib/wow
lib/wow/wow.js
lib/wow/wow.min.js
project.html
quote.html
renewable-energy-website-template.jpg
scss
scss/bootstrap
scss/bootstrap.scss
scss/bootstrap/scss
scss/bootstrap/scss/_accordion.scss
scss/bootstrap/scss/_alert.scss
scss/bootstrap/scss/_badge.scss
scss/bootstrap/scss/_breadcrumb.scss
scss/bootstrap/scss/_button-group.scss
scss/bootstrap/scss/_buttons.scss
scss/bootstrap/scss/_card.scss
scss/bootstrap/scss/_carousel.scss
scss/bootstrap/scss/_close.scss
scss/bootstrap/scss/_containers.scss
scss/bootstrap/scss/_dropdown.scss
scss/bootstrap/scss/_forms.scss
scss/bootstrap/scss/_functions.scss
scss/bootstrap/scss/_grid.scss
scss/bootstrap/scss/_helpers.scss
scss/bootstrap/scss/_images.scss
scss/bootstrap/scss/_list-group.scss
scss/bootstrap/scss/_mixins.scss
scss/bootstrap/scss/_modal.scss
scss/bootstrap/scss/_nav.scss
scss/bootstrap/scss/_navbar.scss
scss/bootstrap/scss/_offcanvas.scss
scss/bootstrap/scss/_pagination.scss
scss/bootstrap/scss/_popover.scss
scss/bootstrap/scss/_progress.scss
scss/bootstrap/scss/_reboot.scss
scss/bootstrap/scss/_root.scss
scss/bootstrap/scss/_spinners.scss
scss/bootstrap/scss/_tables.scss
scss/bootstrap/scss/_toasts.scss
scss/bootstrap/scss/_tooltip.scss
scss/bootstrap/scss/_transitions.scss
scss/bootstrap/scss/_type.scss
scss/bootstrap/scss/_utilities.scss
scss/bootstrap/scss/_variables.scss
scss/bootstrap/scss/bootstrap-grid.scss
scss/bootstrap/scss/bootstrap-reboot.scss
scss/bootstrap/scss/bootstrap-utilities.scss
scss/bootstrap/scss/bootstrap.scss
scss/bootstrap/scss/forms
scss/bootstrap/scss/forms/_floating-labels.scss
scss/bootstrap/scss/forms/_form-check.scss
scss/bootstrap/scss/forms/_form-control.scss
scss/bootstrap/scss/forms/_form-range.scss
scss/bootstrap/scss/forms/_form-select.scss
scss/bootstrap/scss/forms/_form-text.scss
scss/bootstrap/scss/forms/_input-group.scss
scss/bootstrap/scss/forms/_labels.scss
scss/bootstrap/scss/forms/_validation.scss
scss/bootstrap/scss/helpers
scss/bootstrap/scss/helpers/_clearfix.scss
scss/bootstrap/scss/helpers/_colored-links.scss
scss/bootstrap/scss/helpers/_position.scss
scss/bootstrap/scss/helpers/_ratio.scss
scss/bootstrap/scss/helpers/_stretched-link.scss
scss/bootstrap/scss/helpers/_text-truncation.scss
scss/bootstrap/scss/helpers/_visually-hidden.scss
scss/bootstrap/scss/mixins
scss/bootstrap/scss/mixins/_alert.scss
scss/bootstrap/scss/mixins/_border-radius.scss
scss/bootstrap/scss/mixins/_box-shadow.scss
scss/bootstrap/scss/mixins/_breakpoints.scss
scss/bootstrap/scss/mixins/_buttons.scss
scss/bootstrap/scss/mixins/_caret.scss
scss/bootstrap/scss/mixins/_clearfix.scss
scss/bootstrap/scss/mixins/_color-scheme.scss
scss/bootstrap/scss/mixins/_container.scss
scss/bootstrap/scss/mixins/_deprecate.scss
scss/bootstrap/scss/mixins/_forms.scss
scss/bootstrap/scss/mixins/_gradients.scss
scss/bootstrap/scss/mixins/_grid.scss
scss/bootstrap/scss/mixins/_image.scss
scss/bootstrap/scss/mixins/_list-group.scss
scss/bootstrap/scss/mixins/_lists.scss
scss/bootstrap/scss/mixins/_pagination.scss
scss/bootstrap/scss/mixins/_reset-text.scss
scss/bootstrap/scss/mixins/_resize.scss
scss/bootstrap/scss/mixins/_table-variants.scss
scss/bootstrap/scss/mixins/_text-truncate.scss
scss/bootstrap/scss/mixins/_transition.scss
scss/bootstrap/scss/mixins/_utilities.scss
scss/bootstrap/scss/mixins/_visually-hidden.scss
scss/bootstrap/scss/utilities
scss/bootstrap/scss/utilities/_api.scss
scss/bootstrap/scss/vendor
scss/bootstrap/scss/vendor/_rfs.scss
service.html
team.html
testimonial.html
```

## 2. Audit answers

| Item | Finding |
| --- | --- |
| CSS custom properties | Three, all in `css/style.css`: `--primary: #32C36C`, `--light: #F6F7F8`, `--dark: #1A2A36`. Reproduced verbatim in `src/app/globals.css`. |
| @font-face rules | None. There is no `@font-face` block anywhere in `css/`, `lib/` or `scss/`. The template loads Open Sans (400, 500) and Roboto (500, 700, 900) from Google Fonts via `<link>` tags in every HTML head. The Next layout reproduces that same link, with the same two families. |
| Existing API route file names | None. The archive is static HTML, CSS and JS. |
| Existing env variable names | None. No `.env` file and no `process.env` reference. |
| Loading screen | Present. `#spinner` is the first element in `<body>` on all 10 HTML pages: a Bootstrap `spinner-border` with `role="status"` and an `sr-only` label, dismissed after 1 ms by `js/main.js`. It has no percentage counter and no skip control, so the brief's loader specification (SVG sun, rays, percentage, 3 second cap, skip after 1 second) was implemented in `src/components/Preloader.tsx` on top of the template's white, primary green loading surface. |
| Cookie consent | Absent. No cookie, consent or localStorage code in the archive. Built from scratch in `src/components/CookieConsent.tsx` with the key `elisha_solar_consent`. |
| CAPTCHA provider | Absent. No reCAPTCHA, hCaptcha or Turnstile reference. Google reCAPTCHA v3 added, with a visible v2 challenge fallback below a 0.5 score. |
| `/legal/privacy-policy` | Absent. Built. |
| `/legal/terms` | Absent. Built. |
| `/legal/cookie-policy` | Absent. Built. |
| `/404` | `404.html` exists as a static page, styled with the template header and footer. The Next app replaces it with `src/app/not-found.tsx`, which carries the required sun icon and the line "This page is off the grid." |
| `/500` | Absent. Added `src/app/error.tsx` and `src/app/global-error.tsx` with "Try again" and the WhatsApp number +254112272061. |

## 3. Other template facts that shaped the build

- Bootstrap 5 grid and utility classes, Font Awesome 5, Bootstrap Icons, Owl Carousel, WOW.js,
  Isotope, Lightbox and CounterUp are vendored in `lib/`. None of them are used by the Next app.
- The original `css/style.css` is 617 lines and is kept byte for byte at `css/style.css`.
- Image assets are 24 JPEGs in `img/`, including carousel, gallery, team and testimonial
  photography. The Next build uses licensed Pexels photography in `public/images/` instead, as
  required by Step 10, and leaves the template images untouched.
- No dark theme exists in the template. The only dark surface is the footer (`bg-dark`), which is
  reproduced with the `--dark` token.

## 4. Verification results

| Gate | Command | Result |
| --- | --- | --- |
| Reproducible install | `npm ci` | 214 packages, exit 0 |
| Types | `npx tsc --noEmit` | no errors |
| Production build | `npx next build` | compiled successfully, 39 routes generated |
| Security | `npm audit --audit-level=high` | 0 vulnerabilities |
| Link and asset crawl | 30 pages crawled | 0 broken links, 0 missing images |
| Banned character | `grep -rn "em dash"` over `src`, data, docs | 0 occurrences |
