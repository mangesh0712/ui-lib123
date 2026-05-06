# @mangesh/ui — Architecture & Project Documentation

## Project Overview

A production-ready React UI component library built with TypeScript, Tailwind CSS, and Storybook. The library exports 7 core components with full type safety, accessibility testing, and comprehensive documentation.

**Package:** `@mangesh/ui` (scoped to npm)  
**Version:** 0.1.0  
**Status:** Initial release scaffold complete

---

## What We've Built

### ✅ Completed

1. **Project Setup**
   - TypeScript strict mode configuration
   - tsup build tool (CJS + ESM + declarations)
   - Tailwind CSS + CSS Modules with `@apply`
   - CSS custom properties for theming (`--color-primary`, `--spacing-*`, etc.)
   - PostCSS with autoprefixer

2. **7 Core Components**
   - **Button** — variants (primary/secondary/destructive/ghost), sizes (sm/md/lg), loading state, forwardRef
   - **Input** — label, error message, helper text, sizes, accessibility attributes
   - **Badge** — variants (default/success/warning/error), compact display
   - **Spinner** — animated loader, configurable size & color
   - **Card** — container with optional header/footer, padding control
   - **Modal** — Radix UI Dialog primitive, accessible dialog overlay
   - **Dropdown** — Radix UI DropdownMenu primitive, keyboard-accessible menu

3. **Testing & QA**
   - Vitest test runner with jsdom environment
   - React Testing Library for component testing
   - jest-axe for accessibility testing
   - 80% coverage thresholds (branches/functions/lines/statements)
   - Test setup file with automatic RTL cleanup

4. **Storybook**
   - Storybook with react-vite preset
   - Accessibility addon (`@storybook/addon-a11y`)
   - Auto-generated prop documentation (`autodocs: 'tag'`)
   - Stories for all 7 components

5. **Developer Experience**
   - ESLint (typescript-eslint + react-hooks + jsx-a11y)
   - Prettier formatter
   - `.gitignore` for build artifacts
   - Husky-ready (for pre-commit hooks)

6. **CI/CD Foundation**
   - GitHub Actions workflow (`release.yml`)
   - Three-job pipeline: test → build → release
   - semantic-release config (ready to wire up when publishing)
   - GitHub Packages registry support (commented)

---

## Architecture Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| **Build Tool** | tsup (esbuild) | Fast, minimal config, CJS+ESM+dts in one command |
| **CSS Strategy** | CSS Modules + Tailwind `@apply` | Scoped styles + utility-first DX, no runtime cost |
| **Theming** | CSS custom properties (`:root` variables) | Runtime switching, consumer-friendly, no JS overhead |
| **Complex Components** | Radix UI primitives (Modal, Dropdown) | Accessibility out of the box, unstyled |
| **Testing** | Vitest + RTL + jest-axe | ESM support, fast, a11y-first |
| **Storybook** | react-vite | Fast dev server, familiar to Vite users |
| **Package Manager** | npm (fallback from pnpm) | Available in environment, works with all tools |
| **Versioning** | semantic-release config | Automated CHANGELOG + npm publishing (when enabled) |

---

## File Structure

```
src/
├── components/
│   ├── Button/ (Button.tsx, Button.module.css, Button.test.tsx, Button.stories.tsx, index.ts)
│   ├── Input/
│   ├── Badge/
│   ├── Spinner/
│   ├── Card/
│   ├── Modal/
│   ├── Dropdown/
│   └── index.ts (barrel export)
├── styles/
│   ├── tokens.css (CSS variables: colors, spacing, radii, fonts)
│   ├── reset.css (minimal reset)
│   └── index.css (tailwind + tokens + reset)
├── index.ts (root export)
├── test-setup.ts (vitest setup, RTL cleanup)
├── styles.d.ts (CSS module types)
└── jest-axe.d.ts (jest-axe type declarations)

.storybook/
├── main.ts (stories config, autodocs enabled)
└── preview.ts (import styles, a11y settings)

.github/workflows/
└── release.yml (test → build → semantic-release)

Config files:
├── tsconfig.json (strict, ES2020, jsx: react-jsx)
├── tsconfig.build.json (excludes test/story files)
├── tsup.config.ts (cjs+esm, dts, treeshake, external React)
├── vitest.config.ts (jsdom, globals, 80% coverage)
├── tailwind.config.js (extend theme, CSS var refs, dark mode)
├── postcss.config.js (tailwind + autoprefixer)
├── .eslintrc.cjs (typescript-eslint + react-hooks + a11y)
├── .prettierrc (2-space tabs, single quotes, trailing commas)
├── .gitignore (dist/, node_modules/, build artifacts)
├── package.json (@mangesh/ui, exports field, 45+ dev deps)
├── CHANGELOG.md (initial release notes)
└── release.config.cjs (semantic-release config, ready to use)
```

---

## Component Development Patterns

### Always use `forwardRef`

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', children, ...props }, ref) => (
    <button ref={ref} {...props}>
      {children}
    </button>
  )
);
Button.displayName = 'Button';
```

Consumers should be able to access the DOM node directly.

### Extend native HTML attributes

```tsx
// ✅ Good
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// ❌ Avoid
export interface ButtonProps {
  onClick?: () => void;
  // missing all other native attrs
}
```

### Use CSS Modules + `@apply` for scoped styles

```css
/* Button.module.css */
.button {
  @apply inline-flex items-center justify-center font-medium rounded-lg transition-colors;
}

