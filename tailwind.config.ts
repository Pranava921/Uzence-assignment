import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // covers TypeScript + React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
