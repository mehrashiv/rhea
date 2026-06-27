Circular, label-required icon button for like / more / close actions. Children is the icon node; `active` tints it lilac.

```jsx
<IconButton label="Like" active={liked} onClick={toggle}>
  <HeartSvg />
</IconButton>
```

Transparent by default, lilac-wash on hover. Always pass `label` — it's icon-only.
