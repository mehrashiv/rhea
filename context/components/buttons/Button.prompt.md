Pill-shaped primary action button — use for "Share a photo", "Post", and other commits; one primary per view, secondary/ghost for the rest.

```jsx
<Button variant="primary" onClick={share}>Share a photo</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost" size="sm">Sign out</Button>
```

Variants: `primary` (lilac fill), `secondary` (lilac wash), `ghost` (paper + hairline). Sizes: `sm` / `md` / `lg`. Lifts 1px and darkens on hover.
