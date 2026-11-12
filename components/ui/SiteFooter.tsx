import Link from "next/link";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted md:flex-row">
        <p>
          © {year} {siteName}
        </p>
        <div className="flex gap-4">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
