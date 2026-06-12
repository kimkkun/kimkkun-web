# 김꾼 (Kim.kkun) — Design System

> 실제로 자영업을 하면서 브랜딩·마케팅을 실전에서 배운 사람이, 그 인사이트를
> **쉽고 구체적이지만 냉정하고 시니컬하게** 풀어내는 브랜드.

A near-monotone, type-driven system for a Korean small-business / 자영업 brand.
The whole personality lives in three impressions, in priority order:

1. **신뢰 (Trust)** — flat planes, no gimmicks, one family of type.
2. **절제 (Restraint)** — one accent, used once. Generous whitespace. Never light or cute.
3. **세련 (Refinement)** — sharp corners, thin lines, deliberate rhythm. Never tacky.

**Audience:** Korean self-employed owners / 소상공인 사장.
**Content pillars:** 고객 만들기 · 단골 만들기 · 브랜드 만들기 · 시스템 만들기 · 사장 이야기.

## Sources
There was no attached codebase or Figma. This system was authored directly from the
written brand brief (`김꾼 — 디자인 시스템`, 2026). The brief is the source of truth;
where it was silent (logo lockup, component states, motion specifics) the system
extends the stated principles rather than inventing new ones.

---

## CONTENT FUNDAMENTALS — how 김꾼 writes

The voice is the product. It is the inverse of typical "사장님 화이팅!" marketing copy.

- **Tone:** 단정적이고 짧다. "할 말만 한다." Cold, a little cynical, never warm-fuzzy,
  never a cheerleader. It diagnoses; it does not encourage.
- **Person:** Speaks *to* the owner ("당신", "사장님") and *from* lived experience
  ("나도 그 자리에 있었다"). It earns authority by having done it, not by theory.
- **Length:** One screen = one message. Short declaratives. Periods, not exclamation points.
- **Casing / Latin:** Section labels are short uppercase Latin words with wide tracking
  (`INSIGHT`, `PROBLEM`, `VIEW`, `WORK`, `PROOF`, `START`) paired with a number (`02 — PROBLEM`).
  Body and headlines are Korean.
- **Emoji:** None. Ever. No 😄, no 🔥, no 👏. The restraint *is* the brand.
- **Exclamation / hype:** Avoid. No "대박", no "무조건", no "초간단". If it sounds like
  a blog thumbnail, rewrite it.
- **Numbers:** Concrete and earned. "단골 3명이 30명이 되기까지 14개월" beats "매출 폭발".
  Don't manufacture stats for decoration.

**Examples (in-voice):**
- Headline: "손님은 많은데, 다시 오는 사람이 없다."
- Belief: "할인은 전략이 아니다. 변명이다."
- CTA: "친구추가하고, 다음 손님부터 다르게 맞이하세요."

**Off-voice (avoid):**
- "🔥 매출 폭발하는 꿀팁 대공개!!" — hype, emoji, exclamation.
- "여러분 모두 화이팅입니다 :)" — cheerleading, soft.

---

## VISUAL FOUNDATIONS

**Color.** Near-monotone forest + cream, with a single accent (Ochre). See `tokens/colors.css`.
- Base dark: `--forest #16302B`; deeper planes `--forest-deep #0F211D`; cards on dark
  `--forest-surface #1E3A33`.
- Text on dark: `--cream #F5F1E8`. Light alternate sections use `--cream-surface #FBF8F1`
  with `--ink #14201C` text.
- `--sage #8FA89B` for labels, captions, disabled.
- **Accent — Ochre `#C9A24B`:** first-priority emphasis, **≤5% of any surface**. One link,
  one keyword, one CTA border. Two accent moments on a screen = restraint broken.
