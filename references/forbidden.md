# Forbidden Patterns + Pre-Flight Checklist

The slop filter. Load this before output as a final gate. If any item below appears in the output and the user didn't explicitly ask for it, revise.

---

## Table of Contents

1. [Visual / CSS Forbidden](#visual)
2. [Typography Forbidden](#typography)
3. [Layout Forbidden](#layout)
4. [Content Forbidden (the AI-slop tell)](#content)
5. [Component Forbidden](#components)
6. [React / Framer Forbidden](#react)
7. [Pre-Flight Checklist](#preflight)

---

## 1. Visual / CSS Forbidden <a name="visual"></a>

- No neon outer glows. No default `box-shadow` glows.
- No pure `#000000`. Use Zinc-950 / off-black.
- No oversaturated accents. Desaturate to blend elegantly.
- No text-fill gradients on large headers.
- No animating from `scale(0)`. Start from `scale(0.95)` + `opacity: 0`.
- No `ease-in` on UI.
- No `transition: all`. Specify properties.
- No `h-screen` on heroes. Use `min-h-[100dvh]`.
- No animating `width`, `height`, `top`, `left`, `padding`, `margin`. Only `transform` + `opacity`.
- No complex flex-math (`w-[calc(33%-1rem)]`). Use CSS Grid.
- No grain overlay on scrolling containers. Fixed `pointer-events-none` pseudo-element only.

---

## 2. Typography Forbidden <a name="typography"></a>

- No Inter, Roboto, Arial, system fonts.
- No serif on dashboards.
- No oversized H1s screaming. Control hierarchy via weight + color.

---

## 3. Layout Forbidden <a name="layout"></a>

- No centered heroes at `DESIGN_VARIANCE > 4`.
- No 3-equal-card feature rows. Use 2-column zig-zag, asymmetric bento, or horizontal scroll.
- No awkward floating gaps from lazy spacing.
- No `window.addEventListener('scroll')`. Use ScrollTrigger / IntersectionObserver / Framer's `useScroll`.
- No mixing GSAP + Framer Motion in the same component tree.

---

## 4. Content Forbidden (the AI-slop tell) <a name="content"></a>

This section is the strongest predictor of an AI-generated vs human-designed output. Awwwards weights Content at 10% — but it's the section that most often kills SOTY chances on cursory review.

### Names

- No "John Doe", "Sarah Chan", "Jack Su", "Jane Doe", "Lisa Wong", "Mike Davis".
- No "Acme Corp", "Nexus AI", "SmartFlow", "Quantum*", "Pulse*", "Zenith*", "Apex*".
- Invent realistic, specific, contextual names. Mix cultures naturally — not as a checklist.

### Avatars

- No egg SVGs.
- No Lucide / Phosphor `User` icons as avatar placeholders.
- Use `https://i.pravatar.cc/150?u={unique-seed}` or `picsum.photos/seed/{seed}/200/200`.
- For SOTY-grade work: real photography only. Placeholder avatars read as draft.

### Data

- No fake-round numbers: `99.99%`, `50%`, `1,234,567`.
- Use organic values: `47.2%`, `+1 (312) 847-1928`, `$4,239.71`.
- Mixed precision is realistic. Round numbers are AI-generated.

### Copy

- No verb-salad: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Empower", "Supercharge", "Reimagine".
- No vague nouns: "solutions", "experiences", "platform" (without specifics).
- Use concrete verbs and specific outcomes.
- Real copy passes the "would a human at this company actually write this?" test.

### Images

- No broken Unsplash links — they expire.
- Dev placeholders: `picsum.photos/seed/{random}/800/600`.
- SOTY-grade work: real photography only. Period.

### Scroll-jacking on the wrong context

- No scroll-hijack on e-commerce (kills conversion).
- No scroll-hijack on content-reading flows (kills accessibility).
- Only OK in experiential / agency / portfolio Act 2 showcases.

---

## 5. Component Forbidden <a name="components"></a>

- No broken Unsplash links. Use `picsum.photos`.
- No default shadcn/ui. Always customize radii, colors, shadows.
- No custom mouse cursors (except brief-justified editorial work).
- No emojis. Ever. Use Phosphor / Radix icons.
- No Lucide icons mixed with Phosphor in the same tree. Pick one.
- No oversaturated icon strokes. `strokeWidth: 1.5` or `2.0` only.

---

## 6. React / Framer Forbidden <a name="react"></a>

- No `useState` for magnetic hover / mouse-tracking. Use `useMotionValue`.
- No `window.addEventListener('scroll')`. Use ScrollTrigger / IntersectionObserver / `useScroll`.
- No mixing GSAP + Framer Motion in the same component tree.
- No Framer `animate={{ x }}` for smooth-under-load paths. Use `transform` string.
- No stagger parent/children split across Server/Client boundary.
- No perpetual motion in re-rendering parents. Memoize + isolate.

---

## 7. Pre-Flight Checklist <a name="preflight"></a>

Final filter before output. If any box is unchecked, revise.

### Layout & Responsiveness

- [ ] `min-h-[100dvh]` on heroes, NOT `h-screen`.
- [ ] Asymmetric layouts collapse to `w-full px-4` below `md:`.
- [ ] Container uses `max-w-[1400px] mx-auto` or `max-w-7xl`.
- [ ] No complex flex-math; Grid used for structural layouts.
- [ ] Mobile motion adaptation applied (parallax halved, stagger 30ms, hover gated).

### Typography

- [ ] No Inter. No serif on dashboards.
- [ ] Body uses `max-w-[65ch]` with muted neutral.
- [ ] Display uses `tracking-tight` or `tracking-tighter`.

### Color

- [ ] Single accent, saturation < 80%.
- [ ] No `#000000`.
- [ ] No "AI purple" glow/gradient.
- [ ] One palette, no drift.

### Animation Framework

- [ ] Every animation answered Step 0–Step 4 of the Decision Framework.
- [ ] Step 2 (Usability frame) passed: motion clarifies, not obscures.
- [ ] No `ease-in` on any UI element.
- [ ] All UI durations < 300ms (except marketing/scrolltelling).
- [ ] Custom easing curves used (not browser defaults).
- [ ] Only `transform` and `opacity` animated.

### Craft Layer (Emil)

- [ ] Every button has `:active { transform: scale(0.97) }`.
- [ ] No entry animates from `scale(0)`.
- [ ] Popovers use trigger-origin (modals exempt).
- [ ] CSS transitions (not keyframes) for interruptible UI.
- [ ] `prefers-reduced-motion` handled (gentler, not zero).
- [ ] Hover states gated by `@media (hover: hover) and (pointer: fine)`.

### Cinematic-specific (if cinematic mode)

- [ ] Three-act pacing applied (hook → build → climax → epilogue).
- [ ] Awwwards Usability frame walked for each motion.
- [ ] Real content (no Sarah Chan, no Elevate).
- [ ] Lenis used only if experiential context.

### Bento-specific (if SaaS mode)

- [ ] Each archetype in its own `memo()`-wrapped Client Component.
- [ ] Server Component parent.
- [ ] No serif fonts.
- [ ] `useEffect` cleanup on every interval/timeout.

### Performance

- [ ] Grain overlay is fixed + pointer-events-none.
- [ ] Perpetual motion memoized in isolated Client Components.
- [ ] No `window.addEventListener('scroll')`.
- [ ] No GSAP + Framer Motion in same tree.
- [ ] `useEffect` animations have strict cleanup.
- [ ] No CSS variable updates on scroll-heavy parents.

### Content

- [ ] Zero emojis in code, markup, or content.
- [ ] No generic names (John Doe, Acme, Nexus).
- [ ] No placeholder-looking data (99.99%, 50%).
- [ ] No filler copy (Elevate, Seamless, Unleash).
- [ ] Realistic image placeholders (`picsum.photos/seed/...`).

### States

- [ ] Loading state (skeletal, not spinner).
- [ ] Empty state (guides user).
- [ ] Error state (inline, next to source).

### Review

- [ ] If possible, review the next day with fresh eyes. Play animations in slow motion — frame-by-frame timing issues are invisible at full speed.

---

**Remember**: A premium interface is a thousand barely-audible voices singing in tune. One wrong easing, one centered hero at DESIGN_VARIANCE 8, one "Sarah Chan" testimonial, one `Inter` headline — and the spell breaks.
