# Personal Video Streaming Website

Satu URL untuk satu video. Pemutar via iframe. Data dari JSON statis. Tanpa database.

## Stack
- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript strict, Tailwind CSS v4
- Zod, Lucide React
- Google reCAPTCHA v2 Checkbox, Adsterra, Histats (via env var)

## Setup Lokal
```bash
# 1. Install dependency (Node 24 LTS)
npm install

# 2. Salin env
cp .env.example .env.local
# Edit .env.local sesuai kebutuhan

# 3. Isi data/simulation-pool.json dengan kombinasi metadata Anda
#    (lihat format di file tersebut)

# 4. Jalankan assignment metadata (idempotent)
npm run assign-metadata

# 5. Validasi data
npm run validate-data

# 6. Dev server
npm run dev
```



Bagian ini belum diimplementasikan penuh karena informasi belum tersedia. Sesuaikan setelah input diberikan:

☐ Gambar OG — letakkan di public/images/og-default.jpg (1200×630). Ganti path via NEXT_PUBLIC_OG_IMAGE_PATH.
☐ Pool metadata endpoint Google — tidak mempercayai hasil verifikasi browser-inline' dan 'unsafe-eval' karena:

1. Next.js App Router .ts. 
4. Deploy.

Tidak ada GitHub Actions, CI/CD otomatis, atau push otomatis dalam proyek ini.

Struktur Folder

Lihat Master Prompt bagian 17. Struktur aktual mengikuti spesifikasi tersebut.

```
