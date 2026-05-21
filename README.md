# modern-frontend-skills

**v2 · multi-direction pack release**

A premium frontend pack for any AI coding agent — Claude Code, Cursor, Codex, Antigravity, Copilot. Builds interfaces at the level of Awwwards Site of the Year winners and the quiet polish of Emil Kowalski's component work (Sonner, Vaul, [animations.dev](https://animations.dev)).

The pack is built around **a single curation question**: how do you fuse the cinematic confidence of Louis Paquet / Locomotive work with the invisible craft of Emil Kowalski, on a per-brief basis? The router reads the brief, picks one of six directions, then layers a universal craft canon on top.

## Install

```bash
npx skills add https://github.com/alvinindra/modern-frontend-skills
```

Works for any agent that reads `SKILL.md` frontmatter.

## The six directions

| Direction | The question it answers |
|---|---|
| [`cinematic-scroll`](cinematic-scroll/skill.md) | "How do I make the product the story of the page?" |
| [`motion-bento`](motion-bento/skill.md) | "How do I show a working product surface in a marketing context?" |
| [`publication`](publication/skill.md) | "How do I make the page read like a designed article?" |
| [`nightside`](nightside/skill.md) | "How do I make this brand feel after-hours, considered, not flashy?" |
| [`modernist-grid`](modernist-grid/skill.md) | "How do I let typography and grid do all the work?" |
| [`considered-modern`](considered-modern/skill.md) | "How do I read warm and professional, not cold-startup?" |

Each direction is self-contained — own frontmatter, own dial calibration, own three signature moves, own material direction (typography / color / layout / surface), own choreography rules, own anti-pattern list, own reference brief.

## Structure

```
modern-frontend-skills/
├── SKILL.md                       Router. Reads brief, picks direction.
│
├── cinematic-scroll/skill.md      Scroll-driven, product-as-protagonist.
├── motion-bento/skill.md          Motion-engine bento, 5 archetypes.
├── publication/skill.md           Magazine pacing, image-led articles.
├── nightside/skill.md             After-hours premium, moody dark.
├── modernist-grid/skill.md        Swiss-modernist grid, type-first.
├── considered-modern/skill.md     Humane company sites, never cold.
│
├── references/                    Universal craft canon. Applied to every output.
│   ├── animation.md               Emil Kowalski canon — decision framework,
│   │                              easing curves, craft checklist, provenance.
│   └── forbidden.md               Slop filter, content-quality rules, pre-flight.
│
├── components/                    Shared component-library research.
│   ├── style-recipes.md           Maps each direction to library patterns.
│   ├── gsap-patterns.md           GSAP + ScrollTrigger + Lenis recipes.
│   ├── motion-libraries.md        Framer Motion, React Bits, Aceternity.
│   └── component-libraries.md     21st.dev, shadcn customization, Radix.
│
└── examples/
    ├── cinematic-landing.html     Maris & Co. sailmaker — cinematic-scroll.
    └── bento-saas.tsx             Morse sound library — motion-bento.
```

## How a build runs

1. The agent reads `SKILL.md` (router) first.
2. The router picks the single best direction for the brief — or honors an explicit direction request.
3. The agent opens that direction's `skill.md` in full.
4. The agent loads the universal craft canon (`references/animation.md`, `references/forbidden.md`).
5. The agent consults `components/style-recipes.md` for which third-party library patterns reinforce that direction.
6. The agent builds.
7. Before declaring done, the agent walks the pre-flight checklist in `references/forbidden.md`.

## The two-layer model

Every output is the product of two layers:

**Layer 1 — Direction.** The chosen style folder's `skill.md` defines the *design brief*: dial calibration, three signature moves, materials, choreography, wrong-direction tells, reference artifact.

**Layer 2 — Craft canon.** Two reference files apply to every output regardless of direction. They define "premium" at the craft level:

- [`references/animation.md`](references/animation.md) — Emil Kowalski animation canon: decision framework (easing-first, usability frame, frequency, purpose, duration), easing curves, the craft checklist (button press, popover trigger-origin, `scale(0.95)` entries, asymmetric timing, gesture velocity), provenance notes on which rules are canonically Emil and which are skill-tuned.
- [`references/forbidden.md`](references/forbidden.md) — The slop filter (visual, typography, layout, content, component, React/Framer anti-patterns) and the pre-flight checklist.

