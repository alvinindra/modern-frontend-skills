---
name: modern-frontend-motion-bento
description: Direction for SaaS feature pages, AI product launches, and conversion-grade marketing pages built around the motion-engine bento — modular cards where each surface is a working slice of the product, kept alive by exactly one perpetual micro-interaction per card. Enter through the parent pack at ../SKILL.md.
---

# Motion Bento

> The router opens this file when the brief calls for the product itself to be the demo — small, working surfaces arranged in a grid, each one alive. If the brief is closer to "tell the brand's story across a scroll", route to `cinematic-scroll` instead.

## Brief — when this direction fires

This direction handles work where:

- The page's job is to **show the product running** in miniature surfaces.
- The user converts because they *believe the product is real* — not because they read a feature list.
- The brand is a SaaS, AI tool, dev tool, internal-ops product, or modern B2B platform.
- The bento *is* the page, not a section inside another structure.

Typical briefs: a SaaS landing page, an AI product launch, a tool's marketing homepage, a workspace product, a dev-tools homepage, a modern feature section.

If the brief is closer to "make the page feel like a film" → `cinematic-scroll`. If the brief is closer to "make the page feel like a magazine" → `publication`. If the brief is "high-density data dashboard" → `modernist-grid` for the rigorous take.

## Calibration

| Dial | Baseline | Notes |
|---|---|---|
| `DESIGN_VARIANCE` | 5 | Offset bento inside a strong baseline grid — not poster-asymmetric |
| `MOTION_INTENSITY` | 6 | One perpetual micro-interaction per card; sub-300ms UI elsewhere |
| `VISUAL_DENSITY` | 5 | Daily-app spacing — real data inside cards, labels outside |

User overrides any dial inline.

## Three signature moves

### 1. Labels outside, content inside

The card is the *artifact* — a working slice of the product. The label lives *beneath* the card in plain language, not inside competing for attention. This is the gallery-style move that defines the direction.

```jsx
<div className="md:col-span-2">
  <div className="rounded-[2.5rem] border border-stone-200 bg-white p-10 ...">
    {/* The card IS the product surface. No marketing copy inside. */}
  </div>
  <p className="mt-4 px-1 text-sm text-stone-600 tracking-tight">
    Auto-prioritising tasks  {/* The label */}
  </p>
</div>
```

If the card needs its own marketing copy inside, the card has failed. The card *shows*; the label *names*.

### 2. The five archetypes — exactly one motion per card

Every motion-bento card draws from one of five archetypes. Each archetype has **exactly one** perpetual micro-interaction. Multiple motions in one card kills the focus.

| Archetype | Motion | Used for |
|---|---|---|
| Intelligent list | Items shuffle position via Framer `layoutId` + spring | Task lists, library cards, inboxes |
| Command input | Multi-step typewriter cycle + cursor blink | Search bars, AI prompts, query inputs |
| Live status | Breathing scale-opacity loop + overshoot notification pop | Workspace health, live collaborators |
| Wide stream | Seamless infinite carousel of chips, linear easing | Live metrics, shipped events |
| Contextual UI | Staggered background highlight cycling + floating toolbar | Smart summaries, AI assistance |

A typical motion-bento page uses all five in one grid layout. Mixing archetypes is the point.

### 3. Mandatory isolation (`memo` + `'use client'`)

Each archetype lives in its own file or named component wrapped in `memo()` with `'use client'` at the top. The page parent stays Server Component shape. Perpetual motion never inside a re-rendering parent — the interval will fire on every page update.

```tsx
'use client';
import { memo } from 'react';

export const LibraryList = memo(function LibraryList() {
  // own useEffect, own setInterval, own cleanup
});
```

If perpetual motion ships inside a non-memoized parent, the page is broken — even if it looks fine. Strict cleanup on every `useEffect`.

## Materials

### Typography

- **Display + body**: a single humanist sans family — Geist, Satoshi. Display weight 500–600 for the headline; body 400.
- **Mono**: Geist Mono, JetBrains Mono. **Mandatory** for all numbers, metric values, build numbers, timestamps, file sizes, IDs.
- **No serifs.** Serifs break the dashboard register. Editorial serif pages route to `publication` instead.
- Headline size restrained: `clamp(2.25rem, 4.6vw, 3.9rem)`. The bento is the spectacle, not the headline.
- Tabular numerals everywhere.
- Banned: Inter, Roboto, system sans as identity.

### Color

- **Background**: warm off-white (`#f4f1ea`, `#f9fafb`, `#f6efe2`) — never clinical pure white.
- **Cards**: pure white with a 1px subtle border (`rgba(226, 232, 240, 0.5)`).
- **Border-radius**: `2.25rem` to `2.5rem` (36–40px) — larger than typical card radius. This is part of the bento signature.
- **Shadows**: diffusion — `shadow-[0_18px_36px_-18px_rgba(15,15,15,0.08)]`. Soft, never punchy.
- **Accent**: one only, saturation < 80%. Common picks — emerald, terracotta, slate-blue. Indigo / Violet / Purple banned.
- Pure `#000000` banned. Use `#0f172a` or `#181815`.

