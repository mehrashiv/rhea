import React from "react";

/**
 * Underline tabs — the Feed / My Photos switch.
 */
export function Tabs({ tabs = [], value, onChange, style }) {
  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: 28,
        borderBottom: "1px solid var(--border)",
        ...style,
      }}
    >
      {tabs.map((t) => {
        const key = typeof t === "string" ? t : t.value;
        const labelText = typeof t === "string" ? t : t.label;
        const active = key === value;
        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(key)}
            style={{
              appearance: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: 16,
              fontWeight: active ? 600 : 500,
              color: active ? "var(--text-strong)" : "var(--text-faint)",
              padding: "0 0 12px",
              marginBottom: -1,
              borderBottom: active ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "color var(--dur) var(--ease)",
            }}
          >
            {labelText}
          </button>
        );
      })}
    </div>
  );
}
