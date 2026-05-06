# React UI Library — Complete Guide

## Context
This document covers everything needed to create, build, version, and ship a production-ready React UI library — from project setup through CI/CD publishing.

---

## 1. Project Architecture

### Directory Structure
```
my-ui-library/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── index.ts          # barrel export
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── index.ts              # root entry
├── .storybook/
├── dist/                     # gitignored, build output
├── .changeset/               # if using changesets
├── package.json
├── tsconfig.json
├── tsconfig.build.json
├── tsup.config.ts
├── vitest.config.ts
└── CHANGELOG.md
```

### Monorepo vs Single Package
- **Single package** — small/medium library, one team
- **Monorepo (pnpm workspaces + Turborepo)** — multiple packages (core, icons, themes), large team

**Default:** Single package. Migrate to monorepo later if needed.

---

## 2. package.json — Critical Fields

```json
{
  "name": "@your-org/ui",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "sideEffects": false,
  "peerDependencies": {
    "react": ">=17.0.0",
    "react-dom": ">=17.0.0"
  },
  "devDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

> `exports` takes precedence over `main`/`module` in all modern bundlers. Always define it. `main`/`module` are legacy fallbacks.

---

## 3. TypeScript Setup

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "**/*.stories.tsx", "**/*.test.tsx"]
}
```

### Type Export Pattern
```typescript
// src/components/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// src/index.ts
export * from './components';
export * from './hooks';
export * from './types';
```

---

## 4. Build Process

### Tool Comparison

| Tool | Speed | Control | Config | Best For |
|---|---|---|---|---|
| **tsup** (esbuild) | Very fast | Medium | Minimal | Most teams (recommended) |
| **Rollup** | Slow | Maximum | Verbose | Complex CSS / max control |
| **Vite lib mode** | Fast | Medium | Familiar | Teams already using Vite |

### Recommendation: tsup

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,           // consumers minify their own bundles
  treeshake: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
});
```

> **Important:** esbuild (tsup) transpiles TypeScript but does NOT type-check. Always run `tsc --noEmit` separately before build.

### npm Scripts
```json
{
  "scripts": {
    "build": "pnpm typecheck && tsup",
    "build:watch": "tsup --watch",
    "typecheck": "tsc --noEmit",
    "dev": "storybook dev -p 6006",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "size": "size-limit"
  }
}
```

---

## 5. Peer Dependencies

| Package | dependencies | peerDependencies | devDependencies |
|---|---|---|---|
| react, react-dom | Never | Always | Yes (dev) |
| styled-components/emotion | Never | If required | Yes |
| Build tools | Never | Never | Yes |
| Small utils (clsx <5kb) | Yes (bundle it) | No | No |

Use wide ranges for peers: `"react": ">=17.0.0 <20.0.0"`

---

## 6. CSS / Styling Strategy

| Approach | Runtime Cost | SSR Safe | Recommendation |
|---|---|---|---|
| CSS Modules + CSS custom props | None | Yes | **Use this** |
| Vanilla Extract | None | Yes | Good for design tokens |
| CSS-in-JS (emotion/styled) | Medium | With config | Avoid in libraries |
| Tailwind shipped classes | None | Yes | Avoid in libraries |

**Pattern:** CSS Modules for scoping, CSS custom properties for theming. Consumers override `--ui-primary: #brand-color`.

Always extract CSS to a separate file and document consumers must import it:
```typescript
import '@your-org/ui/styles';
import { Button } from '@your-org/ui';
```

---

## 7. Component API Design

```typescript
// Always use forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }))} {...props}>
      {isLoading ? <Spinner /> : children}
    </button>
  )
);
Button.displayName = 'Button';

// Spread native HTML props for flexibility
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
```

For complex components (Dialog, Dropdown, Tabs) — use **Radix UI primitives** as accessible, unstyled base.

---

## 8. Testing

### Stack
```bash
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom jest-axe
```

### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      thresholds: { branches: 80, functions: 80, lines: 80 },
      exclude: ['**/*.stories.tsx', '**/index.ts', 'dist'],
    },
  },
});
```

### Test Layers
1. **Unit** — pure utils and hooks (Vitest)
2. **Component** — RTL render, interaction, a11y (`jest-axe`)
3. **Visual regression** — Storybook + Chromatic

---

## 9. Storybook

```bash
pnpm dlx storybook@latest init   # select React + Vite
pnpm add -D @storybook/addon-a11y @chromatic-com/storybook
```

Set `autodocs: 'tag'` in main.ts — auto-generates prop tables from TypeScript types. Each component gets a `.stories.tsx` file with `Meta` and `StoryObj` types.

**Deploy:** Push stories to Chromatic for visual regression + hosted docs.

---

## 10. Versioning

### Semantic Versioning Rules
| Change | Bump | Example |
|---|---|---|
| Breaking API change | MAJOR `2.0.0` | Renamed prop |
| New backward-compatible feature | MINOR `x.2.0` | New `size="xl"` |
| Bug fix | PATCH `x.x.2` | Fix hover state |

### Conventional Commits (enforced by commitlint + husky)
```
feat(button): add loading spinner
fix(modal): correct z-index in portal
BREAKING CHANGE: onClose renamed to onDismiss
```

### Versioning Tool Choice

| Tool | Automation | Best For |
|---|---|---|
| **semantic-release** | Fully automatic — reads commits, bumps, publishes | Open-source / solo / small teams |
| **Changesets** | Semi-manual — dev adds a changeset per PR | Monorepos / enterprise teams |

#### semantic-release config
```javascript
// release.config.cjs
module.exports = {
  branches: ['main', { name: 'beta', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', { changelogFile: 'CHANGELOG.md' }],
    '@semantic-release/npm',
    '@semantic-release/github',
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]',
    }],
  ],
};
```

---

## 11. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test:coverage

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: 'pnpm' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: dist/ }

  release:
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
      id-token: write   # npm provenance
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0, persist-credentials: false }
      - uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install --frozen-lockfile
      - uses: actions/download-artifact@v4
        with: { name: dist, path: dist/ }
      - run: pnpm exec semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_CONFIG_PROVENANCE: 'true'
```

### Pipeline Flow
```
PR opened → test + build jobs run (no publish)
PR merged to main → test → build → release (semantic-release publishes to npm)
```

### Branch Strategy
```
main ──────── production npm releases
  └── beta ── pre-releases (npm tag: beta)
  └── feat/* ─ PRs only, no publish
```

### Private Registry (GitHub Packages)
```yaml
- uses: actions/setup-node@v4
  with:
    registry-url: 'https://npm.pkg.github.com'
    scope: '@your-org'
- run: pnpm publish --no-git-checks
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 12. Local Testing with yalc

Avoid `npm link` — it causes multiple React instances. Use `yalc` instead:

```bash
# Install globally once
pnpm add -g yalc

# In UI library
yalc publish

# In consuming app
yalc add @your-org/ui

# After changes in library
yalc push   # auto-updates consuming app
```

---

## 13. Bundle Size Monitoring

```bash
pnpm add -D @size-limit/preset-small-lib size-limit
```

```json
// package.json
{
  "size-limit": [
    { "path": "dist/index.mjs", "limit": "15 kB" },
    { "path": "dist/index.cjs", "limit": "15 kB" }
  ]
}
```

Add `pnpm size` to CI — fails build if bundle exceeds limit.

---

## 14. DX Tooling

- **ESLint** — `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`
- **Prettier** — consistent formatting
- **Husky + lint-staged** — run lint/format on staged files at commit time
- **commitlint** — enforce conventional commits
- **Renovate Bot** — automated dependency PRs

---

## 15. Pre-Publish Checklist

```
- [ ] pnpm test passes
- [ ] pnpm typecheck passes
- [ ] pnpm lint passes
- [ ] pnpm build succeeds
- [ ] pnpm size within limits
- [ ] CHANGELOG.md updated
- [ ] exports map matches actual dist output
- [ ] CSS file exported if components need it
- [ ] Peer dependencies correctly specified
- [ ] npm pack --dry-run shows only expected files
```

---

## Architecture Decisions Summary

| Decision | Recommended | Alternative | Reason |
|---|---|---|---|
| Build tool | tsup | Rollup | Speed + simplicity |
| Test runner | Vitest + RTL | Jest | Speed, ESM support |
| Versioning | semantic-release | Changesets | Automation for single packages |
| Storybook | react-vite | react-webpack5 | Speed |
| CSS strategy | CSS Modules + custom props | Vanilla Extract | Broad consumer compatibility |
| Package manager | pnpm | npm/yarn | Speed, strict node_modules |
| Complex components | Radix UI primitives | Build from scratch | Accessibility out of the box |
| Local testing | yalc | npm link | Avoids dual React instance |
