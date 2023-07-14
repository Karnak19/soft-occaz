/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)'],
        roboto: ['var(--font-roboto)'],
      },
      width: {
        1080: 'min(1080px, 100%)',
        800: 'min(800px, 100%)',
      },
      colors: {
        rg: { DEFAULT: '#5a7161', 400: '#6C8874', light: '#aabaaf', lightest: '#e2e8e4', dark: '#4a5a49', darkest: '#2d3830' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')],
};
