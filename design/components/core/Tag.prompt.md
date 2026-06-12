Tag — a small hairline-bordered chip for content pillars (고객 만들기, 단골 만들기 …) and metadata. No fill except the rare `accent`.

```jsx
<Tag>고객 만들기</Tag>
<Tag variant="muted">읽는 데 4분</Tag>
<Tag variant="accent">NEW</Tag>
```

Props: `variant` default/muted/accent · `surface` dark/light. Keep at most one `accent` tag visible to honor the restraint rule.
