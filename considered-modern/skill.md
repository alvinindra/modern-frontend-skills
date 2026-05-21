---
name: modern-frontend-considered-modern
description: Direction for humane, polished company sites that should read "real people, considered work" instead of "tech startup". Use for agencies, professional service brands (legal, finance, consultancy, architecture), consumer products with maker-led tone, modern company sites, and any brand whose page should feel contemporary without being cold. Enter through the parent pack at ../SKILL.md.
---

# Considered Modern

> The router opens this file when the brand should feel **like a contemporary company that takes care** — real people, real work, real warmth — without slipping into "startup template" or "consumer-friendly mascot". If the brief is closer to "premium service with publication tone" → `publication`. If the brief is closer to "feature-driven product" → `motion-bento`.

## Brief — when this direction fires

This direction handles work where:

- The brand wants to read **considered** — work that took time and was done by people.
- "Warm" is the goal, but "warm" must never read as "weak" or "consumer-friendly".
- The page exists to **explain who the team is and what they actually do** — not to convert.
- A real address, real names, real recent projects belong on the page.

Typical briefs: an agency or design studio, a legal or financial advisory firm, an architectural practice, a small consumer brand with maker-led tone, a contemporary professional services firm, a recruiting firm, an editorial-curious B2B consultancy.

If the brief is closer to "publication craft" → `publication`. If the brief is closer to "feature-led product page" → `motion-bento`. If the brief is closer to "creative agency portfolio with bold work" → `cinematic-scroll`.

## Calibration

| Dial | Baseline | Notes |
|---|---|---|
| `DESIGN_VARIANCE` | 4 | Polished, slightly offset; never poster-asymmetric |
| `MOTION_INTENSITY` | 4 | Calm stagger, gentle lifts, restrained scroll reveals |
| `VISUAL_DENSITY` | 4 | Daily-app spacing — generous but not gallery |

User overrides any dial inline.

## Three signature moves

### 1. The studio voice

First person plural, conversational but considered. "We design quarterly reports and annual reviews for asset managers." beats "We help companies tell their stories." The studio voice is concrete about *what we do, for whom, how*.

Banned phrases — these collapse the voice instantly:
- "We help [X] achieve [Y]"
- "Our team of passionate experts"
- "We believe in the power of [Z]"
- "Transform your business"
- "Elevate", "Streamline", "Empower", "Unleash"

### 2. Real visible team and work

Real photography of the actual team. Real client work shown — not stock, not placeholder. Real names. Real roles. Real recent project named in the hero or first section ("Just shipped: an annual report for Foo Bank, summer 2026.").

If real team photos and real work are not available, the page should *not be built* in this direction. Use `publication` (more typographic) or wait until the assets exist.

### 3. Operational warmth in the footer

The footer of a considered-modern page reads as a real working office:
- Real street address.
- Phone or studio email (not just a contact form).
- A "currently" line — what the studio is currently working on, reading, listening to, or *currently taking new projects* / *closed to new work*.
- Hours, days the studio is open.
- A short personal sign-off ("Made in Lisbon and Porto. Hello from Inês and Petros.").

The operational warmth is the brand. It signals "real working people" more than any "About us" page.

## Materials

### Typography

- **Display**: humanist sans (Söhne, Manrope, Plus Jakarta Sans, DM Sans, Geist) — OR a softer modern serif (Source Serif, Tiempos, Recoleta) for warmer brands. Avoid sharp display sans (Syne, Clash) — too cold for this direction.
- **Body**: same family as display at lighter weight, or a paired sans.
- **No mixing**: serif display + sans body OR sans display + sans body. Pick one configuration.
- Type sizes restrained — `clamp(2.5rem, 7vw, 6rem)` for hero. Restraint reads as confidence.
- Body at 1.05–1.1rem, leading 1.5–1.65 — slightly larger and more leaded than other directions, for warmth.
- Tabular numerals for prices and structured data.
- **Sentence case in navigation and on buttons** (not uppercase) — reads warmer.
- Banned: Inter, Roboto, system sans as identity.

### Color

- **Warm neutrals**. Stone, sand, oat, bone, parchment, putty. Never cool gray.
- Background: cream (`#f6efe2`, `#f4f1ea`, `#efe7d8`) or warm white (`#fcfaf6`).
- Surface: half-step deeper (`#ede4d2`, `#e7ddc7`).
- Text: warm ink (`#1a1612`, `#181815`, `#2a1f15`).
- Accent: a single warm tone — terracotta (`#c1440e`), brick (`#a44a2a`), ochre (`#93702a`), olive (`#697a3e`), faded teal (`#3e5e5c`). Saturation 60–75%.
- The Lila Ban: no purple/blue gradients. No cool accents on warm backgrounds.
- Pure `#000000` banned. Use `#1a1612` or `#181815`.

### Layout

- Generally restrained — readable, structured, slightly offset.
- Hero asymmetric but not dramatically so — a 7/5 or 8/4 split, not a poster-asymmetry 11/1.
- **Real photography in the hero or first two sections** — lifestyle / product-in-context / portrait work. Never stock.
- Banned: centered hero with three identical feature cards; "Trusted by" logo strip styled cold (white on light, illegible); floating gradient hero with no concept.

