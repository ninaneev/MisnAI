# Taskoona

**A local-first execution system for solopreneurs and early companies.**

Taskoona helps people building from zero to first traction decide what to do next, keep priorities visible, and turn strategy into daily action. It combines business context, goals, personality, constraints, milestones, habits, and decision support into a focused operating system for early execution.

Taskoona is an open-source app by Flowity AI. It starts as a free local-first core and is designed to grow into its own standalone micro-SaaS product.

Initial public URL: `taskoona.flowity.ai`.

## What It Does

Most productivity tools give you a blank list. Taskoona gives you a working system.

You bring your context: what you are building, your current stage, your goals, your life priorities, your personality, and your constraints. Taskoona uses that context to shape daily execution blocks, strategy phases, milestones, history, and decision matrices. Everything works locally in the browser.

| Area | Purpose |
| --- | --- |
| **Today** | Daily execution blocks grouped by shift. Completions reset by local day. |
| **Strategy** | Staged business progression across phases, with future phases still visible. |
| **Milestones** | Progress markers with completion timing and momentum tracking. |
| **History** | Durable progress memory across daily execution, strategy, milestones, and decisions. |
| **Context** | Business description, goals, personality, Q&A answers, vision, and lifestyle priorities. |
| **Decisions** | Weighted decision matrix for comparing options before committing. |
| **Templates** | Local playbooks for validation, launch, weekly review, and founder life rhythm. |
| **Settings** | Profile editing, context management, and reset controls. |

## Product Positioning

Taskoona is for:

- solo founders
- solopreneurs
- early companies with no or little revenue
- independent operators building a real business
- teams that need structure before they need heavy management software

Taskoona should feel practical, personal, structured, and useful before any advanced AI layer is added.

The product is built for early execution: business context, daily momentum, strategy sequencing, decisions, and life-aware planning in one local-first workspace.

## Open-Core Boundary

The public Taskoona repo is the free local-first core. It includes deterministic task generation, templates, decision matrices, import/export backup, and all browser-based execution flows with no hosted AI and no server cost.

The private `taskoona-cloud` repo is reserved for future paid infrastructure: hosted AI review, cloud-generated plans, sync, accounts, billing, teams, integrations, hosted backups, private prompts, evals, admin tools, and customer data handling.

See [`docs/OPEN_CORE.md`](docs/OPEN_CORE.md) for the product boundary and [`docs/CPANEL_HOSTING.md`](docs/CPANEL_HOSTING.md) for the first no-cost cPanel deployment path.

## Design Principles

**Context before tasks.** Daily actions should come from the user's real business context, goals, stage, and constraints.

**Execution and life together.** Business-building and life structure belong in the same system when the user is the operating engine.

**Local-first by default.** Taskoona should remain useful and trustworthy before cloud sync, backend systems, or AI features are connected.

**Momentum over perfection.** History is durable, milestones are timestamped, and progress should stay visible.

**Decision support, not decision automation.** The app can structure a choice, but the user remains responsible for judgment.

## Brand

Taskoona uses its own brand system, separate from Flowity AI.

The selected palette fits the product because it has three clear signals:

- coral for action and urgency
- ink for focus and seriousness
- lime for progress and completion

| Token | Hex | Usage |
| --- | --- | --- |
| `coral` | `#6BC8D6` | Primary actions, active states, key emphasis |
| `coral-dim` | `#4E8F99` | Subdued action labels and secondary emphasis |
| `lime` | `#A7F06D` | Progress, completion, positive momentum |
| `ink` | `#15191A` | Core background and brand anchor |
| `bg-base` | `#0B0F10` | Page background |
| `bg-surface` | `#171C1D` | Panels and inputs |
| `bg-surface2` | `#222829` | Elevated surfaces |
| `border` | `#2B3334` | Dividers and outlines |
| `text` | `#F3F0E8` | Primary text |
| `muted` | `#9CA3A0` | Secondary text |
| `dim` | `#333B3C` | Disabled and quiet UI |
| `red` | `#E45D5D` | Risk, reset, destructive actions |
| `blue` | `#6DAAF0` | Informational states |
| `purple` | `#A982FF` | Optional advanced/intelligence states |

The app should avoid generic AI purple/cyan gradients. It can be energetic without looking childish, and serious without becoming cold.

## Tech Stack

| Layer | Tooling |
| --- | --- |
| Frontend | React 18, TypeScript, Vite |
| Styling | Tailwind CSS with custom design tokens |
| State | Zustand |
| Server-state foundation | TanStack Query |
| Routing | React Router v6 |
| Testing | Vitest, React Testing Library |
| Planned backend path | Supabase |

## Getting Started

```bash
# Clone
git clone https://github.com/ninaneev/Taskoona.git
cd Taskoona

# Install
npm install

# Run locally
npm run dev
```

The app runs in the browser and stores user state locally.

## Commands

```bash
npm run dev      # Start Vite
npm run build    # Type-check and build
npm run test     # Run Vitest
npm run lint     # Run ESLint
npm run format   # Format src with Prettier
```

## Project Structure

```text
src/
  components/
    decisions/      # Decision matrix components
    layout/         # App shell and navigation
    onboarding/     # Onboarding form pieces
    ui/             # Design primitives
  data/             # Seeded habits, strategy, milestones, personality mappings
  hooks/            # Execution logic and derived state
  pages/            # Main product surfaces
  stores/           # Zustand stores
  types/            # Shared TypeScript types
  utils/            # Constants and helpers
```

## Core Rules

1. Daily completions reset by local day.
2. Strategic progress persists until explicitly changed.
3. History is durable progress memory, not disposable UI noise.
4. Future phases remain visible even before they are unlocked.
5. When daily execution is complete, the app surfaces the next strategic move.
6. Milestones preserve completion timing.
7. Personality adaptation changes framing and emphasis, not product integrity.
8. The app remains useful before advanced AI features are connected.
9. User-supplied business context, goals, and life priorities shape recommendations.
10. Local-first usage is a core product value.

## Roadmap

- [x] Context-aware daily execution blocks
- [x] Strategy phases and unlock logic
- [x] Milestone tracking
- [x] History log
- [x] Decision matrix
- [x] Founder templates
- [x] Import/export backup
- [x] Local no-op cloud boundary
- [ ] Stronger business-context onboarding
- [ ] Life-task coordination
- [ ] Supabase sync
- [ ] Optional AI review layer

## License

MIT
