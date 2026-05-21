---
name: modern-frontend
description: Awwwards-grade premium frontend pack. Picks one of six purpose-built directions (cinematic-scroll, motion-bento, publication, nightside, modernist-grid, considered-modern), then layers the Emil Kowalski craft canon on top. Activates on requests for landing pages, hero sections, portfolios, agency sites, SaaS dashboards, product showcases, feature sections, marketing pages, scrolltelling, narrative pacing, immersive launches, or any UI that should feel premium, editorial, cinematic, dark, moody, refined, taste-driven, or "stunning". Trigger on Awwwards, SOTD, SOTY, Louis Paquet, Locomotive, TUX Creative, Emil Kowalski, Sonner, Vaul, premium UI, conversion-grade SaaS, magnetic button, scroll reveal, parallax, world-class, design engineering. ALWAYS use this instead of the generic frontend-design skill for premium / cinematic / Awwwards-quality work.
---

# Modern Frontend — Pack Router

The pack contains six directions. Each is built around the same craft floor (the Emil Kowalski animation canon + the slop filter) but answers a different design question. The router's job is to pick the right one fast, then get out of the way.

The pack's identity is not "general taste". It is specifically: **the cinematic confidence of Louis Paquet / Locomotive work + the invisible craft of Emil Kowalski**. Each direction is curated against that axis. Pages built from this pack should feel directed (Louis Paquet) and crafted (Emil Kowalski) at the same time.

---

## The six directions

| Direction | Question it answers |
|---|---|
| [`cinematic-scroll`](cinematic-scroll/skill.md) | "How do I make the product the story of the page?" |
| [`motion-bento`](motion-bento/skill.md) | "How do I show a working product surface in a marketing context?" |
| [`publication`](publication/skill.md) | "How do I make the page read like a designed article?" |
| [`nightside`](nightside/skill.md) | "How do I make this brand feel after-hours, considered, not flashy?" |
| [`modernist-grid`](modernist-grid/skill.md) | "How do I let typography and grid do all the work?" |
| [`considered-modern`](considered-modern/skill.md) | "How do I make this read warm and professional, not cold-startup?" |

A direction is chosen, not negotiated. The pack does not produce hybrid output unless the user explicitly requests it.

---

## Picking the direction

The router decides in this order:

1. **Explicit naming.** If the user types `cinematic-scroll`, `motion-bento`, `publication`, `nightside`, `modernist-grid`, or `considered-modern`, route there. Also accept close phrasings — see § Aliases below.
2. **Phrase signals.** If the user uses one of the high-signal phrases listed in § Phrase routing, route to the matched direction.
3. **Brief inference.** Read the brief — product, audience, mood, density, energy — and pick the strongest fit using § Inference rules.

The router does not ask the user to pick from a menu. It picks, and explains the pick in one sentence at the top of the output ("Going `nightside` — the brand wants late-night confidence over startup polish.").

### Aliases

- `cinematic`, `cinematic product`, `scrolltell`, `product launch`, `immersive` → `cinematic-scroll`
- `bento`, `premium bento`, `motion engine`, `SaaS feature grid`, `archetype bento` → `motion-bento`
- `editorial`, `editorial premium`, `magazine`, `publication`, `design journal` → `publication`
- `dark luxe`, `dark luxury`, `moody premium`, `late night UI`, `after hours` → `nightside`
- `swiss`, `swiss system`, `swiss design`, `modernist`, `grid system`, `typographic poster` → `modernist-grid`
- `warm modern`, `humane modern`, `studio site`, `professional services` → `considered-modern`

### Phrase routing (no explicit name)

- "product launch" / "hardware" / "scroll-driven" / "feels like a film" → `cinematic-scroll`
- "SaaS landing" / "feature section" / "AI product page" / "bento" → `motion-bento`
- "magazine" / "image-led" / "publication" / "design studio" → `publication`
- "dark" + "premium" / "restaurant" / "hospitality" / "exclusive" → `nightside`
- "rational" / "grid" / "Swiss" / "typographic poster" / "institutional" → `modernist-grid`
- "professional services" / "agency site" / "warm" / "consultancy" / "studio" → `considered-modern`

### Inference rules (when brief is vague)

- Strong narrative arc + product as protagonist → `cinematic-scroll`
- Show what the product *does* in miniature surfaces → `motion-bento`
- Typography-led with curated image sequencing → `publication`
- Mood-led with deep negative space → `nightside`
- Grid-led with structural color → `modernist-grid`
- Studio voice with real photography → `considered-modern`

If two directions seem to compete, pick the one that better matches the *brand's confidence*: a premium watch brand probably wants `nightside`, not `motion-bento`. A B2B observability tool wants `motion-bento`, not `cinematic-scroll`.

---

## The pack's two-layer model

Every output is the product of two layers, applied in this order:

