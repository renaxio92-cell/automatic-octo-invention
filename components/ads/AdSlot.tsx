"use client";

import { useEffect, useRef } from "react";

type AdPosition = "header" | "player" | "footer";

const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";

const CODES: Record<AdPosition, string> = {
  header: process.env.NEXT_PUBLIC_ADS_HEADER_CODE ?? "",
  player: process.env.NEXT_PUBLIC_ADS_PLAYER_CODE ?? "",
  footer: process.env.NEXT_PUBLIC_ADS_FOOTER_CODE ?? "",
};

interface AdSlotProps {
  position: AdPosition;
  className?: string;
}

export function AdSlot({ position, className }: AdSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const code = ADS_ENABLED ? CODES[position] : "";

  useEffect(() => {
    const container = ref.current;
    if (!container || !code) return;

    container.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = code;
    Array.from(template.content.childNodes).forEach((node) => {
      if (node.nodeName === "SCRIPT") {
        const original = node as HTMLScriptElement;
        const script = document.createElement("script");
        for (const attr of Array.from(original.attributes)) {
          script.setAttribute(attr.name, attr.value);
        }
        script.text = original.text;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });
    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  if (!code) return null;

  return (
    <div
      ref={ref}
      role="complementary"
      aria-label={`Iklan ${position}`}
      className={
        className ??
        "my-4 flex min-h-[90px] w-full items-center justify-center overflow-hidden rounded-lg"
      }
    />
  );
}
