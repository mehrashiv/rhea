# Lila Design System

**Lila** is a photo-sharing app where teen makers post the clothes and drawings they create. The brand is **minimal, gallery-like, and quietly elegant** — neutral paper, a single lilac accent, generous white space, and a serif/sans pairing that feels personal rather than corporate. The product is intentionally small: a **Feed** and a **My Photos** view, plus a **Share a photo** composer. No stories, DMs, or growth-hacking UI.

> Built fresh for this product (no external codebase or Figma). The bound "Nile" system is unrelated and must not be used here.

---

## Content fundamentals

- **Voice:** warm, plain, first-person *maker*. The user is a person who *makes things*, not a "creator growing an audience."
- **Person:** speak as "I / you" — "I made this by myself.", "Share what you make." Never marketing "we."
- **Tone:** calm and understated. Short sentences. Lowercase wordmark (`lila`). No hype, no exclamation spam.
- **Casing:** sentence case everywhere except small ALL-CAPS eyebrow labels (`.14em` tracking). The wordmark is always lowercase.
- **Emoji:** sparingly, and only the quiet decorative kind a teen might add to a caption (e.g. `✦`). Never in UI chrome, buttons, or system copy.
- **Examples — say:** "A quiet place for your looks" · "Drop a photo here" · "Say how you made it…" · "24 likes"
- **Examples — avoid:** "Unleash your potential!!" · "Boost your reach" · "POST NOW 🔥✨"

## Visual foundations

- **Color:** one brand hue — **lilac `#7E6CD4`** — over a neutral ink/paper base. Backgrounds are near-white with a faint lilac wash (`#FBFAFE` / `#F4F1FD`); never full white glare. Photos sit in a soft lilac **photo-well** gradient placeholder until filled. No second accent, no rainbow.
- **Type:** **Cormorant Garamond** (serif) for the wordmark, display headings, dropzone titles, and "moments"; **Hanken Grotesk** (sans) for all body, UI, captions, and meta. Serif for feeling, sans for tapping.
- **Spacing:** 4px base scale; roomy padding (cards ~16–18px, sections 24px+). Single-column, max-width 600px feed — content is given air.
- **Corners:** soft and generous — `lg 16px` for cards/photos, `xl 20px` for sheets, `pill` for every button and the avatar.
- **Elevation:** very soft, low, slightly lilac-tinted shadows (`--shadow-sm` on cards). Never hard or dark. Borders are hairline `#ECE9F4`.
- **Backgrounds:** flat tints and one gentle radial wash on the sign-in screen. No photographic hero, no heavy gradients, no texture/noise.
- **Motion:** gentle ease-out (`cubic-bezier(.22,.61,.36,1)`), 200ms. Buttons lift 1px + darken on hover; dropzone tints lilac on drag-over. No bounce, no spin.
- **States:** hover = darker fill (primary) or lilac wash (subtle); the like heart fills solid lilac when active; focus = 3px lilac ring at 28% alpha.
- **Imagery:** user photos are the only imagery; the app never ships stock. Crop locked to **4:5 portrait** for feed consistency.

## Iconography

- **Style:** thin (1.3–1.6px), rounded-cap **line icons** — Lucide-style. The only filled icon is the **like heart** (fills lilac when active).
- **Set:** a tiny inline-SVG set is used directly in components (heart, upload arrow, image glyph, more-dots). For broader needs, use **[Lucide](https://lucide.dev)** at matching stroke weight to stay consistent.
- **Logo:** the Lila **mark** is a rounded-square glyph holding a lowercase serif `l` — see `assets/lila-mark.svg` (filled, gradient) and `assets/lila-mark-outline.svg`. Pair it with the lowercase Cormorant wordmark `lila`.
- **Emoji** are not used as UI icons.

---

## Index / manifest

- `styles.css` — global entry; `@import`s everything below. **Consumers link this one file.**
- `fonts/fonts.css` — Cormorant Garamond + Hanken Grotesk (Google Fonts).
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css` (CSS custom properties).
- `assets/` — `lila-mark.svg`, `lila-mark-outline.svg`.
- `guidelines/` — foundation specimen cards (brand, color, type, spacing, effects).
- `components/`
  - `buttons/` — **Button**, **IconButton**
  - `navigation/` — **Tabs**
  - `feed/` — **PostCard**, **Avatar**, **LikeButton**
  - `upload/` — **UploadZone**
- `ui_kits/lila-app/` — interactive recreation (sign-in → feed → share). Starting Point.
- `SKILL.md` — portable skill manifest.

## Using the tokens

Link the stylesheet and reference variables — never hard-code hex or fonts:

```html
<link rel="stylesheet" href="styles.css">
```
```css
.card   { background: var(--surface-card); border-radius: var(--r-lg); box-shadow: var(--shadow-sm); }
.title  { font: var(--display-md); color: var(--text-strong); }
.action { background: var(--accent); color: var(--text-onlila); border-radius: var(--r-pill); }
```

## Caveats

- **Fonts** are loaded from Google Fonts (both are free, intended families — no substitution). Swap to self-hosted `woff2` for production if you need offline/perf guarantees.
- The **logo mark** is an original glyph I designed for `lila`; treat it as a starting point and tell me if you'd like a different construction.
- Components are visual + light-interaction recreations; wire real data, auth, and uploads in the app.
