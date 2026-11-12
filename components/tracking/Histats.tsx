"use client";

import { useEffect, useRef } from "react";

const TRACKING_ENABLED = process.env.NEXT_PUBLIC_TRACKING_ENABLED === "true";
const CODE = process.env.NEXT_PUBLIC_HISTATS_CODE ?? "";

export function Histats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!TRACKING_ENABLED || !CODE || !container) return;
    container.innerHTML = "";
    const template = document.createElement("template");
    template.innerHTML = CODE;
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
  }, []);

  if (!TRACKING_ENABLED || !CODE) return null;
  return <div ref={ref} aria-hidden="true" />;
}
