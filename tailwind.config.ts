import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Pastikan bagian fontFamily ini ada
      fontFamily: {
        quran: ['var(--font-quran)'],
      },
    },
  },
  plugins: [],
};
export default config;