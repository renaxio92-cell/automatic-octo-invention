import "server-only";

interface SiteVerifyResponse {
  success?: boolean;
}

export async function verifyRecaptchaToken(
  token: string
): Promise<{ ok: boolean }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error("[captcha] RECAPTCHA_SECRET_KEY is not configured");
    return { ok: false };
  }
  try {
    const body = new URLSearchParams({ secret, response: token }).toString();
    const res = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        cache: "no-store",
      }
    );
    if (!res.ok) return { ok: false };
    const data = (await res.json()) as SiteVerifyResponse;
    return { ok: data.success === true };
  } catch (err) {
    console.error("[captcha] verification error", err);
    return { ok: false };
  }
}
