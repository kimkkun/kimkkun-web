# HANDOFF — kimkkun.com 이전 가이드 (Claude Code용)

이 폴더는 김꾼 디자인 시스템 전체입니다. 사람이 읽는 가이드는 `readme.md`,
에이전트(Claude Code) 진입점은 `SKILL.md`, 픽셀 스펙은 `ui_kits/website/`.

---

## 사장님이 할 일 (5단계)

1. **이 프로젝트를 zip으로 다운로드** 후 압축 해제.
2. 새 폴더 하나 만들고(예: `kimkkun-site/`), 그 안에 압축 푼 폴더를 `design/` 이름으로 넣는다.
3. 터미널에서 `kimkkun-site/` 폴더를 열고 Claude Code 실행:
   ```
   npm install -g @anthropic-ai/claude-code   # 최초 1회
   claude
   ```
4. 아래 "Claude Code에게 줄 프롬프트"를 통째로 붙여넣는다.
5. 완성되면 `npm run dev`로 확인 → Vercel에 배포 → Vercel 대시보드에서
   도메인 `www.kimkkun.com` 연결(DNS의 CNAME을 Vercel로).

---

## Claude Code에게 줄 프롬프트 (복사해서 붙여넣기)

```
design/SKILL.md 와 design/readme.md 를 먼저 읽어. design/ 폴더가 디자인 시스템 전체다.

이 디자인 시스템으로 김꾼(kimkkun.com) 사이트를 Next.js(App Router) + TypeScript로 만들어줘.

1. design/tokens/*.css 의 CSS 변수를 그대로 글로벌 CSS로 이식해. 색·타이포·간격은
   반드시 이 토큰만 사용한다.
2. 폰트는 CDN 말고 self-host: Pretendard Variable, Noto Serif KR, Playfair Display
   woff2를 받아 next/font/local 로 설정해. (세리프 = 헤드라인·에디토리얼 본문,
   Pretendard = UI·라벨·폼)
3. design/components/core/ 의 Button, Card, Input, SectionLabel, Tag 를
   React 컴포넌트로 이식해. 새 컴포넌트 스타일을 발명하지 마.
4. design/ui_kits/website/ 가 메인 페이지의 픽셀 스펙이다. 섹션 순서·카피·줄바꿈
   위치까지 그대로 구현해: Hero → Problem → View → Work → Proof → CTA → Footer.
5. 절대 규칙: Ochre(#C9A24B) 강조는 페이지당 1회(CTA), 순백(#FFFFFF) 금지(크림 사용),
   radius 4px 이하, 그림자 대신 1px 헤어라인, 모션은 페이드/슬라이드만, 이모지 금지.
6. 헤드라인 줄바꿈은 의미 단위에서 <br>로 고정한다. 자동 줄바꿈에 맡기지 마.
7. CTA의 카카오채널/오픈채팅 버튼은 실제 링크로 연결해줘. 링크: [여기에 카카오 링크 입력]
8. SEO: 페이지 title/description, OG 태그, 파비콘(assets/wordmark.svg 기반)까지.

콘텐츠 글 목록/상세 페이지는 아직 디자인 스펙이 없다. 만들지 말고, 필요하면 나에게 물어봐.
```

---

## 아직 디자인이 없는 것 (Claude Code가 추측하면 안 되는 부분)

- 콘텐츠(아티클) 목록 페이지 / 글 상세 페이지
- 글 데이터 저장 방식 (Supabase 쓸지, MDX 파일로 할지)
- 카카오채널·오픈채팅 실제 URL

이 세 가지는 결정되는 대로 디자인 시스템에 추가하거나 Claude Code에게 직접 알려줄 것.
