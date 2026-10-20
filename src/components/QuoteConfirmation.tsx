"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, Download, FileText, Loader2, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { formatKes } from "@/lib/savings";

type Summary = {
  propertyType?: string;
  county?: string;
  monthlyBill?: number;
  facilitySize?: string;
  contactMethod?: string;
  name?: string;
  phone?: string;
  email?: string;
  estimatedSystemSizeKw?: number;
  estimatedCostKes?: number;
  estimatedMonthlySavingKes?: number;
};

type StoredSummary = {
  reference?: string;
  summary?: Summary;
  submittedAt?: string;
  emailDelivered?: boolean;
};

export default function QuoteConfirmation() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("ref") ?? "";
  const [data, setData] = useState<StoredSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const readLocal = (): StoredSummary | null => {
      try {
        const raw =
          window.sessionStorage.getItem("elisha_quote_summary") ??
          window.localStorage.getItem("elisha_quote_last");
        return raw ? (JSON.parse(raw) as StoredSummary) : null;
      } catch {
        return null;
      }
    };

    const local = readLocal();
    if (local && (!reference || local.reference === reference)) {
      setData(local);
    }

    if (!reference) {
      setLoading(false);
      return;
    }

    fetch(`/api/quote/${encodeURIComponent(reference)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { quote?: Summary & { reference?: string; createdAt?: string } } | null) => {
        if (payload?.quote) {
          setData((current) => ({
            reference: payload.quote?.reference ?? reference,
            summary: payload.quote,
            submittedAt: payload.quote?.createdAt,
            emailDelivered: current?.emailDelivered,
          }));
        }
      })
      .catch(() => {
        // The stored summary above is enough to render the page.
      })
      .finally(() => setLoading(false));
  }, [reference]);

  const summary = data?.summary;

  const downloadPdf = useCallback(async () => {
    setDownloading(true);
    try {
      const [{ jsPDF }] = await Promise.all([import("jspdf")]);
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const brand = [50, 195, 108] as const;
      const ink = [26, 42, 54] as const;

      doc.setFillColor(brand[0], brand[1], brand[2]);
      doc.rect(0, 0, 595, 8, "F");
      doc.setTextColor(ink[0], ink[1], ink[2]);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Elisha Solar", 48, 70);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(83, 107, 118);
      doc.text("Power your home. Power your future.", 48, 88);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(ink[0], ink[1], ink[2]);
      doc.text("Quote request summary", 48, 130);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Reference: ${data?.reference ?? reference ?? "Not available"}`, 48, 150);
      doc.text(
        `Submitted: ${new Date(data?.submittedAt ?? Date.now()).toLocaleString("en-GB")}`,
        48,
        166,
      );

      let y = 200;
      const rows: Array<[string, string]> = [
        ["Name", summary?.name ?? "Not provided"],
        ["Phone", summary?.phone ?? "Not provided"],
        ["Email", summary?.email ?? "Not provided"],
        ["Property type", summary?.propertyType ?? "Not provided"],
        ["County", summary?.county ?? "Not provided"],
        [
          "Monthly bill",
          typeof summary?.monthlyBill === "number" ? formatKes(summary.monthlyBill) : "Not provided",
        ],
        ["Rooms or facility size", summary?.facilitySize ?? "Not provided"],
        ["Preferred contact", summary?.contactMethod ?? "Not provided"],
        [
          "Suggested system size",
          typeof summary?.estimatedSystemSizeKw === "number"
            ? `${summary.estimatedSystemSizeKw} kW`
            : "Pending assessment",
        ],
        [
          "Indicative installed cost",
          typeof summary?.estimatedCostKes === "number"
            ? formatKes(summary.estimatedCostKes)
            : "Pending assessment",
        ],
        [
          "Indicative monthly saving",
          typeof summary?.estimatedMonthlySavingKes === "number"
            ? formatKes(summary.estimatedMonthlySavingKes)
            : "Pending assessment",
        ],
      ];

      rows.forEach(([label, value], index) => {
        if (index % 2 === 0) {
          doc.setFillColor(246, 247, 248);
          doc.rect(48, y - 14, 499, 26, "F");
        }
        doc.setTextColor(83, 107, 118);
        doc.text(label, 58, y + 3);
        doc.setTextColor(ink[0], ink[1], ink[2]);
        doc.text(String(value), 260, y + 3, { maxWidth: 280 });
        y += 26;
      });

      y += 24;
      doc.setFont("helvetica", "bold");
      doc.text("What happens next", 48, y);
      doc.setFont("helvetica", "normal");
      y += 18;
      doc.text("1. An engineer calls you within 24 hours to book the free assessment.", 58, y);
      y += 16;
      doc.text("2. We visit, measure and confirm the design and fixed price.", 58, y);
      y += 16;
      doc.text("3. Installation is scheduled at a time that suits you.", 58, y);

      y += 34;
      doc.setFontSize(9);
      doc.setTextColor(124, 139, 147);
      doc.text(
        "Estimates are indicative and confirmed after a site assessment. Elisha Solar, Nairobi, Kenya.",
        48,
        y,
        { maxWidth: 499 },
      );
      doc.text("+254 112 272 061  |  hello@elishasolar.co.ke", 48, y + 16);

      doc.save(`elisha-solar-quote-${data?.reference ?? reference ?? "summary"}.pdf`);
    } finally {
      setDownloading(false);
    }
  }, [data, reference, summary]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-9 w-9 text-brand-ink" aria-hidden="true" />
        <h1 className="mt-5 font-[Roboto] text-[2rem] font-bold text-ink sm:text-[2.6rem]">
          Your quote request is in
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
          {loading
            ? "Fetching your reference."
            : "Keep the reference below. We have emailed a copy to you and to our engineering desk."}
        </p>
        <div className="mt-6 inline-flex items-center gap-3 border border-brand-ink/30 bg-brand-soft px-5 py-2.5">
          <FileText className="h-4 w-4 text-brand-ink" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            Reference
          </span>
          <span className="tnum font-[Roboto] text-base font-bold tracking-[0.06em] text-ink">
            {reference || data?.reference || "pending"}
          </span>
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="card-surface p-6 sm:p-8">
          <h2 className="font-[Roboto] text-lg font-bold text-ink">
            Summary of your request
          </h2>
          {loading && !summary ? (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Loading your details
            </p>
          ) : (
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Row label="Property type" value={summary?.propertyType} capitalize />
              <Row label="County" value={summary?.county} />
              <Row
                label="Monthly bill"
                value={typeof summary?.monthlyBill === "number" ? formatKes(summary.monthlyBill) : undefined}
              />
              <Row label="Rooms or facility size" value={summary?.facilitySize} />
              <Row label="Preferred contact" value={summary?.contactMethod} capitalize />
              <Row label="Name" value={summary?.name} />
              <Row label="Phone" value={summary?.phone} />
              <Row label="Email" value={summary?.email} />
              <Row
                label="Suggested system"
                value={
                  typeof summary?.estimatedSystemSizeKw === "number"
                    ? `${summary.estimatedSystemSizeKw} kW`
                    : undefined
                }
              />
              <Row
                label="Indicative cost"
                value={
                  typeof summary?.estimatedCostKes === "number"
                    ? formatKes(summary.estimatedCostKes)
                    : undefined
                }
              />
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadPdf}
              disabled={downloading}
              className="btn-brand !py-2.5 text-sm disabled:opacity-70"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Preparing PDF
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download summary as PDF
                </>
              )}
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2.5 text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Continue on WhatsApp
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-surface p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-line bg-brand-soft">
                <Clock className="h-5 w-5 text-brand-ink" aria-hidden="true" />
              </span>
              <h2 className="font-[Roboto] text-base font-bold text-ink">
                What happens next
              </h2>
            </div>
            <ol className="mt-4 space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-line text-[11px] font-bold text-ink">
                  1
                </span>
                An engineer calls you within 24 hours to confirm details and book the assessment.
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-line text-[11px] font-bold text-ink">
                  2
                </span>
                We visit, measure the roof, inspect your distribution board and confirm the design.
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-line text-[11px] font-bold text-ink">
                  3
                </span>
                You receive a fixed written quote with a payment plan and an installation date.
              </li>
            </ol>
          </div>

          <div className="rounded-[4px] bg-dark p-6 text-white">
            <p className="font-[Roboto] text-base font-bold">Need it sooner?</p>
            <p className="mt-2 text-sm leading-relaxed text-[#DCE5E8]">
              Message the team on WhatsApp with your reference and we will pick it up in the
              queue.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand mt-4 w-full justify-center !py-2.5 text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
            <Link
              href="/solutions"
              className="mt-3 block text-center text-xs font-semibold text-on-dark-muted hover:text-white"
            >
              Browse packages while you wait
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value?: string;
  capitalize?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-faint">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-sm font-semibold text-ink ${capitalize ? "capitalize" : ""}`}
      >
        {value && value.length > 0 ? value : "Not provided"}
      </dd>
    </div>
  );
}
