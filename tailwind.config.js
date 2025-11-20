/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Glucose level colors
        'glucose-low': '#EF4444',      // red-500
        'glucose-normal': '#10B981',   // green-500
        'glucose-high': '#F59E0B',     // amber-500
        'glucose-critical': '#DC2626', // red-600

        // Primary brand colors for diabetes app
        'primary': {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // main primary
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },

        // Insulin/carb tracking colors
        'insulin': '#8B5CF6',     // purple-500
        'carbs': '#F97316',       // orange-500
        'meal': '#06B6D4',        // cyan-500
      },
    },
  },
  plugins: [],
};
