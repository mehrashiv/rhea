import React from "react";

/**
 * Round icon button for likes, more-menus, close, etc.
 * Pass an inline SVG (or any node) as children.
 */
export function IconButton({
  children,
  label,
  active = false,
  size = 40,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--r-pill)",
        border: "none",
        background: hover ? "var(--surface-raised)" : "transparent",
        color: active ? "var(--like)" : "var(--text-muted)",
        cursor: "pointer",
        transition: "background var(--dur) var(--ease), color var(--dur) var(--ease)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
