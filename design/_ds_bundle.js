/* @ds-bundle: {"format":3,"namespace":"KimKkunDesignSystem_b887a3","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"}],"sourceHashes":{"components/core/Button.jsx":"57e0fea3a471","components/core/Card.jsx":"dd43dc2bda5c","components/core/Input.jsx":"b513852fe1f6","components/core/SectionLabel.jsx":"b061c15fecea","components/core/Tag.jsx":"8962d7390113","ui_kits/website/App.jsx":"a0bba2fd9d90","ui_kits/website/Belief.jsx":"766cf0d2785c","ui_kits/website/CTA.jsx":"2ac33657c104","ui_kits/website/Categories.jsx":"c8ad594f3a34","ui_kits/website/Footer.jsx":"a89c1ab88305","ui_kits/website/Hero.jsx":"1d52a18521d1","ui_kits/website/Nav.jsx":"2380699b4690","ui_kits/website/Problem.jsx":"b6591f96dc53","ui_kits/website/Results.jsx":"1b6f20cdd8c6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KimKkunDesignSystem_b887a3 = window.KimKkunDesignSystem_b887a3 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  const cls = ["kk-btn", `kk-btn-${size}`, `kk-btn-${variant}`, surface === "light" ? "kk-btn-onlight" : ""].filter(Boolean).join(" ");
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href,
      onClick: onClick
    }, rest), children);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cls,
    type: type,
    disabled: disabled,
    onClick: onClick
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Card({
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
  const cls = ["kk-card", surface === "light" ? "kk-card-onlight" : "", href ? "kk-card-link" : "", flat ? "kk-card-flat" : ""].filter(Boolean).join(" ");
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, number != null && /*#__PURE__*/React.createElement("span", {
    className: "kk-card-num"
  }, number), label && /*#__PURE__*/React.createElement("span", {
    className: "kk-card-label"
  }, label), title && /*#__PURE__*/React.createElement("h3", {
    className: "kk-card-title"
  }, title), body && /*#__PURE__*/React.createElement("p", {
    className: "kk-card-body"
  }, body), children);
  if (href) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href
    }, rest), content);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), content);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Input({
  label,
  surface = "dark",
  id,
  type = "text",
  ...rest
}) {
  const onLight = surface === "light";
  const fieldId = id || (label ? `kk-${String(label).replace(/\s+/g, "-").toLowerCase()}` : undefined);
  return /*#__PURE__*/React.createElement("label", {
    className: `kk-field ${onLight ? "kk-field-onlight" : ""}`,
    htmlFor: fieldId
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "kk-field-label"
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    type: type,
    className: `kk-input ${onLight ? "kk-input-onlight" : ""}`
  }, rest)));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SectionLabel — the brand's wayfinding mark: a tabular number in Ochre
 * followed by a wide-tracked uppercase Latin word. Replaces icons.
 */
function SectionLabel({
  number,
  children,
  surface = "dark",
  ...rest
}) {
  const labelColor = surface === "light" ? "var(--ink-dim)" : "var(--sage)";
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "baseline",
      gap: 10,
      fontFamily: "var(--font-sans)"
    }
  }, rest), number != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--ochre)",
      fontVariantNumeric: "tabular-nums"
    }
  }, number), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: labelColor
    }
  }, children));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — a small category/meta chip. Hairline border, sharp corners, no fill
 * (except the rare `accent`). Used for content pillars and metadata.
 */
