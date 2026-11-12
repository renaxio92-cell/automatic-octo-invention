import Link from "next/link";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Personal Video Streaming
        </h1>
        <p className="mt-3 max-w-md text-sm text-[--color-muted]">
          Halaman ini tidak menampilkan katalog. Buka video melalui URL{" "}
          <code className="rounded bg-[--color-surface-2] px-1.5 py-0.5 text-xs">
            /v/&lt;id&gt;
          </code>
          .
        </p>
        <Link
          href="/v/123"
          className="mt-6 inline-flex items-center rounded-lg border border-[--color-border] bg-[--color-surface] px-4 py-2 text-sm hover:bg-[--color-surface-2]"
        >
          Contoh: /v/123
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
