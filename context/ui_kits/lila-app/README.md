# Lila App — UI kit

A high-fidelity, interactive recreation of the Lila app's two core surfaces, composed from the design-system tokens in `../../styles.css`.

## Flow
1. **Sign-in** — wordmark, the line "A quiet place for your looks", and a single name field (no real auth).
2. **Feed** — sticky header (logo · Share a photo · Sign out), the **Feed / My Photos** underline tabs, and a single-column list of `PostCard`s. Like hearts toggle live.
3. **Share** — "Share a photo" opens an inline composer: drag-and-drop / click `UploadZone` (reads a real dropped image via FileReader), a caption field, and Post. Posting prepends the photo and jumps to **My Photos**.

## Notes
- Single-column, centered, max-width 600px — mobile-first but comfortable on large screens (gallery feel).
- The kit's `index.html` is self-contained (React UMD + in-browser Babel) so it opens standalone. Production screens should instead import the real primitives: `Button`, `IconButton`, `Tabs`, `Avatar`, `LikeButton`, `PostCard`, `UploadZone`.
- Photos render as a soft lilac placeholder well until a real image is provided; crop is locked to 4:5 portrait.

Tagged as a Starting Point ("Lila App") so it can seed a new design.
