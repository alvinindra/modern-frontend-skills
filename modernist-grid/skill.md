---
name: modern-frontend-modernist-grid
description: Direction for grid-led, type-disciplined pages with Swiss-modernist rigor and institutional confidence — design-forward brands, portfolios, systems products, cultural institutions, archive interfaces, B2B technical platforms, and any work where typography, grid, and precision must do all the work. Enter through the parent pack at ../SKILL.md.
---

# Modernist Grid

> The router opens this file when the brief asks for the **grid itself** to be the brand. The visual heritage is Müller-Brockmann, Hofmann, Lohse, Crouwel, Karel Martens — Swiss poster design translated to scrolling, plus the contemporary modernist work of MetaLab, Mast Brothers, ETH Zürich, MIT Press.

## Brief — when this direction fires

This direction handles work where:

- Typography, grid, and color are the **only** tools. No imagery does the lifting.
- Confidence comes from *precision*. The same way a Swiss watch is premium.
- The brand wants to read as *institutional* — rigorous, technical, considered.
- Saturated color (a single Helvetica red, Swiss yellow, IKB blue) is part of the design language.

Typical briefs: a design studio portfolio, a cultural institution (museum, archive), a systems product (developer tools, infrastructure), a typography foundry, a B2B technical platform, an academic press, a research lab.

If the brief is "minimal premium with photography" → `publication`. If the brief is "warm modern company" → `considered-modern`. If the brief is "high-density data dashboard" — this direction works, push `VISUAL_DENSITY` to 7+.

## Calibration

| Dial | Baseline | Notes |
|---|---|---|
| `DESIGN_VARIANCE` | 3 | Disciplined, grid-rational; offset only at deliberate moments |
| `MOTION_INTENSITY` | 4 | Restrained transitions, structural reveals, never decorative |
| `VISUAL_DENSITY` | 6 | Real information shown, structured tightly |

User overrides any dial inline. Defaults assume rigorous Swiss-modernist work.

## Three signature moves

### 1. The visible grid

The grid is not infrastructure — it is the design element. Use 12-column or 16-column. Reveal gutters. Allow content to occupy specific named tracks: `grid-column: 3 / span 7`. Empty columns are *deliberate*, not accidental.

The grid should be apparent at first sight. The user should be able to *see* the columns even where content does not occupy them.

### 2. One face, multiple weights, multiple optical sizes

Modernist-grid type is **one family, many weights**. Don't pair Serif + Sans. Don't pair Display Sans + Body Sans. Pick one — Söhne, Suisse Int'l, Aktiv Grotesk, Inter Display, Neue Haas Grotesk — and use multiple weights (Light, Regular, Medium, Bold, Black) and multiple optical sizes (Display, Text, Caption) to build hierarchy.

Width-mixing (condensed + regular in the same hierarchy) is also banned. The variation comes from weight and optical size only.

### 3. Structural accent — one block of saturated color

Modernist-grid is the *one* direction in the pack where high-saturation color is welcome — *if* used **structurally**. A single Helvetica red block. A single Swiss yellow stripe. A single IKB blue link color. Used precisely — one block, one stripe, one link — covering ~5% of page area but carrying ~40% of brand signal.

Saturated color used gratuitously (gradients, glows, multiple accents) breaks this direction.

## Materials

### Typography

- **Display + body**: a single Grotesk or Neo-Grotesque family. Söhne, Suisse Int'l, Aktiv Grotesk, Inter Display, Helvetica Now, Neue Haas Grotesk. Or — for art-led brands — a real Swiss face (Suisse, Söhne) at the budget.
- **Mono**: Geist Mono, IBM Plex Mono, JetBrains Mono — mandatory for all numbers, indices, dates, technical values.
- **Width variation**: a single font with multiple optical sizes and weights. Never two families.
- **Type as composition**: oversized headlines occupy a deliberate grid area. The grid is visible in the type itself.
- **Tabular numerals always**.
- **Tight letter-spacing** on display sizes: `-0.025em` to `-0.04em`.
- **Leading discipline**: body at 1.5, display at 0.95–1.05.
- Banned: serif fonts as identity (route to `publication`). Width-mixing.

### Color

- **One neutral family + one accent.** No more.
- Backgrounds: near-white (`#fafafa`, `#f6f6f4`), warm bone (`#f1ede5`), or near-black (`#0f0f10`) for dark modernist.
- Text: high contrast — near-black on near-white, near-white on near-black. No mid-tone body text.
- **Accent — saturated**: Helvetica red (`#d72b1f`), Swiss yellow (`#f5c83a`), International Klein Blue (`#002fa7`) for art-led, deep ink-blue (`#1e3a8a`) for institutional. Saturation can be HIGHER here than other pack directions — used structurally, never gratuitously.
- The Lila Ban: no purple/blue AI gradient.
- Pure `#000000` allowed when it's *the* design (Swiss often is genuinely black on white). `#0a0a0a` is the safer default.

### Layout

