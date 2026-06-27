import { HeartIcon } from "./HeartIcon";

export function LikeButton({
  liked,
  count,
  onToggle,
}: {
  liked: boolean;
  count: number;
  onToggle: () => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-label={liked ? "Unlike" : "Like"}
        aria-pressed={liked}
        className={`like-btn ${liked ? "like-btn--liked" : ""}`}
      >
        <HeartIcon filled={liked} />
      </button>
      <span className="like-count">
        {count} {count === 1 ? "like" : "likes"}
      </span>
    </>
  );
}
