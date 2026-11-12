import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRecaptchaToken } from "@/lib/captcha/verify";
import {
  CAPTCHA_COOKIE_NAME,
  captchaCookieOptions,
  createCaptchaSession,
} from "@/lib/captcha/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (process.env.RECAPTCHA_ENABLED !== "true") {
    return NextResponse.json({ ok: true });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const token =
    typeof payload === "object" && payload !== null
      ? (payload as { token?: unknown }).token
      : undefined;

  if (typeof token !== "string" || token.length === 0) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const result = await verifyRecaptchaToken(token);
  if (!result.ok) {
    return NextResponse.json(
      { error: "Verifikasi CAPTCHA gagal" },
      { status: 400 }
    );
  }

  const sessionValue = createCaptchaSession();
  if (!sessionValue) {
    console.error("[captcha] CAPTCHA_SESSION_SECRET missing");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(
    CAPTCHA_COOKIE_NAME,
    sessionValue,
    captchaCookieOptions()
  );

  return NextResponse.json({ ok: true });
}
