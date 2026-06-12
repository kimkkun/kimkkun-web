import React from "react";

const STYLE_ID = "kk-input-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.kk-field{display:flex;flex-direction:column;gap:8px;font-family:var(--font-sans);}
.kk-field-label{font-size:12px;font-weight:500;letter-spacing:0.12em;
  text-transform:uppercase;color:var(--sage);}
.kk-input{font-family:var(--font-sans);font-size:16px;line-height:1.4;
  color:var(--cream);background:transparent;
  border:1px solid var(--sage-line);border-radius:var(--radius-2);
  padding:13px 15px;width:100%;box-sizing:border-box;
  transition:border-color var(--dur-fast) var(--ease-out);}
.kk-input::placeholder{color:var(--sage);opacity:0.8;}
.kk-input:hover{border-color:rgba(143,168,155,0.5);}
.kk-input:focus{outline:none;border-color:var(--ochre);}
.kk-input:disabled{opacity:0.45;cursor:not-allowed;}
.kk-input-onlight{color:var(--ink);border-color:var(--sage-line-ink);}
.kk-input-onlight::placeholder{color:var(--ink-dim);}
.kk-field-onlight .kk-field-label{color:var(--ink-dim);}
`;
  document.head.appendChild(el);
}

/**
 * Input — a single-line text field. Hairline border, sharp corners,
 * Ochre focus border. Optional uppercase label.
 */
export function Input({
  label,
  surface = "dark",
  id,
  type = "text",
  ...rest
}) {
  const onLight = surface === "light";
  const fieldId = id || (label ? `kk-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return (
    <label
      className={`kk-field ${onLight ? "kk-field-onlight" : ""}`}
      htmlFor={fieldId}
    >
      {label && <span className="kk-field-label">{label}</span>}
      <input
        id={fieldId}
        type={type}
        className={`kk-input ${onLight ? "kk-input-onlight" : ""}`}
        {...rest}
      />
    </label>
  );
}
