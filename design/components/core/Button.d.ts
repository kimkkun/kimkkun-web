import * as React from "react";

/**
 * Button — the brand's action element. Sharp corners (≤4px), 1px borders, no shadow.
 *
 * @startingPoint section="Core" subtitle="Restrained CTA — use accent once per surface" viewport="700x150"
 */
export interface ButtonProps {
  children: React.ReactNode;
  /** primary = solid; secondary = hairline outline; accent = THE Ochre CTA (one per surface); ghost = text only */
  variant?: "primary" | "secondary" | "accent" | "ghost";
  size?: "sm" | "md" | "lg";
  /** which background it sits on — flips primary/secondary colors */
  surface?: "dark" | "light";
  /** render as <a> when set */
  href?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
}

export function Button(props: ButtonProps): JSX.Element;
