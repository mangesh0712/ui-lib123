/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #3b82f6)',
        secondary: 'var(--color-secondary, #10b981)',
        destructive: 'var(--color-destructive, #ef4444)',
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
    },
  },
  plugins: [],
};
