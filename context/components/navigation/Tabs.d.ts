import * as React from "react";

export type TabItem = string | { value: string; label: string };

/**
 * Underline tab switch (e.g. Feed / My Photos).
 *
 * @startingPoint section="Components" subtitle="Underline tabs" viewport="360x80"
 */
export interface TabsProps {
  /** Tab list — plain strings or {value,label}. */
  tabs: TabItem[];
  /** Currently selected value. */
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
