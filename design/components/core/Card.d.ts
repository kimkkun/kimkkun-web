import * as React from "react";

/**
 * Card — a flat, hairline-bordered plane. No shadow, sharp corners.
 *
 * @startingPoint section="Core" subtitle="Flat hairline card — content pillar / result" viewport="700x260"
 */
export interface CardProps {
  /** optional Ochre number, e.g. "01" */
  number?: string;
  /** optional uppercase Latin label */
  label?: string;
  /** card heading */
  title?: React.ReactNode;
  /** card body copy */
  body?: React.ReactNode;
  /** extra content below the body */
  children?: React.ReactNode;
  /** renders as <a> with a hover border shift */
  href?: string;
  surface?: "dark" | "light";
  /** transparent background (border only) */
  flat?: boolean;
}

export function Card(props: CardProps): JSX.Element;
