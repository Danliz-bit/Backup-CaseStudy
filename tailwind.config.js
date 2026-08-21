/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wb: {
          bg: "#555555",
          sidebar: "#7a7a7a",
          yellow: "#d4a017",
          orange: "#ff8c00",
          blue: "#4a90e2",
          red: "#ff5555",
          card: "#d3d3d3",
          dark: "#333333",
        }
      }
    },
  },
  plugins: [],
}