### Surface

- Cards allowed but used sparingly — when elevation communicates something real.
- Border-radius: soft but not bubble. `rounded-2xl` (16px) to `rounded-3xl` (24px) for cards. Never `rounded-full` on rectangular elements.
- Shadows: diffusion, warm-tinted. Never harsh black.
- Surfaces feel like material — paper, linen, wood. The visual language is *tactile*, not glossy.

### Mandatory states

Loading: skeletons match the warm tone. Empty: composed, friendly without saccharine ("Nothing scheduled this week — see you next month."). Error: in-tone, suggests recovery. Tactile: `active:scale-[0.97]`, `transition: transform 160ms var(--ease-out)`.

## Choreography

Considered-modern motion is *gentle* — never restrained-to-feel-cold, never bouncy-to-feel-playful. Walk every animation through [`../references/animation.md § 1`](../references/animation.md).

### Allowed

- Hero entrance: opacity + small translate-y (24–40px), `power3.out`, 0.9–1.1s.
- Section reveals: opacity + small translate, calm stagger (60–80ms).
- Hover lifts: `translateY(-2px)` on cards, desktop only behind `(hover: hover) and (pointer: fine)`.
- Soft hover highlight: background-color shift on links, 240–320ms `ease-out`.
- Stagger reveals: 50–70ms — relaxed, never tight.
- Smooth scroll appropriate for content-led sections.

### Banned in this direction

- Bouncy springs (too playful).
- Magnetic CTAs (too SaaS-conversion).
- Custom cursors.
- Velocity-driven motion (skew, marquee speed-up).
- Slow film-grade reveals — those belong to `cinematic-scroll` and `nightside`.
- Glow effects.
- Aceternity `aurora-background`, `wavy-background` — wrong genre.

### Smooth scroll

Lenis appropriate when the page is content-heavy. Skip on conversion-critical (consultation booking pages, service pricing).

### Accessibility

`prefers-reduced-motion` strips directional motion. Color and opacity remain. This direction is *the* one most likely to be read by reduced-motion users (professional services, healthcare adjacent) — design for it as primary.

## Wrong-direction tells (slop specific to `considered-modern`)

Beyond the pack-wide forbidden list at [`../references/forbidden.md`](../references/forbidden.md), avoid:

- **Peach accent on white** as the whole brand idea — the AI "warm" tell. Use real warm neutrals.
- **`rounded-3xl` on every element.** Variation reads warmer than uniformity.
- **Fake "people-led" copy** — "Our team of passionate experts" says nothing.
- **Stock photography** of people in offices smiling at laptops. Real client work or commissioned photography only.
- **Generic CTAs** — "Get started" / "Learn more" — replace with literal next-step copy.
- **Three identical feature cards** under the hero.
- **"Trusted by" logo strip styled cold,** with no client work shown.
- **A "Features / Solutions / Resources / Pricing" navigation.** Wrong category.

## What to push toward

- A **studio voice** — first person plural, conversational but considered.
- **"Currently"** sections — what the studio is currently working on, reading, building. Adds warmth.
- **Real address visible** somewhere — physical location.
- **A team photograph** that looks like a real team photograph (not stock).
- **A specific recent project named** in the hero or first section.
- Concrete language: "We design quarterly reports and annual reviews for asset managers." beats "We help companies tell their stories."
- Operational detail: "Three people in Lisbon and one in Porto. Founded 2019. Currently taking on two new projects."
- Plain CTA copy: "Send us a note", "Schedule a call", "Visit the studio Monday–Thursday".

## Reference artifact

A dedicated considered-modern reference artifact may live at `../examples/considered-studio.html` when added. Until then, calibrate against this brief:

- Hero with 7/5 asymmetric split — title + studio voice copy on one side, real team / project photograph on the other.
- "About / What we do" section — short paragraph + structured list of services. Concrete language only.
- Featured work — 4–6 case studies, asymmetric image grid. Each captioned with client name, year, scope.
- Approach / process — 3–5 *named* steps (not numbered "1, 2, 3" but named: "Listen", "Sketch", "Make", "Ship").
- Testimonial — *real* — one or two, attributed to real people with real titles. If none, skip the section.
- Team — small grid of 4–12 portraits. Real photographs. Real names. Real roles.
- Contact CTA — concrete and human. "Send us a note and we'll write back within two working days."
- Footer — multi-column. Real address. Contact. Recent work links. Optional "currently" rotating section.

The `cinematic-scroll` Maris artifact ([`../examples/cinematic-landing.html`](../examples/cinematic-landing.html)) borrows considered-modern moves (sticky letter from principal, third-generation framing, colophon footer with operational honesty). Read for tone of the "real working people" framing; calibrate to a humanist sans and a less dramatic hero.

---

**Pack layers applied on every output in this direction:**

- Universal craft: [`../references/animation.md`](../references/animation.md), [`../references/forbidden.md`](../references/forbidden.md).
- Component recipes: [`../components/style-recipes.md § Considered Modern`](../components/style-recipes.md) → restrained scroll-reveal, gentle springs, animated-testimonials (with real photos), 21st.dev card and image-gallery primitives.
