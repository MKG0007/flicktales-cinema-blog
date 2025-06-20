/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--color-primary) / <alpha-value>)',
        'primary-dark': 'hsl(var(--color-primary-dark) / <alpha-value>)',
        gold: 'hsl(var(--color-gold) / <alpha-value>)',
        red: {
          DEFAULT: 'hsl(var(--color-red) / <alpha-value>)',
          dark: 'hsl(var(--color-red-dark) / <alpha-value>)',
        },
        gray: {
          50: 'hsl(var(--color-gray-50) / <alpha-value>)',
          100: 'hsl(var(--color-gray-100) / <alpha-value>)',
          200: 'hsl(var(--color-gray-200) / <alpha-value>)',
          300: 'hsl(var(--color-gray-300) / <alpha-value>)',
          400: 'hsl(var(--color-gray-400) / <alpha-value>)',
          500: 'hsl(var(--color-gray-500) / <alpha-value>)',
          600: 'hsl(var(--color-gray-600) / <alpha-value>)',
          700: 'hsl(var(--color-gray-700) / <alpha-value>)',
          800: 'hsl(var(--color-gray-800) / <alpha-value>)',
          900: 'hsl(var(--color-gray-900) / <alpha-value>)',
          950: 'hsl(var(--color-gray-950) / <alpha-value>)',
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      height: {
        'screen-90': '90vh',
        'screen-80': '80vh',
      },
      maxWidth: {
        'prose-lg': '75ch',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary'),
              '&:hover': {
                color: theme('colors.primary-dark'),
              },
            },
            h1: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            h2: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),
            a: {
              color: theme('colors.gold'),
              '&:hover': {
                color: theme('colors.amber.400'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [],
};