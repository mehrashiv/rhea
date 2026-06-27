import { useState, type KeyboardEvent } from "react";
import { Avatar } from "./Avatar";
import { HeartIcon } from "./HeartIcon";
import { LikeButton } from "./LikeButton";

type PostCardProps = {
  authorName: string;
  authorAvatar?: string | null;
  timeAgo: string;
  imageUrl: string;
  caption: string | null;
  likeCount: number;
  liked?: boolean;
  onToggleLike?: () => void;
  onDelete?: () => void;
  deleting?: boolean;
  onEditCaption?: (caption: string) => Promise<void>;
};

export function PostCard({
  authorName,
  authorAvatar,
  timeAgo,
  imageUrl,
  caption,
  likeCount,
  liked,
  onToggleLike,
  onDelete,
  deleting,
  onEditCaption,
}: PostCardProps) {
  const [isEditingCaption, setIsEditingCaption] = useState(false);
  const [captionDraft, setCaptionDraft] = useState(caption ?? "");
  const [savingCaption, setSavingCaption] = useState(false);
  const [captionError, setCaptionError] = useState<string | null>(null);

  const startEditingCaption = () => {
    setCaptionDraft(caption ?? "");
    setCaptionError(null);
    setIsEditingCaption(true);
  };

  const cancelEditingCaption = () => {
    setIsEditingCaption(false);
    setCaptionError(null);
  };

  const saveCaption = async () => {
    if (!onEditCaption) return;
    setSavingCaption(true);
    setCaptionError(null);
    try {
      await onEditCaption(captionDraft);
      setIsEditingCaption(false);
    } catch (err) {
      setCaptionError(err instanceof Error ? err.message : "Could not save caption.");
    } finally {
      setSavingCaption(false);
    }
  };

  const handleCaptionKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      saveCaption();
    } else if (e.key === "Escape") {
      cancelEditingCaption();
    }
  };

  return (
    <article className="post-card">
      <header className="post-card__header">
        <Avatar name={authorName} src={authorAvatar} />
        <span className="post-card__author">{authorName}</span>
        <span className="post-card__time">{timeAgo}</span>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            disabled={deleting}
            aria-label="Delete post"
            className="post-card__delete"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            </svg>
          </button>
        )}
      </header>

      <div className="post-card__photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={caption ?? authorName} />
      </div>

      <div className="post-card__body">
        <div className="post-card__actions">
          {onToggleLike ? (
            <LikeButton liked={!!liked} count={likeCount} onToggle={onToggleLike} />
          ) : (
            <>
              <span className="like-static">
                <HeartIcon filled={false} size={19} />
              </span>
              <span className="like-count">
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </span>
            </>
          )}
        </div>

        {isEditingCaption ? (
          <div className="caption-edit">
            <textarea
              value={captionDraft}
              onChange={(e) => setCaptionDraft(e.target.value)}
              onKeyDown={handleCaptionKeyDown}
              rows={2}
              placeholder="Say how you made it…"
              className="caption-input"
              disabled={savingCaption}
              autoFocus
            />
            {captionError && <p className="field-error">{captionError}</p>}
            <div className="caption-edit__actions">
              <button type="button" onClick={cancelEditingCaption} disabled={savingCaption} className="btn--text">
                Cancel
              </button>
              <button type="button" onClick={saveCaption} disabled={savingCaption} className="btn btn--post">
                {savingCaption ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        ) : (
          (caption || onEditCaption) && (
            <div className="post-card__caption-row">
              {caption ? (
                <p className="post-card__caption">{caption}</p>
              ) : (
                <button type="button" onClick={startEditingCaption} className="post-card__add-caption">
                  Add a caption…
                </button>
              )}
              {onEditCaption && caption && (
                <button
                  type="button"
                  onClick={startEditingCaption}
                  aria-label="Edit caption"
                  className="post-card__edit-caption"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
              )}
            </div>
          )
        )}
      </div>
    </article>
  );
}
