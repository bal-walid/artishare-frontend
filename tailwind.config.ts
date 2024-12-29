import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair-sc)', 'serif'],
        'display-secondary': ['var(--font-playfair)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      },
      colors: {
        main: '#d3506a',
        'hero-bg': '#F7F4ED',
      }
    },
  },
  plugins: [],
} satisfies Config;
