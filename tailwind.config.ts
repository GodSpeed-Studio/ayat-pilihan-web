// Lokasi: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gading: '#F8F6F1',
        abu: '#333333',
        hijau: {
          DEFAULT: '#2E7D32'
        },
        emas: {
          DEFAULT: '#B8860B'
        }
      },
      fontFamily: {
        quran: ['var(--font-quran)'],
      },
    },
  },
  plugins: [], // Kita bisa hapus typography untuk sementara agar lebih simpel
};
export default config;