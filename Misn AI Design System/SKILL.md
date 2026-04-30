---
name: Misn AI Design System
description: |
  Use when creating any UI, marketing surface, slide, or document on behalf of
  Misn AI — the founder execution app (internal codename "Misn AI", being
  rebranded). Covers the dark-botanical aesthetic: near-black forest surfaces,
  pink action, gold strategic accents, serif display + mono labels. Pulls from
  the live codebase; every token traces to tailwind.config.js or src/index.css.
---

# Misn AI — Design System

You are designing for **Misn AI**, a founder execution OS. The product feels **serious, private, premium, operational** — not a task app, not an AI SaaS toy, not a productivity dashboard. A founder-grade cockpit.

## Before you start

1. **Read `README.md`** — full content fundamentals, visual foundations, iconography. Don't skip.
2. **Import `colors_and_type.css`** in any HTML you write — it defines `--pink`, `--gold`, `--emerald-light`, `--text`, `--muted`, `--font-display`, `--font-sans`, `--font-mono`, etc.
3. **Browse `preview/`** for concrete examples of every design-system card (type, color, spacing, components, brand).
4. **Consult `ui_kits/app/`** — a working React click-through of Today, Strategy, Milestones, and Decide screens. Reuse the primitives (`primitives.jsx`) instead of rebuilding.

## Non-negotiables

- **Three accents only:** pink (action) · gold (strategic value) · emerald (ambient). Sage is the minor 4th (rest). **No greys.** **No bluish-purple AI gradients.** **No cyan.**
- **Mono label at 10–11px, 0.18–0.35em letter-spacing, UPPERCASE** is the signature type move. Use it everywhere for kickers, badges, metadata.
- **Serif for headlines (Playfair Display), sans for body (Inter), mono for labels (IBM Plex Mono).**
- **No emoji** in UI chrome, ever. Use Lucide icons at 1.5px stroke, 14–18px.
- **No entrance animations, no springs, no bounces.** Color/transform transitions 120–500ms ease only.
- **Voice: "you, not we."** Operator, not marketer. No "Let's crush it" energy. See README voice section for examples.

## Key primitives (import from `ui_kits/app/primitives.jsx`)

- `<Button variant="primary|ghost|danger|gold" size="sm|md">` — pink CTA, ghost for secondary, gold for strategic.
- `<Card surface="default|ink|plum|forest|amber" accent="pink|gold|emerald|sage">` — accent prop draws the signature 3px left-border.
- `<HeroPanel>` — emerald gradient + thin gold border, for today-hero and similar.
- `<Chip variant="pink|gold|emerald|sage|muted">` — mono tag pill.
- `<Progress value={0-100} tone="pink|emerald|gold" label count>` — the only animated element.
- `<Checkbox accent="pink|gold|emerald|sage">` — square, filled-when-checked.
- `<MonoLabel color="muted|pink|gold|emerald|gradient" tracking={0.22}>` — the signature typographic move.

## Task naming

When creating a new HTML artifact for Misn AI, place it under a sensible folder (`decks/`, `prototypes/`, `marketing/`) and name it descriptively: `Founder Onboarding Flow.html`, not `prototype-v3.html`.

## Caveats

- The codebase still contains the string "Misn AI" and `.misn-brand` CSS classes. Treat these as the prior brand; always use **Misn AI** in new work.
- Fonts are Google Fonts CDN. If licensed files are dropped into `fonts/`, remove the `@import` at the top of `colors_and_type.css`.
- No marketing site exists in the codebase. The UI kit is app-only. For marketing surfaces, extrapolate from the same tokens but feel free to scale up the serif display type.
