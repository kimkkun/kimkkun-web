import React from "react";

/* Injected once: hover/press/focus states the brand needs (inline styles can't do :hover).
   Restraint: cream fill shift, hairline→accent, opacity dip. No bounce. */
const STYLE_ID = "kk-button-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.kk-btn{font-family:var(--font-sans);font-weight:600;letter-spacing:-0.005em;
  display:inline-flex;align-items:center;gap:8px;justify-content:center;
  border:1px solid transparent;border-radius:var(--radius-2);cursor:pointer;
  text-decoration:none;white-space:nowrap;
  transition:background var(--dur-fast) var(--ease-out),
    border-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),opacity var(--dur-fast) var(--ease-out);}
.kk-btn:focus-visible{outline:1px solid var(--ochre);outline-offset:2px;}
.kk-btn:active{opacity:0.82;}
.kk-btn[disabled]{cursor:not-allowed;opacity:0.4;}
.kk-btn-sm{font-size:13px;padding:8px 14px;}
.kk-btn-md{font-size:15px;padding:11px 20px;}
.kk-btn-lg{font-size:16px;padding:14px 26px;}
/* dark surface */
.kk-btn-primary{background:var(--cream);color:var(--ink);}
.kk-btn-primary:not([disabled]):hover{background:#fff;}
.kk-btn-secondary{background:transparent;color:var(--cream);border-color:var(--sage-line);}
.kk-btn-secondary:not([disabled]):hover{border-color:var(--cream);}
.kk-btn-accent{background:transparent;color:var(--cream);border-color:var(--ochre-line);}
.kk-btn-accent:not([disabled]):hover{background:var(--ochre-soft);border-color:var(--ochre);}
.kk-btn-ghost{background:transparent;color:var(--cream);}
.kk-btn-ghost:not([disabled]):hover{color:var(--ochre);}
/* light surface */
.kk-btn-onlight.kk-btn-primary{background:var(--ink);color:var(--cream);}
.kk-btn-onlight.kk-btn-primary:not([disabled]):hover{background:#0a120f;}
.kk-btn-onlight.kk-btn-secondary{color:var(--ink);border-color:var(--sage-line-ink);}
.kk-btn-onlight.kk-btn-secondary:not([disabled]):hover{border-color:var(--ink);}
.kk-btn-onlight.kk-btn-accent{color:var(--ink);border-color:var(--ochre-line);}
.kk-btn-onlight.kk-btn-ghost{color:var(--ink);}
`;
  document.head.appendChild(el);
}

/**
 * Button — 김꾼 action. Restrained, sharp-cornered, no shadow.
 * Use `accent` for the ONE call-to-action per surface (Ochre hairline).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  surface = "dark",
  href,
  disabled = false,
  onClick,
  type = "button",
  ...rest
}) {
  const cls = [
    "kk-btn",
    `kk-btn-${size}`,
    `kk-btn-${variant}`,
    surface === "light" ? "kk-btn-onlight" : "",
  ].filter(Boolean).join(" ");

  if (href && !disabled) {
    return (
      <a className={cls} href={href} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} type={type} disabled={disabled} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
