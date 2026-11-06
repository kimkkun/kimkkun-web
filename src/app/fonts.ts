import localFont from 'next/font/local'
import { Nanum_Brush_Script, Noto_Serif_KR, Playfair_Display } from 'next/font/google'

// 본문·UI: Pretendard Variable — 로컬 woff2 self-host
export const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  weight: '45 920',
  display: 'swap',
  variable: '--font-pretendard',
})

// 헤드라인·에디토리얼 세리프 — next/font가 빌드 시 받아 자체 도메인에서 서빙 (런타임 CDN 요청 없음)
export const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-serif-kr',
  preload: false,
})

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

// 콘텐츠 펼침 메뉴의 칸 이름(붓글씨) — 2026-11-06 개편. 김꾼 손글씨 로고와 결을 맞춘 붓 글꼴(수환 손글씨 아님)
export const brush = Nanum_Brush_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brush',
  preload: false,
})
