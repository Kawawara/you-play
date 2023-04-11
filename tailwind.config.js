/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue", "./src/**/*.ts"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
  extend: {
    colors: {
      'yellow' : '#EBFF00',
      'grayblack' : '#7f5a83',
    },
  },
}

