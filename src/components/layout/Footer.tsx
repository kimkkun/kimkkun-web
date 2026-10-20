import Link from 'next/link'
import { BRAND } from '@/lib/constants'

/* 아래 — 작은 회색 글씨 목록(apple.com 방식). */
export default function Footer() {
  return (
    <footer className="rn rn-foot">
      <div className="in">
        <img className="flogo" src="/renewal/logo-kk.png" alt="김꾼" />
        <nav className="cols" aria-label="아래 메뉴">
          <Link href="/tools">AI 도구 설계도</Link>
          <Link href="/content">글 읽기</Link>
          <Link href="/about">김꾼은 누구</Link>
          <Link href="/request">요청하기</Link>
        </nav>
        <div>
          © 2026 김꾼. 무단 전재 금지. ·{' '}
          <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
            {BRAND.instagram}
          </a>
        </div>
      </div>
    </footer>
  )
}
