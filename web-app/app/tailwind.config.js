/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'vibrant-gradient': 'linear-gradient(135deg, #7C3AED, #06B6D4, #F472B6, #A78BFA, #0EA5E9)',
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradientMove: 'gradientMove 12s ease infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["corporate", "dark", "cupcake"],
  },
};
