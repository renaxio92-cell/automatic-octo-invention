"use client";

import { useCallback, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { RecaptchaBox } from "./RecaptchaBox";

interface CaptchaGateProps {
  siteKey: string;
}

export function CaptchaGate({ siteKey }: CaptchaGateProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToken = useCallback(async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/captcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Verifikasi CAPTCHA gagal.");
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verifikasi gagal.");
      setLoading(false);
    }
  }, []);

  return (
    <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface] px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(239,68,68,0.08),transparent_60%)]" />
      <ShieldCheck
        className="h-8 w-8 text-[--color-accent]"
        aria-hidden="true"
      />
      <div>
        <h2 className="text-base font-medium">
          Verifikasi untuk memutar video
        </h2>
        <p className="mt-1 text-sm text-[--color-muted]">
          Selesaikan CAPTCHA di bawah untuk melanjutkan.
        </p>
      </div>

      {siteKey ? (
        <RecaptchaBox
          siteKey={siteKey}
          onSuccess={handleToken}
          onExpired={() => setError("CAPTCHA kedaluwarsa. Silakan ulangi.")}
        />
      ) : (
        <p className="text-sm text-red-400">
          Konfigurasi reCAPTCHA belum tersedia.
        </p>
      )}

      {loading && (
        <p className="inline-flex items-center gap-2 text-sm text-[--color-muted]">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Memverifikasi…
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
