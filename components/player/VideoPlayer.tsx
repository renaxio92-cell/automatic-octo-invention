interface VideoPlayerProps {
  videoId: string;
  embedUrl: string;
}

export function VideoPlayer({ videoId, embedUrl }: VideoPlayerProps) {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-border/50 bg-black shadow-[0_0_40px_rgba(255,26,117,0.15)] ring-1 ring-white/10">
      <iframe
        src={embedUrl}
        title={`Pemutar Video ${videoId}`}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
