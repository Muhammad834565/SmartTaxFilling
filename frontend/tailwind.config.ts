import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#2DC55F', // Primary Vibrant Green
          600: '#23a54e',
          700: '#1c843e',
          800: '#176933',
          900: '#14532b',
        },
        emerald: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#2DC55F', // Override emerald-500 with #2DC55F
          600: '#23a54e',
          700: '#1c843e',
          800: '#176933',
          900: '#14532b',
        },
        inzofin: {
          navy: '#0c1a2e',
          'navy-dark': '#07101e',
          'navy-light': '#10223b',
          green: '#2DC55F',
          'green-dark': '#23a54e',
          'green-light': '#dcfce7',
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen-Sans',
          'Ubuntu',
          'Cantarell',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        heading: [
          '"Space Grotesk"',
          '"Plus Jakarta Sans"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};

export default config;
