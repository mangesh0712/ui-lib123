# React Best Practices (2026)

## Component Architecture

- **Use functional components only**. Class components are legacy; stick with functions and hooks.
- **Extract components early**. If a component exceeds 200 lines or handles multiple concerns, split it. Reusable pieces belong in separate files.
- **One component per file** unless variants are tightly coupled (e.g., a component and its loader).
- **Organize by feature**, not by type. Folder structure: `features/Button/Button.tsx`, `features/Form/Form.tsx`, not `components/Buttons/`, `hooks/`.

## State Management

- **Prefer local state with `useState`** for UI-only state (open/closed, form input, selections).
- **Use `useContext` for cross-cutting concerns** (theme, user, locale) that many components need.
- **Keep state as close as possible to where it's used**. Lift state only when multiple siblings need it.
- **Minimize prop drilling**. If passing props 3+ levels deep, extract a context or move the state.

## Hooks & Side Effects

- **Keep side effects in `useEffect` only**. No side effects in render or event handlers except state updates.
- **One concern per `useEffect`**. Multiple dependencies means multiple effects.
- **Always include dependency arrays**. Empty array `[]` = run once on mount. `[value]` = run when value changes.
- **Clean up subscriptions**: return a cleanup function from `useEffect` for event listeners, timers, subscriptions.
- **Create custom hooks** when logic repeats across components (e.g., `useFetch`, `useLocalStorage`).

## Performance

- **Memoize expensive components with `React.memo`** only if proven necessary (parent re-renders unnecessarily).
- **Use `useCallback` for stable function references** passed to memoized children. Otherwise skip it.
- **Use `useMemo` only for expensive computations**. Don't memoize primitives or cheap operations.
- **Code-split with dynamic imports** for routes or large features: `const Page = lazy(() => import('./Page'))`.
- **Lazy-load images**: use `loading="lazy"` or Intersection Observer for below-the-fold content.

## Props & Types

- **Use TypeScript** for all components. No `any` types; use proper interfaces/types.
- **Keep props focused**. If a component accepts 5+ props, it's doing too much—split it or refactor.
- **Spread props sparingly**: `<Button {...props} />` hides what's being passed. Explicit is better.
- **Destructure with defaults**: `const { size = 'md', ...rest } = props` for clarity.
- **Avoid passing entire objects as props**. Pass only the data the component needs.

## Naming & Readability

- **Use descriptive names**: `isLoading`, `handleSubmit`, `onUserClick`—not `data`, `fn`, `x`.
- **Prefix event handlers with `handle` or `on`**: `handleClick`, `onSubmit` for clarity.
- **Boolean props start with `is` or `has`**: `isDisabled`, `hasError`, not `disabled`, `error`.
- **Keep components under 200 lines**. If longer, split concerns into separate files.

## Testing

- **Test behavior, not implementation**. Test what users see and interact with, not internal state.
- **Use `data-testid` only when needed**. Prefer semantic queries (`getByRole`, `getByLabelText`).
- **Mock only external dependencies** (API calls, localStorage). Test real component interactions.
- **Avoid snapshot tests**. They break easily and don't catch logic errors.

## Accessibility

- **Use semantic HTML**: `<button>`, `<a>`, `<nav>`, not `<div>` with click handlers.
- **Include ARIA labels** for interactive elements: `aria-label`, `aria-describedby`, `aria-live`.
- **Ensure keyboard navigation**: tab order, focus management, escape key handling.
- **Test with screen readers** (NVDA, JAWS, or macOS VoiceOver).

## Common Pitfalls

- Don't create objects/arrays in JSX: `style={{ color: 'red' }}` re-renders. Use constants.
- Don't call hooks conditionally. Hooks must run in the same order every render.
- Don't use array indices as keys in lists. Use stable, unique IDs.
- Don't ignore console warnings. Fix them—they often prevent subtle bugs.
