/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode:'selector',
  theme: {
    extend: {
      colors:{
        purple:{
          300:"#e0e7fe",
          500:"#3e38e7",
          600:"#5046e4"
        }
      }
    },
  },
  plugins: [],
}

