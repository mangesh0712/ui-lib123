# Tailwind CSS Styling Guide (2026)

## Configuration & Design Tokens

- **Use `tailwind.config.js` to define design tokens** (colors, spacing, typography).
- **Extend the default theme** for brand colors, not override: `extend: { colors: { primary: '#...' } }`.
- **Define CSS variables in `:root`** for dynamic theming (dark mode, custom themes):
  ```css
  :root {
    --color-primary: #3b82f6;
    --color-secondary: #10b981;
    --spacing-base: 0.25rem;
  }
  ```
- **Reference CSS variables in Tailwind config**:
  ```js
  colors: { primary: 'var(--color-primary)' }
  ```

## Composing Classes

- **Extract repeated class patterns into CSS classes**, not utility string duplication:
  ```css
  .btn-base { @apply px-4 py-2 rounded-lg font-medium transition-colors; }
  .btn-primary { @apply btn-base bg-primary text-white hover:bg-primary-dark; }
  ```
- **Use `@apply` in component styles** to combine Tailwind utilities into reusable groups.
- **Never hardcode spacing/colors in JSX**. Always use design tokens.
- **Group related utilities**: size together, colors together, interactions together.

## Component Styling with CSS Modules or CSS-in-JS

- **Use CSS Modules for component-scoped styles**:
  ```css
  /* Button.module.css */
  .button {
    @apply px-4 py-2 rounded-lg font-medium;
  }
  .primary {
    @apply bg-primary text-white hover:bg-primary-dark;
  }
  ```
- **Or use inline Tailwind in JSX** for simple, one-off components. Keep consistency.
- **For complex styling logic, use `clsx` or `classnames`**:
  ```jsx
  <button className={clsx('px-4 py-2', size === 'lg' && 'px-6 py-3', variant === 'primary' && 'bg-primary')}>
  ```

## Variables & Reusability

- **Create constant theme objects** to stop class reuse:
  ```js
  export const buttonStyles = {
    base: 'px-4 py-2 rounded-lg font-medium transition-colors',
    primary: 'bg-primary text-white hover:bg-primary-dark',
    secondary: 'bg-secondary text-dark hover:bg-secondary-dark',
  };
  // Use: className={`${buttonStyles.base} ${buttonStyles[variant]}`}
  ```
- **Use CSS variables for dynamic values** (colors, spacing, fonts):
  ```jsx
  <div style={{ '--my-color': color, '--my-spacing': spacing } as React.CSSProperties}>
  ```
- **Centralize breakpoint logic** in custom hooks or utility functions, not scattered in classNames.

## Responsive Design

- **Use Tailwind's responsive prefixes**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- **Mobile-first approach**: base styles are mobile, add `md:` for larger screens.
- **Avoid too many breakpoints** in a single element. Max 3–4 is ideal.
- **Create responsive utility classes** for common patterns:
  ```css
  .grid-responsive { @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4; }
  ```

## Dark Mode & Theming

- **Enable dark mode in Tailwind config**: `darkMode: 'class'` or `'media'`.
- **Use `dark:` prefix** for dark mode styles:
  ```jsx
  <div className="bg-white dark:bg-dark-900 text-dark-900 dark:text-white">
  ```
- **Store theme preference in localStorage** and sync with HTML `class="dark"`.
- **Use CSS variables for theme colors** to support runtime switching without class changes.

## Performance

- **Purge unused styles** in production. Configure `content` in `tailwind.config.js` to include all template files.
- **Don't use dynamic class names**: `className={'bg-' + color}` won't be purged. Use fixed class strings or CSS variables.
- **Avoid arbitrary values in production**: `className="w-[237px]"` works but hurts tree-shaking. Use design tokens instead.
- **Minify Tailwind output** in production builds (handled by build tools automatically).

## Accessibility

- **Maintain sufficient color contrast**: use Tailwind's color scale appropriately (e.g., text-gray-900 on bg-white).
- **Use focus utilities**: `focus:outline-2 focus:outline-offset-2 focus:outline-primary`.
- **Avoid removing default outlines** without providing an alternative focus indicator.
- **Include `transition-colors` or `transition-all`** for hover/focus state changes.

## Common Patterns

### Button Variants
```jsx
const buttonBase = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-2';
const variants = {
  primary: `${buttonBase} bg-primary text-white hover:bg-primary-dark`,
  secondary: `${buttonBase} bg-gray-200 text-dark hover:bg-gray-300`,
};
```

### Spacing Scale
```js
// In config or constants
const spacing = { xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem' };
```

### Color Palette
```js
// Use CSS variables or Tailwind extend
colors: {
  primary: 'var(--color-primary, #3b82f6)',
  secondary: 'var(--color-secondary, #10b981)',
};
```

## Dos and Don'ts

✅ **Do**: Extract repeated class patterns into CSS classes or constants.  
❌ **Don't**: Write the same utility string multiple times across components.

✅ **Do**: Use design tokens (spacing, colors) defined in one place.  
❌ **Don't**: Hardcode `px-4` or `bg-blue-500` scattered throughout JSX.

✅ **Do**: Keep responsive styles minimal; use mobile-first approach.  
❌ **Don't**: Add breakpoints for every element; aim for consistent grid/flex patterns.

✅ **Do**: Use CSS variables for theme colors and dynamic styling.  
❌ **Don't**: Switch entire class strings based on theme state.

✅ **Do**: Test contrast and focus states for accessibility.  
❌ **Don't**: Assume default Tailwind colors work for all users.
