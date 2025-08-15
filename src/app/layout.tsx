// Lokasi: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics"; // Pastikan Analytics diimpor

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoNaskh = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: "400", variable: '--font-quran' });

export const metadata: Metadata = {
  title: "Ayat Pilihan",
  description: "Temukan petunjuk dan ketenangan dalam Al-Qur'an.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${notoNaskh.variable}`}>
      <body>
        <Toaster position="top-center" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
