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
          fontFamily: "Open Sans, Arial, sans-serif",
          background: "#ffffff",
          color: "#1A2A36",
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
          <p
            style={{
              fontSize: 12,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#32C36C",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Error 500
          </p>
          <h1 style={{ fontSize: 34, margin: "12px 0 0", lineHeight: 1.2 }}>
            Something went dark on our side.
          </h1>
          <p style={{ maxWidth: 480, fontSize: 14, lineHeight: 1.7, color: "#536B76" }}>
            The application could not start. Try again, or contact us on WhatsApp and we will
            finish what you were doing.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={reset}
              style={{
                background: "#32C36C",
                color: "#ffffff",
                border: "none",
                borderRadius: 999,
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
                border: "1px solid rgba(26,42,54,0.2)",
                borderRadius: 999,
                padding: "14px 26px",
                fontSize: 15,
                fontWeight: 600,
                color: "#1A2A36",
                textDecoration: "none",
              }}
            >
              WhatsApp {site.phone}
            </a>
          </div>
          {error.digest && (
            <p style={{ marginTop: 24, fontSize: 12, color: "#7C8B93" }}>
              Reference {error.digest}
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
