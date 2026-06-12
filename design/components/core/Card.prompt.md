Card — a flat plane divided by a 1px hairline (the system has effectively no shadow). Use for content-pillar grids and result tiles.

```jsx
<Card number="01" title="고객 만들기" body="처음 온 손님이 또 오게 만드는 법." />
<Card href="/proof" title="단골 3명 → 30명" body="14개월의 기록." />
<Card surface="light" flat title="시스템 만들기" body="사람이 아니라 구조로 굴러가게." />
```

Props: `number` (Ochre) · `label` (uppercase) · `title` · `body` · `children` · `href` (link + hover border shift) · `surface` dark/light · `flat` (transparent bg).
