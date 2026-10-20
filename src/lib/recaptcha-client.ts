"use client";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark";
          size?: "normal" | "compact";
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

const SCRIPT_ID = "google-recaptcha-script";

export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
export const recaptchaV2SiteKey =
  process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY ?? recaptchaSiteKey;

export const recaptchaEnabled = recaptchaSiteKey.length > 0;

let loader: Promise<void> | null = null;

export function loadRecaptcha(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (!recaptchaEnabled) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("reCAPTCHA failed to load")));
      if (window.grecaptcha) resolve();
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    // Explicit mode allows both grecaptcha.execute for v3 and grecaptcha.render
    // for the visible v2 fallback from a single script load.
    script.src = "https://www.google.com/recaptcha/api.js?render=explicit&hl=en";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("reCAPTCHA failed to load"));
    document.head.appendChild(script);
  });

  return loader;
}

export async function executeRecaptcha(action: string): Promise<string | undefined> {
  if (!recaptchaEnabled) return undefined;

  try {
    await loadRecaptcha();
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) return undefined;

    await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
    return await grecaptcha.execute(recaptchaSiteKey, { action });
  } catch (error) {
    console.error("reCAPTCHA execution failed", error);
    return undefined;
  }
}

export function hasV2SiteKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY);
}

export function renderRecaptchaV2(
  container: HTMLElement,
  onToken: (token: string) => void,
): boolean {
  if (!window.grecaptcha || !recaptchaV2SiteKey) return false;
  try {
    window.grecaptcha.render(container, {
      sitekey: recaptchaV2SiteKey,
      callback: onToken,
      theme: "light",
    });
    return true;
  } catch (error) {
    console.error("reCAPTCHA v2 fallback could not render. Set NEXT_PUBLIC_RECAPTCHA_V2_SITE_KEY.", error);
    return false;
  }
}