.primary {
  @apply bg-primary text-white hover:bg-primary-dark;
}
```

Never hardcode Tailwind classes in JSX. Use `clsx` for conditional classes:

```tsx
<button className={clsx(styles.button, styles[variant], className)} />
```

### Write tests for interaction, not implementation

```tsx
// ✅ Test what users see/do
it('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});

// ❌ Don't test internal state
it('sets loading state', () => {
  const { getByTestId } = render(<Button isLoading />);
  expect(getByTestId('loader')).toExist(); // ❌ fragile
});
```

### Create Stories for each variant/state

```tsx
export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary Button' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Loading...' },
};
```

---

## Styling Guidelines

### No inline styles in JSX

Use CSS variables for dynamic values:
```tsx
// ✅ Good
<div style={{ '--my-color': color } as React.CSSProperties} />

// ❌ Avoid
<div style={{ color: 'red', padding: '16px' }} />
```

### All custom colors/spacing in tokens.css

```css
/* src/styles/tokens.css */
:root {
  --color-primary: #3b82f6;
  --spacing-md: 1rem;
}
```

Reference in Tailwind config:
```js
// tailwind.config.js
theme: {
  extend: {
    colors: { primary: 'var(--color-primary)' },
  }
}
```

Consumers can override:
```css
/* consumer app */
:root {
  --color-primary: #my-brand-color;
}
```

---

## Testing Strategy

### Test Layers

1. **Unit tests** — pure functions and hooks
2. **Component tests** — RTL render + interaction (not internal state)
3. **Visual regression** — Storybook + Chromatic (not set up yet)

### Required for Each Component

```tsx
// Component renders
// Props work correctly
// User interactions work
// Accessibility (axe) passes
// TypeScript compiles
```

### Commands

```bash
npm run typecheck          # TypeScript only
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report (80% threshold)
```

---

## Adding a New Component (Step-by-Step)

1. **Create directory**
   ```bash
   mkdir src/components/MyComponent
   ```

2. **Write component** (`MyComponent.tsx`)
   ```tsx
   import React from 'react';
   import styles from './MyComponent.module.css';
   
   export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
     variant?: 'default' | 'accent';
   }
   
   const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
     ({ variant = 'default', className, children, ...props }, ref) => (
       <div ref={ref} className={clsx(styles.component, styles[variant], className)} {...props}>
         {children}
       </div>
     )
   );
   
   MyComponent.displayName = 'MyComponent';
   export { MyComponent };
   ```

3. **Write styles** (`MyComponent.module.css`)
   ```css
   .component {
     @apply rounded-lg border border-gray-300 p-4;
   }
   
   .default {
     @apply bg-white text-gray-900;
   }
   
   .accent {
     @apply bg-primary text-white;
   }
   ```

4. **Write tests** (`MyComponent.test.tsx`)
   ```tsx
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import { axe } from 'jest-axe';
   import { MyComponent } from './MyComponent';
   
   describe('MyComponent', () => {
     it('renders', () => {
       render(<MyComponent>Content</MyComponent>);
       expect(screen.getByText('Content')).toBeInTheDocument();
     });
     
     it('has no accessibility violations', async () => {
       const { container } = render(<MyComponent>Content</MyComponent>);
       const results = await axe(container);
       expect(results.violations).toHaveLength(0);
     });
   });
   ```

5. **Write stories** (`MyComponent.stories.tsx`)
   ```tsx
   import type { Meta, StoryObj } from '@storybook/react';
   import { MyComponent } from './MyComponent';
   
   const meta = {
     title: 'Components/MyComponent',
     component: MyComponent,
     tags: ['autodocs'],
   } satisfies Meta<typeof MyComponent>;
   
   export default meta;
   type Story = StoryObj<typeof meta>;
   
   export const Default: Story = { args: { children: 'Content' } };
   export const Accent: Story = { args: { variant: 'accent', children: 'Accent' } };
   ```

6. **Export from barrel** (`src/components/index.ts`)
   ```ts
   export { MyComponent } from './MyComponent';
   export type { MyComponentProps } from './MyComponent';
   ```

7. **Create index** (`MyComponent/index.ts`)
   ```ts
   export { MyComponent } from './MyComponent';
   export type { MyComponentProps } from './MyComponent';
   ```

8. **Commit**
   ```bash
   git add .
   git commit -m "feat(components): add MyComponent"
   ```

---

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Type check
npm run typecheck

# Run tests (watch mode)
npm run test:watch

# View components in Storybook
npm run dev

# Build for production
npm run build

# Check bundle size
npm run size
```

### Build Verification Checklist

Before committing:
```bash
npm run typecheck  # ✅ no TS errors
npm run test       # ✅ all tests pass
npm run build      # ✅ build succeeds
npm run lint       # ✅ no linting issues
```

---

## Quick Commands Reference

```bash
npm run build              # Full build (typecheck + tsup)
npm run build:watch       # Watch mode
npm run typecheck         # TypeScript only
npm run test              # Run all tests once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
npm run lint              # ESLint check
npm run lint:fix          # Auto-fix lint issues
npm run format            # Prettier format
npm run dev               # Storybook dev server
npm run build-storybook   # Static Storybook build
npm run size              # Check bundle size
```

---

## Current Limitations & Future Work

### Known Gaps
- No dark mode variant in component stories (Tailwind config supports it)
- No component composition helpers (CompoundComponent pattern not used yet)
- No icon integration (waiting for icon library decision)
- semantic-release not hooked to actual npm publishing yet

### Next Steps
1. Test build locally: `npm run build`
2. Test Storybook: `npm run dev`
3. Set up GitHub remote and push
4. Create GitHub releases via semantic-release

---

## Questions for the Future

- Should we use icon library (Heroicons, Feather, or custom SVG icons)?
- Do we need form components (Select, Checkbox, Radio, etc.)?
- Should Modal/Dropdown support advanced keyboard navigation props?
- Do we need a `useTheme` hook for runtime dark mode switching?

---

**Last updated:** May 6, 2026  
**Scaffold completed by:** Claude Code
