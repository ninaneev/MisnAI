# MOVA — Development Context for Claude Code

## What This Project Is
Mova is a dynamic execution engine for solopreneurs. Not a to-do app.
It combines personality-driven habits, business-phase task unlocking, milestone
tracking, and an AI review layer. Think: "the system that tells you exactly what
to do next, based on who you are and where your business is."

## Tech Stack
- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS only (no inline styles, no CSS modules)
- **State:** Zustand (client) + TanStack Query (server)
- **Routing:** React Router v6
- **Backend/DB:** Supabase (auth + PostgreSQL + real-time)
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint + Prettier
- **Power Tier:** FastAPI + Ollama + LangChain/LangGraph + CrewAI + pgvector

## Design Tokens (use these exact values)
```
bg-base:      #07070A
bg-surface:   #0D0D12
bg-surface2:  #111118
border:       #1C1C28
gold:         #C9A84C
gold-dim:     #8A6E2F
text:         #EDE8DF
muted:        #6B6878
dim:          #2A2A38
red:          #C94C4C
green:        #4CC97A
blue:         #4C8EC9
purple:       #8B4CC9
```
Display font: Georgia serif
Label/code font: Courier New monospace

## Directory Structure
```
src/
├── components/
│   ├── ui/             # Button, Card, Badge, Checkbox, ProgressBar
│   ├── daily/          # DailyHabit, DailyBlock, ShiftLabel, DailyProgress
│   ├── strategy/       # PhaseCard, StrategyItem, PhaseProgress
│   ├── milestones/     # MilestoneItem, MilestoneTimeline, NextStepCard
│   ├── history/        # HistoryEntry, HistoryGroup, HistoryFilter
│   ├── onboarding/     # MBTIQuiz, StageSelector, GoalSetter, VisionBuilder
│   └── layout/         # AppShell, NavBar, Header, TabBar
├── pages/
│   ├── DailyPage.tsx
│   ├── StrategyPage.tsx
│   ├── MilestonesPage.tsx
│   ├── HistoryPage.tsx
│   ├── VisionPage.tsx
│   ├── SettingsPage.tsx
│   └── OnboardingPage.tsx
├── hooks/
│   ├── useDaily.ts         # daily completion logic + reset
│   ├── useStrategy.ts      # phase progress + unlock logic
│   ├── useMilestones.ts    # milestone checks + timestamps
│   ├── useHistory.ts       # history log CRUD
│   ├── usePersonality.ts   # MBTI adaptation logic
│   └── api/                # supabase query hooks
├── stores/
│   ├── userStore.ts        # profile, MBTI, goals
│   ├── dailyStore.ts       # today's completions
│   ├── strategyStore.ts    # phase completions
│   └── milestoneStore.ts   # milestone completions + timestamps
├── types/
│   ├── daily.ts
│   ├── strategy.ts
│   ├── milestone.ts
│   ├── personality.ts
│   └── user.ts
├── utils/
│   ├── dateUtils.ts
│   ├── personalityUtils.ts
│   └── constants.ts
├── lib/
│   ├── supabase.ts
│   └── queryClient.ts
└── data/
    ├── dailyHabits.ts      # all 12 habit definitions
    ├── strategyPhases.ts   # all 4 phases with tasks
    ├── milestones.ts       # all milestone definitions
    └── personalityMaps.ts  # MBTI → adaptations
```

## Core Business Rules (NEVER break these)
1. Daily completions MUST reset at midnight local time
2. Strategic completions MUST persist until manually unchecked
3. History log is APPEND-ONLY — no deletions ever
4. Phase N+1 items are visible but locked until Phase N is 100% complete
5. When all daily items done, surface next uncomplete strategic item as bonus
6. Milestone completion records exact timestamp permanently
7. Personality type affects: task order, block descriptions, emphasis areas
8. Storage: Supabase when auth'd, localStorage as fallback

## Git Rules
- Branch from `develop` for all features
- Branch naming: `feature/`, `fix/`, `refactor/`, `docs/`
- Commits: conventional commits (feat/fix/refactor/style/docs/test/chore)
- Never commit directly to `main` or `develop`
- PR to develop when feature complete
- PR to main only for releases (tag with semver)

## Code Rules
- TypeScript strict mode — no `any`
- Named exports everywhere (except page-level default exports)
- No comments explaining *what* code does — code should be self-documenting
- Comments only for *why* (business logic explanation)
- Components under 150 lines — split if larger
- Hooks contain business logic, components contain rendering only
- No prop drilling past 2 levels — use Zustand store
- All user-visible text in English

## What NOT to do
- Do NOT add "built with Claude", "powered by AI", or any AI attribution anywhere
- Do NOT use inline styles
- Do NOT use CSS modules
- Do NOT use class components
- Do NOT use Redux (use Zustand)
- Do NOT add unnecessary dependencies
- Do NOT add loading spinners for operations under 200ms
- Do NOT use `console.log` in production code (use proper error boundaries)

## Current Phase
**Phase 1 — Core scaffold**
Goal: Working React app with daily habits, strategy phases, milestones, history.
No auth required yet. localStorage only.
Target: Fully usable as personal productivity tool within this phase.

## Environment Variables
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_CLAUDE_API_KEY=        # Pro tier only
VITE_OLLAMA_URL=            # Power tier only
```

## Running Locally
```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run test
npm run lint
```

## Key Features to Build (in order)
1. App shell with navigation
2. Daily page — habits with midnight reset
3. Strategy page — phases with unlock logic
4. Milestones page — with next-step queue
5. History page — grouped by date
6. Vision page — lifestyle goals display
7. Onboarding flow — MBTI + business setup
8. Settings page — edit profile
9. Supabase integration — auth + persistence
10. AI Review — Claude API weekly review
11. Power tier — Docker + Ollama agent
