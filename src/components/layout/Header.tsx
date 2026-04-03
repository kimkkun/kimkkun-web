'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BRAND } from '@/lib/constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-wider">
          {BRAND.siteTitle}
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">
            Content
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span className={`w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-5 h-0.5 bg-foreground transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-foreground transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <nav className="md:hidden bg-background border-b border-border px-6 py-6 flex flex-col gap-4 text-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-muted hover:text-foreground transition-colors">
            Content
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors"
          >
            Instagram
          </a>
        </nav>
      )}
    </header>
  )
}
