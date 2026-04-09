---
name: skills
description: Build ultra-premium, Awwwards-grade interfaces with trained taste, choreographed motion, and Emil Kowalski-level craft. Fuses the cinematic Louis Paquet / TUX Creative / Locomotive aesthetic with high-agency bias-correction rules and a rigorous animation decision framework. Use this skill whenever the user asks for a landing page, hero section, portfolio, agency site, SaaS dashboard, product showcase, marketing page, or any interface that should feel premium, editorial, cinematic, immersive, or "stunning". Also trigger on mentions of Awwwards, SOTD, Locomotive, TUX Creative, smooth scroll, GSAP landing, Bento grid, Emil Kowalski, design engineering, premium UI, high-end frontend, Sonner-style polish, or any request for "world-class", "impressive", or "taste-driven" frontend work. ALWAYS use this instead of the generic frontend-design skill.
---

# Premium Frontend Skill — Taste, Motion, and Craft

Build interfaces at the level of Awwwards Site of the Year winners and the quiet polish of Emil Kowalski's component work (Sonner, Vaul, Family). Every detail compounds — the goal is the aggregate of invisible correctness that makes software feel right.

**FIRST**: Read `references/design-system.md` for the full rule system, animation decision framework, code patterns, and forbidden-pattern checklist before writing any code.

---

## 0. Core Philosophy

Two philosophies operate in parallel. Neither is optional.

1. **The Awwwards Cinematic Layer** — Oversized typography, choreographed scroll narratives, dramatic negative space, grain, parallax, editorial boldness. Pages feel art-directed, not assembled.
2. **The Emil Kowalski Craft Layer** — Every animation has a purpose. Buttons feel pressed. Popovers scale from their trigger. Nothing animates from `scale(0)`. Easing curves are hand-tuned. Invisible details compound.

> "All those unseen details combine to produce something that's just stunning, like a thousand barely audible voices all singing in tune." — Paul Graham

Taste is trained, not innate. Reverse-engineer the best work. Review your animations the next day with fresh eyes. In a world where every app is good enough, taste is the differentiator.

---

## 1. Active Baseline Configuration

These dials drive all creative decisions. Adapt dynamically if the user explicitly requests otherwise in chat, but never ask the user to edit this file.

- **DESIGN_VARIANCE: 8** (1 = symmetric, 10 = asymmetric chaos)
- **MOTION_INTENSITY: 6** (1 = static, 10 = cinematic physics)
- **VISUAL_DENSITY: 4** (1 = art gallery, 10 = cockpit)

Dial definitions and breakpoint overrides live in `references/design-system.md` § Dials.

---

## 2. Default Architecture

Unless the user specifies otherwise:

- **Single-file HTML artifacts** — Inline all CSS/JS. Only external deps allowed: Google Fonts, GSAP + ScrollTrigger from cdnjs, Lenis from unpkg.
- **React / Next.js artifacts** — Server Components by default. Any interactive, motion-heavy, or perpetually animating element MUST be isolated in its own leaf component with `'use client'` at the top. Memoize perpetual motion (React.memo) to prevent parent re-renders.
- **Dependency verification** — Before importing `framer-motion`, `lucide-react`, `@phosphor-icons/react`, `@radix-ui/react-icons`, `zustand`, etc., you MUST check `package.json`. If missing, output the install command first. Never assume.
- **Tailwind version lock** — Check `package.json`. Don't use v4 syntax in v3. For v4, use `@tailwindcss/postcss` or the Vite plugin, not the `tailwindcss` plugin.
- **Icons** — Exactly `@phosphor-icons/react` or `@radix-ui/react-icons`. Standardize `strokeWidth` (1.5 or 2.0).
- **Anti-emoji policy [CRITICAL]** — NEVER use emojis in code, markup, content, or alt text. Use Phosphor/Radix icons or clean SVG primitives.

---

## 3. The Animation Decision Framework

Before writing ANY animation, walk the tree. Full detail in `references/design-system.md` § Animation Decision Framework.

**Step 1 — Should this animate at all?**

| Frequency | Decision |
|---|---|
| 100+ times/day (keyboard shortcuts, command palette) | No animation. Ever. |
| Tens of times/day (hovers, list nav) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare (onboarding, celebrations, marketing) | Can add delight |

Never animate keyboard-initiated actions. Raycast has no open/close animation for a reason.

**Step 2 — What is the purpose?** Spatial consistency, state indication, feedback, preventing jarring changes, explanation. If the answer is "it looks cool" and the user will see it often — don't.

**Step 3 — What easing?** Enter/exit → `ease-out`. On-screen movement → `ease-in-out`. Hover/color → `ease`. Constant motion → `linear`. **Never `ease-in` for UI** — it feels sluggish at the exact moment users are watching most closely. Use custom curves, not browser defaults.

**Step 4 — How fast?** Buttons 100–160ms. Tooltips 125–200ms. Dropdowns 150–250ms. Modals/drawers 200–500ms. **UI animations stay under 300ms.**

---

## 4. Design Engineering Directives (Bias Correction)

LLMs have statistical biases toward cliché UI. Proactively override them.

