The core feed unit — author row, 4:5 photo, like control, caption. Composes `Avatar` and `LikeButton`.

```jsx
<PostCard
  image={post.url}
  author="Mara"
  caption="I made this by myself. Used a very new technique."
  likes={24}
  liked={liked}
  timeAgo="2h"
  onToggleLike={toggle}
/>
```

With no `image` it renders a soft lilac photo-well placeholder. Photos are locked to a 4:5 portrait crop.