### Layout

- CSS Grid for the bento. Never flex-math.
- Default grid: 3-column on `md:` with `col-span-2` for wide archetypes (typically the wide-stream archetype).
- Card internal padding: `p-10` (40px) desktop, `p-7` (28px) mobile.
- Minimum card height: `min-h-[340px]` so rows read as rows.
- Inner card radii: `rounded-2xl` (16px) — half the outer radius. Don't ship `rounded-3xl` on everything.

### Surface

- The card IS the artifact. No nested cards inside.
- Internal dividers: hairline `border-stone-100` or `border-slate-100`.
- No internal scrollbars exposed. Expand the content or paginate.

### Mandatory states

Loading: skeleton preserves the card shape. Empty: composed, named, suggests next action. Error: inline, in the card, doesn't replace it. Tactile: `whileTap={{ scale: 0.97 }}` on every interactive element.

## Choreography

### Spring presets — the bento language

```ts
const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;
const SPRING_POP = { type: 'spring', stiffness: 380, damping: 22 } as const;
const TIGHT = { type: 'spring', stiffness: 300, damping: 30 };
```

Springs everywhere. **No linear easing on UI** in this direction (linear is only used inside the wide-stream archetype, for the constant-motion carousel).

### Hardware acceleration — important

For paths that stay smooth under load (any animation that has to compete with React render):

```tsx
// NOT hardware-accelerated
<motion.div animate={{ x: 100 }} />

// Hardware-accelerated
<motion.div animate={{ transform: 'translateX(100px)' }} />
```

### Smooth scroll

Lenis is **skipped** in this direction by default. Native scroll wins on perceived performance for conversion-critical pages.

### Tooling

Framer Motion-led. GSAP is not used in this direction. If the brief asks for scroll-driven choreography on top of bento, the brief probably belongs in `cinematic-scroll` with bento as Act 2.

### Accessibility

`prefers-reduced-motion` disables the perpetual motion in each archetype while preserving the static card layouts. The page should still convert when motion is off.

## Wrong-direction tells (slop specific to `motion-bento`)

Beyond the pack-wide forbidden list at [`../references/forbidden.md`](../references/forbidden.md), avoid:

- **Telemetry cards with fake metrics** ("99.99% uptime", "10,000+ customers", "50% faster"). Use realistic mixed-precision data ("p95 218ms · −4.1%", "47.2k active rooms").
- **Identical card shells**. Each archetype should be visually distinct.
- **Generic copy** ("Powerful features", "Built for teams", "Get started fast"). Use concrete domain language.
- **Gradient backgrounds inside cards.** Cards stay pure white.
- **Lucide icons as the visual language.** Use Phosphor or Radix, standardized stroke 1.5 or 2.0.
- **`rounded-2xl` on every element.** The card is `rounded-[2.5rem]`; only inner elements use smaller radii.
- **Perpetual motion in a non-memoized parent** — kills performance and re-triggers intervals on every render.
- **Page structure of "Hero / Features / Pricing / FAQ / CTA"** where bento is just one section. That is a generic SaaS page with a nice section. Motion-bento *is* the page.
- **"Trusted by" logo strip at the top.** Footer reference only, only with real logos.

## What to push toward

- A grid where **any single card** could be screenshotted and stand alone as a product surface.
- Cards that visibly tick / update / respond on the live page — the user should believe the product is running.
- Concrete time references in the data ("Last 30 minutes · ·LIVE", "Today's session — Coral build 0.247").
- A keyboard hint somewhere ("⌘K from any window") — bento products tend to live keyboard-first.
- One full-width row at the bottom that synthesizes the rest (the contextual-UI archetype): timestamp + author + action lines + floating toolbar.
- **A specific named product, audience, and domain.** "Morse — sound design library workflow for game studios" beats "ACME Workflow".

## Reference artifact

[`../examples/bento-saas.tsx`](../examples/bento-saas.tsx) — *Morse*, sound design library workflow for game studios. Exercises this direction with all five archetypes wired together:

- **Row 1**: Library (4-col archetype 1, foley/amb/sfx/voice cues with auto-sort), Render queue (2-col archetype 3 with breathing indicator + event toast).
- **Row 2**: Tag search (2-col archetype 2, ⌘K typewriter), Cue stream (4-col archetype 4, build numbers + ship/review/reject badges).
- **Row 3**: Session ledger (6-col archetype 5, timestamped author + floating Replay/Tag/Branch/Ship toolbar).

Read for tone calibration. Each `motion-bento` page must invent its own product world (audience, domain, real names, real metric shapes).

---

**Pack layers applied on every output in this direction:**

- Universal craft: [`../references/animation.md`](../references/animation.md) (Emil Kowalski canon — popover origin still applies, button press still applies), [`../references/forbidden.md`](../references/forbidden.md) (slop filter + pre-flight).
- Component recipes: [`../components/style-recipes.md § Motion Bento`](../components/style-recipes.md) → opens Framer Motion patterns + Aceternity bento-grid + 21st.dev primitives + shadcn customization rules.
