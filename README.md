# ⚡ SYNAPSE | Reimagine Social

> **A Next-Generation Social Community Platform Built on Purposeful Participation, Collaborative Sprints, and Skill Synergy.**

[![Built with React](https://img.shields.io/badge/Built%20with-React%2019-61dafb.svg)](https://react.dev/)
[![Bundled with Vite](https://img.shields.io/badge/Bundled%20with-Vite%208-646cff.svg)](https://vitejs.dev/)
[![Styling](https://img.shields.io/badge/Styling-Vanilla%20CSS%20Design%20System-38bdf8.svg)](./src/index.css)
[![Persistence](https://img.shields.io/badge/Persistence-HTML5%20LocalStorage-10b981.svg)](./src/hooks/useLocalStorage.js)
[![Challenge](https://img.shields.io/badge/Submission-REIMAGINE%20SOCIAL%20Challenge-f43f5e.svg)](#)

---

## 🌟 The Core Concept: "Connect by Doing, Not Just Scrolling"

Traditional social networks optimize for **passive consumption, algorithmic outrage, and vanity follower counts**. Users scroll endlessly through disjointed feeds, consuming content without genuine connection.

**SYNAPSE rethinks social connection from first principles:**
- **From Passive Scrolling to Action Sparks**: Posts are not generic updates. They are structured as *Idea Sparks*, *Collaborative Challenges*, *Interactive Polls*, *Show & Tell (Proof-of-Work)*, and *Peer Inquiries*.
- **Topic Guilds over Algorithmic Echo Chambers**: Niche, high-signal spaces (Generative AI & Shader Lab, Climate Tech, Solo Founders, Spatial Audio, Street Photography) where creators establish shared rituals, manifestos, and active sprints.
- **Participatory Challenges & Sprints**: 48-hour jams, 7-day creative coding hackathons, and photowalks with live milestone trackers, XP karma bounties, and community showcases.
- **Skill Synergy Matching**: Instead of vanity follower counts, users discover collaborators based on complementary superpowers: **"Skills Offered"** vs **"Skills Needed"** (e.g., *Offers: React & WebGL / Seeks: Rust & Audio Synthesis*).
- **Zero Backend Required**: Fully functional client-side architecture using rich mock data and a resilient `useLocalStorage` persistence layer that maintains state across browser sessions.

---

## 🚀 Key Features

### 1. ⚡ Discover Dashboard
- **Personalized Welcome & Daily Intent Picker**: Choose your daily focus: *"All Sparks"*, *"Seeking Collabs"*, *"Live Challenges"*, or *"Proof of Work"*.
- **Filter Bar**: Seamlessly toggle across 10 topic categories (*Technology*, *Design*, *Science*, *Startups*, *Gaming*, *Music*, *Photography*, *Art*, *Education*).
- **Multi-Faceted Sorting**: Filter by *Trending*, *Newest*, *Most Active*, or *Recommended For You*.
- **Right Rail Ecosystem Widgets**: Fast access to *Trending Guilds*, *Active Sprints*, and *Synergy Matches*.

### 2. 💬 Interactive Sparks & Discussions Feed
- **Live Poll Voting**: Vote in community polls with real-time percentage calculations and visual distribution fills.
- **Micro-Interactions**: Instant like/unlike animations, bookmarking, and native clipboard link sharing with animated toast notifications.
- **Expandable Discussion Drawers**: Read peer insights and post your own comments directly into local storage.
- **Post Composer Modal**: Publish new Idea Sparks, Challenges, Community Polls, or Showcases.

### 3. 🏰 Topic Guilds & Laboratories
- **Reusable Community Cards**: Showcase cover imagery, member count, activity intensity meters (*Hyperactive*, *High*, *Active Sprints*, *Steady*), and 1-click Join/Joined states.
- **Deep Guild Hub Modal**: Explore guild manifestos, principles, active pinned sprints, and guild-exclusive discussions.
- **Community Creator**: Launch your own Guild with custom sigils, categories, guidelines, and inaugural challenges.

### 4. 🏆 Participatory Challenges & Hackathons
- **Sprint Cards**: Displays countdown timelines, difficulty rating (*Beginner Friendly*, *Intermediate*, *Advanced*), participant counters, and XP Karma bounties.
- **Event Detail & Milestones Checklist**: Track stage-by-stage progression (*Ideation*, *Prototype Build*, *Showcase*) with celebratory confetti triggers upon joining.

### 5. 🤝 Synergy Matcher & People Discovery
- **Matchmaking Engine**: Discover creators by their complementary skills (*Offers vs Seeks*).
- **Profile Cards & Detailed Drawer**: Explore user bios, karma statistics, past sparks, and mutual guilds.
- **One-Click Connect & Direct Message**.

### 6. 💬 Collaborative Chat & Messaging
- **Split-Pane Chat View**: Left thread list with real-time unread badges and search filter; right active chat with message bubbles.
- **Suggested Quick Replies**: Single-click responses (*"Let's pair on this!"*, *"Are you joining the upcoming sprint?"*).
- **Instant Message Sending**: Messages immediately append and persist in `localStorage`.

### 7. 🔔 Activity & Notifications Center
- Segmented activity feeds (*All*, *Sprints & Jams*, *Sparks & Comments*, *Guild Invites*).
- Mark individual notifications as read or use *"Mark All as Read"*.
- 1-click deep links that open the relevant discussion or challenge modal.

### 8. 👤 Impact Profile & Karma Dashboard
- Visual impact statistics: *Community Karma*, *Published Sparks*, *Challenges Sprinted*, and *Guild Memberships*.
- Interactive tabs: *My Sparks*, *Joined Guilds*, *Active Sprints*, and *Saved Sparks*.
- **Edit Profile Modal**: Modify name, handle, role headline, bio, location, avatar, and skill tags with immediate persistence.

### 9. 🎨 Centralized Design System & Theme Engine
- **Three Curated Color Modes**:
  - 🌌 **Deep Slate (Dark Mode)** - Default high-contrast creative palette.
  - ☀️ **Porcelain (Light Mode)** - Clean paper-like daylight layout.
  - 🖤 **Midnight OLED** - True pure black for AMOLED screens.
- **Glassmorphic Surface Design**: Backdrop filters, subtle border glows, and tactile elevation.
- **Responsive Layout Engine**: Desktop 3-column grid, tablet 2-column view, and ergonomic mobile sticky header + bottom navigation bar.

---

## 🛠️ Architecture & Tech Stack

```
SYNAPSE Architecture
├── Frontend Core: React 19 + Vite 8
├── Styling: Pure Vanilla CSS Design System (Custom Properties, BEM utilities)
├── State Management: Centralized AppContext (Reactive Provider Pattern)
├── Persistence: Resilient useLocalStorage Hook (JSON Serialization & Fallbacks)
├── Iconography: Lucide React (Accessible SVG Icons)
├── Feedback: Dynamic Toast Notification System & Canvas Confetti
└── Data Layer: Modular Static Mock Schemas (Users, Communities, Posts, Events, Messages, Notifications)
```

### Directory Structure

```text
src/
├── assets/                  # Static media and brand graphics
├── components/
│   ├── common/              # Navbar, Sidebar, MobileNav, RightRail, Modal, Toasts, EmptyState, ErrorBoundary, Footer
│   ├── feed/                # PostCard, CreatePostModal, PostDetailModal, FilterBar
│   ├── communities/         # CommunityCard, CommunityDetailModal, CreateCommunityModal
│   ├── events/              # EventCard, EventDetailModal
│   ├── people/              # PersonCard, ProfileDetailModal
│   ├── messages/            # MessagesView (Split chat layout)
│   ├── notifications/       # NotificationsView
│   ├── profile/             # ProfileView, EditProfileModal
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
│   ├── DiscoverPage.jsx     # Main feed, hero, intent picker, right rail
│   ├── CommunitiesPage.jsx  # Guilds directory & filter tabs
│   ├── EventsPage.jsx       # Challenges, jams, and sprint milestones
│   ├── PeoplePage.jsx       # Synergy skill matcher directory
│   └── ExplorePage.jsx      # Unified search matrix across all entities
├── styles/
│   └── index.css            # Complete design system tokens, themes, & media queries
├── App.jsx                  # Main view router & modal mount hub
└── main.jsx                 # Application entrypoint
```

---

## 💻 Local Development Setup

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

3. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The production-optimized bundle will be created in `./dist`.

---

## 🚀 GitHub Pages Deployment

The project is pre-configured with `base: './'` in `vite.config.js` for seamless deployment to GitHub Pages or any static host.

### Step-by-Step GitHub Pages Deployment:

1. Create a remote repository on GitHub (e.g. `reimagine-social`).
2. Link your local repository and push:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Deploy using `gh-pages` branch:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```
4. In your GitHub repository settings, navigate to **Pages** and set the source branch to **`gh-pages`** (or use the GitHub Actions workflow).

---

## ♿ Accessibility & Performance Highlights

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, and `<footer>` landmarks.
- **ARIA Dialog Compliance**: Modals feature `role="dialog"`, `aria-modal="true"`, focus trapping, and keyboard `Escape` dismissal.
- **Keyboard Navigation**: Focus-visible outlines on all interactive buttons, inputs, and tab triggers.
- **Contrast Ratios**: Verified high APCA contrast ratios in both Dark, Light, and Midnight OLED themes.
- **Sub-400ms Production Build**: Clean bundle splitting and tree-shaking with zero bloatware libraries.

---

## 📄 License & Credits

Crafted for the **“REIMAGINE SOCIAL”** Frontend Challenge.
Designed and engineered with passion to demonstrate next-generation community architectures, original UX, and frontend craftsmanship.
# SYNAPSE-REIMAGINE-SOCIAL
