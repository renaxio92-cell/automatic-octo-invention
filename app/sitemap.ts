import type { MetadataRoute } from "next";
import videosJson from "@/data/videos.json";
import { videosFileSchema } from "@/schemas/video.schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const parsed = videosFileSchema.safeParse(videosJson);
  if (!parsed.success) return [];
  return parsed.data.map((v) => ({
    url: `${baseUrl}/v/${encodeURIComponent(v.id)}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
}
