import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      container: {
      center: true,
      padding: "1rem",
      screens: {
        xl: "1280px",
      },
    },
    extend: {},
  },
  plugins: [],
};

export default config;