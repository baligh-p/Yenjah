module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily:{
        "body":["body"], 
        "title":["title"]
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide'),require('tailwindcss-placeholders')()],
  prefix: 'b-',
}