import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const metadata = {
  title: "Terms of Service",
  description: "Syarat dan ketentuan penggunaan layanan.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:py-16">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Terms of Service
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[--color-muted]">
          <p>
            Selamat datang di layanan kami. Dengan mengakses dan menggunakan
            situs web ini, Anda menyetujui syarat dan ketentuan berikut.
          </p>
          <h2 className="mt-8 text-base font-semibold text-white">
            1. Penggunaan Layanan
          </h2>
          <p>
            Situs ini disediakan untuk tujuan menonton video secara personal.
            Anda dilarang menggunakan situs ini untuk aktivitas yang melanggar
            hukum atau merugikan pihak lain.
          </p>
          <h2 className="mt-8 text-base font-semibold text-white">
            2. Hak Cipta dan Sumber Konten
          </h2>
          <p>
            Seluruh video diputar menggunakan <em>iframe</em> dari penyedia pihak
            ketiga. Kami tidak meng-host file video secara langsung. Hak cipta
            sepenuhnya milik penyedia atau pemilik asli konten.
          </p>
          <h2 className="mt-8 text-base font-semibold text-white">
            3. Batasan Tanggung Jawab
          </h2>
          <p>
            Kami tidak bertanggung jawab atas gangguan layanan, tautan yang
            rusak, atau pemblokiran yang dilakukan oleh penyedia video pihak
            ketiga.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
