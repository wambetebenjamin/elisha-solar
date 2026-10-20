import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";
import type { StoredQuote } from "@/lib/quote-store";
import type { ContactInput } from "@/lib/validations";

type SendResult = { delivered: boolean; reason?: string };

let cachedTransport: Transporter | null = null;

function getTransport(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  if (!cachedTransport) {
    cachedTransport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return cachedTransport;
}

function fromAddress(): string {
  return process.env.SMTP_FROM || `${site.name} <${site.email}>`;
}

function inboxAddress(): string {
  return process.env.SMTP_USER || site.email;
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px 6px 0;color:#536B76;font-size:13px;">${label}</td><td style="padding:6px 0;color:#1A2A36;font-size:13px;font-weight:600;">${value}</td></tr>`;
}

function shell(title: string, inner: string): string {
  return `<div style="font-family:Open Sans,Arial,sans-serif;background:#F6F7F8;padding:24px;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px;border:1px solid #E6EAEC;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#32C36C;font-weight:700;">Elisha Solar</p>
      <h1 style="margin:0 0 18px;font-size:22px;color:#1A2A36;">${title}</h1>
      ${inner}
      <p style="margin:24px 0 0;font-size:12px;color:#7C8B93;">${site.phoneDisplay} · ${site.email} · ${site.address}</p>
    </div>
  </div>`;
}

export async function sendQuoteEmails(quote: StoredQuote): Promise<SendResult> {
  const transport = getTransport();
  if (!transport) {
    console.warn(
      `SMTP is not configured. Quote ${quote.reference} was stored but no email was sent.`,
    );
    return { delivered: false, reason: "smtp-not-configured" };
  }

  const internal = shell(
    `New quote request ${quote.reference}`,
    `<table style="width:100%;border-collapse:collapse;">
      ${row("Reference", quote.reference)}
      ${row("Name", quote.name)}
      ${row("Phone", quote.phone)}
      ${row("Email", quote.email)}
      ${row("County", quote.county)}
      ${row("Property", quote.propertyType)}
      ${row("Monthly bill", `KES ${quote.monthlyBill.toLocaleString("en-KE")}`)}
      ${row("Size", quote.facilitySize)}
      ${row("Preferred contact", quote.contactMethod)}
      ${row("Suggested size", `${quote.estimatedSystemSizeKw} kW`)}
      ${row("Indicative cost", `KES ${quote.estimatedCostKes.toLocaleString("en-KE")}`)}
      ${row("Indicative saving", `KES ${quote.estimatedMonthlySavingKes.toLocaleString("en-KE")} per month`)}
    </table>
    <p style="margin:18px 0 0;font-size:13px;color:#1A2A36;">${quote.notes ?? "No additional notes."}</p>`,
  );

  const customer = shell(
    `We have your request, ${quote.name.split(" ")[0]}`,
    `<p style="font-size:14px;line-height:1.7;color:#33474F;">Thank you for requesting a solar quote. Your reference is <strong>${quote.reference}</strong>. An engineer will call you within 24 hours to arrange your free site assessment.</p>
     <table style="width:100%;border-collapse:collapse;margin-top:12px;">
       ${row("Property", quote.propertyType)}
       ${row("County", quote.county)}
       ${row("Monthly bill", `KES ${quote.monthlyBill.toLocaleString("en-KE")}`)}
       ${row("Suggested system", `${quote.estimatedSystemSizeKw} kW`)}
     </table>
     <p style="font-size:13px;line-height:1.7;color:#33474F;margin-top:18px;">If anything changes, reply to this email or message us on WhatsApp at ${site.phoneDisplay}.</p>`,
  );

  try {
    await Promise.all([
      transport.sendMail({
        from: fromAddress(),
        to: inboxAddress(),
        replyTo: quote.email,
        subject: `Quote ${quote.reference} · ${quote.county} · ${quote.propertyType}`,
        html: internal,
      }),
      transport.sendMail({
        from: fromAddress(),
        to: quote.email,
        subject: `Your Elisha Solar quote reference ${quote.reference}`,
        html: customer,
      }),
    ]);
    return { delivered: true };
  } catch (error) {
    console.error("Quote email failed", error);
    return { delivered: false, reason: "smtp-send-failed" };
  }
}

export async function sendContactEmail(input: ContactInput): Promise<SendResult> {
  const transport = getTransport();
  if (!transport) {
    console.warn("SMTP is not configured. Contact message was not emailed.");
    return { delivered: false, reason: "smtp-not-configured" };
  }

  const html = shell(
    `New contact message · ${input.topic}`,
    `<table style="width:100%;border-collapse:collapse;">
      ${row("Name", input.name)}
      ${row("Phone", input.phone)}
      ${row("Email", input.email)}
      ${row("Topic", input.topic)}
    </table>
    <p style="margin:18px 0 0;font-size:14px;line-height:1.7;color:#33474F;">${input.message}</p>`,
  );

  try {
    await transport.sendMail({
      from: fromAddress(),
      to: inboxAddress(),
      replyTo: input.email,
      subject: `Website enquiry · ${input.topic} · ${input.name}`,
      html,
    });
    return { delivered: true };
  } catch (error) {
    console.error("Contact email failed", error);
    return { delivered: false, reason: "smtp-send-failed" };
  }
}
