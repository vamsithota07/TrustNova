/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#FFFFFF",
          dark: "#F4F6F9",
          card: "#FFFFFF",
          muted: "#EDF0F4",
          blue: "#6B82A8",
          bluedim: "#4A6490",
          white: "#0D1117",
          silver: "#3A4A5A",
          dim: "#6B7C93",
          rule: "#DDE1E9",
          footer: "#F0F2F6",
          accentbg: "#EEF1F6",
          rowalt: "#F9FAFB",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "blue-glow": "0 0 30px rgba(107, 130, 168, 0.4)",
        "blue-glow-lg": "0 0 50px rgba(107, 130, 168, 0.4)",
        "blue-glow-sm": "0 0 20px rgba(107, 130, 168, 0.15)",
        "card-glow": "0 2px 12px rgba(0, 0, 0, 0.05)",
        "card-hover": "0 8px 32px rgba(107, 130, 168, 0.15)",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "scroll-bounce": "scroll-bounce 2s ease-in-out infinite",
        "circuit-drift": "circuit-drift 20s linear infinite",
        float: "float 3s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
        "marquee-tablet": "marquee 35s linear infinite",
        "marquee-mobile": "marquee 25s linear infinite",
        "border-pulse": "border-pulse 2.5s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "circuit-pulse": "circuit-pulse 4s ease-in-out infinite",
        "loader-blink": "loader-blink 1.4s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.9" },
        },
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "circuit-drift": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50px, -50px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(107, 130, 168, 0.2)" },
          "50%": { boxShadow: "0 0 12px 2px rgba(107, 130, 168, 0.28)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "circuit-pulse": {
          "0%, 100%": { opacity: "0.26" },
          "50%": { opacity: "0.36" },
        },
        "loader-blink": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.45", filter: "brightness(0.75)" },
        },
      },
    },
  },
  plugins: [],
};
