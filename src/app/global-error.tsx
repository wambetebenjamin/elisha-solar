"use client";

import { site, whatsappLink } from "@/lib/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-KE">
      <body
        style={{
          fontFamily: '"Open Sans", Arial, sans-serif',
          background: "#ffffff",
          color: "#12222C",
          margin: 0,
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 24px",
            textAlign: "center",
          }}
        >
          <svg viewBox="0 0 32 32" width="40" height="40" fill="none" aria-hidden="true">
            <circle cx="16" cy="15" r="7.5" fill="#0B6B3A" />
            <path d="M2.5 24.5h27" stroke="#0B6B3A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <p
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#0B6B3A",
              fontWeight: 700,
              margin: "24px 0 0",
            }}
          >
            <span aria-hidden="true" style={{ width: 24, height: 1, background: "#0B6B3A" }} />
            Error 500
          </p>
          <h1 style={{ fontSize: 32, margin: "12px 0 0", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Something went dark on our side.
          </h1>
          <p style={{ maxWidth: 480, fontSize: 15, lineHeight: 1.7, color: "#46595F" }}>
            The application could not start. Try again, or contact us on WhatsApp and we will
            finish what you were doing.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#0B6B3A",
                color: "#ffffff",
                border: "1px solid #0B6B3A",
                borderRadius: 3,
                padding: "14px 26px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href={whatsappLink}
              style={{
                border: "1px solid rgba(18,34,44,0.3)",
                borderRadius: 3,
                padding: "14px 26px",
                fontSize: 15,
                fontWeight: 600,
                color: "#12222C",
                textDecoration: "none",
              }}
            >
              WhatsApp {site.phone}
            </a>
          </div>
          {error.digest && (
            <p style={{ marginTop: 24, fontSize: 12, color: "#5C6E74" }}>
              Reference {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
