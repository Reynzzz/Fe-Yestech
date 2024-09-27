/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px' // Tambahkan aturan media query untuk breakpoint 2xl
      },
      colors: {
        primary: '#223DFE',
        secondary: '#222222',
        bgSecondary: '#F5F5F5'
      }
    }
  },
  plugins: []
}
