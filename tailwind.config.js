/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 1px 8px rgba(149, 157, 165, 0.2)',
      },
      screens: {
        'xs': '400px',
      }
    },
  },
  plugins: [],
}