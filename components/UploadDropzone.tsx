"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { insforge } from "@/lib/insforge";
import { useAuth } from "@/lib/auth-context";

export function UploadDropzone({ onPosted }: { onPosted: () => void }) {
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

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

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const reset = () => {
    setFile(null);
    setCaption("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handlePost = async () => {
    if (!file || !user) return;
    setUploading(true);
    setError(null);

    const { data: uploaded, error: uploadError } = await insforge.storage
      .from("post-images")
      .uploadAuto(file);

    if (uploadError || !uploaded) {
      setError(uploadError?.message ?? "Upload failed.");
      setUploading(false);
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

    setUploading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    reset();
    onPosted();
  };

  return (
    <div className="border-b border-border px-4 py-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${
          isDragging
            ? "border-brand-500 bg-brand-50"
            : "border-border hover:border-brand-500"
        }`}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Selected preview"
            className="h-32 w-32 rounded-lg object-cover"
          />
        ) : (
          <>
            <span className="text-sm font-medium text-foreground">
              Drag & drop a photo here
            </span>
            <span className="text-xs text-muted">or click to browse</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
      </div>

      {file && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Add a caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-500"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reset}
              disabled={uploading}
              className="rounded-md border border-border px-3 py-2 text-sm font-medium hover:bg-background disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePost}
              disabled={uploading}
              className="rounded-md bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
            >
              {uploading ? "Posting…" : "Post"}
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-sm text-like-500">{error}</p>}
    </div>
  );
}
