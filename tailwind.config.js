/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f1f6ff',
          100: '#dce8ff',
          200: '#b8d0ff',
          300: '#8db5ff',
          400: '#5a92ff',
          500: '#326fff',
          600: '#2054e6',
          700: '#1741b4',
          800: '#133890',
          900: '#102f73',
        },
        ink: '#0f172a',
        slate: '#1f2937',
      },
      boxShadow: {
        soft: '0 20px 50px -25px rgba(17, 24, 39, 0.35)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 20% 20%, rgba(50,111,255,0.18), transparent 35%), radial-gradient(circle at 80% 0%, rgba(16,47,115,0.2), transparent 40%)',
      },
    },
  },
  plugins: [],
}

