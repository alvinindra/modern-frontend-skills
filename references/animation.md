# Animation Reference

The full animation system for `modern-frontend` skill. Decision framework, easing presets, the Emil Kowalski craft layer, gesture rules, clip-path patterns, and provenance notes for skill-developed techniques.

Load this whenever the work involves motion — landing pages, dashboards, components, interactive states. It is the always-loaded reference.

> **Anchor**: Emil Kowalski (Sonner, Vaul, animations.dev) is the canonical source for the craft rules below. Where a rule is skill-developed rather than published by Emil, it carries a **[skill-tuned]** tag.

---

## Table of Contents

1. [Animation Decision Framework](#decision)
2. [Easing Curves & Spring Presets](#easing)
3. [The Emil Craft Checklist](#craft)
4. [Press States & Tactile Feedback](#tactile)
5. [Popover / Tooltip Origin Rules](#popover)
6. [Clip-path Mastery](#clip-path)
7. [Gesture & Drag Interactions](#gestures)
8. [Stagger Patterns](#stagger)
9. [Blur-Bridge for Crossfades](#blur-bridge)
10. [Provenance Notes](#provenance)

---

## 1. Animation Decision Framework <a name="decision"></a>

Walk these steps in order. If an animation can't answer all of them, cut it.

### Step 0 — Pick easing FIRST

Easing determines *feel*; duration only fine-tunes responsiveness. **Never adjust duration to fix an easing problem.** A 180ms `ease-out` dropdown feels more responsive than a 400ms `ease-in-out` one — duration cannot rescue the wrong curve.

```
Is the element entering or exiting?
  Yes → ease-out (instant visible movement = feels responsive)
  No  → Is it moving/morphing on screen?
          Yes → ease-in-out (natural accel/decel)
        Is it hover/color?
          Yes → ease
        Is it constant motion (marquee, progress)?
          Yes → linear
        Default → ease-out
```

**NEVER use `ease-in` for UI.** It delays the initial movement — the exact frame users are watching most closely.

### Step 1 — Should this animate at all?

| Frequency | Decision |
|---|---|
| 100+/day (keyboard shortcuts, command palette toggle) | No animation, ever |
| Tens/day (hover effects, list nav) | Remove or drastically reduce |
| Occasional (modals, drawers, toasts) | Standard animation |
| Rare / first-time (onboarding, celebrations, marketing) | Can add delight |

**Never animate keyboard-initiated actions.** They're repeated hundreds of times a day; animation makes them feel delayed. Raycast has no open/close animation for a reason.

### Step 2 — Does this motion clarify or obscure?

The usability frame. Awwwards weights Usability at **30% of total score** — it is the second-biggest scoring axis after Design (40%). If motion does any of the following, cut it:

- Hides where to click next
- Delays the user's response to their own action
- Repeats often enough to become noise
- Plays during keyboard-driven flow

Motion is communication. If it isn't *communicating*, it's *interrupting*.

### Step 3 — What is the purpose?

Every animation must satisfy one of:
- **Spatial consistency** — toasts enter/exit from the same direction (makes swipe-to-dismiss intuitive).
- **State indication** — morphing feedback button shows the state change.
- **Feedback** — button scales down on press, confirming the input was heard.
- **Explanation** — marketing animation showing how a feature works.
- **Preventing jarring change** — elements appearing without transition feel broken.

If the answer is "it looks cool" AND the user sees it often — cut it.

### Step 4 — How fast?

| Element | Duration |
|---|---|
| Button press feedback | 100–160ms |
| Tooltips, small popovers | 125–200ms |
| Dropdowns, selects | 150–250ms |
| Modals, drawers | 200–500ms |
| Marketing / explanatory / scrolltelling | Can be longer |

**UI animations stay under 300ms.**

### Accessibility check

Before shipping any motion, gate against `prefers-reduced-motion`. Goal is *fewer and gentler*, not *zero* — keep color/opacity transitions; drop directional translates, scale changes, and parallax. The canonical media query:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.2s !important;
    transition-duration: 0.2s !important;
    scroll-behavior: auto !important;
  }
  [data-reveal],
  [data-reveal-stagger] > * {
    transform: none !important;
  }
}
```

### Perceived performance note

A fast-spinning spinner makes loading *feel* faster (same load time, different perception). An instant tooltip on subsequent opens makes the whole toolbar feel faster. Speed perception is as real as speed.

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

- [ ] Never `scale(0)`. Start from `scale(0.95)` + `opacity: 0`. **[skill-tuned]** — Emil teaches "nothing in nature appears from nothing"; the specific 0.95 value is empirically tuned by this skill.
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

- [ ] `transform-origin` tied to trigger, NOT center. **[verify against animations.dev course]**

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

### Asymmetric timing **[skill-tuned]**

- [ ] Slow where the user is deciding (hold-to-delete: 2s linear). Fast where the system responds (release: 200ms ease-out). Derived from Emil's purpose-driven principle: motion duration reflects the *meaning* of the action.

### `translateY` in percentages

- [ ] Use `translateY(100%)` over pixel values. Adapts to content.

### Hardware-acceleration caveats

Framer Motion's `animate={{ x: 100 }}` is NOT hardware-accelerated — it uses `requestAnimationFrame` and drops frames under main-thread load. For any path that must stay smooth under load, use the transform string:

```jsx
// drops frames under load
<motion.div animate={{ x: 100 }} />
// hardware-accelerated
<motion.div animate={{ transform: 'translateX(100px)' }} />
```

### Only animate `transform` and `opacity`

Anything else triggers layout/paint. No exceptions for performance-critical paths.

### CSS variable inheritance trap

Updating a CSS var on a parent recalculates styles for all children. For drag/swipe, set `element.style.transform` directly, not a variable:

```js
// BAD: recalculates all children styles on every frame
element.style.setProperty('--swipe-amount', `${distance}px`);
// GOOD: only this element repaints
element.style.transform = `translateY(${distance}px)`;
```

---

## 4. Press States & Tactile Feedback <a name="tactile"></a>

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

## 5. Popover / Tooltip Origin Rules <a name="popover"></a>

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

## 6. Clip-path Mastery <a name="clip-path"></a>

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

## 7. Gesture & Drag Interactions <a name="gestures"></a>

### Momentum dismissal

Don't require dragging past a fixed threshold. Check velocity — a quick flick should dismiss even at short distance. Emil teaches: **velocity > distance** for gesture intent.

```js
const timeTaken = Date.now() - dragStartTime;
const velocity = Math.abs(swipeAmount) / timeTaken;

if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
  dismiss();
}
```

The `0.11` velocity threshold is **[skill-tuned]** — calibrated to match Vaul/Sonner feel.

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

---

## 8. Stagger Patterns <a name="stagger"></a>

Stagger delays stay 30–80ms. Longer feels slow. On mobile, drop to 30ms.

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

## 9. Blur-Bridge for Crossfades <a name="blur-bridge"></a>

**[skill-developed]** — Not in Emil's published canon. Use conservatively.

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

## 10. Provenance Notes <a name="provenance"></a>

The rules in this reference fall into two categories. Knowing which is which lets you judge edge cases.

### Directly sourced from Emil Kowalski

- Sub-300ms duration ceiling for UI
- Never animate keyboard-initiated actions
- `ease-out` for enter/exit; never `ease-in` for UI
- Spring physics over CSS for interruptible motion
- `prefers-reduced-motion` compliance
- CSS transitions over keyframes for interruptible UI
- 60 FPS minimum
- Only animate `transform` and `opacity`
- Purpose-driven animation selection

### Skill-tuned (consistent with Emil's philosophy but specific values are this skill's)

- `scale(0.95)` magic number for entries (his principle is "not from nothing"; 0.95 is empirical)
- Asymmetric timing 2s hold / 200ms release (derived from his purpose-driven principle)
- `0.11` velocity threshold for swipe dismissal (calibrated against Vaul/Sonner feel)
- Blur-bridge crossfade technique (skill-developed; conservative use)
- Popover trigger-origin (likely from his animations.dev course; verify if uncertain)

If a downstream user pushes back on a skill-tuned value, the principle is canonical even when the number isn't. Refer them upstream to Emil's source.
