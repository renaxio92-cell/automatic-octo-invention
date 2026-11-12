const siteName =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";
const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[--color-border] py-6">
      <div className="mx-auto w-full max-w-5xl px-4 text-center text-xs text-[--color-muted]">
        © {year} {siteName}
      </div>
    </footer>
  );
}
