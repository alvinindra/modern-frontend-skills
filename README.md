# skills

Claude Code skill for building premium frontend interfaces.

## Structure

```
skills/
├── SKILL.md                    # Main skill — triggers on "landing page", "premium UI", etc.
└── references/
    └── design-system.md        # Full rulebook: code patterns, easing curves, forbidden patterns
```

## What this skill does

Builds premium, Awwwards-grade interfaces by fusing two philosophies:

- **The Awwwards cinematic layer** — Oversized typography, scroll-choreographed narratives, grain overlays, parallax, editorial boldness
- **The Emil Kowalski craft layer** — Every animation has a purpose. Buttons feel pressed. Popovers scale from their trigger. Invisible details compound.

## Active baseline

| Dial | Value | Meaning |
|---|---|---|
| DESIGN_VARIANCE | 8 | Asymmetric layouts, fractional grids, offset whitespace |
| MOTION_INTENSITY | 6 | Fluid CSS transitions, scroll reveals, spring physics |
| VISUAL_DENSITY | 4 | Daily-app spacing — not sparse, not packed |

Override any dial by describing what you want in the prompt.

## Trigger phrases

Use these in Claude Code to activate the skill:

- "landing page", "hero section", "portfolio site"
- "Awwwards", "SOTD", "premium web design"
- "SaaS dashboard", "bento grid", "feature section"
- "Emil Kowalski", "design engineering", "polish"
- "world-class", "stunning", "high-end frontend"

## Key rules enforced

- No `Inter` font, no purple glow gradients, no pure `#000000`
- No centered heroes (DESIGN_VARIANCE > 4), no 3-equal-card rows
- No animations from `scale(0)` — always from `scale(0.95)` + `opacity: 0`
- No `ease-in` on UI — always `ease-out` with custom cubic-bezier curves
- All UI animations < 300ms
- Every button has `active:scale(0.97)` tactile feedback
- `min-h-[100dvh]` on heroes, never `h-screen`
- Grain overlays on fixed `pointer-events-none` pseudo-elements only
- Zero emojis — Phosphor or Radix icons only

## Output modes

| Brief contains | Mode used |
|---|---|
| Landing page, hero, portfolio, marketing | Cinematic Landing (GSAP + Lenis, single HTML) |
| SaaS dashboard, feature grid, product section | Motion-Engine Bento (Framer Motion, React) |

## References

Design system, animation decision framework, easing presets, spring configs, clip-path patterns, gesture rules, bento archetypes, font pairings, color palettes, and the full forbidden-pattern checklist live in [`references/design-system.md`](references/design-system.md).
