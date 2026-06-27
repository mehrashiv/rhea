import React from "react";

/**
 * Drag-and-drop / click upload well for sharing a photo.
 * Visual + basic interaction only — wire real file handling in the app.
 */
export function UploadZone({ onFile, hint = "or click to browse", title = "Drop a photo here", style }) {
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef(null);

  function pick(files) {
    if (files && files[0] && onFile) onFile(files[0]);
  }

  return (
    <div
      onClick={() => inputRef.current && inputRef.current.click()}
      onDragOver={(e) => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files); }}
      style={{
        border: `1.5px dashed ${over ? "var(--accent)" : "var(--border-accent)"}`,
        borderRadius: "var(--r-lg)",
        background: over ? "var(--accent-wash)" : "var(--surface-sunken)",
        padding: "40px 30px",
        textAlign: "center",
        cursor: "pointer",
        transition: "background var(--dur) var(--ease), border-color var(--dur) var(--ease)",
        ...style,
      }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12 }}>
        <path d="M12 16V4" /><path d="m7 9 5-5 5 5" /><path d="M5 20h14" />
      </svg>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 24, color: "var(--text-strong)" }}>{title}</div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: 14, color: "var(--text-faint)", marginTop: 6 }}>{hint}</div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files)} />
    </div>
  );
}
