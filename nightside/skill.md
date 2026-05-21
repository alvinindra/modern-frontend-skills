---
name: modern-frontend-nightside
description: Direction for moody premium dark pages — restaurants, hospitality, luxury services, after-hours brand worlds, refined dark SaaS, and any product that should feel late-night, considered, and exclusive. Enter through the parent pack at ../SKILL.md.
---

# Nightside

> The router opens this file when the brand should feel *after-hours*. Even loaded at noon, the page should read like 11pm. If the brief is "dark startup" or "tech company that happens to ship dark mode", this is the wrong direction — those go to `motion-bento` or `modernist-grid`.

## Brief — when this direction fires

This direction handles work where:

- The page is **after-hours** — restaurant after 9pm, hotel bar, late-night brand release, jazz club, members' room.
- Premium comes from **what is hidden**, not what is shown. Restraint over flash.
- Photography carries the page. Light-sculpted product or environment shots at twilight.
- The brand wants to feel **exclusive** without ever saying "exclusive".

Typical briefs: a 24-cover restaurant, a hotel group with a flagship property, a jazz club, a single-cask whisky brand, a perfume house, a private members' club, a luxury hospitality brand, a moody premium SaaS for design-led teams.

If the brief is just "dark mode for a SaaS landing" — that's `motion-bento` with a dark palette, not `nightside`.

## Calibration

| Dial | Baseline | Notes |
|---|---|---|
| `DESIGN_VARIANCE` | 6 | Offset asymmetry; cinematic image crops; never poster-chaos |
| `MOTION_INTENSITY` | 5 | Slow, deliberate reveals; subtle masks; restraint over flash |
| `VISUAL_DENSITY` | 3 | Gallery rhythm — deep negative space, one scene per viewport |

User overrides any dial inline.

## Three signature moves

### 1. The single composed photograph

The hero of a nightside page is usually a *single*, perfectly lit photograph with one line of italic copy in negative space — and nothing else. No CTA. No "scroll for more" arrow. No three-column meta row.

The photograph does the work. It says: *this brand is too confident to need anything else above the fold.*

### 2. Hours and rules as luxury signal

Operational honesty reads as luxury. Lines like:
- "Tuesday to Saturday · 19:00 – late · no walk-ins"
- "Reservation by phone only. We do not take requests by email."
- "Waitlist 4 months. We will write back."
- "Six tables. Six nights a week."

These all read richer than any "Award-winning" badge. The constraint is the signal.

### 3. Metallic accent at small scale

The accent in a nightside palette is a **muted metallic** — brushed gold, copper, weathered bronze, champagne — used at very small scale (links, italicized accent words, focus rings). Saturation always under 70%.

Bright pure-color accents on dark backgrounds read as flat-black-with-neon — the AI-luxury tell. The metallic-at-small-scale move is what separates this from that tell.

## Materials

### Typography

- **Display**: italic Fraunces or Instrument Serif for romantic nightside (hospitality, restaurants, perfume); a high-contrast modern (Playfair Display, Domaine Display) for fashion-nightside; a sharp display sans (Syne, Clash Display) for contemporary dark brands.
- **Body**: Geist, Satoshi, DM Sans. Light weights (300–400) read richer on dark backgrounds than 500+.
- **Mono**: Geist Mono in small uppercase with `letter-spacing: 0.2em` for metadata.
- **Letter-spacing**: tighter on dark — display at `-0.03em` to `-0.04em`, body at `-0.005em`.
- Tabular numerals for prices, dates, structured data.
- Banned: Inter, Roboto, system sans as identity.

### Color

- **No flat black with neon.** That is the AI-luxury tell.
- **Backgrounds**: tuned off-black, deep charcoal, deep wine, midnight ocean, warm noir.
- **Surfaces**: one or two steps lighter than the background, never pure white.
- **Accent**: a single muted metallic — `#93702a` (brass), `#a44a2a` (copper), `#b8924b` (brushed gold), `#8e6c30` (bronze) — OR a single tonal accent — `#6e2333` (burgundy), `#1e2a3a` (ink-navy), `#3e4f3e` (smoke green). Saturation always under 70%.
- **Text**: never pure white. Use `#e8ddd3` (warm), `#e6edf3` (cool), `#f0ece2` (cream).
- The Lila Ban: no purple/blue glow, no violet accent, no "Vercel hero" gradients.
- Pure `#000000` banned. Use `#0a0a0a`, `#0c0c0a`, `#1a1612`.

### Layout

- Asymmetric — offset oversized title, anchored counterweight.
- Generous whitespace. Premium reads as *this brand is too confident to fill every square inch*.
- Banned: centered hero with three feature cards; mega-menus; tech-startup grid of "Features / Solutions / Resources".

### Surface

