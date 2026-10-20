import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Cookie policy",
  description:
    "The cookies and local storage Elisha Solar uses, what each category does, and how to change your choices.",
};

const sections: LegalSection[] = [
  {
    id: "what",
    heading: "What cookies and local storage are",
    paragraphs: [
      "Cookies are small text files a website stores in your browser. Local storage works in a similar way but keeps data on your device without sending it with every request. We use both, and we refer to them together as storage in this policy.",
      "Storage is not automatically personal data, but where an identifier can be linked to you it is treated as personal data under the Kenya Data Protection Act 2019.",
    ],
  },
  {
    id: "necessary",
    heading: "Necessary storage (always on)",
    paragraphs: [
      "These are required for security and for the site to remember your choices. They cannot be switched off through our banner, because without them the site cannot function correctly.",
    ],
    bullets: [
      "elisha_solar_consent: stores your cookie choice and the date it was made. Kept in local storage for 12 months.",
      "elisha_quote_summary and elisha_quote_last: keep your quote reference and summary so the confirmation page and PDF download work. Cleared when you clear your browser storage.",
      "Google reCAPTCHA cookies: set when a form is protected by reCAPTCHA, to distinguish humans from automated submissions. Controlled by Google.",
      "__Host-next-auth.csrf-token and session cookies: set only if you sign in, to keep your session secure.",
    ],
  },
  {
    id: "functional",
    heading: "Functional storage (optional)",
    paragraphs: [
      "Functional storage remembers preferences you set, such as a preferred contact method, so you do not have to choose it again. It is off unless you enable it in the preferences panel.",
    ],
  },
  {
    id: "analytics",
    heading: "Analytics storage (optional)",
    paragraphs: [
      "Analytics help us understand which pages are useful and where the site is slow. We use Vercel Analytics and Speed Insights, which collect aggregated page and performance measurements. We do not use analytics to build advertising profiles. Analytics storage is off unless you enable it.",
    ],
  },
  {
    id: "marketing",
    heading: "Marketing storage (optional)",
    paragraphs: [
      "Marketing storage would let us measure the performance of our own campaigns. This site does not currently set any marketing cookies. The category exists so that your choice is recorded if we introduce them later, and it stays off unless you enable it.",
    ],
  },
  {
    id: "third-parties",
    heading: "Third party storage",
    paragraphs: [
      "Google may set cookies when reCAPTCHA runs on a form, or when you choose to sign in with Google. Those cookies are governed by Google's own privacy policy. Fonts are loaded from Google Fonts, which receives your IP address when it serves the font files.",
    ],
  },
  {
    id: "manage",
    heading: "Changing your choice",
    paragraphs: [
      "You can reopen the cookie panel at any time using the Manage Preferences control in the consent banner, or by clearing the elisha_solar_consent key in your browser storage and reloading the page.",
      "You can also block or delete storage in your browser settings. Blocking necessary storage may stop forms and the quote confirmation page from working.",
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    paragraphs: [
      "For questions about this policy, email hello@elishasolar.co.ke or call +254 112 272 061. Our privacy policy explains how to exercise your rights under the Data Protection Act 2019.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie policy"
      description="Exactly what we store on your device, which categories are optional, and how to change your mind."
      updated="20 October 2026"
      sections={sections}
      crumbs="Cookie policy"
    />
  );
}
