"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import SunMark from "@/components/ui/SunMark";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[9000] w-full">
      <div className="hidden bg-dark text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[12px]">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 text-white transition-colors hover:text-[#9EE7BA]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <span className="text-on-dark-muted">{site.hours}</span>
          </div>
          <div className="flex items-center gap-6 text-on-dark-muted">
            <span>{site.headquarters}</span>
            <a
              href={`mailto:${site.email}`}
              className="text-white transition-colors hover:text-[#9EE7BA]"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b border-line bg-white transition-colors ${
          scrolled ? "shadow-[0_1px_0_0_rgba(18,34,44,0.06)]" : ""
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3.5"
        >
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <SunMark className="h-7 w-7 text-brand-ink" />
            <span className="leading-none">
              <span className="block font-[Roboto] text-[1.0625rem] font-bold tracking-[-0.02em] text-ink">
                Elisha Solar
              </span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
                Power your future
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block py-1 text-[13px] font-semibold tracking-[0.02em] transition-colors ${
                      active ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-brand-ink transition-transform duration-300 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Link href="/auth/signin" className="btn-quiet !px-3 !py-2 text-[13px]">
              Sign in
            </Link>
            <Link href="/quote" className="btn-brand !px-4 !py-2.5 text-[13px]">
              Get a free quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[1.5px] w-5 bg-current transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-current transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="overflow-hidden border-t border-line lg:hidden"
            >
              <ul className="mx-auto flex max-w-7xl flex-col px-6 py-3">
                {navLinks.map((link) => (
                  <li key={link.href} className="border-b border-line/70">
                    <Link
                      href={link.href}
                      className="block py-3 text-sm font-semibold text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-4 flex gap-2 pb-2">
                  <Link href="/auth/signin" className="btn-ghost flex-1 text-sm">
                    Sign in
                  </Link>
                  <Link href="/quote" className="btn-brand flex-1 text-sm">
                    Get a quote
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