function Tag({
  children,
  variant = "default",
  surface = "dark",
  ...rest
}) {
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
    border: "1px solid"
  };
  const variants = {
    default: {
      color: onLight ? "var(--ink)" : "var(--cream)",
      borderColor: onLight ? "var(--sage-line-ink)" : "var(--sage-line)",
      background: "transparent"
    },
    muted: {
      color: onLight ? "var(--ink-dim)" : "var(--sage)",
      borderColor: onLight ? "var(--sage-line-ink)" : "var(--sage-line)",
      background: "transparent"
    },
    accent: {
      color: "var(--ochre)",
      borderColor: "var(--ochre-line)",
      background: "var(--ochre-soft)"
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      ...base,
      ...variants[variant]
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
/* App — composes the 김꾼 site and wires the fade/slide reveal (IntersectionObserver). */
function App() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      els.forEach(el => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.12
    });
    els.forEach(el => io.observe(el));
    // Fallback: some embedded contexts never deliver IO callbacks. If nothing
    // has revealed shortly after mount, reveal everything (fade still applies).
    const t = setTimeout(() => {
      if (!els.some(el => el.classList.contains("is-in"))) {
        els.forEach(el => el.classList.add("is-in"));
        io.disconnect();
      }
    }, 500);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, []);
  const {
    Nav,
    Hero,
    Problem,
    Belief,
    Categories,
    Results,
    CTA,
    Footer
  } = window;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(Belief, null), /*#__PURE__*/React.createElement(Categories, null), /*#__PURE__*/React.createElement(Results, null), /*#__PURE__*/React.createElement(CTA, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Belief.jsx
try { (() => {
/* Belief — 김꾼의 관점. Dark section, big serif declaratives with hairline dividers. */
function Belief() {
  const {
    SectionLabel
  } = window.KimKkunDesignSystem_b887a3;
  const lines = ["할인은 전략이 아니다. 변명이다.", "단골은 친절이 아니라 설계에서 나온다.", "브랜드는 로고가 아니라 반복되는 경험이다."];
  return /*#__PURE__*/React.createElement("section", {
    className: "kk-section",
    id: "view",
    "data-screen-label": "Belief"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "02"
  }, "View"), /*#__PURE__*/React.createElement("h2", {
    className: "kk-sec-title"
  }, "\uAE40\uAFBC\uC740 \uC774\uB807\uAC8C \uBCF8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "kk-belief-list"
  }, lines.map((l, i) => /*#__PURE__*/React.createElement("p", {
    className: "kk-belief-line",
    key: i,
    "data-reveal": true
  }, l)))));
}
window.Belief = Belief;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Belief.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CTA.jsx
try { (() => {
/* CTA — 시작. Forest-deep plane. The site's ONE Ochre moment lives here.
   Interactive: the accent button flips to a confirmation line. */
function CTA() {
  const {
    SectionLabel,
    Button
  } = window.KimKkunDesignSystem_b887a3;
  const [joined, setJoined] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "kk-section deep",
    id: "start",
    "data-screen-label": "CTA"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container kk-cta-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "05"
  }, "Start"), /*#__PURE__*/React.createElement("h2", {
    className: "kk-sec-title"
  }, "\uB2E4\uC74C \uC190\uB2D8\uBD80\uD130,", /*#__PURE__*/React.createElement("br", null), "\uB2E4\uB974\uAC8C."), /*#__PURE__*/React.createElement("p", {
    className: "kk-cta-lead"
  }, "\uCE5C\uAD6C\uCD94\uAC00\uD558\uACE0, \uB2E4\uC74C \uC190\uB2D8\uBD80\uD130 \uB2E4\uB974\uAC8C \uB9DE\uC774\uD558\uC138\uC694.")), /*#__PURE__*/React.createElement("div", {
    className: "kk-cta-actions",
    "data-reveal": true
  }, joined ? /*#__PURE__*/React.createElement("p", {
    className: "kk-cta-done"
  }, "\uC2E0\uCCAD \uC644\uB8CC. \uD658\uC601 \uBA54\uC2DC\uC9C0\uB85C \uACE7 \uB9CC\uB098\uC694.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    onClick: () => setJoined(true)
  }, "\uCE74\uCE74\uC624\uCC44\uB110 \uCE5C\uAD6C\uCD94\uAC00"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    onClick: e => e.preventDefault(),
    href: "#start"
  }, "\uC624\uD508\uCC44\uD305 \uC785\uC7A5 \u2192")))));
}
window.CTA = CTA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CTA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Categories.jsx
try { (() => {
/* Categories — 콘텐츠 5카테고리. Light section composing the Card primitive. */
function Categories() {
  const {
    SectionLabel,
    Card
  } = window.KimKkunDesignSystem_b887a3;
  const items = [{
    n: "01",
    t: "고객 만들기",
    b: "지나가는 사람을 손님으로 만드는 법."
  }, {
    n: "02",
    t: "단골 만들기",
    b: "한 번 온 손님이 다시 오게 만드는 구조."
  }, {
    n: "03",
    t: "브랜드 만들기",
    b: "가격 말고 이유로 선택받는 법."
  }, {
    n: "04",
    t: "시스템 만들기",
    b: "사장이 없어도 돌아가는 가게."
  }, {
    n: "05",
    t: "사장 이야기",
    b: "현장에서 배운 것들. 포장 없이."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "kk-section light",
    id: "work",
    "data-screen-label": "Categories"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "03",
    surface: "light"
  }, "Work"), /*#__PURE__*/React.createElement("h2", {
    className: "kk-sec-title"
  }, "\uB2E4\uC12F \uAC00\uC9C0\uB9CC \uB2E4\uB8EC\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "kk-cat-grid"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    "data-reveal": true,
    key: it.n
  }, /*#__PURE__*/React.createElement(Card, {
    surface: "light",
    href: "#work",
    number: it.n,
    title: it.t,
    body: it.b,
    onClick: e => e.preventDefault()
  }))))));
}
window.Categories = Categories;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Categories.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
/* Footer — Forest Deep. Wordmark, pillar links, copyright. Hairline-separated. */
function Footer() {
  const pillars = ["고객 만들기", "단골 만들기", "브랜드 만들기", "시스템 만들기", "사장 이야기"];
  return /*#__PURE__*/React.createElement("footer", {
    className: "kk-footer",
    "data-screen-label": "Footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-footer-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-footer-mark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kk-footer-word"
  }, "\uAE40\uAFBC"), /*#__PURE__*/React.createElement("span", {
    className: "kk-footer-tag"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kk-footer-bar"
  }), "KIM.KKUN")), /*#__PURE__*/React.createElement("nav", {
    className: "kk-footer-links"
  }, pillars.map(p => /*#__PURE__*/React.createElement("a", {
    key: p,
    href: "#work",
    className: "kk-footer-link"
  }, p)))), /*#__PURE__*/React.createElement("div", {
    className: "kk-footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 \uAE40\uAFBC. \uBB34\uB2E8 \uC804\uC7AC \uAE08\uC9C0."), /*#__PURE__*/React.createElement("span", null, "kimkkun.com"))));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Hero — strong single proposition. Cream type on forest. The brand's first impression. */
