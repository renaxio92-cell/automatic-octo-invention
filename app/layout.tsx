import type { Metadata } from "next";
import "./globals.css";
import { Histats } from "@/components/tracking/Histats";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Personal Video Streaming";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: "%s" },
  description: "Personal video streaming.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="min-h-dvh antialiased">
        {children}
        <Histats />
      </body>
    </html>
  );
}
