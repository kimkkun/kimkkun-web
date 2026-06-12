'use client'

import { useEffect } from 'react'

/* 페이드/슬라이드 등장 효과 — design/ui_kits/website/App.jsx 이식.
   [data-reveal] 요소가 화면에 들어오면 .is-in을 붙인다. */
export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'))
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    const t = setTimeout(() => {
      if (!els.some((el) => el.classList.contains('is-in'))) {
        els.forEach((el) => el.classList.add('is-in'))
        io.disconnect()
      }
    }, 500)
    return () => {
      clearTimeout(t)
      io.disconnect()
    }
  }, [])
  return null
}
