# Semantic Versioning Guide for @mangesh/ui

## Version Format: MAJOR.MINOR.PATCH

Format: `X.Y.Z` (e.g., `1.2.3`)

---

## What Bumps Each Version?

### 🔴 MAJOR (X.0.0) — Breaking Changes
Increment when you make **incompatible API changes**. Old code **will break**.

**Triggers:**
- Remove a prop
- Rename a component
- Change a function signature
- Remove a component entirely

**Example:**
```
0.2.0 → 1.0.0 (renamed Button.variant from string to enum)
```

**Commit message:** Must include `BREAKING CHANGE:` footer

```
feat(button): refactor variant API
BREAKING CHANGE: variant prop changed from string to enum
```

---

### 🟢 MINOR (x.Y.0) — New Features
Increment when you add **backward-compatible new features**. Old code still works.

**Triggers:**
- Add a new prop (optional)
- Add a new component
- Add new values to an existing prop
- Enhance functionality without breaking existing usage

**Current example:**
```
0.1.0 → 0.2.0 (added value/onValueChange to Dropdown)
```

**Commit message:** Use `feat:` prefix

```
feat(dropdown): add value/onValueChange for select-like behavior
```

Trigger: Your commit is automatically detected by semantic-release via the `feat` prefix.

---

### 🔵 PATCH (x.y.Z) — Bug Fixes
Increment when you fix **bugs without changing API**.

**Triggers:**
- Fix styling bugs
- Fix behavior bugs
- Improve performance
- Update tests

**Example:**
```
0.2.0 → 0.2.1 (fixed Modal animation jank)
```

**Commit message:** Use `fix:` prefix

```
fix(modal): correct animation timing to prevent jank
```

---

## Your Commit History Example

```
ae274df feat(dropdown): ...              0.1.0 → 0.2.0  (MINOR: new feature)
c222ad4 fix: resolve build warnings     0.1.0 → 0.1.1  (PATCH: bugfix)
987cc9b chore(init): scaffold ...       0.0.0 → 0.1.0  (MINOR: initial release)
```

---

## Conventional Commits Format (Required)

Used for automatic versioning by semantic-release:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type Values

| Type | Version | Meaning |
|------|---------|---------|
| `feat` | MINOR ↑ | New feature |
| `fix` | PATCH ↑ | Bug fix |
| `perf` | PATCH ↑ | Performance improvement |
| `refactor` | PATCH ↑ | Code refactoring (no behavior change) |
| `style` | PATCH ↑ | Formatting, no code logic change |
| `test` | PATCH ↑ | Adding/updating tests |
| `docs` | PATCH ↑ | Documentation only |
| `chore` | NONE | Build scripts, dependencies, etc. |

### Scope (Optional)

Which component/area was changed:
```
feat(button): add loading state
fix(input): correct focus outline
feat(components): add Badge component
```

### Subject

- Imperative mood ("add" not "added" or "adds")
- No period at end
- Max 50 characters

### Body (Optional)

More detailed explanation:
```
feat(dropdown): add value/onValueChange for select-like behavior

The dropdown component now supports controlled value state,
allowing it to work like a standard <select> input element.
```

### Footer (Optional)

Breaking changes:
```
feat(button): refactor variant API
BREAKING CHANGE: variant prop is now an enum, not a string
```

---

## How semantic-release Uses This

When you push to `main` branch:

1. **Reads all commits** since last tag
2. **Parses commit types** (`feat`, `fix`, etc.)
3. **Determines version bump**
4. **Updates CHANGELOG.md** automatically
5. **Creates git tag** (e.g., `v0.2.0`)
6. **Publishes to npm** with new version

---

## Current Status

| Commit | Type | Action | Version |
|--------|------|--------|---------|
| `ae274df` | `feat` | Add new feature | 0.2.0 |
| `c222ad4` | `fix` | Bug fix | 0.1.1 |
| `987cc9b` | `chore` | Initial setup | 0.1.0 |

---

## Best Practices

✅ **Do:**
- Use conventional commit format
- Write clear, descriptive commit messages
- Group related changes in one commit
- Document breaking changes in footer

❌ **Don't:**
- Mix multiple features in one commit
- Use vague subjects ("update stuff")
- Forget BREAKING CHANGE footer for breaking changes
- Commit without a type (`fix`, `feat`, etc.)

---

## Questions?

- **What's a BREAKING CHANGE?** When old code using your library would need to be updated to work.
- **Why use semantic versioning?** Consumers know if an update is safe (patch), adds features (minor), or requires code changes (major).
- **When to merge to main?** After tests pass and you're ready to publish.

---

**Example Next Steps:**
1. Add another feature → commit with `feat(component): ...` → version bumps to 0.3.0
2. Fix a bug → commit with `fix(component): ...` → version bumps to 0.2.1 (if starting from 0.2.0)
3. Update docs → commit with `docs: ...` → no version bump (chore/docs don't trigger)
