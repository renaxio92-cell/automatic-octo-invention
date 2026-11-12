import "server-only";
import { cache } from "react";
import { createHash } from "node:crypto";
import videosJson from "@/data/videos.json";
import simulationPoolJson from "@/data/simulation-pool.json";
import {
  videosFileSchema,
  simulationPoolFileSchema,
  type DisplayMetadata,
  type VideoEntry,
} from "@/schemas/video.schema";

export interface VideoLookup {
  video: VideoEntry;
  metadata: DisplayMetadata | null;
}

/**
 * Pilih metadata dari pool secara deterministik berdasarkan hash SHA-256 dari ID.
 * Konsisten lintas reload & deploy tanpa perlu file assignment atau script manual.
 */
function pickMetadata(
  id: string,
  pool: DisplayMetadata[]
): DisplayMetadata | null {
  if (pool.length === 0) return null;
  const hash = createHash("sha256").update(id).digest();
  const index = hash.readUInt32BE(0) % pool.length;
  return pool[index];
}

export const getVideoById = cache((id: string): VideoLookup | null => {
  const videosParsed = videosFileSchema.safeParse(videosJson);
  if (!videosParsed.success) {
    console.error("[repository] videos.json invalid:", videosParsed.error.issues);
    return null;
  }
  const video = videosParsed.data.find((v) => v.id === id);
  if (!video) return null;

  const poolParsed = simulationPoolFileSchema.safeParse(simulationPoolJson);
  const metadata = poolParsed.success
    ? pickMetadata(id, poolParsed.data)
    : null;

  return { video, metadata };
});
