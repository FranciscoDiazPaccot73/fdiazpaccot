const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.pink,
        "main-bg": "#080305",
        orange: "#e9552f",
        "orange-25": "#e9552f25",
        "orange-35": "#e9552f35",
        "orange-50": "#e9552f50",
        "orange-dark": "#ca4a0a",
        "gray-bg": "#2a2a2a"
      },
      fontFamily: {
        sans: ["'InterVariable'", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
