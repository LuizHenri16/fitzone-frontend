/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        smd: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        custom: "1380px",
      },
      colors: {
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      spacing: {

      },
      borderRadius: {
      },
    },
  },
  plugins: [],
}
