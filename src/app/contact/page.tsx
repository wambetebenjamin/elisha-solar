import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ContactForm";
import { coverageRegions } from "@/lib/counties";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Elisha Solar",
  description:
    "Talk to the Elisha Solar team in Nairobi. Phone, WhatsApp, email and office address, plus the counties we cover for solar installation and maintenance.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to an engineer, not a call centre"
        description="Our Nairobi office answers the phone during working hours, and the support line is staffed around the clock for existing clients."
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div className="space-y-6">
            <div className="card-surface p-6">
              <h2 className="font-[Roboto] text-lg font-bold text-[var(--dark)]">
                Nairobi headquarters
              </h2>
              <div className="mt-4 space-y-4 text-sm text-[var(--dark)]/70">
                <p className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  {site.address}
                </p>
                <p className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <a href={`tel:${site.phone}`} className="font-semibold text-[var(--dark)] hover:text-[#1f8b4a]">
                    {site.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="hover:text-[#1f8b4a]">
                    {site.email}
                  </a>
                </p>
                <p className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--primary)]" aria-hidden="true" />
                  {site.hours}
                </p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand mt-6 w-full justify-center !py-3 text-sm"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="card-surface overflow-hidden">
              <div className="border-b border-[var(--dark)]/8 px-6 py-4">
                <h2 className="font-[Roboto] text-lg font-bold text-[var(--dark)]">
                  Counties we cover
                </h2>
                <p className="mt-1 text-xs text-[var(--dark)]/55">
                  All 47 counties, with permanent crews in five regions.
                </p>
              </div>
              <Image
                src="/images/kenya-coverage-map.svg"
                alt="Schematic map of the five Kenyan regions served by Elisha Solar"
                width={720}
                height={520}
                className="h-auto w-full"
              />
              <ul className="divide-y divide-[var(--dark)]/8">
                {coverageRegions.map((region) => (
                  <li key={region.region} className="px-6 py-4">
                    <p className="text-sm font-bold text-[var(--dark)]">{region.region}</p>
                    <p className="mt-1 text-xs text-[var(--dark)]/60">{region.note}</p>
                    <p className="mt-2 text-xs font-medium text-[var(--dark)]/50">
                      {region.counties.join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <ContactForm />
            <p className="mt-4 text-center text-xs text-[var(--dark)]/50">
              Looking for a priced quote instead?{" "}
              <Link href="/quote" className="font-semibold text-[var(--primary)] hover:underline">
                Use the quote form
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
