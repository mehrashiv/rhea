import * as React from "react";

/**
 * Lila pill button.
 *
 * @startingPoint section="Components" subtitle="Pill button — primary / secondary / ghost" viewport="360x120"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** Visual emphasis. @default "primary" */
  variant?: "primary" | "secondary" | "ghost";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
