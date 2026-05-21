---
name: modern-frontend-publication
description: Direction for image-led, typography-disciplined pages that read like designed articles — design journals, architecture magazines, hospitality brands, fashion houses, cultural institutions, studios, and premium service brands whose pages should feel printed, not scrolled. Enter through the parent pack at ../SKILL.md.
---

# Publication

> The router opens this file when the brief calls for the page to feel **printed** — paced like a magazine, anchored in typography, sequenced through real photography. If the brief is closer to "story arc with motion choreography" → `cinematic-scroll`. If the brief is closer to "moody premium" → `nightside`.

## Brief — when this direction fires

This direction handles work where:

- The page should read like an *article*, not a content-marketing page.
- Photography does the heavy lifting; typography sets the pacing.
- The brand's confidence is shown through *restraint* and *proportion*.
- The product / service is a slow read — luxury, hospitality, cultural, editorial.

Typical briefs: a design studio's site, a fashion brand homepage, an architecture firm portfolio, a hospitality group's main site, a design journal, a cultural institution, a premium service brand that wants to be read carefully.

The visual reference is **European design publications translated to scroll** — Apartamento, Cabana, The Gentlewoman, MARK, Domus, Eye, Casa Brutus.

## Calibration

| Dial | Baseline | Notes |
|---|---|---|
| `DESIGN_VARIANCE` | 5 | Offset asymmetry inside a typographic baseline — never poster-chaos |
| `MOTION_INTENSITY` | 3 | Restrained — fades, line reveals, gentle stagger; never choreographed scrolltell |
| `VISUAL_DENSITY` | 3 | Magazine pacing — large image plates, one strong scene per viewport |

User overrides any dial inline. The defaults assume a slow read.

## Three signature moves

### 1. Image arrives before — or *with* — the title

The publication direction's foundational rule. The first image is part of the title, not separate from it. Open with a large image plate, then a split article lead (title left, dek right) — or run the image full-bleed underneath the title at the moment the title appears.

This separates publication-tone work from SaaS-tone work, where the title is typically the first sight and the image arrives as decoration after.

### 2. Roman-numeral indices in margin rails

Section indices read as a publication's table of contents: `i.`, `ii.`, `iii.`, `iv.` — in a sticky left margin rail, mono uppercase, small (0.7-0.75rem), letter-spacing 0.22em. The rail names each section in editorial voice ("From the loft floor", "Cloth on the floor today", "On the process") not in product voice ("About", "Services", "Process").

The rail is the **publication chrome** — what makes the page feel like a designed object instead of a marketing template.

### 3. Footer is a colophon, not a sitemap

The publication-direction footer is a *colophon*: italic brand mark large, multi-column quiet metadata, set-in (typeface credit) line, "Built quietly" attribution, and one or two practical contact lines. **No logo wall. No newsletter signup form. No social-media icon row.** The colophon closes the publication.

## Materials

### Typography — the heart of this direction

- **Display**: a refined italic serif. Fraunces, Instrument Serif, Cormorant Garamond, Cardo, EB Garamond, Domaine Display, Tiempos Headline. The display family is doing most of the brand work.
- **Body**: a disciplined sans (Geist, Satoshi, Plus Jakarta Sans) — OR a book serif (Source Serif, Lora) for very long reads. Never two serifs.
- **Metadata / labels**: small-caps or mono (Geist Mono) at 0.7–0.75rem, letter-spacing 0.18–0.22em, uppercase.
- **Hero title**: 1–3 lines, ceiling of 4. Italic display is a strong move. `clamp(2.5rem, 9vw, 11rem)`, tracking `-0.035em` to `-0.04em`.
- **Body measure**: 58–66ch with generous leading (1.55–1.7).
- **Drop-cap** or oversized opening character on long-section openers when the brief calls for it.
- **Tabular numerals** on structured data.
- Banned: Inter, Roboto, system sans as identity. Mixing two serifs. Default Tailwind type scale on the headline.

### Color

- Palette drawn from paper and ink. Cream and parchment backgrounds, warm stone neutrals, softened charcoal text, one muted editorial accent — brick, terracotta, coral, ochre, faded crimson, deep wine.
- **Most visible color comes from photography**, not from UI fills.
- Light mode by default. Dark editorial work routes to `nightside`.
- Pure `#000000` banned. Tuned ink (`#181815`, `#1a1612`).

### Layout

- Two- or three-column editorial layouts. Narrow margin rail (sticky index) on the left, main column in the middle, optional caption rail on the right.
- Hairline rules between sections (`border-t` at low opacity).
- Spacing is hierarchical: tight = same group; medium = related; large = new chapter. Pages should feel *paced* — like turning pages of a book.
- Banned: centered hero with subtitle below; three-equal feature cards; chrome navigation that looks like product UI.

