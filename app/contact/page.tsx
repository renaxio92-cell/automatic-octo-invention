import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Hubungi kami.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 md:py-16">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Contact Us
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-[--color-muted]">
          Jika Anda memiliki pertanyaan, masalah terkait tautan video, atau
          ingin mengajukan penghapusan konten, silakan hubungi kami melalui
          email di bawah ini:
        </p>

        <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-[--color-border] bg-[--color-surface] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[--color-surface-2]">
            <Mail className="h-5 w-5 text-[--color-accent]" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Email Support</p>
            {/* Ganti email di bawah ini dengan email Anda yang sebenarnya */}
            <a
              href="mailto:admin@example.com"
              className="text-sm text-[--color-accent] hover:underline"
            >
              admin@example.com
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
