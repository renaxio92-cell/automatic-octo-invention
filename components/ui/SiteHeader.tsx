import Link from "next/link";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Jawara Video";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-text transition-opacity hover:opacity-80"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-surface shadow-[0_0_20px_rgba(255,26,117,0.3)]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                d="M3 6L7 10L12 4L17 10L21 6V16C21 17.1046 20.1046 18 19 18H5C3.89543 18 3 17.1046 3 16V6Z"
                fill="var(--color-accent)"
              />
              <path d="M10 10L15 13L10 16V10Z" fill="white" />
            </svg>
          </div>
          <span className="truncate">{siteName}</span>
        </Link>
      </div>
    </header>
  );
}
