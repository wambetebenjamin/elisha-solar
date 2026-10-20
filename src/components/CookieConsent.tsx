"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Check, Cookie, X } from "lucide-react";
import { site } from "@/lib/site";
import { useUiStore } from "@/lib/store";

type Preferences = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  version: number;
};

const STORAGE_KEY = site.consentKey;
const CONSENT_VERSION = 1;

const defaultPreferences: Preferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
  updatedAt: "",
  version: CONSENT_VERSION,
};

const optionalCategories = [
  {
    key: "functional" as const,
    title: "Functional",
    description:
      "Remembers your preferences, such as a saved quote draft, and keeps the site behaving the way you set it up.",
  },
  {
    key: "analytics" as const,
    title: "Analytics",
    description:
      "Aggregated page and speed measurements that show us which pages people actually find useful.",
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    description:
      "Lets us measure the performance of our own campaigns. We do not sell personal data.",
  },
];

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const setBannerOpen = useUiStore((state) => state.setCookieBannerOpen);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
      setBannerOpen(true);
      return;
    }
    try {
      const parsed = JSON.parse(stored) as Partial<Preferences>;
      setPreferences({
        necessary: true,
        functional: Boolean(parsed.functional),
        analytics: Boolean(parsed.analytics),
        marketing: Boolean(parsed.marketing),
        updatedAt: parsed.updatedAt ?? "",
        version: parsed.version ?? CONSENT_VERSION,
      });
    } catch {
      setVisible(true);
      setBannerOpen(true);
    }
  }, [setBannerOpen]);

  const save = useCallback(
    (next: Preferences) => {
      const record: Preferences = {
        ...next,
        necessary: true,
        updatedAt: new Date().toISOString(),
        version: CONSENT_VERSION,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      setPreferences(record);
      setVisible(false);
      setModalOpen(false);
      setBannerOpen(false);
      window.dispatchEvent(new CustomEvent("elisha-consent-updated", { detail: record }));
    },
    [setBannerOpen],
  );

  const acceptAll = () =>
    save({
      ...preferences,
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });

  const rejectOptional = () =>
    save({
      ...preferences,
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });

  return (
    <>
      <AnimatePresence>
        {visible && !modalOpen && (
          <motion.div
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[9997] border-t border-line bg-white shadow-[0_-16px_40px_-30px_rgba(26,42,54,0.6)]"
            role="region"
            aria-label="Cookie consent"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <Cookie className="mt-1 h-5 w-5 shrink-0 text-brand-ink" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">
                    We use cookies to keep this site working and to understand how it is used.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Under the Kenya Data Protection Act 2019 you can choose what we store.
                    Necessary storage is always on. Read our{" "}
                    <Link href="/legal/cookie-policy" className="font-semibold text-brand-ink underline-offset-2 hover:underline">
                      cookie policy
                    </Link>{" "}
                    and{" "}
                    <Link href="/legal/privacy-policy" className="font-semibold text-brand-ink underline-offset-2 hover:underline">
                      privacy policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="text-[13px] font-semibold text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
                >
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="btn-ghost !py-2.5 text-[13px]"
                >
                  Manage preferences
                </button>
                <button type="button" onClick={acceptAll} className="btn-brand !py-2.5 text-[13px]">
                  Accept all
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-end justify-center bg-ink/60 p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-pref-title"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl overflow-hidden border border-line bg-white shadow-[0_24px_60px_-32px_rgba(18,34,44,0.55)]"
            >
              <div className="flex items-start justify-between border-b border-line px-6 py-5">
                <div>
                  <h2
                    id="cookie-pref-title"
                    className="font-[Roboto] text-lg font-bold text-ink"
                  >
                    Cookie preferences
                  </h2>
                  <p className="mt-1 text-xs text-muted">
                    Choose what Elisha Solar may store on your device. You can change this at
                    any time.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setBannerOpen(true);
                  }}
                  aria-label="Close cookie preferences"
                  className="border border-line p-2 text-muted hover:border-ink/40 hover:text-ink"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-4 px-6 py-5">
                <div className="rounded-[3px] border border-line p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-ink">Necessary</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        Required for security, forms and remembering this choice. Always on.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 border border-brand-ink/30 bg-brand-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-ink">
                      <Check className="h-3 w-3" aria-hidden="true" />
                      Locked on
                    </span>
                  </div>
                </div>

                {optionalCategories.map((category) => (
                  <div
                    key={category.key}
                    className="rounded-[3px] border border-line p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-ink">
                          {category.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {category.description}
                        </p>
                      </div>
                      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={preferences[category.key]}
                          onChange={(event) =>
                            setPreferences((current) => ({
                              ...current,
                              [category.key]: event.target.checked,
                            }))
                          }
                        />
                        <span className="h-6 w-11 rounded-[2px] border border-line bg-[#D8DEE0] transition peer-checked:border-brand-ink peer-checked:bg-brand-ink" />
                        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-[1px] bg-white transition peer-checked:translate-x-5" />
                        <span className="sr-only">{category.title} cookies</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-end gap-3 border-t border-line bg-light px-6 py-4">
                <button type="button" onClick={rejectOptional} className="btn-ghost !py-2.5 text-sm">
                  Reject optional
                </button>
                <button
                  type="button"
                  onClick={() => save(preferences)}
                  className="btn-brand !py-2.5 text-sm"
                >
                  Save preferences
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
