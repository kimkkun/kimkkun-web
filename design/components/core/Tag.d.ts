import * as React from "react";

/**
 * Tag — small category / metadata chip with a hairline border.
 */
export interface TagProps {
  children: React.ReactNode;
  /** default = readable; muted = sage; accent = the rare Ochre chip */
  variant?: "default" | "muted" | "accent";
  surface?: "dark" | "light";
}

export function Tag(props: TagProps): JSX.Element;
