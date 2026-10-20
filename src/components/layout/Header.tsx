'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

/* 상단 줄 — 44~48px, 반투명 흰색 + 흐림(apple.com 방식). 아래 파란 선이 스크롤한 만큼 찬다. */
export default function Header() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="rn rn-nav">
      <div className="in">
        <Link className="rn-logo" href="/" aria-label="김꾼 홈">
          <img src="/renewal/logo-kk.png" alt="김꾼" />
        </Link>
        <nav className="rn-menu" aria-label="메뉴">
          <Link href="/#made">만든 것</Link>
          <Link href="/content">1막 서고</Link>
          <Link href="/#about">소개</Link>
          <Link href="/#request">요청하기</Link>
        </nav>
      </div>
      <div className="rn-bar" ref={bar} />
    </header>
  )
}
