/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'drawer-active': '#FDD133',
        'drawer-standard': '#FFFFFF',
        'text-primary': '#191919',
        'text-link': '#3b83e1',
      },
    },
  },
  plugins: [],
}
