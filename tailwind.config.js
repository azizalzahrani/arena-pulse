/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212',
          50: '#1E1E1E',
          100: '#2D2D2D',
          200: '#333333',
          300: '#404040',
          400: '#4D4D4D',
          500: '#666666',
          600: '#808080',
          700: '#999999',
          800: '#B3B3B3',
          900: '#CCCCCC',
        }
      },
      backgroundColor: {
        dark: {
          primary: '#121212',
          secondary: '#1E1E1E',
          tertiary: '#2D2D2D'
        }
      }
    },
  },
  plugins: [],
};