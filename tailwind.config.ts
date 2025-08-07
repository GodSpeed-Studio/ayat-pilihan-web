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
      // Kita definisikan ulang warna di sini agar 100% solid
      colors: {
        'custom-blue-600': '#2563EB',
        'custom-blue-700': '#1D4ED8',
        'custom-green-500': '#22C55E',
        'custom-green-600': '#16A34A',
        'custom-gray': {
          50: '#F9FAFB',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
        },
      },
      fontFamily: {
        quran: ['var(--font-quran)'],
      },
    },
  },
  plugins: [],
};
export default config;