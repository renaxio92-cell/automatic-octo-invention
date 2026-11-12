import type { Metadata } from "next";
import { videoIdSchema } from "@/schemas/video.schema";

export function buildPageMetadata(id: string): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const siteName =
    process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";
  const ogPath = process.env.NEXT_PUBLIC_OG_IMAGE_PATH ?? "/images/og-default.jpg";

  const metadataBase = new URL(siteUrl || "https://example.com");
  const valid = videoIdSchema.safeParse(id).success;

  if (!valid) {
    return {
      metadataBase,
      title: "Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${id}.mp4`;
  const description = `Tonton video ${id} di ${siteName}.`;
  const canonicalPath = `/v/${encodeURIComponent(id)}`;
  const ogImageUrl = new URL(ogPath, metadataBase).toString();
  const absoluteUrl = new URL(canonicalPath, metadataBase).toString();

  return {
    metadataBase,
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "video.other",
      url: absoluteUrl,
      siteName,
      locale: "id_ID",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
