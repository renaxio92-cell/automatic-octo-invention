import Link from "next/link";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[--color-border] py-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 text-sm text-[--color-muted] md:flex-row">
        <p>
          © {year} {siteName}
        </p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span className="cursor-default hover:text-white transition-colors">
            Terms
          </span>
          <span className="cursor-default hover:text-white transition-colors">
            Contact
          </span>
        </div>
      </div>
    </footer>
  );
}
