import * as React from "react";

/**
 * Input — single-line text field; hairline border, Ochre focus.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** optional uppercase label above the field */
  label?: string;
  surface?: "dark" | "light";
}

export function Input(props: InputProps): JSX.Element;
