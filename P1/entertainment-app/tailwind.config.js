/*eslint no-undef: "error"*/
/*eslint-env node*/

/** @type {import('tailwindcss').Config} */
module.exports =  {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}"],
  components: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

