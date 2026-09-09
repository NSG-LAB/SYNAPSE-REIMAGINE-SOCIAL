# 🤝 Contributing to SYNAPSE

Thank you for your interest in contributing to **SYNAPSE | Reimagine Social**! This document outlines our code standards, engineering workflows, and quality requirements.

---

## 🏗️ Development Workflow

1. **Prerequisites**:
   - Node.js >= 18.0.0
   - npm >= 9.0.0

2. **Setup**:
   ```bash
   npm install
   npm run dev
   ```

3. **Code Quality Checks**:
   Before submitting code, always run the linter and test suites:
   ```bash
   npm run lint   # Oxlint static code analyzer
   npm test       # Vitest automated test suite
   npm run build  # Production bundle compilation
   ```

---

## 🎨 Styling & Design Guidelines

1. **No Embedded `<style>` Blocks**:
   Never include `<style>` tags within React components. All styles and media queries must reside in `src/styles/index.css`.

2. **Design Tokens First**:
   Always use CSS custom properties defined in `:root`:
   - Colors: `var(--color-bg-base)`, `var(--color-bg-surface)`, `var(--color-primary)`, `var(--color-text-primary)`
   - Radii: `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-full)`
   - Transitions: `var(--transition-fast)`, `var(--transition-normal)`

3. **Fluid Responsive Grids**:
   Avoid fixed minimum widths in grids. Always use `minmax(min(100%, <size>), 1fr)` to prevent horizontal overflow on viewports under 360px.

---

## ♿ Accessibility Requirements (WCAG 2.1 AA)

- Every button must have visible text or an explicit `aria-label`.
- All modal dialogs must trap focus, handle <kbd>Escape</kbd>, and restore trigger focus on close.
- Ensure high contrast: minimum 4.5:1 for standard text, 7:1 for headers.
- Maintain a single `<main>` element per document.
- Never use non-semantic elements for interactive triggers (`<div>` with `onClick` without keyboard accessibility is prohibited).

---

## 🧪 Testing Standards

- Unit tests must be written with Vitest and `@testing-library/react`.
- Axe DevTools accessibility tests must pass with 0 critical or serious violations.
- Verify responsiveness across viewports: 320px, 375px, 768px, 1024px, 1280px.
