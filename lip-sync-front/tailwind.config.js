/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        outLine: {
          '0%': {'outline-width': '1px', 'outline-offset': '0', 'outline-color': 'rgba(255, 255, 255, 0)'},
          '20%': {'outline-color': 'rgba(255, 255, 255, 0.8)'},
          '50%': {'outline-width': '3px', 'outline-offset': '3px', 'outline-color': 'rgba(255, 255, 255, 0)'},
          '100%': {'outline-width': '3px', 'outline-offset': '3px', 'outline-color': 'rgba(255, 255, 255, 0)'}
        }
      },
      animation: {
        'outLine': 'outLine 3s ease-out infinite'
      },
      backgroundImage: {
        'syncBackgroundImage': 'url("/public/image/background.jpg")'
      },
    },
  },
  plugins: [],
}

