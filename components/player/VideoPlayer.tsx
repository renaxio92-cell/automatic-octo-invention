interface VideoPlayerProps {
  videoId: string;
  embedUrl: string;
}

export function VideoPlayer({ videoId, embedUrl }: VideoPlayerProps) {
  return (
    <div className="w-full aspect-[5/4] overflow-hidden rounded-xl border border-border bg-black">
      <iframe
        src={embedUrl}
        title={`Pemutar Video ${videoId}`}
        className="w-full h-full border-0"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
