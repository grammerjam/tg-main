/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ma-red': '#FC4747',
        'ma-black': '#10141E',
        'ma-gray': '#5A698F',
        'ma-blue': '#161D2F',
        'ma-white': '#FFFFFF',
      },
      fontSize: {
        "h-lg": ['32px'],
        "h-med": ['24px'],
        "h-sm": ['24px'],
        "h-xsm": ['18px'],
        "b-med": ['15px'],
        "b-sm": ['13px'],
      },
      fontWeight: {
        "light": ['300'],
        "medium": ['400'],
      },
      screens: {
        'tablet': '768px',
        'desktop': '1280px',
      },
      padding: {
        'phone': '12px',
        'tablet': '20px',
        'desktop': '24px',
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [],
}