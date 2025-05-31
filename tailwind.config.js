/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0f9f1',
          100: '#dcf0e0',
          200: '#bbe0c3',
          300: '#92ca9e',
          400: '#68b077',
          500: '#4D7C5F', // Primary green
          600: '#3a6e4b',
          700: '#2f5b3d',
          800: '#274832',
          900: '#1a301f',
        },
        cream: {
          50: '#F9F5EC', // Light cream background
          100: '#f3edd8',
          200: '#e7d8b3',
          300: '#d9be85',
          400: '#cca762',
          500: '#c08f46',
          600: '#a77538',
          700: '#86592e',
          800: '#6b4729',
          900: '#583a24',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};