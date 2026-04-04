/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{tsx,ts}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        navy: '#051230',
        steel: '#97acc8',
        mist: '#b6bfc1',
      },
      fontFamily: {
        sans: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
        rounded: ['var(--font-rounded)'],
        serif: ['var(--font-serif)'],
      },
    },
  },
  plugins: [],
};
