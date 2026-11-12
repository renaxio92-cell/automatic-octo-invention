import Link from "next/link";
import { PlaySquare } from "lucide-react";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white"
        >
          <PlaySquare
            className="h-6 w-6 text-accent"
            fill="currentColor"
            aria-hidden="true"
          />
          <span className="truncate">{siteName}</span>
        </Link>
      </div>
    </header>
  );
}
