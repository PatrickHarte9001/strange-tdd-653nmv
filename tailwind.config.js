/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-lightened": "#292929",
        "dark-darkened": "#1f1f1f",
        "dark-hover": "#404040",

        "light-lightened": "#f3f3f3",
        "light-darkened": "#e9e9e9",
        "light-hover": "#cecece",

        light: "#f0f0f0",
        dark: "#242424",
      },
    },
  },
  plugins: [],
};
