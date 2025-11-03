/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // or adjust depending on your folder structure
  ],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['"Comfortaa"', 'cursive'], // Add Comfortaa font
      },
      extend: {
  keyframes: {
    fadeIn: {
      "0%": { opacity: "0" },
      "100%": { opacity: "1" },
    },
  },
  animation: {
    fadeIn: "fadeIn 0.3s ease-in-out",
  },
},

      colors: {
        primary: '#4F46E5', // optional: add a theme color if needed
        secondary: '#9333EA',
      },
      boxShadow: {
        hover: '0 4px 10px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};


