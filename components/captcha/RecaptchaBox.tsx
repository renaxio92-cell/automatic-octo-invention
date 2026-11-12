"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

interface Grecaptcha {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    }
  ) => number;
  reset: (widgetId?: number) => void;
}

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

interface RecaptchaBoxProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onExpired?: () => void;
}

export function RecaptchaBox({
  siteKey,
  onSuccess,
  onExpired,
}: RecaptchaBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  const handleSuccess = useCallback(
    (token: string) => onSuccess(token),
    [onSuccess]
  );

  const handleExpired = useCallback(() => {
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
    onExpired?.();
  }, [onExpired]);

  useEffect(() => {
    if (!scriptReady) return;
    if (!containerRef.current) return;
    if (!window.grecaptcha) return;
    if (widgetIdRef.current !== null) return;
    if (!siteKey) return;

    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      callback: handleSuccess,
      "expired-callback": handleExpired,
    });
  }, [scriptReady, siteKey, handleSuccess, handleExpired]);

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="inline-block" />
    </>
  );
}
