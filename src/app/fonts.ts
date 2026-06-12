import localFont from 'next/font/local'
import { Noto_Serif_KR, Playfair_Display } from 'next/font/google'

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
