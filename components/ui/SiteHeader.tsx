import Link from "next/link";
import { Clapperboard } from "lucide-react";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-[--color-border] bg-[--color-bg]/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Clapperboard
            className="h-4 w-4 text-[--color-accent]"
            aria-hidden="true"
          />
          <span className="truncate">{siteName}</span>
        </Link>
      </div>
    </header>
  );
}
