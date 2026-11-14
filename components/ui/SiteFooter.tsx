import Link from "next/link";

const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Jawara Video";
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-transparent py-8">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 px-4 text-sm font-medium text-muted md:flex-row md:px-6">
        <p>
          © {year} {siteName}
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Home
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-accent">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-accent">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
