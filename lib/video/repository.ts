import "server-only";
import { cache } from "react";
import videosJson from "@/data/videos.json";
import displayMetadataJson from "@/data/video-display-metadata.json";
import {
  videosFileSchema,
  videoDisplayMetadataFileSchema,
  type DisplayMetadata,
  type VideoEntry,
} from "@/schemas/video.schema";

export interface VideoLookup {
  video: VideoEntry;
  metadata: DisplayMetadata | null;
}

export const getVideoById = cache((id: string): VideoLookup | null => {
  const videosParsed = videosFileSchema.safeParse(videosJson);
  if (!videosParsed.success) {
    console.error("[repository] videos.json invalid:", videosParsed.error.issues);
    return null;
  }
  const video = videosParsed.data.find((v) => v.id === id);
  if (!video) return null;

  const metaParsed = videoDisplayMetadataFileSchema.safeParse(displayMetadataJson);
  const metadata =
    metaParsed.success
      ? metaParsed.data.find((m) => m.id === id)?.metadata ?? null
      : null;

  return { video, metadata };
});
