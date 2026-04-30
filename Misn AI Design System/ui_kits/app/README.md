# Misn AI - App UI Kit

An interactive click-through recreation of the Misn AI app, built from the source codebase. Use it as a reference for screens, flows, and new feature concepts.

## What's inside

| File | What it is |
|---|---|
| `index.html` | Entry point - renders the full shell and routes between screens |
| `primitives.jsx` | `Icon`, `Button`, `Card`, `HeroPanel`, `Chip`, `Progress`, `Checkbox`, `MonoLabel` |
| `AppShell.jsx` | 288px left-rail nav with Misn AI brand block and phase indicator footer |
| `TodayScreen.jsx` | Hero (today's verb-first headline) plus focus blocks and saved-next-move card |
| `StrategyScreen.jsx` | 4 staged phases (done / active / next / later) with progress |
| `DetailScreens.jsx` | `MilestonesScreen` and `DecisionsScreen` |

## Patterns worth reusing

- Left-rail nav active state - red 2px left-border and faint action tint
- Focus Block card - strong structural hierarchy with one current action color
- Phase row - future phases stay visible instead of disappearing
- Decision matrix - the winner row gets the red action emphasis

## Loading pattern

Follow the order in `index.html`:

```html
<script type="text/babel" src="primitives.jsx"></script>
<script type="text/babel" src="AppShell.jsx"></script>
<script type="text/babel" src="TodayScreen.jsx"></script>
<script type="text/babel" src="StrategyScreen.jsx"></script>
<script type="text/babel" src="DetailScreens.jsx"></script>
```

Each file exports its components onto `window` at the bottom, so later scripts can reference them directly.

## What's not here

- Context, Templates, History, Settings - stubbed as placeholder screens
- Mobile layouts - this kit remains desktop-oriented
- Real data and state - everything is hardcoded for demonstration
