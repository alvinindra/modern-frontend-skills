# Style Recipes

Maps each pack direction to the third-party library patterns that reinforce it. The agent opens this **after** picking a direction. Open the referenced library files **before** building.

The component library exists to raise the quality ceiling of a direction — not to define it. Direction first, library second.

---

## Cinematic Scroll

- **From `gsap-patterns.md`** — `image-mask-on-scroll`, `responsive-line-splits-on-scroll`, `directional-marquee`, `horizontal-scrolling-gallery`, `image-sequence` (for hardware launches).
- **From `motion-libraries.md`** — Framer Motion `useScroll` + `useTransform` for parallax product crops; `LayoutGroup` for product configurator transitions; React Bits `split-text`, `text-type`, `fade-content`.
- **From `component-libraries.md`** — Aceternity `hero-parallax`, `apple-cards-carousel`, `container-cover`, `3d-pin`, `compare`. 21st.dev hero references and image gallery — only after the page skeleton is strong.
- **Push toward**: hero stills with real product renders, chapter-based reveals, premium stat blocks with `count-up`, stronger top-rail navigation, magnetic CTA.
- **Avoid**: generic dark-startup gradients, tiny product screenshots, bento grids as the main hero, "scroll telling" with no story.

## Motion Bento

- **From `motion-libraries.md`** — Framer Motion `LayoutGroup` + `layoutId` (intelligent list archetype), `AnimatePresence` (live status notification archetype), spring transitions everywhere.
- **From `gsap-patterns.md`** — `animate-css-grid-positions`, `card-stack`, `scrubbed-bento-gallery` for advanced grid choreography (rare).
- **From `component-libraries.md`** — Aceternity `bento-grid`, `layout-grid`, `focus-cards`, `expandable-card`. React Bits `magic-bento`, `scroll-stack`, `reflective-card`, `animated-list`, `count-up`. 21st.dev card primitives, hover-card, progress, breadcrumb.
- **Push toward**: real product UI screenshots inside cards (not gradients), genuine data shapes (mixed precision, real names), one perpetual micro-interaction per card max.
- **Avoid**: tile-wall pages with no synthesis row, identical card shells, fake telemetry numbers, perpetual motion in non-memoized parents.

## Publication

- **From `gsap-patterns.md`** — `animate-text`, `animate-text-replacement`, `responsive-line-splits-on-scroll`, `text-masking`, `directional-marquee`. Lenis optional.
- **From `motion-libraries.md`** — React Bits `split-text`, `scroll-reveal`, `circular-text`, `true-focus`, `blur-text`. Framer Motion for slim hero entrances; avoid heavy choreography.
- **From `component-libraries.md`** — Aceternity `images-slider`, `following-pointer`, `hero-highlight`. 21st.dev image gallery and selective hero references. Keep effects extremely restrained.
- **Push toward**: full-bleed images at chapter openers, elegant section fades, magazine-like masthead navigation, real photography, drop-cap on long-section openers.
- **Avoid**: dashboardy modules, gadget-heavy hero scenes, text tricks repeated in every section, navigation that looks like product UI.

## Nightside

- **From `gsap-patterns.md`** — `text-masking`, `smooth-scrolling`, `image-mask-on-scroll`, `velocity-skew`. Lenis appropriate; pair with subtle vignette.
- **From `motion-libraries.md`** — React Bits `shiny-text`, `metallic-paint`, `glare-hover`, `shape-blur`, `fade-content`. Framer Motion for slow scale/opacity reveals; restraint over flash.
- **From `component-libraries.md`** — Aceternity `hero-highlight`, `lamp-effect`, `card-spotlight`, `glare-card`, `compare`. 21st.dev — only the most desaturated gradient references.
- **Push toward**: large campaign photography (light-sculpted product crops), subtle reveal masks, refined nav with brass/copper accents, generous letter-spacing on small caps.
- **Avoid**: glittery purple-blue effects (the AI tell), over-ornamented cards, too many tiny luxury badges, "premium" reading as "shiny", flat black with neon.

## Modernist Grid

- **From `gsap-patterns.md`** — `draw-a-path`, `animate-along-a-path`, `responsive-line-splits-on-scroll`, `directionally-aware-header`. Motion supports the grid, never breaks it.
- **From `motion-libraries.md`** — React Bits `split-text`, `scroll-reveal`, `count-up`, `scroll-float`. Framer Motion for stagger reveals along the baseline grid.
- **From `component-libraries.md`** — Aceternity `background-lines`, `layout-grid`, `compare`, `container-scroll-animation`. 21st.dev breadcrumb, progress, select, card — the strict interface primitives.
- **Push toward**: diagrams, charts, typographic posters, cleaner grid logic, more air, precise nav behavior, tabular numerals for data, hairline rules.
- **Avoid**: turning modernist into brutalism with less color — it should feel *precise*, *rigorous*, and *clean*. Decorative motion. Mixed font widths.

## Considered Modern

- **From `gsap-patterns.md`** — `trigger-on-scroll`, `enter-and-exit`, `animate-text`, `card-stack`. Restrained scroll reveals only.
- **From `motion-libraries.md`** — React Bits `fade-content`, `count-up`, `glare-hover`, `scroll-reveal`. Framer Motion springs for soft lifts on hover.
- **From `component-libraries.md`** — Aceternity `animated-testimonials` (with real photos and real names), `card-hover-effect`, `images-slider`, `background-boxes` (carefully). 21st.dev image gallery, card carousel.
- **Push toward**: warmer imagery (lifestyle or product-in-context), calm stagger, soft highlight shifts, more bespoke navigation, warmer neutrals (stone, sand, oat).
- **Avoid**: flattening into generic clean landing-page UI with a peach accent, "warm" reading as "weak", overly rounded everything (`rounded-3xl` on every element), stock photography.

---

## Universal — every direction applies these

After picking direction-specific recipes, apply these regardless of direction:

- The **animation decision framework** (Step 0–4) in [`../references/animation.md § 1`](../references/animation.md).
- The **Emil Kowalski craft checklist** in [`../references/animation.md § 3`](../references/animation.md) — button press, popover origin, `scale(0.95)` entries, asymmetric timing where appropriate.
- The **pre-flight checklist** in [`../references/forbidden.md § 7`](../references/forbidden.md).

These are not negotiable per direction. They are how the pack defines "premium" at the craft level.
