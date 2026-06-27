"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { insforge } from "@/lib/insforge";
import { useAuth } from "@/lib/auth-context";

export function UploadDropzone({ onPosted }: { onPosted: () => void }) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const pickFile = (f: File | undefined) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setError(null);
    setFile(f);
  };

  const removeDraft = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const submitPost = async () => {
    if (!file || !user) return;
    setPosting(true);
    setError(null);

    const { data: uploaded, error: uploadError } = await insforge.storage
      .from("post-images")
      .uploadAuto(file);

    if (uploadError || !uploaded) {
      setError(uploadError?.message ?? "Upload failed.");
      setPosting(false);
      return;
    }

    const { error: insertError } = await insforge.database.from("posts").insert([
      {
        user_id: user.id,
        image_url: uploaded.url,
        image_key: uploaded.key,
        caption: caption.trim() || null,
      },
    ]);

    setPosting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setCaption("");
    removeDraft();
    onPosted();
  };

  return (
    <div className="composer">
      <div className="composer__title">Share a photo</div>

      {previewUrl ? (
        <div className="draft-preview">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={previewUrl} alt="" />
          <button type="button" onClick={removeDraft} aria-label="Remove photo" className="draft-remove">
            ✕
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`dropzone ${dragOver ? "dropzone--active" : ""}`}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: 12 }}
          >
            <path d="M12 16V4" />
            <path d="m7 9 5-5 5 5" />
            <path d="M5 20h14" />
          </svg>
          <div className="dropzone__title">Drop a photo here</div>
          <div className="dropzone__hint">or click to browse</div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="visually-hidden"
        onChange={(e) => pickFile(e.target.files?.[0])}
      />

      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows={2}
        placeholder="Say how you made it…"
        className="caption-input"
      />

      {error && <p className="field-error">{error}</p>}

      <div className="composer__footer">
        <button type="button" onClick={submitPost} disabled={!file || posting} className="btn btn--post">
          {posting ? "Posting…" : "Post"}
        </button>
      </div>
    </div>
  );
}
