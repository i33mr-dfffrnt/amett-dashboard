/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        baseBlue: "#080A37",
        baseGreen: "#36CB61",
        baseGray: "#EBEAEF",
        baseBlack: "#011627",
        secondGreen: "#289748",
        secondBlack: "#024173",
        secondBlue: "#0d105d",
        thirdGreen: "#40f173",
        errorRed: "#dc2626",
        secondErrorRed: "#a91d1d",
        blueCard: "#6BABBD",
        redCard: "#E16162",
        brownCard: "#F3CEB2",
        grayCard: "#8697A6",
        lBlueCard: "#7DC0DC",
        dodger: "#1CABFF",
        dodgerDark: "#1999E5",
        carnationRed: "#F8636A",
        carnationRedDark: "#DF595F",
      },
      height: {
        204: "51rem",
        280: "70rem",
        504: "135rem",
        144: "36rem",
      },
      maxWidth: {
        statsOnPC: "11rem",
        "2xs": "15rem",
      },
    },
  },
  plugins: [],
};
