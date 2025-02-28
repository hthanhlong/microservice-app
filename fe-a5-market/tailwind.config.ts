import type { Config } from "tailwindcss";
import { content, plugin } from "flowbite-react/tailwind";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    content(),
  ],
  plugins: [plugin()],
  theme: {
    extend: {
      colors: {
        primary: "var(--background)",
        secondary: "var(--text-primary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
      },
    },
  },
} satisfies Config;
