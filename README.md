# website — kimkkun.com (Next.js 구버전)

김꾼(@kim.kkun) 웹사이트의 자체 개발 버전. Next.js + Supabase로 만든 매거진형 사이트.

> ⚠️ **현재 상태: 유지보수 모드.**
> 2026-07-18 리서치 결론에 따라 사이트는 **아임웹으로 이주 중**이다 (`~/Projects/website-imweb`).
> 이 저장소는 이주 완료·검증 전까지 **kimkkun.com을 서비스하는 현역**이고, 전환 후에는 소스 보존용이 된다.
> 새 기능은 여기 붙이지 말고 아임웹 쪽에서 진행할 것.

## 뭘 하는 사이트인가

자영업 사장이 인스타 프로필 링크로 들어와서 김꾼의 관점에 설득되고, 매거진 글을 읽게 만드는 곳.

| 경로 | 내용 |
|---|---|
| `/` | 히어로("단골은 운이 아니다. 설계다") + 문제 제기 + 관점 + 카테고리 + CTA |
| `/content` | 매거진 글 목록 (5카테고리: 고객·단골·브랜드·시스템·사장 이야기) |
| `/content/[slug]` | 글 상세 — 블록 렌더러로 조립 |
| `/about` | 소개 |
| `/demo/kkun-components` | 디자인 시스템 컴포넌트 데모 |

**블록 렌더러**가 이 사이트의 특징이다. 글 본문을 통짜 HTML이 아니라 블록 타입별 컴포넌트로 조립한다 — 체크리스트, 비교(Before/After), 예시, 단계, 지표 카드, 인포그래픽, 프롬프트 카드 (`src/components/article/`).

## 스택

Next.js 16 App Router + TypeScript / Tailwind CSS v4 + 자체 CSS 토큰(`src/styles/kkun-*.css`) / Supabase (콘텐츠) / Pretendard 가변폰트 / Vercel 배포 + Analytics

## 로컬 실행

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

`.env.local`에 Supabase 키가 필요하다 (git 추적 제외).

## 폴더

```
src/
├── app/           App Router 페이지
├── components/
│   ├── home/      홈 섹션
│   ├── article/   글 본문 블록 렌더러 ★
│   ├── layout/    헤더·푸터
│   └── ui/        기본 UI
├── styles/        kkun-core.css(토큰) / kkun-components.css
├── lib/           parseBlocks(블록 파서) · supabase · types
└── fonts/
design/            김꾼 디자인 시스템 원본 (토큰·컴포넌트 스펙·핸드오프 가이드)
```

`design/`은 사이트 코드가 아니라 **디자인 시스템 소스**다. 색·타이포·간격을 바꿔야 하면 여기 토큰부터 보고, 아임웹 이주 때도 이 스펙을 기준으로 삼는다.

## 문서 지도

| 파일 | 용도 |
|---|---|
| `PRD.md` | 목표·요구사항·완성 기준. 작업이 여기서 어긋나면 보고 |
| `AGENTS.md` | AI 작업 지침 (`CLAUDE.md`가 이걸 참조) |
| `design/HANDOFF.md` | 디자인 시스템 이전 가이드 |
| `design/SKILL.md` | 에이전트용 디자인 시스템 진입점 |

## 관련

- 이주 작업: `~/Projects/website-imweb`
- 이주 의사결정 배경: `~/Projects/research/projects/2026-07-18_refeeel-vs-kimkkun/final.md`
