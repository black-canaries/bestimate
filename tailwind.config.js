/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        glucose: {
          low: '#ef4444', // red-500
          normal: '#10b981', // green-500
          high: '#f59e0b', // amber-500
        },
      },
    },
  },
  plugins: [],
};
