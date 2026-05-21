---
name: modern-frontend-cinematic-scroll
description: Direction for scroll-driven cinematic pages — hardware launches, premium tech, brand showcases, agency case studies, immersive product narratives, and Awwwards-grade landing pages where the product is the protagonist of the page. Enter through the parent pack at ../SKILL.md.
---

# Cinematic Scroll

> The router opens this file when the brief calls for the product or brand to be the *story of the page*. If the brief is closer to "show me what the product does in working surfaces", the router routes to `motion-bento` instead.

## Brief — when this direction fires

This direction handles work where:

- The page is *a film translated to scroll*. Scenes build in sequence.
- The product, the place, or the artisan is the named protagonist.
- The brand wants to be *felt*, not described.
- Conversion is a secondary outcome of falling in love with the brand.

Typical briefs: a hardware launch (camera, watch, audio interface), an agency case study, a heritage brand site, a launch campaign for a single artifact, a product story for a brand that values *making* over *selling*.

If the brief is closer to "show feature X with cards and metrics", go to `motion-bento`. If the brief is closer to "publication with image sequencing", go to `publication`.

## Calibration

| Dial | Baseline | Notes |
|---|---|---|
| `DESIGN_VARIANCE` | 8 | Authored, scene-led, poster proportions, deliberate empty zones |
| `MOTION_INTENSITY` | 8 | Chaptered scroll choreography, magnetic interactions, full three-act pacing |
| `VISUAL_DENSITY` | 3 | One scene per viewport |

User overrides any dial inline. Defaults assume an Awwwards-grade landing brief.

## Three signature moves

The three moves that make a page recognizably `cinematic-scroll`. Use all three. If you cannot, the brief probably belongs in another direction.

### 1. The asymmetric masthead

Open with a 12-column grid where the title occupies tracks 3–11 in oversized italic display, and a smaller anchor element (year, number, brand mark) sits in tracks 1–2 as counterweight. A short editorial deck lands in tracks 8–11 below the title. A structured meta row (dates, locations, specs) sits along the bottom hairline of the hero.

The hero must read as *one composed scene* at first glance — the user should know within 0.5 seconds what kind of page this is.

### 2. Three-act narrative pacing

Every scroll has a structure:

| Act | Scroll position | Role |
|---|---|---|
| Hook | 0–5s | Hero. Immediate visual claim. Earn the next scroll. |
| Build | 5–20s | 2–4 reveal sections. Density and scale rise. |
| Climax | 20–25s | Showcase or CTA. The largest gesture of the page. |
| Epilogue | 25–27s | Footer. Quiet, well-set. The exhale. |

Section comments in the source code should name the act each section belongs to. If a section's motion contradicts its act, rework or cut.

### 3. The image-mask reveal

Cinematic comes from how images *arrive*. Use `clip-path` inset wipes paired with slow inner-image scale (1.15 → 1.0) over 1.4–1.8s. Trigger at 80–85% viewport. The result reads as cinema settling into the page.

See [`../components/gsap-patterns.md § image-mask-on-scroll`](../components/gsap-patterns.md) for the canonical recipe.

## Materials

### Typography

- **Display family**: an italic serif (Fraunces, Instrument Serif, Cormorant Garamond) for romantic / heritage / craft brands; OR a bold display sans (Syne, Clash Display, Cabinet Grotesk) for harder / contemporary edges.
- **Body family**: Geist, Satoshi, DM Sans, Manrope. Pair with the display deliberately — never by reflex.
- **Mono**: Geist Mono / JetBrains Mono for metadata, build numbers, specs.
- Hero size: `clamp(3rem, 12vw, 14rem)`, leading `0.88`, tracking `-0.035em` to `-0.04em`.
- Body measure: 58–66ch.
- Tabular numerals on any structured numeric field.
- Banned: Inter, Roboto, system sans as identity.

### Color

- One palette per project. Hold to it.
- Backgrounds: warm noir, cream editorial, deep ocean, paper-and-ink, warm twilight.
- One accent only, saturation < 80%. Used structurally — links, primary CTA, focus rings, italic emphasis.
- Pure `#000000` is banned. Tuned off-black only.

### Layout

- Default asymmetric 12-column grid. Centered hero is banned at this calibration.
- Sticky margin rails for section indices (`i.`, `ii.`, `iii.`).
- Section padding `clamp(6rem, 12vh, 12rem)` — the page breathes between scenes.
- No card spam. Use image plates, framed media, split bands, structured negative space.

### Surface

