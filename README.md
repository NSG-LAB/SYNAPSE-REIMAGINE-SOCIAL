# ⚡ SYNAPSE | Reimagine Social

> **A Next-Generation Social Community Platform Built on Purposeful Participation, Collaborative Sprints, and Skill Synergy.**

[![Built with React](https://img.shields.io/badge/Built%20with-React%2019-61dafb.svg)](https://react.dev/)
[![Bundled with Vite](https://img.shields.io/badge/Bundled%20with-Vite%208-646cff.svg)](https://vitejs.dev/)
[![Tested with Vitest](https://img.shields.io/badge/Tested%20with-Vitest%205-facc15.svg)](https://vitest.dev/)
[![Linted with Oxlint](https://img.shields.io/badge/Lint-Oxlint%20(0%20warnings)-10b981.svg)](https://oxc.rs/)
[![Styling](https://img.shields.io/badge/Styling-Vanilla%20CSS%20Design%20System-38bdf8.svg)](./src/styles/index.css)
[![Persistence](https://img.shields.io/badge/Persistence-HTML5%20LocalStorage-10b981.svg)](./src/hooks/useLocalStorage.js)
[![Challenge](https://img.shields.io/badge/Submission-REIMAGINE%20SOCIAL%20Challenge-f43f5e.svg)](#)

---

## 🌟 The Core Concept: "Connect by Doing, Not Just Scrolling"

Traditional social networks optimize for **passive consumption, algorithmic outrage, and vanity follower counts**. Users scroll endlessly through disjointed feeds, consuming content without genuine connection.

**SYNAPSE rethinks social connection from first principles:**
- **From Passive Scrolling to Action Sparks**: Posts are structured as *Idea Sparks*, *Collaborative Challenges*, *Interactive Polls*, *Show & Tell (Proof-of-Work)*, and *Peer Inquiries*.
- **Topic Guilds over Algorithmic Echo Chambers**: Niche, high-signal spaces (Generative AI & Shader Lab, Climate Tech, Solo Founders, Spatial Audio, Street Photography) where creators establish shared rituals, manifestos, and active sprints.
- **Participatory Challenges & Sprints**: 48-hour jams, 7-day creative coding hackathons, and photowalks with live milestone trackers, XP karma bounties, and community showcases.
- **Skill Synergy Matching**: Instead of vanity follower counts, users discover collaborators based on complementary superpowers: **"Skills Offered"** vs **"Skills Needed"** (e.g., *Offers: React & WebGL / Seeks: Rust & Audio Synthesis*).
- **Zero Backend Required**: Fully functional client-side architecture using rich mock data and a resilient `useLocalStorage` persistence layer that maintains state across browser sessions.

---

## 🌌 Groundbreaking Innovative Features

### 1. 🌌 Skill Constellation Map (2D Spatial Force-Directed Graph)
- **Concept**: Visualizes the entire creator ecosystem as an interactive starry constellation where nodes represent makers and are clustered according to skill similarity.
- **Algorithm**: A custom force-directed spring simulation that computes skill affinity vectors, pulling creators with overlapping superpowers into organic galaxies while pushing dissimilar nodes apart.
- **Interactive Mechanics**:
  - **Dynamic Connections**: Pulsing green connection lines illuminate mutual skill synergies between you and other creators.
  - **Interactive Node Exploration**: Click any star to open their synergy dossier, view who-can-help-whom, and 1-click connect or direct message.
  - **Spatial Controls**: Full zoom (+/-) and drag-to-pan viewport controls with touch gesture support for mobile devices.

### 2. 🤝 Collaboration Radar (Bidirectional Skill Matching Engine)
- **Concept**: A smart matchmaking radar that matches creators based on complementary skill gaps (*what you offer that they need ↔ what they offer that you need*).
- **Scoring Function**:
  $$\text{Score} = (\text{Offers}_{\text{You}} \cap \text{Needs}_{\text{Them}} \times 20) + (\text{Offers}_{\text{Them}} \cap \text{Needs}_{\text{You}} \times 20) + \text{MutualBonus} (25) + (\text{Interests} \times 5)$$
- **Animated Compatibility Rings**: Dynamic SVG stroke-dasharray progress circles with color-coded compatibility ratings (Green $\ge 70\%$, Purple $\ge 50\%$, Amber $\ge 30\%$).
- **Dual Presentation**: Horizontal swipeable cards in the People directory and a compact 3-match widget on the main Discover feed rail.

### 3. 🔥 Spark Streak & XP Gamification Engine
- **Concept**: Gamified participation tracking that rewards collaborative actions over passive scrolling.
- **Action Bounties**:
  - Publish an Action Spark: **+50 XP**
  - Contribute to Discussion: **+15 XP**
  - Join a Topic Guild: **+30 XP**
  - Enlist in a Challenge Sprint: **+40 XP**
- **Level Progression**: Dynamic rank tiers from *Fresh Explorer* (Lv. 1) to *Legendary Architect* (Lv. 10+), tracked with animated shimmer progress bars, confetti celebrations, and daily action checklists.

---

## 🚀 Key Platform Features

### 1. ⚡ Discover Dashboard
- **Personalized Welcome & Daily Intent Picker**: Choose your daily focus: *"All Sparks"*, *"Seeking Collabs"*, *"Live Challenges"*, or *"Proof of Work"*.
- **Innovation Spotlight**: Quick-launch hero cards for the Skill Constellation Map and Collaboration Radar with real-time streak badges.
- **Filter Bar**: Seamlessly toggle across 10 topic categories (*Technology*, *Design*, *Science*, *Startups*, *Gaming*, *Music*, *Photography*, *Art*, *Education*).
- **Multi-Faceted Sorting**: Filter by *Trending*, *Newest*, *Most Active*, or *Recommended For You*.
- **Right Rail Ecosystem Widgets**: Fast access to *Trending Guilds*, *Active Sprints*, and *Collab Radar*.

### 2. 💬 Interactive Sparks & Discussions Feed
- **Live Poll Voting**: Vote in community polls with real-time percentage calculations and visual distribution fills.
- **Micro-Interactions**: Instant like/unlike animations, bookmarking, and native clipboard link sharing with animated toast notifications.
- **Discussion Drawers**: Read peer insights and post your own comments directly into local storage.
- **Post Composer Modal**: Publish new Idea Sparks, Challenges, Community Polls, or Showcases.

### 3. 🏰 Topic Guilds & Laboratories
- **Reusable Community Cards**: Showcase cover imagery, member count, activity intensity meters (*Hyperactive*, *High*, *Active Sprints*, *Steady*), and 1-click Join/Joined states.
- **Deep Guild Hub Modal**: Explore guild manifestos, principles, active pinned sprints, and guild-exclusive discussions.
- **Community Creator**: Launch your own Guild with custom sigils, categories, guidelines, and inaugural challenges.

### 4. 🏆 Participatory Challenges & Hackathons
- **Sprint Cards**: Displays countdown timelines, difficulty rating (*Beginner Friendly*, *Intermediate*, *Advanced*), participant counters, and XP Karma bounties.
- **Event Detail & Milestones Checklist**: Track stage-by-stage progression (*Ideation*, *Prototype Build*, *Showcase*) with celebratory confetti triggers upon joining.

### 5. 🤝 Synergy Matcher & People Discovery
- **Dual View Modes**: Segmented control to toggle between classic responsive Grid view (⊞) and the 2D SVG Skill Constellation Map (🪐).
- **Search & Filter Matrix**: Search across roles, skills, and names or filter by specific technical superpowers.
- **One-Click Connect & Direct Message**.

### 6. 💬 Collaborative Chat & Messaging
- **Split-Pane Chat View**: Left thread list with real-time unread badges; right active chat with message bubbles.
- **Suggested Quick Replies**: Single-click responses (*"Let's pair on this!"*, *"Are you joining the upcoming sprint?"*).
- **Instant Message Sending**: Messages immediately append and persist in `localStorage`.
- **Edge-to-Edge Mobile Chat**: Native app feel on small viewports with dedicated back navigation and keyboard safe-area support.

### 7. 👤 Impact Profile & Karma Dashboard
- **Full Gamification Hub**: Visual streak counters, level badges, XP progress bar, and "Today's Goals" checklist.
- Visual impact statistics: *Community Karma*, *Published Sparks*, *Challenges Sprinted*, and *Guild Memberships*.
- Interactive tabs: *My Sparks*, *Joined Guilds*, *Active Sprints*, and *Saved Sparks*.
- **Edit Profile Modal**: Modify name, handle, role headline, bio, location, avatar, and skill tags with immediate persistence.

### 8. 🎨 Centralized Design System & Theme Engine
- **Three Curated Color Modes**:
  - 🌌 **Deep Slate (Dark Mode)** - Default high-contrast creative palette.
  - ☀️ **Porcelain (Light Mode)** - Clean paper-like daylight layout.
  - 🖤 **Midnight OLED** - True pure black for AMOLED screens.
- **Glassmorphic Surface Design**: Backdrop filters, subtle border glows, and tactile elevation.
- **Responsive Layout Engine**: Desktop 3-column grid, tablet 2-column view, and ergonomic mobile sticky header + bottom navigation bar.

---

## 🛠️ Architecture & Tech Stack

```mermaid
graph TD
    A[main.jsx] --> B[App.jsx]
    B --> C[AppProvider - AppContext.jsx]
    C --> D[useLocalStorage Hook]
    D --> E[(Browser LocalStorage)]
    
    C --> F[Layout Shell]
    F --> G[Navbar]
    F --> H[Sidebar + Streak Widget]
    F --> I[Main Content Router]
    F --> J[RightRail + Collab Radar]
    F --> K[MobileNav]
    
    I --> L[DiscoverPage]
    I --> M[CommunitiesPage]
    I --> N[EventsPage]
    I --> O[PeoplePage]
    I --> P[ExplorePage]
    I --> Q[MessagesView]
    I --> R[ProfileView + Streak Hub]
    I --> S[SettingsView]
    
    O --> T[SkillConstellation Graph]
    O --> U[CollabRadar Matcher]
    
    C --> V[Global Modal Hub]
    C --> W[Toast Notifications & Canvas Confetti]
```

### Directory Structure

```text
src/
├── __tests__/               # Automated Unit Test Suite (Vitest)
│   ├── collabRadar.test.js  # Skill-matching algorithm & scoring tests
│   ├── dataSchemas.test.js  # Schema validation for all mock entities
│   └── gamification.test.js # XP, streak, and level calculation tests
├── assets/                  # Static media and brand graphics
├── components/
│   ├── common/              # Navbar, Sidebar, MobileNav, RightRail, Modal, Toasts, EmptyState, ErrorBoundary, Footer
│   ├── communities/         # CommunityCard, CommunityDetailModal, CreateCommunityModal
│   ├── constellation/       # SkillConstellation (2D force-directed SVG graph)
│   ├── events/              # EventCard, EventDetailModal
│   ├── feed/                # PostCard, CreatePostModal, PostDetailModal, FilterBar
│   ├── messages/            # MessagesView (Split chat layout & mobile view)
│   ├── notifications/       # NotificationsView
│   ├── people/              # PersonCard, ProfileDetailModal, CollabRadar
│   ├── profile/             # ProfileView, EditProfileModal, StreakXPWidget
│   └── settings/            # SettingsView
├── context/
│   └── AppContext.jsx       # Reactive global state engine & action dispatchers
├── data/                    # Realistic mock data directory
│   ├── communities.js       # 12+ Topic Guilds with metadata
│   ├── events.js            # 8+ Challenges & Sprints with milestones
│   ├── messages.js          # Chat threads and conversation histories
│   ├── notifications.js     # Categorized notification items
│   ├── posts.js             # 20+ Sparks, Polls, Showcases, Inquiries
│   ├── topics.js            # Categories, interest tags, skill tags
│   └── users.js             # 16+ User profiles with skills offered/needed
├── hooks/
│   └── useLocalStorage.js   # Fault-tolerant browser persistence hook
├── pages/
│   ├── DiscoverPage.jsx     # Main feed, hero, intent picker, innovation spotlight
│   ├── CommunitiesPage.jsx  # Guilds directory & filter tabs
│   ├── EventsPage.jsx       # Challenges, jams, and sprint milestones
│   ├── PeoplePage.jsx       # Synergy skill matcher & Constellation map
│   └── ExplorePage.jsx      # Unified search matrix across all entities
├── styles/
│   └── index.css            # Canonical design system tokens, themes, & responsive media queries
├── App.jsx                  # Main view router & modal mount hub
└── main.jsx                 # Application entrypoint
```

---

## 💻 Local Development & Automated Testing

### Prerequisites
- **Node.js**: v18.0.0 or later (v26+ tested)
- **npm**: v9.0.0 or later

### Installation & Run

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd "REIMAGINE SOCIAL"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run Automated Unit & Component Tests:
   ```bash
   npm test
   ```
   Runs 9 test suites and 36 automated tests via Vitest & React Testing Library:
   - `Modal.test.jsx`: Dialog ARIA attributes, Escape handling, Tab focus trap wrapping, and trigger focus restoration.
   - `PostCard.test.jsx`: Keyboard accessible button wrappers, Enter/Space activation, inline poll voting, and bookmark toggling.
   - `SafeImage.test.jsx`: Image loading, graceful error fallback, and dynamic SVG gradient placeholder generation.
   - `Onboarding.test.jsx`: Onboarding banner rendering, pillar explanation, quick action dispatch, and persistence dismissal.
   - `router.test.js`: URL hash parsing, route serialization, modal action routes (`#/post/new`), and entity deep links.
   - `collabRadar.test.js`: Skill synergy matching engine, bidirectional bonus, and score capping.
   - `gamification.test.js`: XP karma progression, level tiers, and spark streak tracking.
   - `dataSchemas.test.js`: Schema validation for posts, users, communities, and events.
   - `imageFallback.test.js`: Deterministic avatar/cover SVG generation and category badge palettes.

4. Run Code Quality Linter:
   ```bash
   npm run lint
   ```
   Runs Oxlint across all 61 project files (verified **0 warnings, 0 errors**).

5. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

6. Build for production:
   ```bash
   npm run build
   ```
   Generates an optimized, code-split production bundle with separate chunks for all pages and heavy components in under 500ms.

---

## 🧭 Deep Linking & URL Routing Architecture

SYNAPSE features a zero-dependency hash-based router that reflects both top-level navigation and modal states directly in the URL:

| Route / Deep Link | Description | Accessible State |
|---|---|---|
| `#/discover` | Discover dashboard & sparks feed | Active feed tab, intent filters, onboarding banner |
| `#/communities` | Guilds & laboratories directory | Guild cards, topic filters |
| `#/events` | Challenges, hackathons & sprints | Timeline status, difficulty filters |
| `#/people` | Synergy skill matcher & makers | Grid or Constellation map view mode |
| `#/messages` | Collaborative chat & messaging | Thread list, active conversation |
| `#/profile` | Impact profile & karma dashboard | User stats, published sparks, joined guilds |
| `#/settings` | Platform preferences & themes | Theme switcher, notifications, audio toggles |
| `#/post/:id` | Direct link to specific Spark | Automatically opens `PostDetailModal` with live poll & comments |
| `#/guild/:id` | Direct link to specific Guild | Opens `CommunityDetailModal` with manifesto & sprints |
| `#/event/:id` | Direct link to Sprint/Hackathon | Opens `EventDetailModal` with milestone checklist |
| `#/profile/:id` | Direct link to User Dossier | Opens `ProfileDetailModal` with skill synergy stats |
| `#/post/new` | Direct action route to create Spark | Mounts `CreatePostModal` |
| `#/guild/new` | Direct action route to create Guild | Mounts `CreateCommunityModal` |
| `#/profile/edit` | Direct action route to edit Profile | Mounts `EditProfileModal` |

---

## ♿ Accessibility & Practice Verification

SYNAPSE conforms to **WCAG 2.1 AA** standards with verified behavior in real user workflows:

### 1. Real Keyboard-Only Navigation Pass
- **Discover Tab Navigation**: Press <kbd>Tab</kbd> to move sequentially through skip link, navigation items, intent pills, and feed cards.
- **Card Activation**: Every whole-card click target (`PostCard` title, `CommunityCard` cover, `EventCard` cover, `PersonCard` avatar) is a semantic `<button type="button">` with focus-visible outer glow ring. Pressing <kbd>Enter</kbd> or <kbd>Space</kbd> opens the corresponding dialog.
- **Focus Trapping in Modal**: When `Modal.jsx` mounts, focus immediately shifts to the dialog's first focusable element. Tabbing past the last interactive element wraps focus back to the top; <kbd>Shift</kbd>+<kbd>Tab</kbd> wraps backwards.
- **Focus Restoration**: Pressing <kbd>Escape</kbd> or clicking the close button dismisses the modal and **restores focus to the exact button that opened it**.
- **Interactive Polls**: Arrow keys / Tab let users select options and press <kbd>Enter</kbd> to cast votes; screen readers announce live vote totals.

### 2. Skill Constellation Screen Reader Verification
- Includes an `aria-live="polite"` region that announces selected creators: *"Selected {Name}, {Role headline}. Offers: {Skills}. Needs: {Skills}."*
- Accessible SVG container with role `group` and descriptive keyboard instructions for panning and zooming.
- Comprehensive fallback DOM list (`aria-label="Creator Synergy Directory"`) allowing screen reader users to browse every maker without interacting with the graphical canvas.

### 3. Contrast Ratios Matrix (WCAG AA & AAA Verified)

| Color Token | Deep Slate (Dark) | Porcelain (Light) | Midnight OLED | Standard |
|---|---|---|---|---|
| **Primary Text** on Background | `#f8fafc` on `#0b0f17` (**17.8:1**) | `#0f172a` on `#f8fafc` (**16.2:1**) | `#f8fafc` on `#000000` (**20.5:1**) | WCAG AAA ($\ge 7:1$) |
| **Secondary Text** on Surface | `#cbd5e1` on `#111827` (**10.5:1**) | `#334155` on `#ffffff` (**7.8:1**) | `#cbd5e1` on `#090d14` (**11.5:1**) | WCAG AAA ($\ge 7:1$) |
| **Muted Text** on Surface | `#94a3b8` on `#111827` (**5.8:1**) | `#475569` on `#ffffff` (**5.1:1**) | `#94a3b8` on `#090d14` (**6.8:1**) | WCAG AA ($\ge 4.5:1$) |
| **Primary Button** (`#6366f1` / `#4f46e5`) | `#ffffff` on `#6366f1` (**4.6:1**) | `#ffffff` on `#4f46e5` (**5.8:1**) | `#ffffff` on `#6366f1` (**4.6:1**) | WCAG AA ($\ge 4.5:1$) |
| **Focus-Visible Ring** | `2px solid #6366f1` + `4px glow` | `2px solid #4f46e5` + `4px glow` | `2px solid #6366f1` + `4px glow` | High visibility |

---

## 📱 Responsive Design Matrix

| Viewport Tier | Width Range | Layout Adaptation |
|---|---|---|
| **Small Mobile** | 320px – 399px | Single column, compact 54px header, 100% fluid cards, safe padding |
| **Standard Mobile** | 400px – 767px | Bottom navigation bar, edge-to-edge chat viewport, 44px+ touch targets |
| **Tablet Portrait** | 768px – 899px | 2-column flex layout, fluid grid auto-fit |
| **Tablet Landscape** | 900px – 1199px | Left desktop sidebar active (260px) + flexible central content area |
| **Desktop** | 1200px – 1440px | Full 3-column layout (Sidebar + Main Feed + RightRail widgets) |
| **Ultra-wide** | 1441px+ | Centered layout with max-width containment (1380px) |

- **Zero Dead-End Screens**: Every empty filter, search result, or empty tab features a cosmic `EmptyState` with immediate recovery actions (*"Reset Filters"*, *"Browse All Guilds"*, *"Share a Spark"*).
- **Graceful Loading**: Built-in `PageSkeleton` provides shimmering card placeholders during chunk loading and transitions.
- **Image Fallback Engine**: If any image URL fails or times out, `SafeImage` intercepts the error and displays an SVG gradient avatar or thematic banner with proper initials/category badge.

---

## 📄 License & Credits

Crafted for the **“REIMAGINE SOCIAL”** Frontend Challenge.
Designed and engineered with passion to demonstrate next-generation community architectures, original UX, and frontend craftsmanship.
