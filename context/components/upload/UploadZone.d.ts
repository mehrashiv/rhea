import * as React from "react";

/**
 * Drag-and-drop / click photo upload well.
 *
 * @startingPoint section="Components" subtitle="Photo upload dropzone" viewport="460x220"
 */
export interface UploadZoneProps {
  /** Called with the chosen File. */
  onFile?: (file: File) => void;
  /** Serif headline. @default "Drop a photo here" */
  title?: string;
  /** Sub-line. @default "or click to browse" */
  hint?: string;
  style?: React.CSSProperties;
}

export function UploadZone(props: UploadZoneProps): JSX.Element;
