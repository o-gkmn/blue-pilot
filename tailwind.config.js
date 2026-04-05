/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        danger: "var(--danger)",
        warning: "var(--warning)",
        info: "var(--info)",
        success: "var(--success)",

        border: "var(--border)",
        overlay: "var(--overlay)",

        text: {
          DEFAULT: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          accent: "var(--text-accent)",
          success: "var(--text-success)",
          disabled: "var(--text-disabled)",
          placeholder: "var(--text-placeholder)",
          inverse: "var(--text-inverse)",
        },
      },
      fontFamily: {
        sans: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        rounded: ["var(--font-rounded)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [],
};
