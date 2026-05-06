/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary, #3b82f6)',
          dark: 'var(--color-primary-dark, #1e40af)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary, #10b981)',
          dark: 'var(--color-secondary-dark, #047857)',
        },
        destructive: {
          DEFAULT: 'var(--color-destructive, #ef4444)',
          dark: 'var(--color-destructive-dark, #b91c1c)',
        },
        ghost: 'var(--color-ghost, #f3f4f6)',
      },
      spacing: {
        xs: 'var(--spacing-xs, 0.5rem)',
        sm: 'var(--spacing-sm, 0.75rem)',
        md: 'var(--spacing-md, 1rem)',
        lg: 'var(--spacing-lg, 1.5rem)',
        xl: 'var(--spacing-xl, 2rem)',
      },
      borderRadius: {
        sm: 'var(--radius-sm, 0.375rem)',
        md: 'var(--radius-md, 0.5rem)',
        lg: 'var(--radius-lg, 0.75rem)',
      },
      animation: {
        in: 'fadeIn 200ms ease-in',
        out: 'fadeOut 200ms ease-out',
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
