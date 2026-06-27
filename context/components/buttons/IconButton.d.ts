import * as React from "react";

/**
 * Circular icon button — likes, overflow menus, close.
 */
export interface IconButtonProps {
  /** Icon node, e.g. an inline <svg>. */
  children: React.ReactNode;
  /** Accessible label (required — icon-only control). */
  label: string;
  /** Tinted/active state (e.g. liked). @default false */
  active?: boolean;
  /** Diameter in px. @default 40 */
  size?: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
