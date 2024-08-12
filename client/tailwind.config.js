/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        header: "560px",
        rate: "400px",
      },
      fontSize: {
        h1: "2.6rem",
      },
      screens: {
        xs: "475px",
      },
      colors: {
        main: "#05021c",
        subMain: "#f70505",
        dry: "#0b102b",
        star: "#ffb000",
        text: "#c0c0c0",
        border: "#4b5563",
        dryGray: "#E0D5D5",
        bright: "#47DDED",
        contact: "#04103d",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
