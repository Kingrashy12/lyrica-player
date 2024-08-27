/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": ["SpaceMono", "monospace"],
        "poppins-black": ["PoppinsBlack", "sans-serif"],
        "poppins-bold": ["PoppinsBold", "sans-serif"],
        "poppins-extra-bold": ["PoppinsExtraBold", "sans-serif"],
        "poppins-light": ["PoppinsLight", "sans-serif"],
        "poppins-medium": ["PoppinsMedium", "sans-serif"],
        "poppins-regular": ["PoppinsRegular", "sans-serif"],
        "poppins-semi-bold": ["PoppinsSemiBold", "sans-serif"],
      },
      backgroundColor: {
        bgColor: "#E5E5E5",
        trans50: "#00000080",
        trans70: "#000000BF",
        trans90: "#000000E6",
        slider: "#52D7BF",
        nextIcon: "rgb(150,150,150,.15)",
      },
      colors: {
        textColor: "#BCBCBC",
      },
    },
  },
  plugins: [],
};
