/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Atkinson Hyperlegible', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'yale-blue': '#0F4D92',
      },
    },
  },
  plugins: [],
};
