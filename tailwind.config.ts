import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#74121d",
          50: "#fef2f3",
          100: "#fde6e7",
          200: "#fbd1d3",
          300: "#f7acb0",
          400: "#f17c83",
          500: "#e74d57",
          600: "#d32f3c",
          700: "#74121d",
          800: "#621119",
          900: "#541418",
        },
      },
    },
  },
  plugins: [],
};
export default config;