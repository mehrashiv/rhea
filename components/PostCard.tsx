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
}: PostCardProps) {
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
        {caption && <p className="post-card__caption">{caption}</p>}
      </div>
    </article>
  );
}
