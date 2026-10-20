import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, Sun } from "lucide-react";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { solutions } from "@/data/solutions";

const legalLinks = [
  { href: "/legal/privacy-policy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of service" },
  { href: "/legal/cookie-policy", label: "Cookie policy" },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-[var(--dark)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Sun className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
              </span>
              <span className="font-[Roboto] text-lg font-black">Elisha Solar</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {site.tagline} Solar design, installation and maintenance for Kenyan homes,
              businesses and farms since 2014.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/75">
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                {site.address}
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                <a href={`tel:${site.phone}`} className="hover:text-white">
                  {site.phoneDisplay}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </p>
              <p className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                {site.hours}
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-[0.16em] text-white">
              Solutions
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="transition-colors hover:text-[var(--primary)]"
                  >
                    {solution.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-[0.16em] text-white">
              Company
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[var(--primary)]">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="transition-colors hover:text-[var(--primary)]">
                  Request a quote
                </Link>
              </li>
              <li>
                <Link href="/auth/signup" className="transition-colors hover:text-[var(--primary)]">
                  Create an account
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-[Roboto] text-sm font-bold uppercase tracking-[0.16em] text-white">
              Recent installs
            </h2>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { src: "/images/project-nairobi-rooftop.jpg", alt: "Rooftop solar in Nairobi" },
                { src: "/images/gallery-roof-tiles.jpg", alt: "Panels on a tiled roof" },
                { src: "/images/project-kajiado-farm.jpg", alt: "Ground mount solar on a farm" },
                { src: "/images/gallery-rooftop-palms.jpg", alt: "Panel detail against the sky" },
                { src: "/images/solution-commercial-solar.jpg", alt: "Commercial rooftop array" },
                { src: "/images/project-kisumu-tiles.jpg", alt: "Collectors on a guest house roof" },
              ].map((image) => (
                <div key={image.src} className="relative aspect-square overflow-hidden rounded-lg">
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
            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Talk to an engineer</p>
              <p className="mt-1 text-xs text-white/60">
                Free site assessments across all 47 counties.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex text-sm font-semibold text-[var(--primary)] hover:text-white"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Registered in
            Kenya.
          </p>
          <ul className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--primary)]">
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