### Surface

- Minimal cards. Editorial pages favor framed images, captioned plates, and structured lists over card chrome.
- Lines and rules over shells.
- Shadows tinted to the page mood. Editorial shadows are warm, never punchy.
- Grain overlay (optional) on a fixed `pointer-events-none` pseudo-element at 0.04–0.05 opacity — reads as paper.

### Mandatory states

Loading: skeleton plates that preserve layout. Empty: composed and in-voice ("No issues yet — first one publishes Friday."). Error: inline, in the body, same voice. Tactile: `active:scale-[0.97]` + `transition: transform 160ms var(--ease-out)`.

## Choreography

This direction is the **lowest motion** in the pack. Walk every animation through [`../references/animation.md § 1`](../references/animation.md). If in doubt, cut.

### Allowed

- Hero entrance: split-line or split-word fade-up, single reveal, 1.0–1.4s.
- Section reveals: opacity + 30–40px translate-y, `power3.out`, 0.9–1.0s, triggered at 80–85% viewport.
- Image reveals: clip-path inset wipe + slow inner-image scale (1.1 → 1) for chapter openers only.
- Quote line-by-line: 70–90ms stagger per line, `power3.out`.
- Optional marquee: slow, italic display.
- Image hover: 1.03 scale, desktop only behind `(hover: hover) and (pointer: fine)`.

### Banned in this direction

- Scroll-hijacked horizontal sections (route to `cinematic-scroll`).
- Magnetic CTAs (too SaaS).
- Custom cursor.
- Image sequences / scrubbed video.
- Constant motion outside one optional marquee.
- `whileHover={{ scale: 1.05 }}` on every card.
- Heavy GSAP timelines.

### Smooth scroll

Lenis is optional. The publication tone reads slow on native scroll already.

### Accessibility

`prefers-reduced-motion` strips all directional translates. Color and opacity transitions remain. Publication readers tend to enable reduced motion at higher rates — design for it as the primary path.

## Wrong-direction tells (slop specific to `publication`)

Beyond the pack-wide forbidden list at [`../references/forbidden.md`](../references/forbidden.md), avoid:

- **Dashboardy modules** (metric cards, KPI strips, telemetry). Wrong direction.
- **Gadget-heavy hero scenes** — magnetic CTAs in the hero, magnetic logos.
- **Text tricks repeated in every section** — split-text everywhere, gradient-fills on every headline.
- **Navigation that looks like product UI** — sticky chrome with logo + four nav items + CTA on the right.
- **"Trusted by" logo strip** — wrong genre.
- **Three-equal feature cards** "About / Process / Contact" below the hero.
- **Fake testimonials** with generic names — use real, or omit the section.
- **Gradient hero backgrounds.** Use photography or typographic mastheads.
- **Drop-cap on every paragraph.** One per chapter opener, max.
- **Pinterest grid of unrelated images** — the publication uses *curated sequences*, not mood boards.

## What to push toward

- A page that feels *art-directed* by a real creative director, not assembled from a kit.
- **Real authorship** — the page is signed by a person, attributed to a studio, dated, set in named typefaces.
- One bold gesture per chapter — and only one. Restraint defines premium here.
- **The site still reads as specific even with the logo removed.** If another brand could swap in with no tension, it failed.
- **Volume / issue numbering** — `Vol. III · No. 047` reads as publication, not as software.
- **House rules / aphorisms** — a quote from the founder, a "house rule" from brand history, a one-line manifesto.

## Reference artifact

The pack's `cinematic-scroll` reference artifact ([`../examples/cinematic-landing.html`](../examples/cinematic-landing.html), *Maris & Co.*) borrows heavily from publication pacing (slim masthead, sticky letter, deep-navy quote, colophon footer, italic Fraunces display, mono metadata). Read it for tone calibration of the publication-adjacent moves.

For pure publication-direction work, push restraint further than the Maris page: reduce motion below cinematic-scroll's baseline, lean more on real photography, lengthen the body measure, and shorten the page overall (publication-direction work is often shorter and slower).

A dedicated publication-direction example may live at `../examples/publication-magazine.html` when added. Until then, the Maris artifact is the closest pack reference; calibrate by reducing.

---

**Pack layers applied on every output in this direction:**

- Universal craft: [`../references/animation.md`](../references/animation.md), [`../references/forbidden.md`](../references/forbidden.md).
- Component recipes: [`../components/style-recipes.md § Publication`](../components/style-recipes.md) → restrained GSAP line splits + Framer fade-content + 21st.dev image-gallery references.
