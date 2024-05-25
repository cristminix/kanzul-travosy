/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "src/**/*.jsx",
  ],
  darkMode: "selector",

  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/forms"), 
    // require("@tailwindcss/typography"), 
    // require("preline/plugin")
  ],
}
