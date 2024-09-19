/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Added jsx and tsx
  ],
  theme: {
    extend: {
      //Color paette
      colors: {
        primary: "#05a1f5",
        secondary: "#EFB63E",
      }
    },
  },
  plugins: [],
}
