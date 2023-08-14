/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.tsx',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
  ],
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
        rg: {
          50: '#f6f7f6',
          100: '#e0e7e1',
          200: '#c1cec4',
          300: '#9aae9f',
          400: '#758c7c',
          500: '#5a7161',
          600: '#475a4d',
          700: '#3b4a40',
          800: '#323d36',
          900: '#2c352f',
          950: '#161d18',
        },
        // rg: { DEFAULT: '#5a7161', 400: '#6C8874', light: '#aabaaf', lightest: '#e2e8e4', dark: '#4a5a49', darkest: '#2d3830' },
      },
    },
  },
  presets: [require('./tremor.preset.js')],
  plugins: [require('@tailwindcss/typography')],
};
