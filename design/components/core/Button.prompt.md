Button — the brand's action element; restrained, sharp-cornered, no shadow. Reach for `accent` only for the single CTA on a surface.

```jsx
<Button variant="accent" size="lg">친구추가 →</Button>
<Button variant="secondary">더 읽기</Button>
<Button variant="primary" surface="light">시작하기</Button>
```

Variants: `primary` (cream/ink solid), `secondary` (hairline outline), `accent` (Ochre-bordered CTA — one per surface), `ghost` (text-only, hovers to Ochre).
Props: `size` sm/md/lg · `surface` dark/light (flips colors) · `href` (renders `<a>`) · `disabled`.
Rule: never put two `accent` buttons on the same surface — it breaks the restraint that defines the brand.
