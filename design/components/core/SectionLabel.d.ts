import * as React from "react";

/**
 * SectionLabel — number + uppercase Latin word; the brand's icon-free wayfinding.
 */
export interface SectionLabelProps {
  /** zero-padded number, e.g. "02" — rendered in Ochre. Optional. */
  number?: string;
  /** the uppercase Latin word, e.g. "PROBLEM" */
  children: React.ReactNode;
  surface?: "dark" | "light";
}

export function SectionLabel(props: SectionLabelProps): JSX.Element;
