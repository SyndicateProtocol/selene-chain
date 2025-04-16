import type { Config } from "tailwindcss"

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#E1E3D5", // paper
        foreground: "#161616",
        // Base colors from Syndicate palette
        paper: "#E1E3D5",
        white: "#F7F7F1",
        black: "#161616",
        // Additional colors
        coral: "#FF6619",
        mauve: "#AA7187",
        purple: "#856BA2",
        blue: "#71A4BF",
        green: "#4F6B3D",
        sage: "#B6AF2F",
        brown: "#927849",
        gray: "#3F3F3F"
      },
      fontSize: {
        xxs: "11px",
        "4xl": [
          "40px",
          {
            lineHeight: "1"
          }
        ]
      },
      lineHeight: {
        "semi-tight": "1.1 !important"
      },
      fontFamily: {
        decovar: ["var(--font-decovar)"]
      },
      letterSpacing: {
        "-2": "-0.02em",
        "-3": "-0.03em",
        "-4": "-0.04em",
        "-5": "-0.05em",
        "3": "0.03em"
      },
      maxWidth: {
        container: "1400px",
        content: "768px",
        narrow: "640px"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in forwards"
      }
    }
  },
  plugins: []
} satisfies Config
