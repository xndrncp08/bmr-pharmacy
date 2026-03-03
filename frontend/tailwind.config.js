export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#16a34a",
          greenLight: "#dcfce7",
          greenDark: "#15803d",
          red: "#dc2626",
          redLight: "#fee2e2",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}