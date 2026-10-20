export type RecaptchaOutcome = {
  success: boolean;
  score?: number;
  action?: string;
  skipped: boolean;
  requiresChallenge: boolean;
  errorCodes?: string[];
};

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

/**
 * Verifies a reCAPTCHA v3 token server side. The secret never reaches the client.
 * If no secret is configured (local preview without keys), the request is allowed
 * but flagged as skipped so the API response can say so.
 */
export async function verifyRecaptcha(
  token: string | undefined,
  expectedAction: string,
  remoteIp?: string,
): Promise<RecaptchaOutcome> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return {
      success: true,
      skipped: true,
      requiresChallenge: false,
      score: undefined,
    };
  }

  if (!token) {
    return {
      success: false,
      skipped: false,
      requiresChallenge: true,
      errorCodes: ["missing-input-response"],
    };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        success: false,
        skipped: false,
        requiresChallenge: true,
        errorCodes: [`verify-http-${response.status}`],
      };
    }

    const payload = (await response.json()) as {
      success: boolean;
      score?: number;
      action?: string;
      "error-codes"?: string[];
    };

    const actionMatches = !payload.action || payload.action === expectedAction;
    const score = payload.score ?? 0;
    const passed = Boolean(payload.success) && actionMatches && score >= SCORE_THRESHOLD;

    return {
      success: passed,
      score,
      action: payload.action,
      skipped: false,
      // Anything below the threshold, or any failure, drops the user to the
      // visible v2 checkbox challenge.
      requiresChallenge: !passed,
      errorCodes: payload["error-codes"],
    };
  } catch (error) {
    console.error("reCAPTCHA verification failed", error);
    return {
      success: false,
      skipped: false,
      requiresChallenge: true,
      errorCodes: ["verify-network-error"],
    };
  }
}

export const recaptchaThreshold = SCORE_THRESHOLD;
