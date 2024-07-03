/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        azulPrimario: '#3887BE',
        blancoPrimario: "#D3D5D4",
        naranjaPrimario: '#FF9F1C',
        negroPrimario: '#2B2B2B',
        cafePrimario: '#744A2F'
      },
    },
  },
  plugins: [],
}

