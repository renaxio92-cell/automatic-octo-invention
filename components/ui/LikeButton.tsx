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
    } catch {
      // ignore storage errors
    }
  }, [storageKey]);

  function toggle() {
    const next = !liked;
    setLiked(next);
    try {
      if (next) window.localStorage.setItem(storageKey, "1");
      else window.localStorage.removeItem(storageKey);
    } catch {
      // ignore storage errors
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mounted ? liked : undefined}
      className="inline-flex h-9 items-center gap-2 rounded-lg border border-[--color-border] bg-[--color-surface] px-3 text-sm transition-colors hover:bg-[--color-surface-2] active:scale-[0.98]"
    >
      <Heart
        className={`h-4 w-4 ${liked ? "text-[--color-accent]" : ""}`}
        fill={liked ? "currentColor" : "none"}
        aria-hidden="true"
      />
      <span>{liked ? "Liked" : "Like"}</span>
    </button>
  );
}
