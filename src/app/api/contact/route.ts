import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/mailer";
import { verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
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

  const forwardedFor = request.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();
  const captcha = await verifyRecaptcha(parsed.data.recaptchaToken, "contact_submit", remoteIp);

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

  const mail = await sendContactEmail(parsed.data);

  return NextResponse.json(
    {
      ok: true,
      emailDelivered: mail.delivered,
      captchaSkipped: captcha.skipped,
      message: "Thank you. Our team replies to enquiries within one working day.",
    },
    { status: 201 },
  );
}
