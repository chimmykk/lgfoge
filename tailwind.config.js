// const { fontFamily } = require('tailwindcss/defaultTheme')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      colors: { 
        bgPink: '#FFA5BD',
        textGray: '#808095',
        bgDark: '#181826',
      },
      fontFamily: {
        collector : ['var(--font-collector)'],
        neil : ['var(--font-neil)'],
        inter : ['var(--font-inter)'],
      },
      boxShadow:{
        btn: '0px 3px 0px #000',
      },
      borderColor:{
        darkBorder: '#29293F',
        bgPink: '#FFA5BD',
      },
      backgroundColor:{
        bgPink: '#FFA5BD',
        bgOrange: '#FFC1A5',
        bgBlue: '#A5BAFF',
        bgCyan: '#A5E3FF',
        bgDark: '#181826',
        bgDarkLint: '#212134'
      },
    },
  },
  plugins: [],
}

