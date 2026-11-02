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
        inzofin: {
          navy: '#0c1e36',
          'navy-dark': '#071224',
          'navy-light': '#152c4e',
          gold: '#f5a623',
          'gold-dark': '#d98e0b',
          'gold-light': '#fef3c7',
          blue: '#1b68b3',
          'blue-dark': '#134e85',
          'blue-light': '#e8f2fc',
          gray: '#f7f9fc',
        },
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          500: '#f5a623',
          600: '#e5a010',
          700: '#d98e0b',
          800: '#b45309',
        },
        navy: {
          800: '#152c4e',
          900: '#0c1e36',
          950: '#071224',
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
      },
    },
  },
  plugins: [],
};
export default config;
