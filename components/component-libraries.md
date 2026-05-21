# Component Libraries — 21st.dev, shadcn customization

Notes on primitive component libraries. Use these to skip building basics from scratch; never use their defaults.

---

## 21st.dev

A community library of MIT-licensed React components, varying in quality. Pick the strongest primitives; ignore the gradient-heavy hero references.

### Reach-for primitives

- `breadcrumb`, `select`, `dropdown`, `progress`, `textarea` — strong baseline for `swiss-system` and `premium-bento`.
- `hover-card`, `tooltip` — across all styles; pair with the popover origin rules in `references/animation.md § 5`.
- `card-carousel`, `image-gallery` — `editorial-premium`, `gallery-minimal` substitution work.
- `interface-cards` — supporting modules in `premium-bento`.

### Skip

- Anything in 21st.dev tagged "hero" with a gradient/shader background — these are the AI-tell heroes the pack bans.
- "Animated background" components.
- Anything with default Indigo / Purple / Cyan accent.

### Customize before using

Always change:
- Border radii to the style's system (varies — `cinematic-product` uses sharper, `warm-modern` uses softer).
- Accent colors to the style's palette (see each style's `skill.md § 7` for the palette).
- Shadow treatment to diffusion-tinted (no harsh black blurs).

---

## shadcn/ui

Foundation library used for forms, dialogs, inputs across all styles. Powerful — but the defaults are the most-shipped slop on the web. **Never use shadcn at defaults.**

### Mandatory customization

Before exporting any shadcn-derived UI:

- Border radius — match the style's system. Don't ship `rounded-md` everywhere.
- Accent colors — replace `--primary` with the style's accent. Don't ship the default near-black on near-white.
- Font — every style in this pack bans `Inter`. Pair a display + body per the style's typography section.
- Shadow tokens — replace the default elevation set with diffusion shadows tinted to the page mood.
- Focus rings — visible and brand-aligned. Default rings look like dev mode.

### Use for

- `Dialog`, `Sheet`, `Drawer` — base modals across styles; customize entry animation per the pack's animation framework.
- `Command` — `premium-bento` command bar; customize typography and the keyboard hint chips.
- `Form`, `Input`, `Select`, `Textarea`, `Checkbox`, `RadioGroup` — `swiss-system`, `dashboards`-leaning bento sections, conversion forms in `warm-modern`.
- `Table` — `swiss-system`, dense data sections in `premium-bento`.
- `Tabs`, `Accordion`, `Collapsible` — supporting modules; tune the indicator motion to spring physics.

### Don't use for

- Hero sections — never. shadcn is not for marketing pages. Build heroes from scratch.
- Decorative cards — see materiality rules.
- Carousels — pick a stronger pattern from `motion-libraries.md`.

---

## Headless UI / Radix

Use Radix as the unstyled primitive layer underneath shadcn or your own styling. Particularly important for the popover origin rule:

```css
[data-radix-popover-content],
[data-radix-dropdown-menu-content],
[data-radix-hover-card-content] {
  transform-origin: var(--radix-popper-transform-origin);
  transition: transform 180ms var(--ease-out),
              opacity 180ms var(--ease-out);
}
```

Modals stay centered:
```css
[data-radix-dialog-content] {
  transform-origin: center;
}
```

See `references/animation.md § 5` for the full popover ruleset.

---

## Tailwind CSS

Default styling layer across the pack.

- **Check `package.json` for the version.** v3 and v4 have different setup (`tailwindcss` plugin vs `@tailwindcss/postcss`).
- **No arbitrary values where a Grid will do.** `grid-cols-1 md:grid-cols-3` beats `w-[calc(33%-1rem)]`.
- **Custom theme**: every style in this pack expects custom `colors`, `fontFamily`, `borderRadius`, and `boxShadow` extensions. Don't ship at default theme.
- **Mobile-first** — but each style has overrides documented in its `skill.md`.

---

## Anti-patterns across all libraries

- Using a library kit page as a final output.
- Mixing icon families inside one tree (Lucide + Phosphor, etc.).
- Pasting `rounded-3xl` on every card.
- Using Aceternity backgrounds with no foreground concept.
- 21st.dev hero gradients.
- shadcn defaults shipped to production.
