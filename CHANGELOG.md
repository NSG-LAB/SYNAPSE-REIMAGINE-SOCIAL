# 📜 Changelog

All notable changes to the **SYNAPSE — Reimagine Social** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.5.0] - 2026-09-09

### Added
- **Web Audio Procedural Sound Engine**: Lightweight zero-dependency HTML5 Web Audio synthesis providing tactile sound feedback on star node selection, spark votes, and milestone celebrations (`src/utils/soundEffects.js`).
- **Global Keyboard Shortcuts Dialog**: Interactive modal (<kbd>?</kbd>) displaying full power-user keyboard shortcuts for instant view switching, spark creation, and theme toggling.
- **Dedicated Architecture & Contribution Documentation**: Added `ARCHITECTURE.md`, `CONTRIBUTING.md`, and `CHANGELOG.md`.
- **Compiler Configuration**: Added `jsconfig.json` with modern ES module and JSX tooling rules.
- **Automated Responsive Design & Context Action Tests**: Added comprehensive test suites verifying all breakpoint tiers (320px to 1440px), absence of `<style>` tags in JSX, single `<main>` landmark enforcement, and full context dispatcher coverage.

### Changed
- **Centralized Responsive Layout Engine**: Migrated all component `<style>` blocks (`Navbar`, `MobileNav`, `MessagesView`, `DiscoverPage`, `SkillConstellation`, `CollabRadar`, `StreakXPWidget`) into `src/styles/index.css`.
- **Clamped Grid Dimensions**: Updated all card grids to use `minmax(min(100%, ...), 1fr)` to guarantee zero horizontal overflow across all mobile screens down to 320px.
- **Semantic HTML5 Landmark**: Replaced nested `<main>` element in `DiscoverPage` with semantic `<section aria-label="Sparks feed">`.

---

## [2.0.0] - 2026-09-08

### Added
- **Skill Constellation Map**: 2D force-directed SVG graph clustering creators by skill synergy.
- **Collaboration Radar**: Bidirectional matchmaking scoring engine.
- **Gamification Engine**: Daily spark streaks, levels, and XP bounties.
- **Hash Router**: Deep-linking URL architecture with direct modal routes.
- **Axe DevTools Accessibility**: Automated WCAG 2.1 AA audit suite.

---

## [1.0.0] - 2026-09-07

### Added
- Initial release of SYNAPSE platform.
- Discover sparks feed, topic guilds, hackathons, and collaborative chat.
- Central dark and light theme engines.
- `useLocalStorage` persistence hook.
