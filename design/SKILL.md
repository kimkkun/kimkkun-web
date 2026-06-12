---
name: kimkkun-design
description: Use this skill to generate well-branded interfaces and assets for 김꾼 (Kim.kkun), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key facts (full detail in readme.md):
- Brand: 김꾼 — 자영업/소상공인 대상. 신뢰 → 절제 → 세련. 냉정하고 시니컬한 톤, 이모지·감탄사 금지.
- Colors: forest `#16302B` / deep `#0F211D` / surface `#1E3A33`, cream `#F5F1E8`/`#FBF8F1`, ink `#14201C`, sage `#8FA89B`, accent ochre `#C9A24B` (≤5%, ONE moment per surface). Pure white banned. No gradients.
- Type: headlines & editorial prose = serif (`--font-display`: Playfair Display + Noto Serif KR); UI/labels/forms = Pretendard (`--font-sans`). Headline line breaks are deliberate — break at phrase boundaries with `<br>`.
- Shape/motion: radius ≤4px, 1px hairlines instead of shadows, 120px+ section padding, fade/slide only.
- Tokens: link root `styles.css` (imports `tokens/*.css`). Components: `components/core/`. Site reference: `ui_kits/website/`.
