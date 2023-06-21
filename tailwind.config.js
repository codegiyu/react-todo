/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      md: "768px",
      lg: "992px",
      xl: "1280px",
      xxl: "1440px"
    },
    extend: {
      colors: {
        purple: "#1D1042",
        lightPurple: "#703EFE",
        greyText: "#B8B9BD",
        grey: "#7D8088",
        green: "#8BC488",
        orange: "#FF5F37",
        lightOrange: "#F89D4B"
      },
      fontFamily: {
        inter: ["'Inter'", "sans-serif"]
      },
      boxShadow: {
        topSection: "0px 4px 148px rgba(0, 0, 0, 0.02)",
        taskCard: "0px 0px 100px rgba(0, 0, 0, 0.02)",
        alert: "1px 4px 4px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [],
}

