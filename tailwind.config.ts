// Lokasi: tailwind.config.ts (di folder utama)

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quran: ['var(--font-quran)'],
      },
      // --- PERUBAHAN #1: Menambahkan palet warna kustom di sini ---
      colors: {
        gading: '#F8F6F1',      // Putih Gading
        abu: '#333333',         // Abu-abu Gelap
        hijau: {
          DEFAULT: '#2E7D32'   // Hijau Teduh (utama)
        },
        emas: {
          DEFAULT: '#B8860B'   // Emas Lembut (sekunder)
        }
      },
    },
  },
  // Tambahkan baris require di sini
  plugins: [require('@tailwindcss/typography')], 
};
export default config;