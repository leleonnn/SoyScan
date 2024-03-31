/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'green-1': '#B0DAAD',
      'green-2': '#60815D',
      'green-3': '#506B4D',
      'green-3': '#455A43',
      'yellow-1': '#F5E0B9',
      'white-1': '#F4FFFA'
    },
  },
  plugins: [],
};
