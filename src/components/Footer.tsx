import Link from "next/link";
import Image from "next/image";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { solutions } from "@/data/solutions";
import SunMark from "@/components/ui/SunMark";

const legalLinks = [
  { href: "/legal/privacy-policy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of service" },
  { href: "/legal/cookie-policy", label: "Cookie policy" },
];

const footerImages = [
  { src: "/images/project-nairobi-rooftop.jpg", alt: "Rooftop solar in Nairobi" },
  { src: "/images/gallery-roof-tiles.jpg", alt: "Panels on a tiled roof" },
  { src: "/images/project-kajiado-farm.jpg", alt: "Ground mount solar on a farm" },
  { src: "/images/gallery-rooftop-palms.jpg", alt: "Panel detail against the sky" },
  { src: "/images/solution-commercial-solar.jpg", alt: "Commercial rooftop array" },
  { src: "/images/project-kisumu-tiles.jpg", alt: "Collectors on a guest house roof" },
];

const contactRows = [
  { label: "Office", value: site.address },
  { label: "Telephone", value: site.phoneDisplay, href: `tel:${site.phone}` },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Hours", value: site.hours },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <SunMark className="h-7 w-7 text-[#9EE7BA]" />
              <span className="font-[Roboto] text-[1.0625rem] font-bold tracking-[-0.02em]">
                Elisha Solar
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-[1.7] text-on-dark-muted">
              {site.tagline} Solar design, installation and maintenance for Kenyan homes,
              businesses and farms since 2014.
            </p>

            <dl className="mt-7 space-y-3 text-sm">
              {contactRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[5.5rem_1fr] gap-2">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#93A7AD]">
                    {row.label}
                  </dt>
                  <dd className="text-on-dark-muted">
                    {row.href ? (
                      <a href={row.href} className="text-white transition-colors hover:text-[#9EE7BA]">
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <nav aria-labelledby="footer-solutions">
            <h2
              id="footer-solutions"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Solutions
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="text-on-dark-muted transition-colors hover:text-white"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
            >
              Company
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-on-dark-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="text-on-dark-muted transition-colors hover:text-white">
                  Request a quote
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/signup"
                  className="text-on-dark-muted transition-colors hover:text-white"
                >
                  Create an account
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
              Recent installs
            </h2>
            <div className="mt-5 grid grid-cols-3 gap-1.5">
              {footerImages.map((image) => (
                <div key={image.src} className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold text-white">Talk to an engineer</p>
              <p className="mt-1 text-xs leading-relaxed text-on-dark-muted">
                Free site assessments across all 47 counties.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-[#9EE7BA] underline decoration-[#9EE7BA]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Registered in Kenya.
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
