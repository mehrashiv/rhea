import React from "react";
import { Avatar } from "./Avatar.jsx";
import { LikeButton } from "./LikeButton.jsx";

/**
 * The core feed unit: photo, author, like control, caption.
 * `image` is a URL; when absent a soft lilac photo-well shows instead.
 */
export function PostCard({
  image,
  author = "",
  authorPhoto,
  caption = "",
  likes = 0,
  liked = false,
  timeAgo,
  onToggleLike,
  style,
}) {
  return (
    <article
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--r-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        ...style,
      }}
    >
      {/* author row */}
      <header style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 16px" }}>
        <Avatar name={author} src={authorPhoto} size={34} />
        <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text-strong)" }}>
          {author}
        </span>
        {timeAgo && (
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--text-faint)" }}>{timeAgo}</span>
        )}
      </header>

      {/* photo */}
      <div style={{ aspectRatio: "4 / 5", background: "var(--photo-grad)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {image ? (
          <img src={image} alt={caption || author} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--lila-300)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" />
          </svg>
        )}
      </div>

      {/* footer */}
      <div style={{ padding: "12px 16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: -8 }}>
          <LikeButton liked={liked} count={likes} onToggle={onToggleLike} />
        </div>
        {caption && (
          <p style={{ margin: "8px 0 0", font: "var(--text-sm)", fontFamily: "var(--font-sans)", color: "var(--text-body)" }}>
            {caption}
          </p>
        )}
      </div>
    </article>
  );
}
