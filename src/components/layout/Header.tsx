'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'

/* 상단 내비게이션 — 슬림, 고정, 스크롤 시 헤어라인 구분선. design/ui_kits/website/Nav.jsx 이식. */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: '관점', href: '/#view' },
    { label: '콘텐츠', href: '/#work' },
  ]

  return (
    <header className={'kk-nav' + (scrolled ? ' is-scrolled' : '')}>
      <div className="kk-nav-inner kk-container">
        <Link className="kk-nav-mark" href="/" aria-label="김꾼 홈">
          <span className="kk-nav-word">김꾼</span>
          <span className="kk-nav-tick" />
        </Link>
        <nav className="kk-nav-links">
          {links.map((l) => (
            <a key={l.href} className="kk-nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="kk-nav-cta">
          <Button variant="secondary" size="sm" href="/#start">
            친구추가
          </Button>
        </div>
      </div>
    </header>
  )
}
