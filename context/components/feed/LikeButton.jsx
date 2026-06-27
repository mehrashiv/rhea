import React from "react";
import { IconButton } from "../buttons/IconButton.jsx";

/**
 * Heart toggle + like count. Fills lilac when liked.
 */
export function LikeButton({ liked = false, count = 0, onToggle, style }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 2, ...style }}>
      <IconButton label={liked ? "Unlike" : "Like"} active={liked} onClick={onToggle}>
        <svg width="22" height="22" viewBox="0 0 24 24"
          fill={liked ? "currentColor" : "none"} stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
        </svg>
      </IconButton>
      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text-strong)" }}>
        {count} {count === 1 ? "like" : "likes"}
      </span>
    </div>
  );
}
