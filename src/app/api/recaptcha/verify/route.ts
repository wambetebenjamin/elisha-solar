import { NextResponse } from "next/server";
import { recaptchaVerifySchema } from "@/lib/validations";
import { recaptchaThreshold, verifyRecaptcha } from "@/lib/recaptcha";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = recaptchaVerifySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const remoteIp = forwardedFor?.split(",")[0]?.trim();
  const outcome = await verifyRecaptcha(
    parsed.data.token,
    parsed.data.action ?? "default",
    remoteIp,
  );

  return NextResponse.json(
    {
      success: outcome.success,
      score: outcome.score ?? null,
      action: outcome.action ?? null,
      threshold: recaptchaThreshold,
      skipped: outcome.skipped,
      requiresChallenge: outcome.requiresChallenge,
      errorCodes: outcome.errorCodes ?? [],
    },
    { status: outcome.success ? 200 : 400 },
  );
}
