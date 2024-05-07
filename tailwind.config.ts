/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f0fafb",
          "100": "#d9f2f4",
          "200": "#b7e4ea",
          "300": "#85d0db",
          "400": "#4cb2c4",
          "500": "#3196a9",
          "600": "#2b798f",
          "700": "#296475",
          "800": "#295361",
          "900": "#264653",
          "950": "#142d38",
        },

        secondary: {
          50: "#f0fdf2",
          100: "#dcfce3",
          200: "#bcf6c8",
          300: "#80ed99",
          400: "#4bdd6d",
          500: "#24c349",
          600: "#17a238",
          700: "#167f2f",
          800: "#17642a",
          900: "#155225",
          950: "#052e11",
        },
      },
    },
  },
  plugins: [],
  darkMode: ["selector", '[data-mode="dark"]'],
};