function Hero() {
  const {
    Button,
    SectionLabel
  } = window.KimKkunDesignSystem_b887a3;
  return /*#__PURE__*/React.createElement("section", {
    className: "kk-hero",
    id: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container"
  }, /*#__PURE__*/React.createElement("div", {
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "INSIGHT")), /*#__PURE__*/React.createElement("h1", {
    className: "kk-hero-title",
    "data-reveal": true
  }, "\uB2E8\uACE8\uC740 \uC6B4\uC774 \uC544\uB2C8\uB2E4.", /*#__PURE__*/React.createElement("br", null), "\uC124\uACC4\uB2E4."), /*#__PURE__*/React.createElement("p", {
    className: "kk-hero-lead",
    "data-reveal": true
  }, "10\uB144\uAC04 \uAC00\uAC8C\uB97C \uC9C1\uC811 \uC6B4\uC601\uD558\uBA70 \uBC30\uC6B4 \uAC83. \uC190\uB2D8\uC744 \uB2E8\uACE8\uB85C, \uB2E8\uACE8\uC744 \uD32C\uC73C\uB85C \uB9CC\uB4DC\uB294 \uAC74 \uCE5C\uC808\uC774 \uC544\uB2C8\uB77C \uC2DC\uC2A4\uD15C\uC774\uB2E4. \uAE40\uAFBC\uC740 \uADF8 \uC2DC\uC2A4\uD15C\uC744 \uC27D\uACE0 \uAD6C\uCCB4\uC801\uC73C\uB85C, \uADF8\uB9AC\uACE0 \uB0C9\uC815\uD558\uAC8C \uB2E4\uB8EC\uB2E4."), /*#__PURE__*/React.createElement("div", {
    className: "kk-hero-actions",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    href: "#work"
  }, "\uCF58\uD150\uCE20 \uBCF4\uAE30"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "lg",
    href: "#view"
  }, "\uAE40\uAFBC\uC758 \uAD00\uC810")), /*#__PURE__*/React.createElement("div", {
    className: "kk-hero-meta",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("span", null, "\uACE0\uAC1D \uB9CC\uB4E4\uAE30"), /*#__PURE__*/React.createElement("span", null, "\uB2E8\uACE8 \uB9CC\uB4E4\uAE30"), /*#__PURE__*/React.createElement("span", null, "\uBE0C\uB79C\uB4DC \uB9CC\uB4E4\uAE30"), /*#__PURE__*/React.createElement("span", null, "\uC2DC\uC2A4\uD15C \uB9CC\uB4E4\uAE30"), /*#__PURE__*/React.createElement("span", null, "\uC0AC\uC7A5 \uC774\uC57C\uAE30"))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Nav.jsx
try { (() => {
/* 김꾼 marketing site — top navigation. Slim, fixed, hairline divider on scroll. */
function Nav() {
  const {
    Button
  } = window.KimKkunDesignSystem_b887a3;
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [{
    label: "관점",
    href: "#view"
  }, {
    label: "콘텐츠",
    href: "#work"
  }, {
    label: "사례",
    href: "#proof"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "kk-nav" + (scrolled ? " is-scrolled" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-nav-inner kk-container"
  }, /*#__PURE__*/React.createElement("a", {
    className: "kk-nav-mark",
    href: "#top",
    "aria-label": "\uAE40\uAFBC \uD648"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kk-nav-word"
  }, "\uAE40\uAFBC"), /*#__PURE__*/React.createElement("span", {
    className: "kk-nav-tick"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "kk-nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    className: "kk-nav-link",
    href: l.href
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "kk-nav-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    href: "#start"
  }, "\uCE5C\uAD6C\uCD94\uAC00"))));
}
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Problem.jsx
try { (() => {
/* Problem — 자영업의 현실 진단. Light (cream) section, 3-up hairline grid. */
function Problem() {
  const {
    SectionLabel
  } = window.KimKkunDesignSystem_b887a3;
  const items = [{
    n: "01",
    t: "손님은 오는데, 남지 않는다.",
    b: "재방문율을 모르는 사장이 대부분이다. 모르면 관리도 없다."
  }, {
    n: "02",
    t: "할인 말고는 부를 방법이 없다.",
    b: "마진을 깎아 손님을 사는 구조. 오래 못 간다."
  }, {
    n: "03",
    t: "사장이 멈추면 가게도 멈춘다.",
    b: "시스템이 없으니 모든 게 사장의 체력에 달려 있다."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "kk-section light",
    id: "problem",
    "data-screen-label": "Problem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "01",
    surface: "light"
  }, "Problem"), /*#__PURE__*/React.createElement("h2", {
    className: "kk-sec-title"
  }, "\uB9E4\uCD9C\uC740 \uC624\uB974\uB294\uB370,", /*#__PURE__*/React.createElement("br", null), "\uB0A8\uB294 \uAC8C \uC5C6\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    className: "kk-problem-grid"
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    className: "kk-problem-item",
    key: it.n,
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "kk-problem-num"
  }, it.n), /*#__PURE__*/React.createElement("h3", {
    className: "kk-problem-title"
  }, it.t), /*#__PURE__*/React.createElement("p", {
    className: "kk-problem-body"
  }, it.b))))));
}
window.Problem = Problem;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Problem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Results.jsx
try { (() => {
/* Results — 증거. Dark section, three earned numbers. No decoration, no manufactured stats. */
function Results() {
  const {
    SectionLabel
  } = window.KimKkunDesignSystem_b887a3;
  const items = [{
    v: "10년",
    b: "직접 가게를 운영한 시간."
  }, {
    v: "3명 → 30명",
    b: "단골이 늘기까지, 14개월."
  }, {
    v: "0회",
    b: "그동안 한 할인 이벤트."
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "kk-section",
    id: "proof",
    "data-screen-label": "Results"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kk-sec-head",
    "data-reveal": true
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    number: "04"
  }, "Proof"), /*#__PURE__*/React.createElement("h2", {
    className: "kk-sec-title"
  }, "\uB9D0\uBCF4\uB2E4 \uBCC0\uD654.")), /*#__PURE__*/React.createElement("div", {
    className: "kk-proof-grid"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    className: "kk-proof-item",
    key: i,
    "data-reveal": true
  }, /*#__PURE__*/React.createElement("span", {
    className: "kk-proof-num"
  }, it.v), /*#__PURE__*/React.createElement("p", {
    className: "kk-proof-body"
  }, it.b))))));
}
window.Results = Results;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Results.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.Tag = __ds_scope.Tag;

})();
