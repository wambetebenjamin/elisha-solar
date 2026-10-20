import type { Metadata } from "next";
import { Check, Clock, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a solar quote",
  description:
    "Request a free solar quote and site assessment anywhere in Kenya. Tell us your property type, monthly bill and county, and an engineer calls within 24 hours.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free quote"
        title="Tell us about your property"
        description="Two minutes now saves a wrong quote later. We use your county, property type and bill to size a first draft, then confirm everything during a free assessment."
        crumbs={[{ href: "/quote", label: "Get a quote" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <QuoteForm />

          <aside className="space-y-6">
            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-base font-bold text-[var(--dark)]">
                What you get, at no cost
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--dark)]/70">
                {[
                  "A site visit and roof measurement",
                  "Shading study across the day",
                  "Written design with a fixed price",
                  "Payment plan options from 12 to 36 months",
                  "No obligation to proceed",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-base font-bold text-[var(--dark)]">
                Prefer to talk first?
              </h2>
              <div className="mt-4 space-y-3 text-sm text-[var(--dark)]/70">
                <p className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <a href={`tel:${site.phone}`} className="font-semibold hover:text-[#1f8b4a]">
                    {site.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  {site.hours}
                </p>
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  {site.address}
                </p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-5 w-full justify-center !py-2.5 text-sm"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="rounded-2xl bg-[var(--primary)]/8 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f8b4a]">
                Data protection
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--dark)]/70">
                We use your details only to respond to this request. We do not sell data, and you
                can ask us to delete your record at any time under the Kenya Data Protection Act
                2019.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
