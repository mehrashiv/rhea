"use client";

import type { Post } from "@/lib/types";

type PostCardProps = {
  post: Post;
  currentUserId: string;
  onToggleLike: (post: Post) => void;
  onDelete?: (post: Post) => void;
  deleting?: boolean;
};

export function PostCard({
  post,
  currentUserId,
  onToggleLike,
  onDelete,
  deleting,
}: PostCardProps) {
  const liked = post.likes.some((like) => like.user_id === currentUserId);
  const likeCount = post.likes.length;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.image_url}
        alt={post.caption ?? "Shared photo"}
        className="aspect-square w-full object-cover"
      />
      <div className="flex items-center gap-3 px-4 pt-3">
        <button
          type="button"
          onClick={() => onToggleLike(post)}
          aria-pressed={liked}
          aria-label={liked ? "Unlike" : "Like"}
          className={`text-2xl leading-none transition-transform active:scale-90 ${
            liked ? "text-like-500" : "text-muted hover:text-like-500"
          }`}
        >
          {liked ? "♥" : "♡"}
        </button>
        <span className="text-sm font-medium text-foreground">
          {likeCount} {likeCount === 1 ? "like" : "likes"}
        </span>
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(post)}
            disabled={deleting}
            className="ml-auto text-xs font-medium text-like-500 hover:underline disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete"}
          </button>
        )}
      </div>
      <p className="px-4 pb-4 pt-2 text-sm text-foreground empty:hidden">
        {post.caption}
      </p>
    </div>
  );
}