### Typography
- **Display**: `text-4xl md:text-6xl tracking-tighter leading-none` as baseline.
- **BANNED for premium vibes**: `Inter`. Force character with `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`, `Instrument Serif`, `Playfair Display`, `Syne`.
- **Technical/dashboard UIs**: Serif fonts are strictly BANNED. Use `Geist + Geist Mono` or `Satoshi + JetBrains Mono`.
- **No oversized H1 screaming**. Control hierarchy with weight and color, not just scale.
- **Body**: `text-base leading-relaxed max-w-[65ch]` with a muted neutral.

### Color
- Max **1 accent color**. Saturation < 80%.
- **THE LILA BAN**: The "AI purple/blue gradient glow" aesthetic is BANNED. No purple button glows, no neon gradients.
- **No pure black** (`#000000`). Use Zinc-950, Off-Black, Charcoal.
- Stick to ONE palette per project. Don't drift between warm and cool grays.

### Layout
- **Anti-center bias**: At `DESIGN_VARIANCE > 4`, centered heroes are BANNED. Use split-screen, asymmetric whitespace, or left-aligned content with right-anchored assets.
- **No 3-equal-card feature rows**. Use 2-column zig-zag, asymmetric bento, or horizontal scroll galleries.
- **Grid over flex math**. Never `w-[calc(33%-1rem)]`. Use `grid grid-cols-1 md:grid-cols-3 gap-6`.
- **Viewport stability [CRITICAL]**: NEVER `h-screen` on heroes. Always `min-h-[100dvh]` to prevent iOS Safari jump.
- **Mobile override**: For `DESIGN_VARIANCE ≥ 4`, all asymmetric layouts must aggressively collapse to `w-full px-4 py-8` single-column below `md:`.

### Materiality
- **Dashboard hardening**: At `VISUAL_DENSITY > 7`, generic card containers are BANNED. Group via `border-t`, `divide-y`, or pure negative space. Only card where elevation communicates hierarchy.
- **Shadows**: When used, tint to background hue. No default neon/outer glows.
- **Liquid Glass**: When glassmorphism is needed, add a 1px `border-white/10` AND `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` to simulate physical edge refraction.

### Interactive States (mandatory)
- **Loading** — Skeletal loaders matching layout, not generic spinners.
- **Empty** — Beautifully composed, guide the user to populate.
- **Error** — Inline, clear, next to the source.
- **Tactile** — Every button needs `active:scale-[0.97]` or `active:-translate-y-[1px]`. Nothing is static on press.

---

## 5. The Emil Craft Layer (Invisible Details)

These are the rules that separate "it works" from "it feels right."

1. **Never animate from `scale(0)`**. Start from `scale(0.95)` + `opacity: 0`. Nothing in the real world appears from nothing.
2. **Popovers scale from their trigger**, not center. Use `transform-origin: var(--radix-popover-content-transform-origin)`. (Modals are exempt — they stay centered.)
3. **Buttons must feel pressed**. `transform: scale(0.97)` on `:active`, `transition: transform 160ms ease-out`.
4. **Tooltips skip delay on subsequent hovers**. Once one opens, adjacent ones open instantly.
5. **Use CSS transitions over keyframes for interruptible UI**. Keyframes restart from zero; transitions retarget smoothly — critical for anything triggered rapidly (toasts, list adds).
6. **Asymmetric enter/exit timing**. Slow where the user is deciding (hold-to-delete: 2s linear). Fast where the system responds (release: 200ms ease-out).
7. **Use `blur(2px)` to mask imperfect crossfades**. When two states overlap and feel off, subtle blur blends the gap. Keep under 20px.
8. **Percentage translates**. Use `translateY(100%)` over pixel values. Adapts to content, less error-prone.
9. **`@starting-style` for entries**. Modern CSS replacement for `useEffect(() => setMounted(true))`.
10. **Only animate `transform` and `opacity`**. Anything else triggers layout/paint. No exceptions for performance-critical paths.
11. **Framer Motion hardware-acceleration caveat**: `animate={{ x: 100 }}` is NOT hardware-accelerated. Use `animate={{ transform: "translateX(100px)" }}` for any path that must stay smooth under load.
12. **Springs for gestures and "alive" elements**. `{ type: "spring", stiffness: 100, damping: 20 }` as baseline. Springs maintain velocity when interrupted; CSS restarts from zero.
13. **Stagger enters with 30–80ms delays**. Never block interaction while stagger plays.
14. **Respect `prefers-reduced-motion`** — Fewer and gentler, not zero. Keep opacity and color; remove movement.
15. **Gate hover animations**: `@media (hover: hover) and (pointer: fine)`. Touch devices trigger hover on tap — prevent false positives.

---

## 6. Cinematic Section Blueprint

A typical premium landing page (adapt to context):

