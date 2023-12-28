/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "red": "#FC4747",
        "white": "#FFFFFF",
        "black": "#10141E",
        "gray": "#5A698F",
        "dark-blue": "#161D2F",
      }

    },
  },
  plugins: [],
}