export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#16a34a",
          greenLight: "#dcfce7",
          greenDark: "#166534",
          greenDeep: "#0f1f0f",
          red: "#dc2626",
          redLight: "#fee2e2",
        },
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        cardHover: '0 4px 12px 0 rgb(0 0 0 / 0.08)',
      }
    },
  },
  plugins: [],
}