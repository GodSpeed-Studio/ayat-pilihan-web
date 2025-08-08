// File: src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: &apos;Ayat Pilihan&apos;,
  description: &apos;Temukan petunjuk dan ketenangan dalam Al-Qur&apos;an.&apos;, // Perbaikan di sini
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}