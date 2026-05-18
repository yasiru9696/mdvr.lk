/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f6faed',
          100: '#eaf5d5',
          200: '#d8ecb6',
          300: '#c5e296',
          400: '#b2d977',
          500: '#88bf22',
          600: '#76ab1a',
          700: '#5f8914',
          800: '#48670f',
          900: '#31450a',
  },
        secondary: {
          50: '#f2fcfc',
          100: '#e6f9f9',
          200: '#bff0f0',
          300: '#99e6e6',
          400: '#4dd3d3',
          500: '#00c0c0',
          600: '#009999',
          700: '#007373',
          800: '#004d4d',
          900: '#003333',
        },
        accent: {
          50: '#fff6f0',
          100: '#ffede0',
          200: '#ffd1b3',
          300: '#ffb580',
          400: '#ff8533',
          500: '#ff5500',
          600: '#cc4400',
          700: '#993300',
          800: '#662200',
          900: '#331100',
        },
        dark: {
          50: '#f5f5f5',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#1a1a1a',
          900: '#0d0d0d',
          950: '#050505',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};