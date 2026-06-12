import React from "react";

/**
 * Tag — a small category/meta chip. Hairline border, sharp corners, no fill
 * (except the rare `accent`). Used for content pillars and metadata.
 */
export function Tag({ children, variant = "default", surface = "dark", ...rest }) {
  const onLight = surface === "light";
  const base = {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: "var(--font-sans)",
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "0.01em",
    padding: "6px 11px",
    borderRadius: "var(--radius-2)",
    border: "1px solid",
  };
  const variants = {
    default: {
      color: onLight ? "var(--ink)" : "var(--cream)",
      borderColor: onLight ? "var(--sage-line-ink)" : "var(--sage-line)",
      background: "transparent",
    },
    muted: {
      color: onLight ? "var(--ink-dim)" : "var(--sage)",
      borderColor: onLight ? "var(--sage-line-ink)" : "var(--sage-line)",
      background: "transparent",
    },
    accent: {
      color: "var(--ochre)",
      borderColor: "var(--ochre-line)",
      background: "var(--ochre-soft)",
    },
  };
  return (
    <span style={{ ...base, ...variants[variant] }} {...rest}>
      {children}
    </span>
  );
}
