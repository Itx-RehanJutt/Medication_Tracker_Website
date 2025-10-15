/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],    // Custom Utility: font-inter
        roboto: ['Roboto', 'sans-serif'],  // Custom Utility: font-roboto
        poppins: ['Poppins', 'sans-serif'], // Custom Utility: font-poppins
        dmSans: ['DM Sans', 'sans-serif'], // Custom Utility: font-dm-sans
      },
    },
  },
  plugins: [],
};
