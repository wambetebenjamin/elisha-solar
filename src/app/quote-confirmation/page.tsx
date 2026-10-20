import type { Metadata } from "next";
import { Suspense } from "react";
import QuoteConfirmation from "@/components/QuoteConfirmation";

export const metadata: Metadata = {
  title: "Quote request received",
  description: "Your Elisha Solar quote reference and summary, with the next steps.",
  robots: { index: false, follow: false },
};

export default function QuoteConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-sm text-muted">Loading your quote summary</p>
        </div>
      }
    >
      <QuoteConfirmation />
    </Suspense>
  );
}