- Cards only when elevation communicates real hierarchy (e.g. the inventory bento).
- Shadows tinted to the page mood — warm palettes get warm shadows, never harsh black.
- Grain overlay on a fixed `pointer-events-none` pseudo-element, opacity 0.04–0.06.

### Mandatory states

Loading skeletal (match section silhouette). Empty composed (suggests action). Error inline (next to source). Tactile on every button (`active:scale-[0.97]` + `transition: transform 160ms var(--ease-out)`).

## Choreography

Motion is the heaviest in the pack here. Every animation passes through the decision framework in [`../references/animation.md § 1`](../references/animation.md) before being added.

### Required choreography

- **Hero entrance**: split-char or split-line reveal, 25–40ms stagger, `power4.out`, completes in 1.2–1.4s.
- **Section reveals**: opacity + 40–60px translate-y, `power3.out`, 0.9–1.2s, triggered at 80–85% viewport.
- **Image masks**: see Three signature moves § 3.
- **Marquee**: scroll-velocity-aware (Lenis), linear easing for constant motion, large italic display, color-shifted accent words.
- **Magnetic CTA**: Framer `useMotionValue` or GSAP — never `useState`. Gated to `(hover: hover) and (pointer: fine)`.

### Smooth scroll

Lenis is appropriate for this direction. The exception is when the brief explicitly says conversion-critical or e-commerce — drop Lenis there and stay on native scroll.

### Tooling separation

In single-file HTML output, GSAP-led. In React output, Framer Motion-led. Never GSAP + Framer Motion in the same component tree.

### Accessibility

`prefers-reduced-motion` strips directional translates, scale changes, parallax. Keep color and opacity transitions. Custom cursor (if used at all) disables entirely on reduced motion.

## Wrong-direction tells (slop specific to `cinematic-scroll`)

Beyond the pack-wide forbidden list at [`../references/forbidden.md`](../references/forbidden.md), avoid:

- **Hero parallax over a flat gradient.** Use real photography or rendered product.
- **"Scrolltelling" with no actual story arc** — the page must have something to say across the three acts.
- **A bento grid in the hero position.** Bento belongs to Act 2 showcase here.
- **Three-equal product cards as a feature row.** Use asymmetric arrangements (1 wide + 1 tall + 2 small).
- **Generic dark-startup gradient hero with neon accent.** This is the most-shipped slop hero.
- **Tiny product screenshots the user cannot read.**
- **Custom cursor justified by "it feels cool"** — only for editorial brands that genuinely call for it.
- **Filler verbs in copy** ("Elevate", "Seamless", "Unleash", "Revolutionize", "Next-Gen").
- **Fake-round metrics** ("99.99% uptime", "10,000+ customers"). Use organic values.
- **Generic CTA copy** ("Get Started", "Learn More"). The CTA must name what literally happens next.

## What to push toward

- One named, specific protagonist in the hero — a person, a place, a year. "Maris & Co., Newport, since 1947" beats "Premium handcrafted goods".
- Real provenance in copy ("The cotton comes from a mill in Tewkesbury we have bought from since 1962").
- Mixed-precision data ("412 sq ft", "$4,239.71", "+1 (401) 847-2831"). Round numbers read as AI.
- A "house rule" or a quote from the founder somewhere on the page.
- An Act-3 CTA that names the specific next action ("Send a photograph and the rig dimensions if you have them. We will write back within two weeks.").

## Reference artifact

[`../examples/cinematic-landing.html`](../examples/cinematic-landing.html) — *Maris & Co.*, Newport sailmakers since 1947. Exercises this direction:

- Cream editorial palette with deep navy + faded crimson accents.
- Fraunces italic + Geist + Geist Mono.
- 12-column asymmetric masthead with offset oversized "47".
- Sticky letter from the third-generation principal (word-by-word reveal).
- Five-card asymmetric inventory bento with cloth-spec captions.
- Process ledger with sticky photograph and numbered rows.
- Deep-navy editorial quote section (line-by-line reveal).
- Magnetic commission CTA.
- Newspaper-style colophon footer.
- Three-act pacing baked into section comments.

Read for tone calibration. Each `cinematic-scroll` page should invent its own protagonist and its own world. Maris is one example, not a template.

---

**Pack layers applied on every output in this direction:**

- Universal craft: [`../references/animation.md`](../references/animation.md) (Emil Kowalski canon), [`../references/forbidden.md`](../references/forbidden.md) (slop filter + pre-flight).
- Component recipes: [`../components/style-recipes.md § Cinematic Scroll`](../components/style-recipes.md) → opens the matching GSAP, Framer Motion, Aceternity, and 21st.dev patterns.
