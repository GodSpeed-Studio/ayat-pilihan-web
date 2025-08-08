// File: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Kita timpa (override) warna default dengan versi solid (hex code)
      // agar tidak ada lagi masalah transparansi.
      colors: {
        gray: {
          50: '#F9FAFB',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
        },
        blue: {
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
        },
        green: {
          500: '#22C55E',
          600: '#16A34A',
        },
      },
      fontFamily: {
        quran: ['var(--font-quran)'],
      },
    },
  },
  plugins: [
  require('@tailwindcss/typography'),
};
export default config;