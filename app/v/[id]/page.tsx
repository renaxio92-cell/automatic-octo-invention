import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { videoIdSchema } from "@/schemas/video.schema";
import { getVideoById } from "@/lib/video/repository";
import { buildPageMetadata } from "@/lib/metadata/page-metadata";
import {
  CAPTCHA_COOKIE_NAME,
  verifyCaptchaSession,
} from "@/lib/captcha/session";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { CaptchaGate } from "@/components/captcha/CaptchaGate";
import { AdSlot } from "@/components/ads/AdSlot";
import { MetadataBadges } from "@/components/ui/MetadataBadges";
import { LikeButton } from "@/components/ui/LikeButton";
import { ShareButton } from "@/components/ui/ShareButton";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  return buildPageMetadata(id);
}

export default async function VideoPage({ params }: PageProps) {
  const { id } = await params;
  const parsed = videoIdSchema.safeParse(id);
  if (!parsed.success) notFound();

  const data = getVideoById(parsed.data);
  if (!data) notFound();

  const captchaEnabled = process.env.RECAPTCHA_ENABLED === "true";
  const cookieStore = await cookies();
  const captchaOk =
    !captchaEnabled ||
    verifyCaptchaSession(cookieStore.get(CAPTCHA_COOKIE_NAME)?.value);

  const displayTitle = `${data.video.id}.mp4`;
  const sharePath = `/v/${encodeURIComponent(data.video.id)}`;

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 md:py-10">
        <AdSlot position="header" />

        <section className="mt-4" aria-label="Video player">
          {captchaOk ? (
            <VideoPlayer
              videoId={data.video.id}
              embedUrl={data.video.embedUrl}
            />
          ) : (
            <CaptchaGate
              siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
            />
          )}
        </section>

        <section className="mt-4 flex flex-col gap-3 md:mt-5 md:flex-row md:items-center md:justify-between">
          <h1 className="truncate text-base font-medium md:text-lg">
            {displayTitle}
          </h1>
          <div className="flex items-center gap-2">
            <LikeButton videoId={data.video.id} />
            <ShareButton url={sharePath} title={displayTitle} />
          </div>
        </section>

        <section className="mt-4">
          <MetadataBadges metadata={data.metadata} />
        </section>

        <div className="mt-6">
          <AdSlot position="player" />
        </div>
      </main>

      <AdSlot position="footer" />
      <SiteFooter />
    </div>
  );
}
