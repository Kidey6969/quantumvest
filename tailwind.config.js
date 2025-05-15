/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ Very important!
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0a1a35",
        gold: "#d4af37",
        lightBg: "#f8f9fa",
      },
    },
  },
  plugins: [],
}
