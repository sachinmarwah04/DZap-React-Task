/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-grey": "#343434",
        "custom-grey-dark": "#28282B",
      },
      opacity: {
        1: "0.30",
        2: "0.50",
      },
      border: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
