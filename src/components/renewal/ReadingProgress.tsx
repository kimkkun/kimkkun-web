'use client'

import { useEffect, useRef } from 'react'

/* 글 화면 맨 위 얇은 파란 막대 — 얼마나 읽었는지만 알려준다. 글 화면의 유일한 움직임. */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="rn-progress" ref={bar} aria-hidden="true" />
}
