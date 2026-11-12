import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-6">
      <div className="text-center">
        <p className="text-5xl font-bold tracking-tight">404</p>
        <h1 className="mt-3 text-lg font-medium">Video tidak ditemukan</h1>
        <p className="mt-2 text-sm text-[--color-muted]">
          ID video tidak valid atau tidak tersedia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-lg border border-[--color-border] bg-[--color-surface] px-4 py-2 text-sm hover:bg-[--color-surface-2]"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