- Cards minimally used. Surfaces are dividers, image plates, and structural negative space.
- Shadows tinted deep — never harsh black drop. Use shadows that read as ambient room light.
- Liquid-glass / glassmorphism: appropriate when justified — add `border-white/10` + inset highlight for physical edge refraction.
- Image treatment: light-sculpted product crops, low-key portraits, environment shots at twilight. **Photography matters more here than in any other direction.**

### Mandatory states

Loading: skeleton plates preserve layout. Empty in-voice ("The cellar is being restocked. Try again on Friday."). Error in-voice — never "Oops, something went wrong" placeholder. Tactile: `active:scale-[0.97]` with a touch slower transition (`200ms` instead of `160ms`) — nightside responds more deliberately.

## Choreography

Nightside motion is **slow, deliberate, premium**. Walk every animation through [`../references/animation.md § 1`](../references/animation.md).

### Allowed

- Hero entrance: split-line fade + slow opacity over 1.4–1.8s.
- Image reveals: clip-path inset wipe + slow inner-image scale (1.15 → 1) over **1.8–2.4s** — the slowest reveals in the pack.
- Velocity skew on scroll: `skewY: 2deg` max.
- Text masking for one or two emphasized phrases per page.
- Hover glare: `glare-hover` on cards, very subtle, low opacity.
- Restrained marquee if the brand calls for it — italic display, **slower than cinematic-scroll's marquee** (38–48s loop).

### Banned in this direction

- Bouncy springs. Use `cubic-bezier(0.77, 0, 0.175, 1)` for slower in-out motion.
- Magnetic buttons (too SaaS — nightside CTAs are confident statements, not playful).
- Image sequences (cinematic-scroll territory).
- Aceternity `meteors`, `sparkles`, `wavy-background`, `vortex`, `aurora-background` — cheap shimmer, opposite of luxury.
- Fast hover transitions. Nightside hovers run 400–600ms.

### Smooth scroll

Lenis appropriate; pair with subtle vignette.

### Accessibility

`prefers-reduced-motion` strips directional motion. Color and opacity remain. Slow motion is gentler on motion-sensitive users, but the rule still applies.

## Wrong-direction tells (slop specific to `nightside`)

Beyond the pack-wide forbidden list at [`../references/forbidden.md`](../references/forbidden.md), avoid:

- **Glittery purple-blue effects** — the AI-luxury tell.
- **Flat black background with neon cyan or violet accent.**
- **Over-ornamented cards** with multiple glow effects.
- **Tiny luxury badges spam** ("Premium", "Exclusive", "Limited", "Reserve" — all on one page).
- **Generic dark startup gradients.**
- **Bouncy "spring" animations** — wrong physics for the brand.
- **Aceternity `aurora-background` / `wavy-background` / `meteors`** — every dark-startup uses these.
- **Hero text that says "Luxury redefined" / "Elevated experiences"** — filler that adds nothing.
- **Magnetic CTAs** — wrong tone.
- **Bright accent colors** — saturation > 70% kills the mood.

## What to push toward

- A single line of italic copy in the hero that *describes a feeling*, not a feature.
- One bold gesture per page (a full-bleed photograph at a chapter break, a deep-color editorial quote, a slow image mask).
- Operational honesty in copy ("Waitlist 4 months", "Six tables", "Open by appointment").
- Restraint as the dominant signal. Less is more — but only when *what is there* is exceptional.
- A page that would still feel premium with all motion removed.
- Real specific names, dates, addresses ("Rua dos Anjos, 4º · 1150-040 Lisboa · Tue–Sat · 19:00–late").

## Reference artifact

A dedicated nightside reference artifact may live at `../examples/nightside-restaurant.html` when added. Until then, calibrate against this brief:

- Open with a *single* twilight photograph at full-bleed, with one italic line over its lower-third in negative space.
- A short brand statement section in split layout, italic display, signed.
- An asymmetric image-led grid of 4–5 cards (rooms, wines, services, experiences) with slow image-mask reveals.
- A craft / origin section with one large captioned image and no card chrome.
- A full-width accent-color editorial quote, italic display, line-by-line reveal.
- A reservation CTA that is confident and concrete ("Reserve a table for two on Friday at 9."). Not "Book Now".
- A colophon footer with italic brand mark, address, hours by appointment, set-in (typeface credit).

Read the `cinematic-scroll` Maris artifact for the editorial-adjacent moves (sticky letter, deep-navy quote, colophon footer) and translate to a darker palette with a metallic accent and slower motion.

---

**Pack layers applied on every output in this direction:**

- Universal craft: [`../references/animation.md`](../references/animation.md), [`../references/forbidden.md`](../references/forbidden.md).
- Component recipes: [`../components/style-recipes.md § Nightside`](../components/style-recipes.md) → text-masking + image-mask-on-scroll + glare-hover + carefully desaturated Aceternity references.
