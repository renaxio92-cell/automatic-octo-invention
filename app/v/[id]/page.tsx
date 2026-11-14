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

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 md:py-8">
        <AdSlot position="header" />

        <section className="mt-2" aria-label="Video player">
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

        <section className="mt-6">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {displayTitle}
          </h1>
        </section>

        <section className="mt-4">
          <MetadataBadges metadata={data.metadata} />
        </section>

        <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-text">Bagikan video ini</span>
          </div>
          <div className="flex items-center gap-3">
            <LikeButton videoId={data.video.id} />
            <ShareButton url={sharePath} title={displayTitle} />
          </div>
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
