/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  // darkMode: 'selector',
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }

      'ms': { 'max': '550px' },
      // => @media (max-width: 639px) { ... }

      'xs': { 'max': '400px' },
      // => @media (max-width: 336px) { ... }
    },
    
    borderWidth: {
      DEFAULT: '1px',
      0: '0px',
      1.5: '1.5px',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    extend: {
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#f5f2eb',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        primary1: '#fdf8f6',
        primaryDarker: '#f5f2eb',
        primaryDarkest: '#f2e8e5',
        scLightest: '#eaddd7',
        scLighter: '#bfa094',
        sc: '#977669',
        scDarker: '#846358',
        scDarker2: '#795d52',
        scDarker3: '#695149',
        tertiary: '#8d7065',
        tertiaryDarker: '#846358',
        tertiaryDarkest: '#43302b',
        dark3: '#27272a',
        dark2: '#3f3f46',
        dark1: '#52525b',
        cancel: '#f43f5e',
        cancel1: '#be123c',
        cancel2: '#9f1239',
        lightCancel: '#fff1f2',
        lightCancel1: '#ffe4e6',
        lightCancel2: '#fecdd3',
        grey1: '#e4e4e7',
        grey2: '#d4d4d8',
        grey3: '#71717a',
      }
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],

  plugins: [],
}