A `modernist-grid` button still presses on `:active`. A `publication` popover still scales from its trigger. The forbidden patterns apply equally to all six directions.

## Trigger phrases

Activate by naming a direction directly — `cinematic-scroll`, `motion-bento`, `publication`, `nightside`, `modernist-grid`, `considered-modern`. The router honors explicit requests. Aliases also work: `swiss`, `bento`, `editorial`, `dark luxe`, `warm modern`, `magazine`, `scrolltell`.

Or describe the work and let the router infer:

- "landing page", "hero section", "portfolio site", "agency site"
- "Awwwards", "SOTD", "SOTY", "Louis Paquet", "Locomotive", "TUX Creative"
- "SaaS landing", "bento", "feature section", "AI product page"
- "Emil Kowalski", "Sonner", "Vaul", "design engineering"
- "magazine", "publication", "design journal", "editorial"
- "dark luxe", "moody premium", "after hours", "late night UI"
- "swiss", "rational grid", "typographic poster", "institutional"
- "warm modern", "humane modern", "professional services", "studio site"

## Pack-wide safety rules — applied unconditionally

- No emojis. Anywhere.
- No `Inter`, `Roboto`, or system sans as identity.
- No pure `#000000`. Use tuned off-black.
- No purple/blue AI-gradient glows (the Lila Ban).
- No animations from `scale(0)` — always `scale(0.95)` + `opacity: 0`.
- No `ease-in` on UI — `ease-out` with custom cubic-bezier curves.
- All UI animations under 300ms.
- `min-h-[100dvh]` on heroes, never `h-screen`.
- Every button has `active:scale-[0.97]` tactile feedback.
- Grain overlays on fixed `pointer-events-none` pseudo-elements only.
- No generic names ("Sarah Chan", "Acme") or filler verbs ("Elevate", "Seamless").
- Real photography for SOTY-grade work.
- No scroll-jacking on e-commerce or content-reading flows.

Full anti-pattern list and pre-flight checklist in [`references/forbidden.md`](references/forbidden.md).

## Demos

### [`examples/cinematic-landing.html`](examples/cinematic-landing.html) — `cinematic-scroll`

**Maris & Co., Newport sailmakers since 1947.** Open in a browser. Cream editorial palette with deep navy and faded crimson. Fraunces oldstyle italic + Geist + Geist Mono. 12-column asymmetric masthead with offset oversized "47". Sticky letter from third-generation principal (word-by-word reveal). Five-card asymmetric inventory bento with cloth-spec captions. Process ledger with sticky photograph. Deep-navy editorial quote section. Magnetic commission CTA. Newspaper-style colophon footer. Three-act narrative pacing.

### [`examples/bento-saas.tsx`](examples/bento-saas.tsx) — `motion-bento`

**Morse, sound design library workflow for game studios.** Drop into a Next.js + Tailwind v3 + Framer Motion project. All five motion-bento archetypes wired together:

| Archetype | In this demo |
|---|---|
| Auto-sorting list (`layoutId`) | Library cues re-order by last touched (foley / amb / sfx / voice) |
| Command input (typewriter) | Tag search · ⌘K from anywhere |
| Live status (breathing + pop) | Render queue + worker health |
| Wide data stream (carousel) | Cues shipped this week — build numbers, byte counts, status |
| Contextual UI (highlight + toolbar) | Today's session ledger with floating Replay/Tag/Branch/Ship |

Each archetype memoized and isolated per the perpetual-motion rule.

## What v2 brings

- **Six purpose-built directions** instead of one general skill — `cinematic-scroll`, `motion-bento`, `publication`, `nightside`, `modernist-grid`, `considered-modern`. Each is curated against the Awwwards / Emil Kowalski axis.
- **Router-based architecture**. The top-level `SKILL.md` reads the brief, picks the strongest direction, and routes to the matching style folder.
- **Universal craft canon** (`references/animation.md`, `references/forbidden.md`) applies on every output. Same craft floor across all six directions.
- **Shared component-library research** (`components/`) with vetted style-recipe mappings, GSAP patterns, Framer Motion notes, and 21st.dev / shadcn customization rules.
- **Two reference artifacts** ship in `examples/` — a Newport sailmaker page exercising `cinematic-scroll` and a sound-design library workflow exercising `motion-bento` with all five archetypes.

## Repository

[github.com/alvinindra/modern-frontend-skills](https://github.com/alvinindra/modern-frontend-skills)
