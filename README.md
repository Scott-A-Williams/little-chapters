# Little Chapters

Little Chapters is a warm, calm, mobile-first family journal web application designed for parents to effortlessly capture daily moments, developmental leaps, milestones, and daily rhythms.

Built from scratch with React, Vite, TypeScript, and modern modular architecture. Designed for testing with parent cohorts and architected for packaging to Apple App Store and Google Play.

---

## Brand Aesthetic & Themes

Little Chapters features a warm, premium family-journal aesthetic rather than a clinical baby tracker appearance.

### Default Palette
- **Nottingham Blue:** `#10263B`
- **Malaysia Blue:** `#009BC1`
- **Background:** `#FDFBF9` (Warm paper)
- **Primary Text:** `#10263B`

### Theme System
Five complementary color palettes available in **Light**, **Dark**, and **System** modes:
1. **Default:** Heritage Nottingham & Malaysia blues with calm warm-paper background.
2. **Sage:** Gentle botanical greens with natural eucalyptus undertones.
3. **Peach:** Sunlit apricot and welcoming terracotta tones.
4. **Lavender:** Soothing lilacs, soft wisteria, and peaceful dusk violet.
5. **Ocean:** Deep sea navy, serene sea glass, and refreshing coastal aqua.

---

## Architectural Separation & Project Structure

The codebase strictly decouples UI components, data models, persistence/services, and business logic:

```
little-chapters/
├── index.html                   # HTML entry point with mobile viewport & PWA meta tags
├── package.json                 # Dependency definitions (React 18, Vite 6, TypeScript, Lucide)
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
├── .env.example                 # Clean Firebase configuration template
├── .gitignore                   # Standard Git exclusions
├── public/
│   ├── favicon.svg              # Brand vector icon
│   └── manifest.json            # PWA manifest for installable mobile home-screen experience
└── src/
    ├── types/                   # Central Data Models & Type Contracts
    │   ├── moment.ts            # Central Moment data model (all 18 categories)
    │   ├── child.ts             # Child profile model
    │   ├── user.ts              # Parent & Caregiver models
    │   ├── theme.ts             # Theme palettes and modes contracts
    │   └── index.ts             # Type exports
    │
    ├── config/                  # Configuration Layer
    │   ├── env.ts               # Type-safe environment variable reader
    │   └── firebase.ts          # Clean Firebase configuration layer (env vars)
    │
    ├── services/                # Business Logic & Persistence Abstraction
    │   ├── storage/
    │   │   ├── storageAdapter.ts       # Storage interface
    │   │   └── localStorageAdapter.ts  # Offline-first storage implementation
    │   ├── momentService.ts     # Moment CRUD, querying, search, and filtering
    │   ├── childService.ts      # Child profile management & active child selection
    │   ├── categoryMeta.ts      # Category metadata, icons, labels, and 1-tap presets
    │   ├── seedData.ts          # Sample data for initial testing
    │   └── exportService.ts     # CSV export and JSON backup engine
    │
    ├── context/                 # Application State Providers
    │   ├── ThemeContext.tsx     # Palette & Light/Dark/System mode state
    │   ├── ChildContext.tsx     # Active child & profile switcher state
    │   └── MomentContext.tsx    # Moments store, Quick Log drawer, and user feedback
    │
    ├── themes/                  # Theme Palette Definitions
    │   └── palettes.ts          # Definitions for Default, Sage, Peach, Lavender, Ocean
    │
    ├── components/              # Reusable Modular UI Components
    │   ├── common/              # Atomic primitives (Button, Card, Badge, Modal, BottomSheet, EmptyState)
    │   ├── layout/              # Shell chrome (Header, BottomNav, AppShell)
    │   ├── moment/              # MomentCard, MomentCategoryIcon, QuickLogModal
    │   ├── dashboard/           # TodaySummary, QuickActionGrid, MemoryPromptCard, RecentMomentsList
    │   └── settings/            # ThemeSelector, ModeToggle
    │
    ├── views/                   # Main Application Views
    │   ├── DashboardView.tsx    # Home dashboard with today's rhythm and recent moments
    │   ├── JourneyView.tsx      # Little Chapters and Milestones view
    │   ├── TimelineView.tsx     # Searchable chronological feed with category filtering
    │   └── SettingsView.tsx     # Theme switcher, CSV/JSON export, and cloud status
    │
    ├── App.tsx                  # Root application component
    ├── main.tsx                 # React DOM mount point
    └── index.css                # CSS custom properties, typography, and mobile ergonomics
```

---

## Moment Data Model

The core interaction of Little Chapters is **"capture a moment"**. The `Moment` model represents:

- `milestone` • `first` • `memory` • `activity` • `photo` • `quote` • `food` • `allergy_reaction` • `growth` • `health` • `medication` • `sleep` • `feeding` • `nappy_toileting` • `tooth` • `bath` • `important_date` • `custom`

Each moment record stores:
- `id`: unique identifier
- `childId`: associated child
- `dateTime`: timestamp of the event
- `title`: summary or activity title
- `notes`: optional journal text
- `category`: moment type
- `tags`: searchable labels
- `photos`: photo attachments
- `createdBy`: creator name / user id
- `createdAt` & `updatedAt`: ISO timestamps
- `categoryData`: category-specific structured fields (e.g. feed type/duration, sleep quality, nappy condition, growth measurements, quote text & context)

---

## Running the Application Locally

1. **Build test / TypeScript check:**
   ```bash
   npm run build
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

3. **Preview production build:**
   ```bash
   npm run preview
   ```
