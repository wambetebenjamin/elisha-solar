"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, Sun, X } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[9000] w-full">
      <div className="hidden bg-[var(--dark)] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
              <a href={`tel:${site.phone}`} className="hover:text-[var(--primary)]">
                {site.phoneDisplay}
              </a>
            </span>
            <span className="text-white/70">{site.hours}</span>
          </div>
          <div className="flex items-center gap-5 text-white/70">
            <span>{site.headquarters}</span>
            <a href={`mailto:${site.email}`} className="hover:text-[var(--primary)]">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b border-[var(--dark)]/10 bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_-24px_rgba(26,42,54,0.7)]" : ""
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
        >
          <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)]/12">
              <Sun className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block font-[Roboto] text-lg font-black tracking-tight text-[var(--dark)]">
                Elisha Solar
              </span>
              <span className="block text-[11px] uppercase tracking-[0.16em] text-[var(--dark)]/55">
                Power your future
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                      active
                        ? "text-[var(--primary)]"
                        : "text-[var(--dark)]/75 hover:text-[var(--primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/auth/signin" className="btn-ghost !px-5 !py-2.5 text-sm">
              Sign in
            </Link>
            <Link href="/quote" className="btn-brand !px-5 !py-2.5 text-sm">
              Get a free quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--dark)]/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden border-t border-[var(--dark)]/10 lg:hidden"
            >
              <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-xl px-3 py-3 text-sm font-semibold text-[var(--dark)] hover:bg-[var(--light)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 flex gap-3 px-3">
                  <Link href="/auth/signin" className="btn-ghost flex-1 justify-center text-sm">
                    Sign in
                  </Link>
                  <Link href="/quote" className="btn-brand flex-1 justify-center text-sm">
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
