/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0C",
          50: "#1C1C1F",
          100: "#141416",
          200: "#0F0F11",
          300: "#0A0A0C",
        },
        acid: {
          DEFAULT: "#BFFF00",
          glow: "rgba(191, 255, 0, 0.15)",
          muted: "rgba(191, 255, 0, 0.6)",
        },
      },
      textColor: {
        primary: "var(--gray-12)",
        secondary: "var(--gray-11)",
        tertiary: "var(--gray-9)",
        brand: "var(--brand)",
        link: "var(--blue-10)",
        accent: "var(--accent)",
      },
      backgroundColor: {
        primary: "var(--gray-1)",
        secondary: "var(--gray-4)",
        secondaryA: "var(--gray-a4)",
        tertiary: "var(--gray-3)",
      },
      borderColor: {
        primary: "var(--gray-6)",
        secondary: "var(--gray-4)",
        accent: "var(--accent)",
      },
      ringOffsetColor: {
        primary: "var(--gray-12)",
      },
      keyframes: {
        in: {
          "0%": { transform: "translateY(18px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "in-reverse": {
          "0%": { transform: "translateY(-18px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -2%)" },
          "30%": { transform: "translate(1%, 3%)" },
          "50%": { transform: "translate(-3%, 1%)" },
          "70%": { transform: "translate(2%, -1%)" },
          "90%": { transform: "translate(-1%, 2%)" },
        },
      },
      animation: {
        in: "in .6s both",
        "in-reverse": "in-reverse .6s both",
        grain: "grain-shift 8s steps(10) infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-snappy": "cubic-bezier(0.22, 1.0, 0.36, 1)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
