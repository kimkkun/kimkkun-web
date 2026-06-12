# UI Kit — kimkkun.com (marketing site)

The 김꾼 marketing/about site as an interactive click-through recreation.
Section flow (from the brand brief): **Hero → Problem → View(관점) → Work(콘텐츠) →
Proof(증거) → CTA → Footer**, alternating forest ↔ cream planes.

- `index.html` — entry; composes everything, carries all layout CSS.
- `Nav.jsx` `Hero.jsx` `Problem.jsx` `Belief.jsx` `Categories.jsx` `Results.jsx` `CTA.jsx` `Footer.jsx`
  — one file per section, each exported to `window`.
- Components (`Button`, `Card`, `SectionLabel`) come from the compiled DS bundle
  (`window.KimKkunDesignSystem_b887a3`) — do not re-implement them.

Rules embodied here (copy these into any production build):
- One Ochre accent moment per page — it lives in the CTA (accent button). Nowhere else.
- Section labels: Ochre number + wide-tracked uppercase Latin (`01 — PROBLEM`).
- Headlines/serif (`--font-display`), UI/labels in Pretendard (`--font-sans`).
- Line breaks in headlines are deliberate (`<br>` at phrase boundaries), never accidental wraps.
- Motion: fade/slide reveal only (IntersectionObserver + `[data-reveal]`), reduced-motion safe.
