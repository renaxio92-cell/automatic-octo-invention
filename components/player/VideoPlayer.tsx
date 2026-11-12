"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

interface VideoPlayerProps {
  videoId: string;
  embedUrl: string;
}

export function VideoPlayer({ videoId, embedUrl }: VideoPlayerProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[--color-border] bg-black">
      {!loaded && !failed && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2
            className="h-6 w-6 animate-spin text-white/60"
            aria-hidden="true"
          />
          <span className="sr-only">Memuat pemutar video…</span>
        </div>
      )}

      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
          <AlertCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
          <p className="text-sm text-white/80">
            Video tidak dapat dimuat. Coba muat ulang halaman.
          </p>
        </div>
      ) : (
        <iframe
          src={embedUrl}
          title={`Pemutar video ${videoId}`}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full border-0"
        />
      )}
    </div>
  );
}
