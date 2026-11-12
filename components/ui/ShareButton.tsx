"use client";

import { Check, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  url: string;
  title: string;
}

export function ShareButton({ url, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleClick() {
    if (busy) return;
    setBusy(true);
    const fullUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}${url}`;
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (
          navigator as Navigator & {
            share: (data: { title?: string; url?: string }) => Promise<void>;
          }
        ).share({ title, url: fullUrl });
        return;
      }
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User cancelled share or clipboard failed — no-op
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-live="polite"
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[--color-border] bg-[--color-surface] px-3 text-sm transition-colors hover:bg-[--color-surface-2] active:scale-[0.98] disabled:opacity-60"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-400" aria-hidden="true" />
          <span>Tersalin</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" aria-hidden="true" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
