# Misn AI Design Direction

## Aesthetic: Luxury Emerald + Gold Executive OS

### Inspiration References
1. Dark emerald silk with flowing gold wave lines — the background texture
2. Teal marble with gold veins (MiVida) — marble depth, gold precision
3. Botanical leaf close-up: deep green + pink/magenta streaks — organic life
4. Premium coaching website (Aurelia Vance) — dark emerald marble, gold curves, clean layout
5. GreenSpace botanical website — near-black bg, white typography, minimal cards on dark
6. Emerald smoke ink art with gold veins — flowing organic shapes, NOT rigid geometry
7. Vineyard Green #bfd58e — muted sage, appears in natural leaf references

### Core Palette (intentional, not decorative)
| Token     | Hex       | Role                                              |
|-----------|-----------|---------------------------------------------------|
| bg-base   | #071812   | Page background — near-black emerald              |
| bg-surface| #0D2B1E   | Cards, panels — deep forest                       |
| bg-surface2| #123425  | Elevated/nested surfaces                          |
| border    | #1E4A2E   | Structural dividers — visible but not distracting |
| gold      | #C9A84C   | Primary accent — precious decisions, milestones   |
| gold-light| #E2C16E   | Gold highlights, progress fills                   |
| pink      | #FF3AAE   | Brand energy — Misn AI label, active day actions |
| sage      | #8FAF6E   | Rest, recovery, life balance                      |
| emerald   | #16A37A   | Growth, momentum, completion                      |
| text      | #FDF4E3   | Primary — warm ivory (never pure white)           |
| muted     | #8FBA9F   | Secondary — soft sage, never gray                 |

### Strategic Color Assignments (intentional meaning)
Each color carries semantic weight — not decoration:

**Pink `#FF3AAE`** = Energy, action, brand identity
- Misn AI brand label
- BODY (physical energy blocks) 
- LIFE (life priority blocks)
- Active nav item
- Primary CTAs

**Gold `#C9A84C`** = Value, decisions, precision
- BUILD blocks (building value)
- Milestones achieved
- Progress fills near completion
- Gold wave lines in background

**Emerald `#16A37A`** = Growth, momentum, forward motion
- GROW blocks (learning/growth)
- Completed states
- Milestone progress

**Sage `#8FAF6E`** = Balance, recovery, sustainability
- REST blocks (recovery/rest)
- Life goals sections

**Page headers by section** (each page has one dominant color story):
- Daily → Pink (today is action)
- Strategy → Gold (strategy is precious decisions)
- Milestones → Emerald (growth achieved)
- Context/Vision → Sage (life view)
- History → Muted dark (memory, not action)
- Decisions → Gold (weighing choices)
- Settings → Dark neutral (system)

### Background System
Flowing gold wave SVG lines over near-black emerald.
Body background is fixed (parallax). Cards float above it.
Subtle pink radial bloom at top — brand warmth.
Gold bloom at bottom-right — depth and luxury.

### Typography Hierarchy
- Page h1: Playfair Display, 3xl, warm ivory
- Section labels: IBM Plex Mono, 10px, uppercase, 0.35em tracking
- Body: Inter, 14px, warm ivory at 85%
- Meta/timestamps: IBM Plex Mono, 11px, muted sage
- Brand "MISN AI": Mono, 10px, pink, 0.35em tracking

### Card Design
- Background: #0D2B1E (deep forest)
- Left border: 4px solid — color encodes block TYPE (see above)
- Border right/top/bottom: #1E4A2E (structural, dark green)
- No heavy box-shadow — subtle depth only
- Corner radius: rounded-2xl
