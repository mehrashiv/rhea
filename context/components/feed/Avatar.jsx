import React from "react";

/**
 * Round avatar. Falls back to an initial on a lilac wash when no src.
 */
export function Avatar({ src, name = "", size = 36, style }) {
  const initial = (name.trim()[0] || "·").toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "var(--r-pill)",
        flex: "none",
        overflow: "hidden",
        background: "var(--accent-wash)",
        color: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        fontSize: size * 0.46,
        border: "1px solid var(--border-subtle)",
        ...style,
      }}
    >
      {src ? (
        <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initial
      )}
    </div>
  );
}
