import type { Metadata } from "next";
// Pastikan Noto_Naskh_Arabic diimpor dari next/font/google
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
// Pastikan baris ini ada dan benar
const notoNaskh = Noto_Naskh_Arabic({ 
  subsets: ["arabic"], 
  weight: "400", 
  variable: '--font-quran' 
});

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
    // Pastikan variabel ${notoNaskh.variable} ditambahkan di sini
    <html lang="id" className={`${inter.variable} ${notoNaskh.variable}`}>
      <body>{children}</body>
    </html>
  );
}