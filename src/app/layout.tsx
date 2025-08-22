// Lokasi: src/app/layout.tsx

import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics";
import Link from "next/link";

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
      {/* --- PERUBAHAN #1: Warna latar belakang & teks default di body --- */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gading text-abu`}>
        <Toaster position="top-center" />

        <main className="flex-grow flex items-center justify-center p-4 pb-28">
          {children}
        </main>

        {/* --- PERUBAHAN #2: Styling footer disesuaikan dengan tema baru --- */}
        <footer className="fixed bottom-0 left-0 w-full z-50 text-sm border-t border-black/10">
          <div className="max-w-4xl mx-auto py-4 px-4">
            <div className="flex justify-center space-x-4 mb-2">
              {/* --- PERUBAHAN #3: Warna hover pada link diubah menjadi emas --- */}
              <Link href="/panduan" className="underline hover:text-emas transition-colors">Panduan</Link>
              <Link href="/dukung" className="underline hover:text-emas transition-colors">Dukung Kami</Link>
              <Link href="/privasi" className="underline hover:text-emas transition-colors">Privasi</Link>
              <Link href="/kontak" className="underline hover:text-emas transition-colors">Hubungi Kami</Link>
            </div>
            <p className="text-center text-xs opacity-75">
              © 2025 Ayat Pilihan - Sebuah Proyek oleh GodSpeed-Studio
            </p>
          </div>
        </footer>
        
        <Analytics />
      </body>
    </html>
  );
}