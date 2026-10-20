"use client";

import { useEffect, useRef, useState } from "react";
import {
  hasV2SiteKey,
  loadRecaptcha,
  recaptchaEnabled,
  renderRecaptchaV2,
} from "@/lib/recaptcha-client";

type RecaptchaFieldProps = {
  /** Set when the server rejected a v3 token below the score threshold. */
  challenged: boolean;
  onToken: (token: string) => void;
};

export default function RecaptchaField({ challenged, onToken }: RecaptchaFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!challenged || !recaptchaEnabled) return;
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    loadRecaptcha()
      .then(() => {
        if (cancelled || !containerRef.current || rendered) return;
        const ok = renderRecaptchaV2(containerRef.current, onToken);
        setRendered(ok);
      })
      .catch(() => setRendered(false));

    return () => {
      cancelled = true;
    };
  }, [challenged, onToken, rendered]);

  if (!challenged) return null;

  return (
    <div className="border border-line border-l-2 border-l-brand-ink bg-brand-soft p-4">
      <p className="text-sm font-semibold text-ink">
        One quick check before we continue
      </p>
      <p className="mt-1 text-xs leading-relaxed text-muted">
        Our automatic check was not confident enough, so please confirm you are a person.
      </p>
      <div ref={containerRef} className="mt-3 min-h-[78px]" />
      {!recaptchaEnabled && (
        <p className="text-xs font-medium text-[#9a3412]">
          Add NEXT_PUBLIC_RECAPTCHA_SITE_KEY to enable this check.
        </p>
      )}
      {recaptchaEnabled && !hasV2SiteKey() && (
        <p className="mt-2 text-xs text-muted">
          Using the v3 site key for this visible check. Add NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY to
          use a dedicated checkbox key.
        </p>
      )}
    </div>
  );
}
