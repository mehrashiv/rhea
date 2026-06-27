import * as React from "react";

/** Heart toggle with like count. */
export interface LikeButtonProps {
  liked?: boolean;
  count?: number;
  onToggle?: () => void;
  style?: React.CSSProperties;
}

export function LikeButton(props: LikeButtonProps): JSX.Element;
