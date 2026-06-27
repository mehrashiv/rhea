import * as React from "react";

/**
 * Feed post card — photo, author, likes, caption. The primary content unit.
 *
 * @startingPoint section="Feed" subtitle="Single feed post card" viewport="560x620"
 */
export interface PostCardProps {
  /** Photo URL. Omit for a soft lilac placeholder well. */
  image?: string;
  author?: string;
  authorPhoto?: string;
  caption?: string;
  likes?: number;
  liked?: boolean;
  /** e.g. "2h" */
  timeAgo?: string;
  onToggleLike?: () => void;
  style?: React.CSSProperties;
}

export function PostCard(props: PostCardProps): JSX.Element;
