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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Bleu principal
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
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
          light: '#bfdbfe', // Bleu très clair pour les formes organiques
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
        },
      },
      boxShadow: {
        soft: '0 20px 50px -25px rgba(17, 24, 39, 0.35)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.15), transparent 35%), radial-gradient(circle at 80% 0%, rgba(191,219,254,0.2), transparent 40%)',
        'organic-shapes': 'radial-gradient(ellipse at top left, rgba(191,219,254,0.3) 0%, transparent 50%), radial-gradient(ellipse at top right, rgba(191,219,254,0.25) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
