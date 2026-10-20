"use client";

import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { useUiStore } from "@/lib/store";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const bannerOpen = useUiStore((state) => state.cookieBannerOpen);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed right-6 z-[9998] flex flex-col items-end transition-all duration-300"
      style={{ bottom: bannerOpen ? "calc(24px + 148px)" : "24px" }}
    >
      <div className="group relative">
        <span
          role="tooltip"
          id="whatsapp-tooltip"
          className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-[2px] bg-[var(--dark)] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
        >
          Chat with us on WhatsApp
        </span>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          aria-describedby="whatsapp-tooltip"
          className={`flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-[#07301A] shadow-[0_10px_24px_-12px_rgba(18,34,44,0.6)] transition-transform hover:scale-105 ${
            mounted ? "wa-pulse" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347Z" />
            <path d="M20.52 3.449A11.87 11.87 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 0 0-3.422-8.452ZM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.981.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.437-9.884 9.889-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.892 6.993c-.002 5.45-4.437 9.886-9.885 9.886Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
