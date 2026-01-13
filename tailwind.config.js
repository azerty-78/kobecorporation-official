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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Vert clair principal
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Couleurs grises pour le texte et les fonds
        ink: '#1f2937', // Gris foncé pour le texte
        slate: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Couleur accent pour les éléments spéciaux
        accent: {
          light: '#a7f3d0', // Vert très clair pour les formes organiques
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
      },
      boxShadow: {
        soft: '0 20px 50px -25px rgba(17, 24, 39, 0.35)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 20% 20%, rgba(34,197,94,0.15), transparent 35%), radial-gradient(circle at 80% 0%, rgba(167,243,208,0.2), transparent 40%)',
        'organic-shapes': 'radial-gradient(ellipse at top left, rgba(167,243,208,0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(167,243,208,0.25) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
