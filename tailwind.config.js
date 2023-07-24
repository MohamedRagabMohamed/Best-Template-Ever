/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {},
    extend: {
      colors: { ...colors },
    },
    minHeight: {
      "v-90": "90vh",
      "v-10": "10vh",
    },
  },
  plugins: [],
};
