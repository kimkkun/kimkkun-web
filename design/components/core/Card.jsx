import React from "react";

const STYLE_ID = "kk-card-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = `
.kk-card{font-family:var(--font-sans);display:flex;flex-direction:column;
  border:1px solid var(--sage-line);border-radius:var(--radius-2);
  background:var(--forest-surface);padding:28px;text-decoration:none;
  transition:border-color var(--dur-base) var(--ease-out),
    background var(--dur-base) var(--ease-out);}
.kk-card-onlight{background:var(--cream-surface);border-color:var(--sage-line-ink);}
.kk-card-link{cursor:pointer;}
.kk-card-link:hover{border-color:var(--cream);}
.kk-card-onlight.kk-card-link:hover{border-color:var(--ink);}
.kk-card-flat{background:transparent;}
.kk-card-num{font-size:13px;font-weight:700;color:var(--ochre);
  font-variant-numeric:tabular-nums;margin-bottom:14px;}
.kk-card-label{font-size:12px;font-weight:500;letter-spacing:0.14em;
  text-transform:uppercase;color:var(--sage);margin-bottom:12px;}
.kk-card-title{font-size:22px;font-weight:700;line-height:1.3;letter-spacing:-0.01em;
  color:var(--cream);margin:0 0 10px;text-wrap:balance;}
.kk-card-onlight .kk-card-title{color:var(--ink);}
.kk-card-body{font-size:16px;line-height:1.6;color:var(--cream-dim);margin:0;text-wrap:pretty;}
.kk-card-onlight .kk-card-body{color:var(--ink-dim);}
`;
  document.head.appendChild(el);
}

/**
 * Card — a flat plane separated by a 1px hairline (never shadow). Optional
 * Ochre number, uppercase label, title and body. Becomes a link when `href` set.
 */
export function Card({
  children,
  number,
  label,
  title,
  body,
  href,
  surface = "dark",
  flat = false,
  ...rest
}) {
  const cls = [
    "kk-card",
    surface === "light" ? "kk-card-onlight" : "",
    href ? "kk-card-link" : "",
    flat ? "kk-card-flat" : "",
  ].filter(Boolean).join(" ");

  const content = (
    <>
      {number != null && <span className="kk-card-num">{number}</span>}
      {label && <span className="kk-card-label">{label}</span>}
      {title && <h3 className="kk-card-title">{title}</h3>}
      {body && <p className="kk-card-body">{body}</p>}
      {children}
    </>
  );

  if (href) {
    return <a className={cls} href={href} {...rest}>{content}</a>;
  }
  return <div className={cls} {...rest}>{content}</div>;
}
