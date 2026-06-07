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
          black: "#FAF8F5",
          dark: "#F3F0EA",
          card: "#FFFFFF",
          muted: "#EDE9E3",
          blue: "#C4674A",
          bluedim: "#7A9E87",
          white: "#1A1A1A",
          silver: "#6B6B6B",
          dim: "#9A9A9A",
          rule: "#E8E4DD",
          footer: "#F3F0EA",
          accentbg: "rgba(196, 103, 74, 0.08)",
          rowalt: "#F7F4EF",
        },
        accent: {
          warm: "#C4674A",
          sage: "#7A9E87",
          dusty: "#6B8FA8",
          soft: "#9B8BB4",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-sm": ["clamp(2.5rem,6vw,4rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(3rem,7vw,5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.045em" }],
        "display-lg": ["clamp(3.5rem,9vw,7rem)", { lineHeight: "0.98", letterSpacing: "-0.05em" }],
        "display-xl": ["clamp(4rem,11vw,8.75rem)", { lineHeight: "0.95", letterSpacing: "-0.055em" }],
      },
      spacing: {
        section: "clamp(5rem, 12vw, 9rem)",
        "section-sm": "clamp(3.5rem, 8vw, 6rem)",
      },
      maxWidth: {
        editorial: "90rem",
      },
      borderRadius: {
        organic: "2rem",
        "organic-lg": "2.75rem",
        pill: "999px",
      },
      boxShadow: {
        "blue-glow": "0 0 40px rgba(196, 103, 74, 0.18)",
        "blue-glow-lg": "0 0 60px rgba(196, 103, 74, 0.22)",
        "blue-glow-sm": "0 0 24px rgba(196, 103, 74, 0.12)",
        float: "0 20px 60px rgba(26, 26, 26, 0.06)",
        card: "0 2px 0 rgba(255,255,255,0.8) inset, 0 12px 40px rgba(26, 26, 26, 0.06)",
        "card-hover": "0 24px 64px rgba(26, 26, 26, 0.1)",
        nav: "0 8px 40px rgba(26, 26, 26, 0.06)",
        soft: "0 4px 24px rgba(26, 26, 26, 0.05)",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        marquee: "marquee 50s linear infinite",
        "marquee-tablet": "marquee 38s linear infinite",
        "marquee-mobile": "marquee 28s linear infinite",
        "loader-blink": "loader-blink 1.4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.5s ease-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 1s infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.03)", opacity: "0.92" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.4" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "loader-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
        bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
