"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface LikeButtonProps {
  videoId: string;
}

export function LikeButton({ videoId }: LikeButtonProps) {
  const storageKey = `liked:${videoId}`;
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setLiked(window.localStorage.getItem(storageKey) === "1");
    } catch {}
  }, [storageKey]);

  function toggle() {
    const next = !liked;
    setLiked(next);
    try {
      if (next) window.localStorage.setItem(storageKey, "1");
      else window.localStorage.removeItem(storageKey);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? liked : undefined}
      className={`inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all active:scale-[0.98] ${
        liked
          ? "bg-accent text-white hover:bg-accent-hover border border-accent"
          : "border border-border bg-surface-2 text-text hover:bg-border"
      }`}
    >
      <Heart
        className={`h-4 w-4 ${liked ? "fill-white text-white" : ""}`}
        aria-hidden="true"
      />
      <span>{liked ? "Liked" : "Like"}</span>
    </button>
  );
}
