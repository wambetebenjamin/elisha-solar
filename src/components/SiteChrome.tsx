"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppButton from "@/components/WhatsAppButton";
import VoiceTour from "@/components/VoiceTour";
import CookieConsent from "@/components/CookieConsent";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAuth = pathname?.startsWith("/auth");

  return (
    <>
      <SmoothScroll />
      <Preloader />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-lg focus:bg-[var(--dark)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      {!isAuth && <Footer />}
      <WhatsAppButton />
      <VoiceTour />
      <CookieConsent />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
