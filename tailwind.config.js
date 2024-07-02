/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pilat: ["Pilat Wide", "sans-serif"],
      },
      transitionDuration: {
        2000: "1500ms",
      },
    },
  },
  plugins: [],
};
