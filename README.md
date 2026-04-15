# Mova

**A local-first execution operating system for founders and solopreneurs.**

Mova helps you decide what to do next — in business and in life — based on who you are, what you're building, and what matters most right now. It combines your business context, personality, goals, and strategic stage into a single system that generates structured daily action and tracks momentum over time.

Part of the [Flowity AI](https://github.com/ninaneev) ecosystem. Open-source. Runs entirely in your browser.

---

## What it does

Most productivity tools give you a blank list. Mova gives you a system.

You bring your context — your business description, stage, goals, personality type, life priorities — and Mova generates context-aware daily execution blocks, sequences your strategy across phases, tracks milestones, logs history, and helps you weigh major decisions with a structured matrix. Everything is stored locally. Nothing leaves your machine.

### Core surfaces

| Surface | What it does |
|---|---|
| **Today** | Daily execution blocks grouped by shift (morning / afternoon / evening). Each block surfaces context-aware substeps drawn from your strategy, goals, and business description. Completions reset by day. |
| **Strategy** | Four-phase strategic roadmap with locked/unlocked progression. Tracks which moves are done, which are next. Stores your strategic context and uses it to sharpen daily tasks. |
| **Milestones** | Persistent progress markers across business and life. Completion timestamps preserved. Shows what's been won and what's still ahead. |
| **Context** | Everything Mova knows about you — business description, goals, sports, personality, Q&A answers, vision goals. Edit any field to immediately sharpen your execution blocks. |
| **Decisions** | Weighted decision matrix for comparing strategies and goals. Define criteria, weight each one (1–10), grade every option, get a ranked result — then write a counter-argument against the winner before committing. Decision support, not decision automation. |
| **History** | Durable log of daily completions. Treated as momentum memory, not disposable UI noise. |
| **Settings** | Full profile editor — name, business stage, MBTI, goals, vision goals, decision matrices. Danger zone for full reset. |

---

## Design principles

**Local-first.** Your context is yours. All state persists in `localStorage` via Zustand. No account required, no server dependency.

**Context-driven execution.** Daily tasks are not generic. They are generated from your business description, current strategy phase, pending strategic moves, life goals, and vision — updated in real time as you edit your context.

**Staged strategy.** Execution is sequenced across four phases. Phases unlock as previous ones complete. The system always shows what comes next, even when it's not yet reachable.

**Identity-aware.** MBTI adaptation changes framing and emphasis across the system — not cosmetically, but in how tasks are described and prioritised.

**Verdict pressure.** The decision matrix requires you to argue against the winning option before you act on it. Numbers are a starting point, not a verdict.

**Momentum over perfection.** History is durable. Milestones are timestamped. The system is designed to make progress visible so the user keeps moving.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite |
| Styling | Tailwind CSS with custom design tokens |
| State | Zustand with `persist` middleware |
| Server state | TanStack Query (foundation for future backend) |
| Routing | React Router v6 |
| Testing | Vitest + React Testing Library |
| Planned backend | Supabase |
| Planned intelligence | FastAPI + local/agentic stack |

---

## Getting started

```bash
# Clone
git clone https://github.com/ninaneev/Mova.git
cd Mova

# Install
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run test      # Run test suite (Vitest)
npm run lint      # ESLint
```

---

## Project structure

```
src/
├── pages/              # Route-level surfaces (Daily, Strategy, Milestones, etc.)
├── components/
│   ├── layout/         # Nav, Layout, AppShell
│   ├── ui/             # Design primitives (Badge, Button, Card, Checkbox, ProgressBar)
│   ├── daily/          # Daily block components
│   ├── decisions/      # Decision matrix components
│   ├── milestones/     # Milestone components
│   ├── strategy/       # Strategy phase components
│   └── history/        # History components
├── stores/             # Zustand stores (user, daily, strategy, milestone, decision)
├── hooks/              # Business logic (useDaily, useStrategy, useMilestones, useDecisions, useDailyContext)
├── data/               # Seed data (habits, strategy phases, milestones, personality maps)
├── types/              # TypeScript interfaces
└── utils/              # Constants, date utilities
```

Business logic lives in hooks and stores. Rendering logic lives in components. Pages compose them.

---

## Design tokens

Mova uses a dark, disciplined visual language — intentional, founder-grade, not playful.

| Token | Value | Use |
|---|---|---|
| `bg-base` | `#07070A` | Page background |
| `bg-surface` | `#0D0D12` | Cards and panels |
| `bg-surface2` | `#111118` | Input fields, nested surfaces |
| `border` | `#1C1C28` | All borders |
| `gold` | `#C9A84C` | Primary accent — active, important |
| `gold-dim` | `#8A6E2F` | Subdued gold |
| `text` | `#EDE8DF` | Primary text |
| `muted` | `#6B6878` | Secondary text, labels |
| `dim` | `#2A2A38` | Progress bar backgrounds |
| `red` | `#C94C4C` | Destructive actions |
| `green` | `#4CC97A` | Completion states |
| `blue` | `#4C8EC9` | Informational |

Typography: `font-display` (serif) for headings and task labels. `font-mono` for system labels, metadata, and UI controls.

---

## Context model

Mova works because you give it context. The more complete your profile, the more specific your daily execution blocks become.

| Field | What it feeds |
|---|---|
| Business description | Daily task substeps, strategic framing |
| Business goals | Morning review, deep work focus, outreach targets |
| Business stage | Phase unlocking, strategic sequencing |
| Life goals | Evening review, life-task coordination |
| Sports & exercise | Morning block, habit framing |
| MBTI | Personality adaptation across task descriptions |
| Vision goals | Outreach and content blocks |
| Custom context | All daily task generation |
| Q&A answers | Sharpens task generation further |
| Strategy custom context | Strategy-level daily framing |

---

## Decision matrix

The Decisions surface is a weighted multi-criteria decision aid — useful when you're choosing between strategic directions, goals, or major moves.

**How it works:**

1. Create a matrix and name the decision.
2. Add criteria — the things that actually matter (revenue impact, strategic fit, time to result, energy cost, etc.).
3. Weight each criterion from 1–10.
4. Add your options (candidate strategies, goals, paths).
5. Grade each option against every criterion (1–10).
6. Mova computes: `score = Σ(grade × weight) / Σ(10 × weight) × 100`
7. Options are ranked. The winner is surfaced with a verdict.
8. Write your counter-argument — the strongest case *against* the winner — before you commit.

The counter-argument step is mandatory in spirit. The numeric result tells you what your stated values imply. Your counter-argument tests whether those values were complete.

Matrices are editable at any time from both the Decisions page and Settings.

---

## Roadmap

- [ ] Supabase sync — optional cloud persistence, multi-device
- [ ] AI review layer — daily brief generated from strategy + context + history
- [ ] Flowity Brain integration — signal intelligence feeding into Mova execution
- [ ] Mobile PWA — offline-first, installable
- [ ] Shared context templates — import a business context starter
- [ ] Milestone suggestions — AI-generated milestone proposals based on stage and goals
- [ ] Weekly review surface — structured reflection tied to history and strategy progress

---

## Part of Flowity AI

Mova is the execution layer of the [Flowity AI](https://github.com/ninaneev) ecosystem.

**Flowity Brain** is the intelligence engine — it ingests business signals, extracts patterns, and generates executive insight for leadership teams.

**Mova** is where that intelligence becomes action — a local-first OS for the founder running the operation.

They are different products. Mova is open-source and self-contained. Flowity Brain is a commercial intelligence service.

---

## License

MIT
