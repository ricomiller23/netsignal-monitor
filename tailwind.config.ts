import type { Config } from "tailwindcss";
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        "bg-subtle": "#F6F8FB",
        border: "#E4E9F0",
        text: "#0B1220",
        "text-body": "#24303F",
        "text-muted": "#5B6779",
        "text-faint": "#8494A8",
        brand: "#0E63C4",
        "brand-hover": "#0A4E9E",
        "brand-soft": "#EBF3FD",
        "brand-ink": "#0A3F73",
        live: "#0BA360",
        anomaly: "#B45309",
        outage: "#C2410C",
        shutdown: "#7F1D1D",
        resolved: "#0BA360",
      },
      fontFamily: {
        ui: ["Inter", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