- **The grid is visible.** 12-col or 16-col. Reveal gutters. Allow content to occupy specific named tracks.
- **Baseline alignment.** All major elements align to a shared vertical baseline.
- **Single spacing scale** (8px or 12px base).
- **Negative space as structure.** Empty columns are deliberate.
- **Hairline rules** between sections — `1px solid currentColor` at 0.12–0.18 opacity.
- Banned: centered hero with feature cards; "About / Pricing / Contact" template; rounded cards; decorative wrappers.

### Surface

- Cards minimal — modernist work uses rules, dividers, and tonal blocks instead.
- Border-radius: `0` or `4px` max.
- Shadows almost absent — modernist is flat by ideology. Elevation via tonal blocks, not drop-shadow.
- No grain overlay. Modernist is honest about being on-screen.

### Mandatory states

Loading: skeleton *lines* matching baseline grid (not skeleton boxes). Empty: stated as fact ("No items in the collection yet."). Error: stated, inline, no panic. Tactile: `active:scale-[0.98]` (slightly less than other directions — more restrained). Hover: weight change or color shift, not transform.

## Choreography

Modernist motion serves *structure*. Every animation passes [`../references/animation.md § 1`](../references/animation.md).

### Allowed

- Hero entrance: opacity + tight 20–30px translate-y stagger. 0.8–1.0s. `power3.out`.
- Section reveals: opacity + small translate, 0.7–0.9s, 85% viewport trigger.
- **Numeric `count-up` reveals** on entry for metric blocks — strong modernist move.
- **Path draws**: `draw-a-path` SVG strokes for diagrams. The grid revealing itself.
- Text masking for one or two key phrases — used architecturally.
- Subtle scroll-driven horizontal shifts for tabular data.

### Banned in this direction

- Bouncy springs.
- Magnetic CTAs.
- Custom cursors.
- Image sequences.
- `whileHover={{ scale: 1.05 }}` on everything.
- Glow effects.
- Italic-display marquees (use mono or display sans if marquee is justified at all).

### Smooth scroll

**Skip Lenis.** Modernist work prefers honest native scroll. The page reads; it does not flow.

### Accessibility

`prefers-reduced-motion` strips directional motion. Tabular data reveals stay (opacity-only). Numeric `count-up` skips straight to the final value.

## Wrong-direction tells (slop specific to `modernist-grid`)

Beyond the pack-wide forbidden list at [`../references/forbidden.md`](../references/forbidden.md), avoid:

- **Helvetica + a hero gradient.** Modernist doesn't gradient.
- **"Swiss" as a marketing term** applied to a SaaS landing page with three feature cards. Modernist requires structure, not labels.
- **Inter font called "Swiss".** Wrong — Inter is a contemporary work-horse, not a Swiss face.
- **Rounded everything.** Modernist is sharp. `border-radius: 0` or tiny.
- **Drop shadows everywhere.** Modernist is flat.
- **Decorative motion.** If motion does not reveal structure or count up data, cut it.
- **Multiple accent colors.** One. Used precisely. Saturation high but used in a single block.

## What to push toward

- **Type as the protagonist.** Strip the page of all imagery and it should still read.
- **Visible grid.** Use gutters and tracks as design elements, not just structural infrastructure.
- **One precise accent moment** — a single red block, a single yellow stripe, a single blue link color.
- **A diagram, a chart, or a table** somewhere on the page. Modernist work *shows* its structure.
- **A colophon at the footer** crediting the typefaces and the grid system. Reads as honest.
- **Numeric specificity** in copy ("16-column grid, 8px baseline, 1240ms hero entry") reads richer than "Built with precision".
- **Document voice.** Section headings have numbers (`§1`, `§2`). Lists are numbered, mono.

## Reference artifact

A dedicated modernist-grid reference artifact may live at `../examples/modernist-portfolio.html` when added. Until then, calibrate against this brief:

- Typographic masthead — oversized title in display weight occupying tracks 3–11 of a 12-col grid. Mono meta in tracks 1–2. Deck in tracks 8–11 below. Structured numeric metadata row along bottom hairline.
- Concept / index section — numbered list, mono, named sections, ETAs or page counts. Reads as document chrome.
- Featured work — strict grid, hairline-ruled, captioned with mono metadata.
- Diagrams — `draw-a-path` SVG architecture revealing structure.
- Data block — tabular, count-up reveals, hairline rules between rows, monospace numbers.
- Quote / pull-statement — typographic, occupies specific grid tracks, single saturated-color accent block.
- CTA section — single action, structural placement (a row, not centered).
- Footer / colophon — multi-column document footer with typeface credit, grid spec, "Set in [Face]" attribution.

The `cinematic-scroll` Maris artifact ([`../examples/cinematic-landing.html`](../examples/cinematic-landing.html)) borrows light modernist moves (12-col grid, mono metadata, structured data row, colophon footer) but with editorial italic display instead of modernist Grotesk. Read for the grid moves; calibrate to a Grotesk family and lower motion.

---

**Pack layers applied on every output in this direction:**

- Universal craft: [`../references/animation.md`](../references/animation.md), [`../references/forbidden.md`](../references/forbidden.md).
- Component recipes: [`../components/style-recipes.md § Modernist Grid`](../components/style-recipes.md) → `draw-a-path`, `animate-along-a-path`, `count-up`, `scroll-reveal`, `background-lines`, 21st.dev strict interface primitives.
