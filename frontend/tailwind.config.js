module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
    },
  },
  plugins: [],
}