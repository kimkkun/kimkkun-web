import Link from 'next/link'
import { BRAND } from '@/lib/constants'

/* Footer — forest-deep. 워드마크, 콘텐츠 기둥 링크, 카피라이트. 헤어라인 구분. */
export default function Footer() {
  const pillars = ['고객 만들기', '단골 만들기', '브랜드 만들기', '시스템 만들기', '사장 이야기']

  return (
    <footer className="kk-footer">
      <div className="kk-container">
        <div className="kk-footer-top">
          <div className="kk-footer-mark">
            <span className="kk-footer-word">김꾼</span>
            <span className="kk-footer-tag">
              <span className="kk-footer-bar"></span>KIM.KKUN
            </span>
          </div>
          <nav className="kk-footer-links">
            {pillars.map((p) => (
              <Link key={p} href="/content" className="kk-footer-link">
                {p}
              </Link>
            ))}
            <Link href="/about" className="kk-footer-link">
              소개
            </Link>
          </nav>
        </div>
        <div className="kk-footer-bottom">
          <span>© 2026 김꾼. 무단 전재 금지.</span>
          <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
            {BRAND.instagram}
          </a>
        </div>
      </div>
    </footer>
  )
}
