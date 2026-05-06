# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-06

### Added

- **Dropdown component enhancement:** Now works as a select input with `value` and `onValueChange` props
- Selected value displays in the trigger button
- Checkmark indicator on selected item
- Placeholder prop for empty state
- Updated prop API: `trigger` is now optional, replaced with `placeholder` and `value`/`onValueChange`

### Changed

- Dropdown component: `trigger` prop is now optional (was required before)

---

## [0.1.0] - 2026-05-06

### Added

- Initial release with 7 core components
- Button component with variants (primary, secondary, destructive, ghost) and sizes (sm, md, lg)
- Input component with label, error, and helper text support
- Badge component with variants (default, success, warning, error)
- Spinner component with configurable size and color
- Card component with header, footer, and padding options
- Modal component built on Radix UI Dialog primitive
- Dropdown component built on Radix UI DropdownMenu primitive
- TypeScript support with full type definitions
- Tailwind CSS styling with CSS Modules
- Storybook for component documentation
- Comprehensive test suite with React Testing Library
- ESLint and Prettier configuration
- GitHub Actions CI/CD pipeline
