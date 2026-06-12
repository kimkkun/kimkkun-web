import React from "react";

/**
 * SectionLabel — the brand's wayfinding mark: a tabular number in Ochre
 * followed by a wide-tracked uppercase Latin word. Replaces icons.
 */
export function SectionLabel({ number, children, surface = "dark", ...rest }) {
  const labelColor = surface === "light" ? "var(--ink-dim)" : "var(--sage)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: 10,
        fontFamily: "var(--font-sans)",
      }}
      {...rest}
    >
      {number != null && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "var(--ochre)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {number}
        </span>
      )}
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: labelColor,
        }}
      >
        {children}
      </span>
    </span>
  );
}
