/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "src/**/*.jsx",
  ],
  darkMode: "selector",

  theme: {
    extend: {
      zIndex: {
        '1000': '1000',
      }
    },
  },
  plugins: [
    // require("@tailwindcss/forms"), 
    // require("@tailwindcss/typography"), 
    // require("preline/plugin")
  ],
}
