/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#252d49",
        secondary: "#108ee9",
      },
    },
  },
  plugins: [],
};
