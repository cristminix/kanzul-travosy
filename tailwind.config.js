/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'twx-', 
  corePlugins: {
    preflight: false,
  },
  important: '#root',
  content: [
    "./index.html",
    "./admin/index.html",
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
