# Premium Frontend Design System

The complete reference for the `skills` SKILL. Code patterns, easing curves, bias-correction rules, craft heuristics, motion frameworks, and forbidden patterns.

## Table of Contents
1. [Animation Decision Framework](#decision)
2. [Easing Curves & Spring Presets](#easing)
3. [The Emil Craft Checklist](#craft)
4. [Dials — Variance, Motion, Density](#dials)
5. [HTML Boilerplate](#boilerplate)
6. [CSS Foundation](#css-foundation)
7. [Smooth Scroll Setup](#smooth-scroll)
8. [Split Text Animation](#split-text)
9. [Scroll Reveal System](#scroll-reveal)
10. [Parallax Effects](#parallax)
11. [Image Reveal Animations](#image-reveal)
12. [Marquee / Infinite Ticker](#marquee)
13. [Magnetic Button](#magnetic-button)
14. [Custom Cursor (use sparingly)](#custom-cursor)
15. [Grain Overlay](#grain-overlay)
16. [Scroll Progress Bar](#scroll-progress)
17. [Horizontal Scroll Section](#horizontal-scroll)
18. [Section Transition Wipes](#section-wipes)
19. [Press States & Tactile Feedback](#tactile)
20. [Popover / Tooltip Origin Rules](#popover)
21. [Clip-path Mastery](#clip-path)
22. [Gesture & Drag Interactions](#gestures)
23. [Motion-Engine Bento (SaaS mode)](#bento)
24. [Stagger Patterns](#stagger)
25. [Blur-Bridge for Crossfades](#blur-bridge)
26. [Font Recommendations](#fonts)
27. [Color Palettes](#palettes)
28. [React Patterns](#react-patterns)
29. [Forbidden Patterns (Slop Filter)](#forbidden)
30. [Pre-Flight Check](#pre-flight)

---

## 1. Animation Decision Framework <a name="decision"></a>

Before writing ANY animation, walk these four questions in order. If an animation can't answer all four, cut it.

### Q1: Should this animate at all?

| Frequency | Decision |
|---|---|
| 100+/day (keyboard shortcuts, command palette toggle) | No animation, ever |
| Tens/day (hover effects, list nav) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, celebrations, marketing) | Can add delight |

**Rule**: Never animate keyboard-initiated actions. They're repeated hundreds of times a day and animation makes them feel delayed. Raycast has no open/close animation for a reason.

### Q2: What is the purpose?

Every animation must satisfy one of:
- **Spatial consistency** — toasts enter/exit from the same direction (makes swipe-to-dismiss intuitive).
- **State indication** — morphing feedback button shows the state change.
- **Feedback** — button scales down on press, confirming the input was heard.
- **Explanation** — marketing animation showing how a feature works.
- **Preventing jarring change** — elements appearing without transition feel broken.

If the answer is "it looks cool" AND the user sees it often — CUT IT.

### Q3: What easing?

```
Is the element entering or exiting?
  Yes → ease-out (instant visible movement = feels responsive)
  No → Is it moving/morphing on screen?
         Yes → ease-in-out (natural accel/decel)
       Is it hover/color?
         Yes → ease
       Is it constant motion (marquee, progress)?
         Yes → linear
       Default → ease-out
```

**NEVER use `ease-in` for UI.** It delays the initial movement — the exact frame users are watching most closely. A dropdown with `ease-in` at 300ms feels slower than `ease-out` at the same 300ms.

### Q4: How fast?

| Element | Duration |
|---|---|
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory / scrolltelling | Can be longer |

**UI animations stay under 300ms.** A 180ms dropdown feels more responsive than a 400ms one.

### Perceived performance note

A fast-spinning spinner makes loading *feel* faster (same load time, different perception). An instant tooltip after the first one opens makes the whole toolbar feel faster. Speed perception is as real as speed.

---

## 2. Easing Curves & Spring Presets <a name="easing"></a>

Browser defaults are too weak. Use these hand-tuned curves as baseline:

```css
:root {
  /* UI interactions — strong ease-out (enter/exit) */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  /* On-screen movement — strong ease-in-out */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);

  /* iOS-like drawer curve (from Ionic) */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  /* Standard UI transition shorthand */
  --transition-ui: 200ms var(--ease-out);
  --transition-press: 160ms var(--ease-out);
  --transition-modal: 400ms var(--ease-in-out);
}
```

Resources: [easing.dev](https://easing.dev/), [easings.co](https://easings.co/).

### Spring presets (Framer Motion)

```js
// Apple-style (easier to reason about)
const premiumSpring = { type: "spring", duration: 0.5, bounce: 0.2 };

// Physics (more control)
const alive = { type: "spring", mass: 1, stiffness: 100, damping: 10 };
const tight = { type: "spring", stiffness: 300, damping: 30 };
const soft = { type: "spring", stiffness: 100, damping: 20 }; // Bento baseline

// Mouse-tracking with spring (decorative, feels natural)
import { useSpring } from 'framer-motion';
const springRotation = useSpring(mouseX * 0.1, {
  stiffness: 100,
  damping: 10,
});
```

**Keep bounce subtle** (0.1–0.3). Avoid bounce in most UI. Use it for drag-to-dismiss and playful interactions.

**Springs for gestures**: Springs maintain velocity when interrupted. CSS animations restart from zero. For anything the user can interrupt mid-motion (drags, toggles), prefer springs.

---

## 3. The Emil Craft Checklist <a name="craft"></a>

Invisible details that compound. Run through this for every interactive element.

### Buttons
- [ ] `transform: scale(0.97)` on `:active`
- [ ] `transition: transform 160ms var(--ease-out)`
- [ ] Hover gated by `@media (hover: hover) and (pointer: fine)`

```css
.button {
  transition: transform 160ms var(--ease-out);
}
.button:active {
  transform: scale(0.97);
}
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    /* only here */
  }
}
```

### Entries
- [ ] Never `scale(0)`. Start from `scale(0.95)` + `opacity: 0`.
- [ ] Use `@starting-style` (or `data-mounted` pattern in legacy code).

```css
.toast {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 400ms var(--ease-out),
              transform 400ms var(--ease-out);
}
@starting-style {
  .toast {
    opacity: 0;
    transform: translateY(100%);
  }
}
```

### Popovers
- [ ] `transform-origin` tied to trigger, NOT center.

```css
/* Radix */
.popover {
  transform-origin: var(--radix-popover-content-transform-origin);
}
/* Base UI */
.popover {
  transform-origin: var(--transform-origin);
}
```

**Modals are the exception** — they stay centered because they're not anchored to a specific trigger.

### Tooltips
- [ ] Delay on first open; instant + no-animation on subsequent hovers.

```css
.tooltip {
  transition: transform 125ms var(--ease-out),
              opacity 125ms var(--ease-out);
  transform-origin: var(--transform-origin);
}
.tooltip[data-starting-style],
.tooltip[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}
.tooltip[data-instant] {
  transition-duration: 0ms;
}
```

### Interruptible lists/toasts
- [ ] Use CSS transitions, not keyframes. Transitions retarget mid-flight; keyframes restart from zero.

### Asymmetric timing
- [ ] Slow on user decision (hold-to-delete: 2s linear). Fast on system response (release: 200ms ease-out).

### `translateY` in percentages
- [ ] Use `translateY(100%)` over pixel values. Adapts to content.

---

## 4. Dials — Variance, Motion, Density <a name="dials"></a>

### DESIGN_VARIANCE (1–10)

| Level | Pattern |
|---|---|
| 1–3 (Predictable) | Flex `justify-center`, 12-col symmetric grids, equal paddings |
| 4–7 (Offset) | `margin-top: -2rem` overlaps, mixed aspect ratios (4:3 next to 16:9), left-aligned headers over center-aligned data |
| 8–10 (Asymmetric) | Masonry, CSS Grid with fractional units (`grid-template-columns: 2fr 1fr 1fr`), massive empty zones (`padding-left: 20vw`) |

**Mobile override [CRITICAL]**: For 4–10, any asymmetric layout above `md:` MUST collapse to strict single-column (`w-full px-4 py-8`) below 768px. No horizontal scroll on phones.

### MOTION_INTENSITY (1–10)

| Level | Pattern |
|---|---|
| 1–3 (Static) | No auto animations. Only `:hover`/`:active`. |
| 4–7 (Fluid CSS) | `transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)`, `animation-delay` cascades, strictly `transform` + `opacity`. Use `will-change: transform` sparingly. |
| 8–10 (Advanced Choreography) | Complex scroll-triggered reveals, parallax, Framer Motion hooks. NEVER `window.addEventListener('scroll')`. |

### VISUAL_DENSITY (1–10)

| Level | Pattern |
|---|---|
| 1–3 (Art Gallery) | Massive whitespace, huge section gaps |
| 4–7 (Daily App) | Normal spacing |
| 8–10 (Cockpit) | Tiny paddings, 1px dividers instead of cards, packed data. **Mandatory**: `font-mono` for all numbers. |

---

## 5. HTML Boilerplate <a name="boilerplate"></a>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DISPLAY_FONT&family=BODY_FONT&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js"></script>
  <style>/* ALL CSS HERE */</style>
</head>
<body>
  <!-- Content -->
  <script>/* ALL JS HERE */</script>
</body>
</html>
```

---

## 6. CSS Foundation <a name="css-foundation"></a>

```css
:root {
  /* Colors — pick one palette, stick to it */
  --color-bg: #0a0a0a;            /* never #000000 */
  --color-text: #f0ece2;
  --color-accent: #e63946;        /* max 1 accent, saturation < 80% */
  --color-muted: #666;
  --color-surface: #151515;
  --color-border: #2a2a2a;

  /* Typography — never Inter, never serif on dashboards */
  --font-display: 'Instrument Serif', serif;
  --font-body: 'Geist', 'DM Sans', sans-serif;
  --font-hero: clamp(3rem, 12vw, 12rem);
  --font-display-size: clamp(2rem, 6vw, 6rem);
  --font-heading: clamp(1.5rem, 3vw, 3rem);
  --font-body-size: clamp(1rem, 1.2vw, 1.25rem);
  --font-caption: clamp(0.75rem, 0.9vw, 0.875rem);

  /* Spacing */
  --space-section: clamp(6rem, 12vh, 12rem);
  --space-element: clamp(2rem, 4vw, 4rem);
  --container-width: min(90vw, 1400px);

  /* Easing (see §2) */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  /* Durations */
  --duration-press: 160ms;
  --duration-ui: 200ms;
  --duration-reveal: 1.2s;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--font-body-size);
  line-height: 1.6;
  overflow-x: hidden;
  min-height: 100dvh; /* NEVER 100vh */
}

.container { width: var(--container-width); margin: 0 auto; }

/* CRITICAL: never h-screen, always 100dvh */
.hero { min-height: 100dvh; }

section { padding: var(--space-section) 0; position: relative; }

/* Reduced motion — fewer and gentler, not zero */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.2s !important;
    transition-duration: 0.2s !important;
    scroll-behavior: auto !important;
  }
  /* Remove movement/position animations specifically */
  [data-reveal],
  [data-reveal-stagger] > * {
    transform: none !important;
  }
}

::selection {
  background: var(--color-accent);
  color: var(--color-bg);
}
```

---

## 7. Smooth Scroll Setup <a name="smooth-scroll"></a>

```javascript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 8. Split Text Animation <a name="split-text"></a>

```javascript
function splitText(element, type = 'chars') {
  const text = element.textContent;
  element.textContent = '';
  element.style.overflow = 'hidden';

  if (type === 'chars') {
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(110%)';
      span.textContent = char === ' ' ? '\u00A0' : char;
      element.appendChild(span);
    });
  } else if (type === 'words') {
    text.split(' ').forEach((word) => {
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      wrapper.style.overflow = 'hidden';
      wrapper.style.marginRight = '0.3em';
      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(110%)';
      inner.textContent = word;
      wrapper.appendChild(inner);
      element.appendChild(wrapper);
    });
  }
  return element.querySelectorAll('span > span, span:not(:has(span))');
}

function animateHeroTitle(selector) {
  const el = document.querySelector(selector);
  const chars = splitText(el, 'chars');
  gsap.to(chars, {
    y: 0,
    duration: 1.2,
    stagger: 0.03,  // 30ms — in the 30-80ms sweet spot
    ease: 'power4.out',
    delay: 0.3,
  });
}

function animateWordsOnScroll(selector) {
  const el = document.querySelector(selector);
  const words = splitText(el, 'words');
  gsap.to(words, {
    y: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 80%' },
  });
}
```

---

## 9. Scroll Reveal System <a name="scroll-reveal"></a>

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity var(--duration-reveal) var(--ease-out-expo),
              transform var(--duration-reveal) var(--ease-out-expo);
}
[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}

[data-reveal-stagger] > * {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out-expo),
              transform 0.8s var(--ease-out-expo);
}

/* 50ms stagger — keeps interaction feeling snappy */
[data-reveal-stagger].is-visible > *:nth-child(1) { transition-delay: 0s; }
[data-reveal-stagger].is-visible > *:nth-child(2) { transition-delay: 0.05s; }
[data-reveal-stagger].is-visible > *:nth-child(3) { transition-delay: 0.10s; }
[data-reveal-stagger].is-visible > *:nth-child(4) { transition-delay: 0.15s; }
[data-reveal-stagger].is-visible > *:nth-child(5) { transition-delay: 0.20s; }
[data-reveal-stagger].is-visible > *:nth-child(6) { transition-delay: 0.25s; }

[data-reveal-stagger].is-visible > * {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
function initScrollReveals() {
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.fromTo(el,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      }
    );
  });

  gsap.utils.toArray('[data-reveal-stagger]').forEach(group => {
    gsap.fromTo(group.children,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: { trigger: group, start: 'top 85%' },
      }
    );
  });
}
```

---

## 10. Parallax Effects <a name="parallax"></a>

```javascript
function initParallax() {
  gsap.utils.toArray('[data-speed]').forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.5;
    gsap.to(el, {
      y: () => (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('section') || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  });
}

function heroParallax(heroSelector) {
  const hero = document.querySelector(heroSelector);
  gsap.to(hero, {
    opacity: 0,
    scale: 0.95,  // never scale(0)
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}
```

---

## 11. Image Reveal Animations <a name="image-reveal"></a>

```css
.img-reveal {
  position: relative;
  overflow: hidden;
}
.img-reveal img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.3);
  transition: transform 1.8s var(--ease-out-expo);
}
.img-reveal.is-visible img {
  transform: scale(1);
}
```

```javascript
function initImageReveals() {
  gsap.utils.toArray('.img-reveal').forEach(img => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: img, start: 'top 80%' },
    });
    tl.fromTo(img,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.inOut' }
    );
    tl.fromTo(img.querySelector('img'),
      { scale: 1.3 },
      { scale: 1, duration: 1.8, ease: 'power3.out' },
      0.1
    );
  });
}
```

---

## 12. Marquee / Infinite Ticker <a name="marquee"></a>

```html
<div class="marquee">
  <div class="marquee__inner">
    <span>YOUR TEXT HERE&nbsp;—&nbsp;</span>
    <span>YOUR TEXT HERE&nbsp;—&nbsp;</span>
    <span>YOUR TEXT HERE&nbsp;—&nbsp;</span>
    <span>YOUR TEXT HERE&nbsp;—&nbsp;</span>
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  white-space: nowrap;
  padding: 2rem 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.marquee__inner {
  display: inline-flex;
  animation: marquee 20s linear infinite; /* linear = constant motion */
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 5rem);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--color-muted);
}
.marquee__inner span { flex-shrink: 0; }
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-25%); }
}
```

Scroll-velocity-aware (speeds up with scroll):
```javascript
function initVelocityMarquee() {
  let currentSpeed = 1;
  lenis.on('scroll', ({ velocity }) => {
    currentSpeed = 1 + Math.abs(velocity) * 0.05;
    document.querySelector('.marquee__inner').style.animationDuration =
      `${20 / currentSpeed}s`;
  });
}
```

---

## 13. Magnetic Button <a name="magnetic-button"></a>

**CRITICAL**: Never use React `useState` for magnetic hover. Use Framer Motion's `useMotionValue` + `useTransform` (outside React render cycle) or GSAP. Setting state on every mousemove collapses performance on mobile.

```css
.btn-magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1.2em 2.5em;
  border: 1px solid var(--color-text);
  border-radius: 100px;
  background: transparent;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--font-caption);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: background 0.4s var(--ease-out),
              color 0.4s var(--ease-out),
              transform 160ms var(--ease-out);
  overflow: hidden;
}
.btn-magnetic:hover {
  background: var(--color-text);
  color: var(--color-bg);
}
.btn-magnetic:active {
  transform: scale(0.97); /* tactile feedback */
}

@media (hover: hover) and (pointer: fine) {
  /* magnetic hover only active on fine pointers */
}
```

```javascript
function initMagneticButtons() {
  document.querySelectorAll('.btn-magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
  });
}
```

```jsx
// React / Framer Motion version — CORRECT pattern
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function MagneticButton({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
```

---

## 14. Custom Cursor (use sparingly) <a name="custom-cursor"></a>

**WARNING**: Custom cursors are largely an AI tell — they hurt accessibility and perf. Use only when the brief calls for extreme editorial/portfolio work, and hide on touch devices.

```css
.cursor {
  width: 16px;
  height: 16px;
  border: 1.5px solid var(--color-text);
  border-radius: 50%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 0.3s var(--ease-out),
              height 0.3s var(--ease-out),
              margin 0.3s var(--ease-out);
}
.cursor.is-active {
  width: 48px;
  height: 48px;
  margin: -16px 0 0 -16px;
}
@media (pointer: coarse), (prefers-reduced-motion: reduce) {
  .cursor { display: none; }
}
```

```javascript
function initCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('cursor');
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX - 8, y: e.clientY - 8, duration: 0.15, ease: 'power2.out' });
  });

  document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  });
}
```

---

## 15. Grain Overlay <a name="grain-overlay"></a>

**CRITICAL**: Apply grain ONLY to a fixed, `pointer-events-none` pseudo-element. NEVER on scrolling containers — continuous GPU repaints kill mobile performance.

```css
body::after {
  content: '';
  position: fixed;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 10000;
  opacity: 0.5;
}
```

---

## 16. Scroll Progress Bar <a name="scroll-progress"></a>

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--color-accent);
  transform-origin: left;
  transform: scaleX(0);
  z-index: 9999;
  width: 100%;
}
```

```javascript
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
  });
}
```

---

## 17. Horizontal Scroll Section <a name="horizontal-scroll"></a>

```javascript
function initHorizontalScroll(containerSelector, panelSelector) {
  const container = document.querySelector(containerSelector);
  const panels = gsap.utils.toArray(panelSelector);
  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => '+=' + container.offsetWidth,
    },
  });
}
```

---

## 18. Section Transition Wipes <a name="section-wipes"></a>

```javascript
function initSectionWipes() {
  gsap.utils.toArray('.section-wipe').forEach(section => {
    gsap.fromTo(section,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          scrub: true,
        },
      }
    );
  });
}
```

---

## 19. Press States & Tactile Feedback <a name="tactile"></a>

Every pressable element MUST feel alive on touch.

```css
button,
a[role="button"],
[data-pressable] {
  transition: transform 160ms var(--ease-out);
}
button:active,
a[role="button"]:active,
[data-pressable]:active {
  transform: scale(0.97);
}

/* Subtle lift on hover (desktop only) */
@media (hover: hover) and (pointer: fine) {
  [data-lift]:hover {
    transform: translateY(-1px);
  }
  [data-lift]:active {
    transform: translateY(0) scale(0.98);
  }
}
```

```jsx
// Framer Motion
<motion.button
  whileHover={{ y: -1 }}
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
>
  Click me
</motion.button>
```

---

## 20. Popover / Tooltip Origin Rules <a name="popover"></a>

```css
/* Radix */
[data-radix-popover-content],
[data-radix-dropdown-menu-content],
[data-radix-hover-card-content] {
  transform-origin: var(--radix-popper-transform-origin);
  transition: transform 180ms var(--ease-out),
              opacity 180ms var(--ease-out);
}

[data-state="open"] {
  animation: popover-in 180ms var(--ease-out);
}
[data-state="closed"] {
  animation: popover-out 150ms var(--ease-out);
}

@keyframes popover-in {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes popover-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.96); }
}

/* MODAL EXCEPTION: modals stay centered, not tied to trigger */
[data-radix-dialog-content] {
  transform-origin: center; /* intentional */
}
```

---

## 21. Clip-path Mastery <a name="clip-path"></a>

`clip-path` is the single most powerful animation primitive. Use it for reveals, comparisons, hold-to-delete, image pans.

### Inset shorthand
```
clip-path: inset(top right bottom left);

inset(0 100% 0 0)  → fully hidden from the right
inset(0 0 0 0)     → fully visible
inset(0 0 100% 0)  → hidden from the bottom
```

### Hold-to-delete

```css
.delete-btn {
  position: relative;
  transition: transform 160ms var(--ease-out);
  overflow: hidden;
}
.delete-btn:active {
  transform: scale(0.97);
}
.delete-btn__overlay {
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  clip-path: inset(0 100% 0 0);
  transition: clip-path 200ms var(--ease-out); /* release: fast */
}
.delete-btn:active .delete-btn__overlay {
  clip-path: inset(0 0 0 0);
  transition: clip-path 2s linear; /* hold: slow & deliberate */
}
```

### Image reveal on scroll

```javascript
gsap.fromTo(imgEl,
  { clipPath: 'inset(0 0 100% 0)' },
  {
    clipPath: 'inset(0 0 0 0)',
    duration: 1.2,
    ease: 'power4.inOut',
    scrollTrigger: { trigger: imgEl, start: 'top 80%' }
  }
);
```

### Comparison slider (before/after)

```css
.compare-top {
  position: absolute;
  inset: 0;
  clip-path: inset(0 var(--slider-pos, 50%) 0 0);
}
```

---

## 22. Gesture & Drag Interactions <a name="gestures"></a>

### Momentum dismissal

Don't require dragging past a fixed threshold. Check velocity — a quick flick should dismiss even at short distance.

```js
const timeTaken = Date.now() - dragStartTime;
const velocity = Math.abs(swipeAmount) / timeTaken;

if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
  dismiss();
}
```

### Damping at boundaries

Instead of preventing overdrag, allow it with diminishing effect:

```js
const overdrag = Math.max(0, rawDrag - boundary);
const damped = boundary + overdrag * 0.3; // 0.3 = strong resistance
```

### Pointer capture & multi-touch protection

```js
element.setPointerCapture(pointerId);

function onPress() {
  if (isDragging) return; // ignore additional fingers mid-drag
  // start drag
}
```

### CSS variable inheritance trap [CRITICAL]

```js
// BAD: recalculates all children styles on every frame
element.style.setProperty('--swipe-amount', `${distance}px`);

// GOOD: only this element repaints
element.style.transform = `translateY(${distance}px)`;
```

---

## 23. Motion-Engine Bento (SaaS mode) <a name="bento"></a>

When building modern SaaS dashboards, feature sections, or product grids.

### Design tokens

```css
:root {
  --bento-bg: #f9fafb;
  --bento-card: #ffffff;
  --bento-border: rgba(226, 232, 240, 0.5); /* slate-200/50 */
  --bento-radius: 2.5rem;
  --bento-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
  --bento-padding: 2.5rem; /* p-10 */
}

.bento-card {
  background: var(--bento-card);
  border: 1px solid var(--bento-border);
  border-radius: var(--bento-radius);
  box-shadow: var(--bento-shadow);
  padding: var(--bento-padding);
}

/* Labels live outside the card */
.bento-item__label {
  margin-top: 1.25rem;
  font-family: 'Geist', sans-serif;
  letter-spacing: -0.01em;
}
```

### Grid layout (Row 1: 3 cols | Row 2: 70/30 split)

```html
<div class="bento-grid">
  <div class="bento-card bento--list">...</div>
  <div class="bento-card bento--command">...</div>
  <div class="bento-card bento--status">...</div>
  <div class="bento-card bento--stream">...</div>
  <div class="bento-card bento--focus">...</div>
</div>
```

```css
.bento-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .bento--stream { grid-column: span 2; }
  .bento--focus { grid-column: span 1; }
}
```

### 5 Card Archetypes (Framer Motion)

```jsx
'use client';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { memo, useState, useEffect } from 'react';

const SPRING = { type: 'spring', stiffness: 100, damping: 20 };

// 1. Intelligent List — auto-sorting with layoutId
export const IntelligentList = memo(() => {
  const [items, setItems] = useState([
    { id: '1', label: 'Ship Q2 roadmap', priority: 3 },
    { id: '2', label: 'Review PR #2847', priority: 1 },
    { id: '3', label: 'Prep for Monday sync', priority: 2 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        [...prev].sort(() => Math.random() - 0.5)
      );
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <LayoutGroup>
      <ul className="space-y-3">
        {items.map((item) => (
          <motion.li
            key={item.id}
            layout
            layoutId={item.id}
            transition={SPRING}
            className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium">{item.label}</span>
          </motion.li>
        ))}
      </ul>
    </LayoutGroup>
  );
});

// 2. Command Input — multi-step typewriter
export const CommandInput = memo(() => {
  const prompts = [
    'Summarize this week\'s customer calls',
    'Draft the Q2 planning doc',
    'Generate a follow-up for the Mercer account',
  ];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const current = prompts[idx];
    if (phase === 'typing') {
      if (text.length < current.length) {
        const t = setTimeout(() => setText(current.slice(0, text.length + 1)), 40);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase('holding'), 1400);
      return () => clearTimeout(t);
    }
    if (phase === 'holding') {
      const t = setTimeout(() => setPhase('deleting'), 800);
      return () => clearTimeout(t);
    }
    if (text.length > 0) {
      const t = setTimeout(() => setText(text.slice(0, -1)), 20);
      return () => clearTimeout(t);
    }
    setPhase('typing');
    setIdx((i) => (i + 1) % prompts.length);
  }, [text, phase, idx]);

  return (
    <div className="rounded-2xl border border-slate-200 p-4 font-mono text-sm">
      <span className="text-slate-400 mr-2">›</span>
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-4 bg-slate-900 ml-0.5 align-middle"
      />
    </div>
  );
});

// 3. Live Status — breathing indicator + overshoot notification
export const LiveStatus = memo(() => {
  const [showBadge, setShowBadge] = useState(false);
  useEffect(() => {
    const t = setInterval(() => {
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 3000);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
        className="absolute top-2 left-2 h-3 w-3 rounded-full bg-emerald-500"
      />
      <div className="absolute top-2 left-2 h-3 w-3 rounded-full bg-emerald-500" />

      <AnimatePresence>
        {showBadge && (
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="mt-8 inline-flex px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs"
          >
            New activity
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// 4. Wide Data Stream — seamless infinite carousel
export const WideDataStream = memo(() => {
  const items = Array.from({ length: 8 }, (_, i) => ({ id: i, value: `${(Math.random() * 100).toFixed(1)}%` }));
  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 w-max"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="px-5 py-3 rounded-2xl border border-slate-200 font-mono text-sm">
            {item.value}
          </div>
        ))}
      </motion.div>
    </div>
  );
});

// 5. Contextual UI — staggered highlight + floating toolbar
export const ContextualUI = memo(() => {
  const [highlightIdx, setHighlightIdx] = useState(-1);
  useEffect(() => {
    const t = setInterval(() => {
      setHighlightIdx((i) => (i >= 3 ? -1 : i + 1));
    }, 1100);
    return () => clearInterval(t);
  }, []);

  const lines = ['Meeting notes', 'Action items', 'Decisions', 'Follow-ups'];

  return (
    <div className="space-y-2 relative">
      {lines.map((line, i) => (
        <motion.div
          key={line}
          animate={{ backgroundColor: highlightIdx === i ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0)' }}
          transition={{ duration: 0.3 }}
          className="px-3 py-2 rounded-lg text-sm"
        >
          {line}
        </motion.div>
      ))}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={SPRING}
        className="absolute -bottom-4 right-0 flex gap-2 p-2 rounded-full bg-slate-900 shadow-xl"
      >
        <div className="h-6 w-6 rounded-full bg-white/10" />
        <div className="h-6 w-6 rounded-full bg-white/10" />
        <div className="h-6 w-6 rounded-full bg-white/10" />
      </motion.div>
    </div>
  );
});
```

**Critical**: Each archetype is wrapped in `memo()` and lives in its own isolated Client Component. Never embed perpetual motion inside a layout that re-renders.

---

## 24. Stagger Patterns <a name="stagger"></a>

Stagger delays stay 30–80ms. Longer feels slow.

```css
/* CSS-only stagger using custom property index */
.stagger-item {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeUp 400ms var(--ease-out) forwards;
  animation-delay: calc(var(--index) * 50ms);
}

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
```

```jsx
// Framer Motion — parent + children MUST be in the same Client Component tree
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: SPRING },
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((i) => <motion.li key={i.id} variants={item}>{i.label}</motion.li>)}
</motion.ul>
```

---

## 25. Blur-Bridge for Crossfades <a name="blur-bridge"></a>

When two states crossfade and the result looks "off" despite tuning easings and durations, add subtle blur during transition. It blends the two states into one perceived transformation.

```css
.button-content {
  transition: filter 200ms var(--ease-out),
              opacity 200ms var(--ease-out);
}
.button-content[data-transitioning="true"] {
  filter: blur(2px);
  opacity: 0.7;
}
```

Keep blur under 20px. Heavy blur is expensive, especially in Safari.

---

## 26. Font Recommendations <a name="fonts"></a>

### Display (hero titles)
| Font | Vibe | Source |
|---|---|---|
| Instrument Serif | Contemporary editorial | Google Fonts |
| Playfair Display | Elegant editorial | Google Fonts |
| DM Serif Display | Modern classic | Google Fonts |
| Cormorant Garamond | Refined luxury | Google Fonts |
| Syne | Avant-garde | Google Fonts |
| Bebas Neue | Bold industrial | Google Fonts |
| Cabinet Grotesk | Premium neutral | Fontshare |
| Clash Display | Sharp modern | Fontshare |

### Body / UI
| Font | Vibe | Source |
|---|---|---|
| Geist | Swiss modern | Google Fonts |
| Geist Mono | Technical pair | Google Fonts |
| Satoshi | Neutral premium | Fontshare |
| DM Sans | Clean modern | Google Fonts |
| Manrope | Humanist | Google Fonts |
| Plus Jakarta Sans | Soft geometric | Google Fonts |

### Pairings
- **Luxury editorial**: Instrument Serif + Geist
- **Awwwards dark**: Syne + DM Sans
- **Cream editorial**: Cormorant Garamond + Plus Jakarta Sans
- **Bold industrial**: Bebas Neue + Manrope
- **SaaS dashboard**: Geist + Geist Mono (NO serif)

**BANNED**: Inter, Roboto, Arial. Serifs on dashboards.

---

## 27. Color Palettes <a name="palettes"></a>

### Dark Cinematic (default)
```
bg: #0a0a0a | text: #f0ece2 | accent: #e63946 | muted: #555 | surface: #151515
```

### Cream Editorial
```
bg: #f5f0e8 | text: #1a1a1a | accent: #c1440e | muted: #888 | surface: #e8e0d0
```

### Midnight Blue
```
bg: #0d1117 | text: #e6edf3 | accent: #58a6ff | muted: #484f58 | surface: #161b22
```

### Warm Noir
```
bg: #1a1612 | text: #e8ddd3 | accent: #d4a574 | muted: #6b5e50 | surface: #2a2420
```

### Ice Minimal
```
bg: #f8f9fa | text: #111 | accent: #0066ff | muted: #999 | surface: #eee
```

### Bento SaaS
```
bg: #f9fafb | text: #0f172a | card: #ffffff | border: rgba(226,232,240,0.5) | accent: #10b981
```

**Rules**: Max 1 accent. Saturation < 80%. Never `#000000`. Don't drift palettes mid-project.

---

## 28. React Patterns <a name="react-patterns"></a>

### useScrollReveal hook (no lib)
```jsx
function useScrollReveal(options = {}) {
  const ref = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function RevealSection({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s,
                     transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
```

### useReducedMotion gating
```jsx
import { useReducedMotion } from 'framer-motion';

function Drawer() {
  const reduce = useReducedMotion();
  const closedX = reduce ? 0 : '-100%';
  return <motion.aside animate={{ x: open ? 0 : closedX }} />;
}
```

### Framer Motion hardware-acceleration caveat
```jsx
// NOT hardware-accelerated (drops frames under load)
<motion.div animate={{ x: 100 }} />

// Hardware-accelerated — use when smoothness matters under busy main thread
<motion.div animate={{ transform: 'translateX(100px)' }} />
```

### Server Component safety
```jsx
// Static layout stays in Server Component
export default function Page() {
  return (
    <main>
      <StaticHero />
      <InteractiveBento />  {/* <- 'use client' leaf */}
    </main>
  );
}
```

---

## 29. Forbidden Patterns (Slop Filter) <a name="forbidden"></a>

Strictly avoid unless the user explicitly asks.

### Visual / CSS
- No neon outer glows. No default `box-shadow` glows.
- No pure `#000000`. Use Zinc-950 / off-black.
- No oversaturated accents. Desaturate to blend elegantly.
- No text-fill gradients on large headers.
- No animated from `scale(0)`.
- No `ease-in` on UI.
- No `transition: all`. Specify properties.
- No `h-screen` on heroes. Use `min-h-[100dvh]`.
- No animating `width`, `height`, `top`, `left`, `padding`, `margin`.
- No complex flex-math (`w-[calc(33%-1rem)]`). Use CSS Grid.

### Typography
- No Inter font.
- No serif on dashboards.
- No oversized H1s screaming.

### Layout
- No centered heroes at DESIGN_VARIANCE > 4.
- No 3-equal-card feature rows.
- No awkward floating gaps from lazy spacing.

### Content (the "Jane Doe" effect)
- No generic names: John Doe, Sarah Chan, Jack Su, Jane Doe.
- No egg avatars or Lucide user icons. Use `picsum.photos/seed/{random}/800/600`.
- No fake-round numbers: `99.99%`, `50%`, `1234567`.
- No startup slop names: Acme, Nexus, SmartFlow, Quantum*, Pulse*, Zenith.
- No filler copy: Elevate, Seamless, Unleash, Next-Gen, Revolutionize, Empower.

### Components
- No broken Unsplash links. Use `picsum.photos`.
- No default shadcn/ui. Always customize radii, colors, shadows.
- No custom mouse cursors (except brief-justified editorial work).
- No emojis. Ever. Use Phosphor / Radix icons.

### React / Framer
- No `useState` for magnetic hover. Use `useMotionValue`.
- No `window.addEventListener('scroll')`. Use ScrollTrigger / IntersectionObserver / `useScroll`.
- No mixing GSAP + Framer Motion in the same component tree.
- No Framer `animate={{ x }}` for smooth-under-load paths. Use `transform` string.
- No stagger parent/children split across Server/Client boundary.

---

## 30. Pre-Flight Check <a name="pre-flight"></a>

Final filter before output. If any box is unchecked, revise.

### Layout & Responsiveness
- [ ] `min-h-[100dvh]` on heroes, NOT `h-screen`.
- [ ] Asymmetric layouts collapse to `w-full px-4` below `md:`.
- [ ] Container uses `max-w-[1400px] mx-auto` or `max-w-7xl`.
- [ ] No complex flex-math; Grid used for structural layouts.

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
- [ ] Every animation answered Q1–Q4 of the Decision Framework.
- [ ] No `ease-in` on any UI element.
- [ ] All UI durations < 300ms (except marketing/scrolltelling).
- [ ] Custom easing curves used (not browser defaults).
- [ ] Only `transform` and `opacity` animated.

### Craft Layer
- [ ] Every button has `:active { transform: scale(0.97) }`.
- [ ] No entry animates from `scale(0)`.
- [ ] Popovers use trigger-origin (modals exempt).
- [ ] CSS transitions (not keyframes) for interruptible UI.
- [ ] `prefers-reduced-motion` handled (gentler, not zero).
- [ ] Hover states gated by `@media (hover: hover) and (pointer: fine)`.

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