- **Pure white (#FFFFFF) is banned** — it reads cheap on forest. Always cream.
- No gradient fills. Solid planes build trust. (A barely-there 1px seam shadow is the
  only "shadow" in the system.)

**Type.** Two faces, split by role — this is what reads *premium* (luxury-house logic):
- **Headlines / display & editorial body — an elegant high-contrast serif:** **Playfair Display**
  (Latin) + **Noto Serif KR** (Korean), via `--font-display`. This is the Hermès-style refined
  serif that carries the brand's voice — big declaratives (Display/H1/H2) and long-form
  editorial prose (사장 이야기 articles) alike.
- **UI chrome / labels / captions / forms — Pretendard** (variable, `--font-sans`): clean,
  trustworthy, neutral. H3, buttons, inputs, uppercase Latin labels and metadata stay here.
Strong weight + style contrast (serif ↔ sans) replaces the old single-family monotony.
Mid-sizes stay sparse. Labels are Medium with `0.14em` tracking, uppercase Latin. Full scale
in `tokens/typography.css`.

**Spacing & layout.** Whitespace is generous to the point of feeling almost too much.
Desktop section vertical padding is `120px+` (`--section-pad-y`). Container max `1160px`.
Sections alternate dark ↔ cream to create rhythm (same logic as a carousel system).
Fixed layout elements are avoided beyond a slim top nav.

**Shape.** Corner radius `0–4px` (`--radius-2` max). Nothing rounded-and-cute.
Cards are flat planes separated by **1px hairlines** (Sage on dark, Sage/Ink-tint on light),
not by shadow. No elevation stacking, no glow.

**Borders.** 1px is the system's primary divider. Sage hairlines for structure; an Ochre
hairline (`--ochre-line`) reserved for the single accent moment (e.g. CTA outline).

**Shadows.** Effectively none. `--shadow-soft` is a 1px dark seam, used rarely. No drop
shadows, no inner shadows, no protection gradients.

**Backgrounds.** Solid color only. No photographic hero washes, no repeating textures,
no gradients, no blur/glass. Imagery, if ever used, is incidental — the system runs on
type and line.

**Motion.** Fade and slide only. Durations `140–420ms`, eased out (`--ease-out`). No bounce,
no spring, no looping decorative animation. Entrances reveal from low-opacity / small offset.

**Hover / press.** Restrained. Hover = subtle ground shift (cream fill on dark ghost,
hairline → accent) or `opacity` drop on links, never a color carnival. Press = brief
opacity dip, no scale-bounce. Focus = 1px accent ring.

**Transparency / blur.** Used almost never. Opacity exists only for muted text tiers
(`--cream-dim`, `--ink-dim`) and hairlines. No frosted glass.

**Corner radii, cards, summary:** flat, sharp (≤4px), hairline-bordered, no shadow.

---

## ICONOGRAPHY

The brand brief is explicit: **스톡 일러스트·이모지 금지** — text and line are enough.
So this system is deliberately icon-light.

- **No emoji, ever.** Not in UI, not in content.
- **No stock illustration**, no decorative spot icons, no 3D/gradient icon sets.
- Where a glyph genuinely aids scanning (e.g. a CTA chevron, an external-link mark),
  use a **thin line icon** drawn at 1.5px stroke to match the hairline language —
  **Lucide** (https://lucide.dev, ISC) is the chosen reference set for its even, minimal
  1.5px stroke. Load from CDN when needed; do not introduce filled or duotone icon styles.
- Numbering (`01`, `02`, …) and uppercase Latin labels do the wayfinding that icons would
  do elsewhere. Prefer a number + word over an icon.
- Unicode is acceptable for true typographic marks only: `→` (arrow), `·` (middot),
  `—` (em dash). Not as pictograms.

Logo / brand marks live in `assets/` (the `김꾼` wordmark lockup).

---

## INDEX — what's in this system

**Foundations / tokens**
- `styles.css` — global entry (consumers link this one file; `@import` list only).
- `tokens/colors.css` — palette + semantic aliases.
- `tokens/typography.css` — family, weights, scale, labels.
- `tokens/spacing.css` — spacing, radius, border, shadow, motion.
- `tokens/fonts.css` — Pretendard `@font-face` (CDN — see Caveats).
- `tokens/base.css` — reset + `.kk-*` type utility classes.

**Specimen cards** (Design System tab) — under `guidelines/`, grouped Colors / Type / Spacing / Brand.

**Components** (`components/core/`) — Button, SectionLabel, Tag, Card, Input.
Reusable React primitives; props in each `*.d.ts`, usage in each `*.prompt.md`.

**UI kit** (`ui_kits/website/`) — the 김꾼 marketing site: Hero → Problem → Belief →
Categories → Results → CTA → Footer, as an interactive click-through.

**Brand assets** (`assets/`) — wordmark lockup SVGs.

**SKILL.md** — Agent-Skills-compatible entry for downloading/using this system in Claude Code.

---

## CAVEATS
- **Fonts:** Pretendard (body) is loaded from the official jsDelivr CDN; the display serifs
  (Playfair Display + Noto Serif KR) are loaded via Google Fonts `@import` in `tokens/fonts.css`,
  so the compiler's font manifest lists only the self-declared Pretendard `@font-face`. To ship
  fully offline, download all three into `assets/fonts/` and repoint `tokens/fonts.css`.
- **Logo:** no logo file was provided; the wordmark lockup is set in Pretendard as brand
  typography. Replace with an official mark if one exists.
- **Icons:** Lucide is a documented substitute for the (intentionally tiny) icon need —
  the brief specifies no proprietary icon set.
