# Motion Libraries — Framer Motion, React Bits, Aceternity UI

Vetted patterns for React-side motion. Open this when the brief is React/Next.js and the chosen style calls for motion.

## Framer Motion — the workhorse

The default React motion library for this pack. Used heavily in `premium-bento` (perpetual micro-interactions, archetype 1 `LayoutGroup`, archetype 3 `AnimatePresence`) and selectively in `editorial-premium`, `warm-modern`, `dark-luxe`.

### Spring presets

```js
const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;        // bento baseline
const SPRING_POP = { type: 'spring', stiffness: 380, damping: 22 } as const;    // notification overshoot
const TIGHT = { type: 'spring', stiffness: 300, damping: 30 };                  // controlled, no bounce
const ALIVE = { type: 'spring', mass: 1, stiffness: 100, damping: 10 };         // organic, slight overshoot
```

Bounce stays subtle. 0.1–0.3 max bounce except for drag-to-dismiss / playful interactions.

### Hardware acceleration caveat — important

```jsx
// NOT hardware-accelerated (drops frames under load)
<motion.div animate={{ x: 100 }} />

// Hardware-accelerated — use when smoothness matters under busy main thread
<motion.div animate={{ transform: 'translateX(100px)' }} />
```

Use the transform string form for anything that must stay smooth under load (drags, hovers on scroll-heavy pages).

### `LayoutGroup` + `layoutId` for auto-sorting lists

Used in the Bento "intelligent list" archetype. Items shuffle position with spring physics; no manual interpolation.

```jsx
<LayoutGroup>
  <ul>
    {items.map(item => (
      <motion.li key={item.id} layout layoutId={item.id} transition={SPRING}>
        {item.label}
      </motion.li>
    ))}
  </ul>
</LayoutGroup>
```

### `AnimatePresence` for enter/exit

Used for toasts, notifications, mounted-state transitions. `mode="popLayout"` keeps spacing correct when items leave.

```jsx
<AnimatePresence mode="popLayout">
  {showBadge && (
    <motion.div
      key={eventIdx}
      initial={{ y: 14, opacity: 0, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -10, opacity: 0, scale: 0.96 }}
      transition={SPRING_POP}
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

### Magnetic button — `useMotionValue`, not `useState`

Critical: never use `useState` for mouse-tracking. It collapses performance on mobile.

```jsx
import { motion, useMotionValue, useSpring } from 'framer-motion';

function MagneticButton({ children }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };

  return (
    <motion.button
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
```

Gate behind `(hover: hover) and (pointer: fine)` for desktop only.

### `useScroll` for scroll-driven motion

```jsx
import { useScroll, useTransform } from 'framer-motion';
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
```

Use this over `window.addEventListener('scroll')` — always.

### `useReducedMotion` gating

```jsx
import { useReducedMotion } from 'framer-motion';
function Drawer() {
  const reduce = useReducedMotion();
  const closedX = reduce ? 0 : '-100%';
  return <motion.aside animate={{ x: open ? 0 : closedX }} />;
}
```

Apply on any directional motion. Color and opacity transitions are fine to keep.

---

## React Bits

Effects-focused library. Use individual primitives, not the whole kit. Anything pasted in raw will look like every other AI page.

### When to reach for it

- `split-text` — heroes in `cinematic-product`, `editorial-premium`.
- `text-type` — typewriter for command-bar inputs in `premium-bento`.
- `count-up` — metric reveal in `swiss-system`, `dashboards`-style work.
- `scroll-reveal`, `blur-text`, `fade-content` — restrained scroll entrances across all styles.
- `glare-hover` — `dark-luxe` accent hover on cards.
- `metallic-paint`, `shiny-text` — `dark-luxe` only, and only on small surfaces.
- `magic-bento`, `scroll-stack` — `premium-bento` advanced grids.

### Customize

Always change the default colors, durations, and easings. Defaults read as "React Bits page". The library is research, not an output.

---

## Aceternity UI

Marketing-focused effects. Powerful but very heavily styled — must be hardened before shipping.

### Acceptable when adjusted

- `hero-parallax` (cinematic-product, after recoloring + replacing default tilt math).
- `apple-cards-carousel`, `container-cover` (cinematic-product).
- `bento-grid`, `expandable-card`, `focus-cards` (premium-bento, after restyling).
- `hero-highlight`, `lamp-effect` (dark-luxe, with the glow desaturated).
- `card-spotlight`, `glare-card` (dark-luxe).
- `following-pointer` (editorial-premium, sparingly).
- `animated-testimonials` (warm-modern, with real photography and real names).

### Always strip

- The default purple/indigo gradients (the AI tell).
- The over-rounded `rounded-3xl` defaults.
- The signature glow shadows — replace with diffusion shadows tinted to the page mood.
- Generic copy embedded in the demo.

### Never use without justification

- `wavy-background`, `aurora-background`, `vortex` — these are the slop tells.
- `meteors`, `sparkles` — only if the brief is explicitly festive/playful and the rest of the page is restrained.

---

## Universal interruption rules

- CSS transitions retarget mid-flight. Keyframes restart from zero. For anything the user can interrupt (toggles, list adds, hover), prefer CSS transitions or Framer springs.
- Springs maintain velocity when interrupted. Use them for gestures (drag-to-dismiss, swipe).
- Asymmetric timing: slow when the user is deciding (`hold-to-delete: 2s linear`), fast when the system responds (`release: 200ms ease-out`).

See `references/animation.md § 1` for the full decision framework and `references/animation.md § 3` for the Emil Kowalski craft checklist applied to all of these patterns.