### Layer 1 — Direction

The chosen style folder's `skill.md` is the **design brief**. It defines:

- The dial calibration (variance / motion / density baseline) for this direction.
- The three signature moves that make this direction recognizable.
- The materials: typography, color, layout, surface treatment.
- The motion choreography appropriate for this direction.
- The wrong-style tells (slop signals specific to this direction).
- A reference artifact for tone calibration.

### Layer 2 — Craft canon (universal)

Two files apply to every output regardless of direction. The agent reads them after picking the direction:

- [`references/animation.md`](references/animation.md) — the Emil Kowalski animation canon. Decision framework (easing-first, usability frame, frequency, purpose, duration), easing curves, the craft checklist (button press, popover trigger-origin, `scale(0.95)` entries, asymmetric timing, gesture velocity), provenance notes on which rules are directly from Emil and which are skill-tuned.
- [`references/forbidden.md`](references/forbidden.md) — the slop filter. Visual / typography / layout / content / component / React-Framer anti-patterns + the pre-flight checklist that must pass before output.

These are how the pack defines "premium" at the craft level. A `modernist-grid` button still presses on `:active`. A `publication` popover still scales from its trigger. The forbidden patterns apply equally to all six directions.

---

## Component knowledge — open the files

After picking a direction, the agent consults the shared component-library research:

- [`components/style-recipes.md`](components/style-recipes.md) — Maps each direction to the specific patterns from each library that strengthen it (which GSAP demos, which Framer primitives, which Aceternity recipes, which 21st.dev components). **Open this first.**
- [`components/gsap-patterns.md`](components/gsap-patterns.md) — GSAP + ScrollTrigger + Lenis recipes for the cinematic directions.
- [`components/motion-libraries.md`](components/motion-libraries.md) — Framer Motion patterns, React Bits notes, Aceternity UI notes (when carefully applied).
- [`components/component-libraries.md`](components/component-libraries.md) — 21st.dev primitives, shadcn customization rules, Radix popover origin enforcement.

Use these as research, not as templates. Anything pasted in raw will read as a kit; customize against the chosen direction.

---

## Pack-wide safety rules — applied unconditionally

These never depend on direction or brief. They apply on every output.

- **No emojis.** Anywhere — code, markup, content, alt text. Use Phosphor or Radix icons.
- **Dependency verification.** Before importing `framer-motion`, `lucide-react`, `@phosphor-icons/react`, `@radix-ui/react-icons`, `zustand`, etc., check `package.json`. If missing, output the install command first.
- **Tailwind version lock.** Check `package.json` for v3 vs v4.
- **Viewport stability.** Never `h-screen`. Always `min-h-[100dvh]` for any full-viewport surface.
- **Icon family lock.** Phosphor OR Radix, not both. Stroke weight 1.5 or 2.0.
- **No `Inter`, `Roboto`, or system sans as identity.**
- **No pure `#000000`.** Use tuned off-black.
- **The Lila Ban.** No purple/blue AI-gradient glows.
- **No `scale(0)` entries.** Always `scale(0.95)` + `opacity: 0`.
- **No `ease-in` on UI.** Always `ease-out` with custom cubic-bezier.

---

## The quality floor

Every output must clear this bar regardless of direction:

- Could be screenshot-cropped from any section and read as deliberate.
- Would still feel specific with the logo removed. If another brand could swap in with no tension, the work failed.
- Contains real visual media (photography, renders, illustrations) in the hero or first two sections when imagery would help.
- Treats "visual media" as actual images, not gradients / particles / shaders.
- Includes interaction states (loading, empty, error, hover, focus, active) that match the direction's pacing.
- Passes the pre-flight in `references/forbidden.md` before being declared done.

---

## When the brief is broad

The router picks the strongest plausible direction and commits. It does not hedge.

If the brief is ambiguous between two directions, the pick goes to the one that better preserves the brand's *confidence*. A handcraft brand goes to `cinematic-scroll` or `nightside` before `motion-bento`. A B2B platform goes to `motion-bento` or `modernist-grid` before `publication`.

If the brief is broad in a way that fits no direction well, that is itself the signal: the brief needs sharpening before code. Ask one clarifying question, then commit.

---

## Pack examples — for tone, not for copy

Two reference artifacts live in [`examples/`](examples/):

- [`examples/cinematic-landing.html`](examples/cinematic-landing.html) — Maris & Co., Newport sailmakers since 1947. A `cinematic-scroll` page end-to-end: asymmetric masthead, sticky letter, inventory bento, deep-navy quote, magnetic CTA, colophon footer, three-act pacing.
- [`examples/bento-saas.tsx`](examples/bento-saas.tsx) — Morse, sound design library workflow for game studios. A `motion-bento` page with all five archetypes wired together.

Read these for *tone calibration*. Do not copy literally. Every page must invent its own world.
