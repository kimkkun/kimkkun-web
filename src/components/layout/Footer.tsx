import Link from 'next/link'
import { BRAND } from '@/lib/constants'

/* 아래 — 작은 회색 글씨 목록(apple.com 방식). */
export default function Footer() {
  return (
    <footer className="rn rn-foot">
      <div className="in">
        <img className="flogo" src="/renewal/logo-kk.png" alt="김꾼" />
        <nav className="cols" aria-label="아래 메뉴">
          <Link href="/#made">만든 것</Link>
          <Link href="/content">1막 서고</Link>
          <Link href="/#about">소개</Link>
          <Link href="/#request">요청하기</Link>
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