1. **Hero** — Full viewport (`min-h-[100dvh]`), oversized animated title (split-text char stagger on load), subtitle fade-up, scroll indicator. Asymmetric layout preferred.
2. **Intro / About** — Split 60/40 or 50/50, animated paragraph reveal (word-by-word or line-by-line).
3. **Showcase / Features** — Bento grid (asymmetric, not 3 equal cards) OR horizontal scroll hijack gallery.
4. **Marquee Ticker** — Scroll-velocity-aware infinite strip, large display font, muted color.
5. **Large Editorial Quote** — Line-by-line reveal, generous whitespace.
6. **CTA** — Bold closing section, magnetic button (Framer `useMotionValue`, NOT `useState`).
7. **Footer** — Minimal, elegant, subtle entrance.

---

## 7. SaaS / Dashboard Mode — The Motion-Engine Bento

When building modern SaaS dashboards or feature sections, use the "Bento 2.0" architecture. Full code in `references/design-system.md` § Motion-Engine Bento.

- Background `#f9fafb`, cards pure white with `border-slate-200/50`, `rounded-[2.5rem]`, diffusion shadows (`shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]`).
- Labels live **outside and below** cards (gallery style).
- Every card has a perpetual micro-interaction (pulse, typewriter, float, carousel, intelligent list).
- Spring physics everywhere: `type: "spring", stiffness: 100, damping: 20`. No linear easing.
- Perpetual motion MUST be memoized and isolated in its own microscopic Client Component.

**5 Card Archetypes**: Intelligent List (auto-sorting with `layoutId`), Command Input (typewriter cycle), Live Status (breathing indicators + overshoot notification pop), Wide Data Stream (seamless infinite carousel), Contextual UI (staggered highlight + floating toolbar).

---

## 8. AI Tells — Forbidden Patterns (The Slop Filter)

Strictly avoid these unless the user explicitly requests them. Full list in `references/design-system.md` § Forbidden.

- **Names**: No "John Doe", "Sarah Chan", "Jack Su", "Acme", "Nexus", "SmartFlow". Invent realistic, specific, contextual names.
- **Avatars**: No egg SVGs, no Lucide user icons. Use `picsum.photos/seed/{random}/800/600` or styled UI Avatars.
- **Data**: No `99.99%`, `50%`, `1234567`. Use organic values (`47.2%`, `+1 (312) 847-1928`).
- **Copy**: No "Elevate", "Seamless", "Unleash", "Next-Gen". Use concrete verbs.
- **Images**: No Unsplash (broken links). Use `picsum.photos`.
- **Cursors**: No custom mouse cursors — outdated, hurts a11y and perf.
- **Text effects**: No text-fill gradients on large headers.
- **shadcn/ui**: May be used, but NEVER in default state. Customize radii, colors, shadows.

---

## 9. Performance Guardrails

- **Grain/noise filters** on fixed `pointer-events-none` pseudo-elements ONLY. Never on scrolling containers.
- **Only animate `transform` and `opacity`**. Never `top`, `left`, `width`, `height`, `padding`, `margin`.
- **CSS variable inheritance trap**: Updating a CSS var on a parent recalculates styles for all children. For drag/swipe, set `element.style.transform` directly, not a variable.
- **Z-index restraint**: No arbitrary `z-50` / `z-10`. Systemic only (sticky nav, modals, overlays).
- **Never mix GSAP/ThreeJS with Framer Motion** in the same component tree. Framer for UI/bento; GSAP/ThreeJS for isolated full-page scrolltelling or canvas — wrapped in strict `useEffect` cleanup.
- **Never `window.addEventListener('scroll')`** — use ScrollTrigger, IntersectionObserver, or Framer's `useScroll`.
- **Prefer CSS animations over JS under load** — CSS runs off main thread; Framer `x`/`y` use `requestAnimationFrame` and drop frames when the browser is busy.

---

## 10. Process

1. **Read** `references/design-system.md` in full — every code pattern, easing curve, and forbidden list.
2. **Choose** an aesthetic direction from the brief (cinematic dark, cream editorial, midnight blue, warm noir, ice minimal).
3. **Select** the mode: Cinematic Landing (§6) or Motion-Engine Bento (§7).
4. **Compose** structure. At `DESIGN_VARIANCE 8`, push asymmetric by default.
5. **Walk** every animation through the Decision Framework (§3). Cut anything that fails.
6. **Apply** the Emil Craft Layer (§5) to every interactive element. No button without `:active`. No popover with wrong origin. No crossfade without blur-bridge if needed.
7. **Polish** with grain overlay, custom accent selection, magnetic CTAs, staggered reveals.
8. **Filter** against Forbidden Patterns (§8). Cut any slop.
9. **Verify** mobile collapse, `min-h-[100dvh]`, reduced-motion, hover media query gates.
10. **Review** the final code against the Pre-Flight Check in `references/design-system.md` § Pre-Flight.

Output single HTML artifacts to `/mnt/user-data/outputs/`. For React/Next.js, respect the host project's stack.

---

## Final Reminder

Premium interfaces are not a collection of effects — they're a thousand barely-audible voices singing in tune. One wrong easing, one `scale(0)`, one centered hero at `DESIGN_VARIANCE 8`, one `Inter` headline, one "Sarah Chan" testimonial — and the spell breaks. Measure twice, cut once. Review tomorrow with fresh eyes.
