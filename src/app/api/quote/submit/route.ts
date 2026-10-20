import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations";
import { calculateSavings } from "@/lib/savings";
import { createQuoteReference } from "@/lib/quote-reference";
import { saveQuote } from "@/lib/quote-store";
import { sendQuoteEmails } from "@/lib/mailer";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join(".") || "form",
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const forwardedFor = request.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();

  const captcha = await verifyRecaptcha(data.recaptchaToken, "quote_submit", remoteIp);
  if (!captcha.success) {
    return NextResponse.json(
      {
        error: "reCAPTCHA verification failed",
        code: captcha.requiresChallenge ? "recaptcha_challenge" : "recaptcha_failed",
        score: captcha.score,
      },
      { status: 400 },
    );
  }

  const reference = createQuoteReference();
  const estimate = calculateSavings(data.monthlyBill);

  const quote = {
    reference,
    createdAt: new Date().toISOString(),
    status: "received" as const,
    propertyType: data.propertyType,
    monthlyBill: data.monthlyBill,
    county: data.county,
    facilitySize: data.facilitySize,
    contactMethod: data.contactMethod,
    name: data.name,
    email: data.email,
    phone: data.phone,
    notes: data.notes,
    estimatedSystemSizeKw: estimate.systemSizeKw,
    estimatedCostKes: estimate.estimatedCost,
    estimatedMonthlySavingKes: estimate.monthlySavings,
  };

  await saveQuote(quote);
  const mail = await sendQuoteEmails(quote);

  return NextResponse.json(
    {
      ok: true,
      reference,
      emailDelivered: mail.delivered,
      captchaSkipped: captcha.skipped,
      summary: {
        propertyType: quote.propertyType,
        county: quote.county,
        monthlyBill: quote.monthlyBill,
        facilitySize: quote.facilitySize,
        contactMethod: quote.contactMethod,
        name: quote.name,
        phone: quote.phone,
        email: quote.email,
        estimatedSystemSizeKw: quote.estimatedSystemSizeKw,
        estimatedCostKes: quote.estimatedCostKes,
        estimatedMonthlySavingKes: quote.estimatedMonthlySavingKes,
      },
      nextStep: "An engineer will call within 24 hours to book your free site assessment.",
    },
    { status: 201 },
  );
}
