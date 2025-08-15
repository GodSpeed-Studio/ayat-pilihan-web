// Lokasi: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics";

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
      <body className="flex flex-col min-h-screen">
        <Toaster position="top-center" />

        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>

        {/* Footer dipastikan selalu berwarna terang */}
        <footer className="w-full text-sm bg-white text-gray-600">
          <div className="max-w-4xl mx-auto py-4 px-4">
            <div className="flex justify-center space-x-4 mb-2">
              <a href="#" className="underline hover:text-blue-600">Panduan</a>
              <a href="#" className="underline hover:text-blue-600">Dukungan</a>
              <a href="#" className="underline hover:text-blue-600">Privasi</a>
              <a href="#" className="underline hover:text-blue-600">Hubungi Kami</a>
            </div>
            <p className="text-center">
              © 2025 Ayat Pilihan - Sebuah Proyek oleh GodSpeed-Studio
            </p>
          </div>
        </footer>
        
        <Analytics />
      </body>
    </html>
  );
}