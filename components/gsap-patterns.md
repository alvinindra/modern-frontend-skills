# GSAP Patterns + Lenis + ScrollTrigger

Vetted GSAP recipes for the cinematic styles in this pack. Use these as starting points; do not paste them whole. Adapt to the specific brief.

GSAP and Framer Motion should NOT coexist in the same component tree. Pick one per scene.

---

## Setup — Lenis smooth scroll + ScrollTrigger sync

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

**When to use Lenis**: experiential / agency / portfolio / cinematic work.
**When to skip Lenis**: e-commerce, conversion-critical, content-reading, dashboards. Native scroll wins on perceived performance.

---

## Recipe — `animate-text` (split-char hero entrance)

```javascript
function splitChars(el) {
  el.querySelectorAll('.line').forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach(ch => {
      const s = document.createElement('span');
      s.classList.add('char');
      s.textContent = ch === ' ' ? ' ' : ch;
      line.appendChild(s);
    });
  });
}

splitChars(document.querySelector('.hero-title'));
gsap.to('.hero-title .char', {
  y: 0,
  duration: 1.1,
  stagger: 0.025,   // 25ms — inside 30-80ms sweet spot
  ease: 'power4.out',
  delay: 0.3,
});
```

Pair with `overflow: hidden` on `.line` and `transform: translateY(110%)` on `.char` in CSS so the chars are hidden until the timeline plays.

---

## Recipe — `responsive-line-splits-on-scroll`

Lines reveal as they enter the viewport. Stagger 50-80ms between lines, 200ms between sections.

```javascript
gsap.utils.toArray('.split-section').forEach(section => {
  gsap.to(section.querySelectorAll('.line span'), {
    y: 0,
    duration: 1.0,
    stagger: 0.07,
    ease: 'power3.out',
    scrollTrigger: { trigger: section, start: 'top 70%' },
  });
});
```

---

## Recipe — `text-masking`

Reveal a word or phrase by sliding a fill across it. Use sparingly — once per page or chapter.

```css
.mask-text {
  background: linear-gradient(90deg, var(--color-accent) 50%, var(--color-text) 50%);
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: background-position 1.4s cubic-bezier(0.77, 0, 0.175, 1);
}
.mask-text.in { background-position: 0 0; }
```

---

## Recipe — `image-mask-on-scroll`

Reveal an image via `clip-path` as the user scrolls into the section. The most powerful primitive for cinematic transitions.

```javascript
gsap.fromTo(imgEl,
  { clipPath: 'inset(100% 0 0 0)' },
  {
    clipPath: 'inset(0% 0 0 0)',
    duration: 1.4,
    ease: 'power4.inOut',
    scrollTrigger: { trigger: imgEl, start: 'top 80%' },
  }
);
```

Combine with a slow `scale(1.15) → scale(1)` on the inner `<img>` for film-like settling motion.

---

## Recipe — `horizontal-scrolling-gallery`

A scroll-hijacked horizontal gallery. Strong Awwwards pattern. Use only inside Act 2 of a cinematic page — never as primary navigation.

```javascript
const container = document.querySelector('.h-scroll');
const panels = gsap.utils.toArray('.h-scroll-panel');
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
```

Mobile: disable on `< 768px`. Vertical scroll only on phones.

---

## Recipe — `directional-marquee`

Scroll-velocity-aware marquee. Speeds up with scroll; constant linear when idle. Pair with a large display italic.

```javascript
let speed = 1;
lenis.on('scroll', ({ velocity }) => {
  speed = 1 + Math.min(Math.abs(velocity) * 0.04, 2);
  marqueeEl.style.animationDuration = `${baseSeconds / speed}s`;
});
```

CSS uses `animation: marquee Ns linear infinite` — never `ease-*`. Constant motion must be linear.

---

## Recipe — `image-sequence`

Frame-by-frame product reveal driven by scroll. Use for hardware launches, automotive, premium product reveal. Heavy — only when central to the brief.

```javascript
const frames = 120;
const images = Array.from({length: frames}, (_, i) =>
  `/seq/${String(i + 1).padStart(3, '0')}.jpg`
);
const canvas = document.querySelector('.seq');
const ctx = canvas.getContext('2d');
const state = { frame: 0 };

ScrollTrigger.create({
  trigger: '.seq-wrap',
  start: 'top top',
  end: '+=4000',
  scrub: 0.5,
  pin: true,
  onUpdate: (self) => {
    const f = Math.round(self.progress * (frames - 1));
    if (f !== state.frame) {
      state.frame = f;
      const img = new Image();
      img.src = images[f];
      img.onload = () => ctx.drawImage(img, 0, 0);
    }
  },
});
```

Pre-warm the first ~10 frames. Preload all frames before the scroll trigger arms.

---

## Recipe — `velocity-skew`

Skew elements on fast scroll. Suits dark-luxe and editorial. Very subtle — `skewY: 2deg` ceiling.

```javascript
const skew = gsap.quickTo('.skew-target', 'skewY', { duration: 0.5, ease: 'power2.out' });
lenis.on('scroll', ({ velocity }) => {
  skew(Math.max(-2, Math.min(2, velocity * 0.05)));
});
```

---

## Recipe — Parallax depths (with mobile adaptation)

```javascript
gsap.utils.toArray('[data-speed]').forEach(el => {
  const desktopSpeed = parseFloat(el.dataset.speed) || 0.5;
  const mobile = window.matchMedia('(max-width: 767px)').matches;
  const speed = mobile ? (1 - (1 - desktopSpeed) * 0.5) : desktopSpeed;
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
```

Mobile halves the depth. Deep parallax on small screens feels seasick.

---

## Cleanup — `useEffect` discipline (React + GSAP)

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // your animations here
  }, scope);
  return () => ctx.revert();
}, []);
```

Always use `gsap.context()` inside React. Skipping cleanup causes orphaned ScrollTriggers and slow tabs.

---

## Anti-patterns

- Mixing GSAP and Framer Motion in the same component tree.
- `window.addEventListener('scroll')` — use ScrollTrigger or `useScroll`.
- Updating CSS variables on scroll-heavy parents (recalculates all children).
- `transition: all` on elements that GSAP also animates.
- Long scroll-pinned sections (>3 viewports) without an exit affordance.
