import * as React from "react";

/** Round avatar with serif-initial fallback. */
export interface AvatarProps {
  src?: string;
  /** Display name — first letter is the fallback. */
  name?: string;
  /** Diameter in px. @default 36 */
  size?: number;
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
