import { type Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        colors: {
          'light-foreground': 'var(--light-foreground)',
          'light-background': 'var(--light-background)',
          'dark-foreground': 'var(--dark-foreground)',
          'dark-background': 'var(--dark-background)',
        },
      },
      keyframes: {
        overlayShow: {
          from: { opacity: '0' },

          to: { opacity: '1' },
        },
        contentShow: {
          from: {
            opacity: '0',
            transform: 'translate(-50%, -49%) scale(0.98)',
          },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentHide: {
          from: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: '0', transform: 'translate(-50%, -49%) scale(0.98)' },
        },
        dropdownContentShow: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        dropdownContentHide: {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.96)' },
        },
      },
      animation: {
        'spin-slow': 'spin 3s ease-in-out infinite',
        overlayShow: 'overlayShow 150ms var(--cubic-bezier)',
        contentShow: 'contentShow 150ms var(--cubic-bezier)',
        contentHide: 'contentHide 150ms var(--cubic-bezier)',
        dropdownContentShow: 'dropdownContentShow 150ms var(--cubic-bezier)',
        dropdownContentHide: 'dropdownContentHide 150ms var(--cubic-bezier)',
      },
    },
  },
  plugins: [],
} satisfies Config
