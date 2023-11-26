/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bloodborne': "url('/public/bloodborne2.png')",
        'bt':"url('/public/images.png')" 
      },
      fontFamily: {
        'christmas': ['Mountains of Christmas', 'cursive'],
        // ...
      },
    },
  },
  plugins: [require("daisyui")],
}