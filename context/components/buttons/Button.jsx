import React from "react";

/**
 * Lila primary button. Pill-shaped, calm motion, lilac brand fill.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: 13 },
    md: { padding: "12px 22px", fontSize: 15 },
    lg: { padding: "15px 30px", fontSize: 17 },
  };
  const variants = {
    primary: { background: "var(--accent)", color: "var(--text-onlila)", border: "1.5px solid transparent" },
    secondary: { background: "var(--accent-wash)", color: "var(--accent)", border: "1.5px solid transparent" },
    ghost: { background: "var(--paper)", color: "var(--text-strong)", border: "1.5px solid var(--border)" },
  };
  const [hover, setHover] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const hoverBg =
    variant === "primary" ? "var(--accent-hover)" :
    variant === "secondary" ? "var(--lila-200)" : "var(--surface-raised)";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        font: "var(--font-sans)",
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        ...sizes[size],
        ...v,
        background: hover && !disabled ? hoverBg : v.background,
        borderRadius: "var(--r-pill)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--dur) var(--ease), transform var(--dur-fast) var(--ease)",
        transform: hover && !disabled ? "translateY(-1px)" : "none",
        whiteSpace: "nowrap",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
