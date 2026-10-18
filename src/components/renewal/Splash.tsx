'use client'

import { useEffect, useState } from 'react'

/* 시작 화면 "김꾼 × The Crew" — 세션당 한 번, 1.6초 안에 사라지고, 누르면 바로 넘어간다.
   글 화면(DM 링크로 바로 들어온 사람)에는 쓰지 않는다. */
const KEY = 'kk-splash-seen'

export default function Splash() {
  // 처음 그림부터 덮어 둬야 본문이 먼저 번쩍 보이지 않는다. 자바스크립트가 늦어도 CSS가 2초 뒤 걷어낸다.
  const [phase, setPhase] = useState<'off' | 'on' | 'out'>('on')

  useEffect(() => {
    let seen = false
    try { seen = sessionStorage.getItem(KEY) === '1' } catch {}
    if (seen || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const r = requestAnimationFrame(() => setPhase('off'))
      return () => cancelAnimationFrame(r)
    }
    try { sessionStorage.setItem(KEY, '1') } catch {}
    // 시작 화면이 걷힌 뒤에 첫 화면 등장 움직임이 보이도록 늦춘다(renewal.css)
    document.documentElement.dataset.splash = '1'
    const a = setTimeout(() => setPhase('out'), 1600)
    const b = setTimeout(() => setPhase('off'), 2200)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [])

  if (phase === 'off') return null
  return (
    <div className={'splash' + (phase === 'out' ? ' out' : '')} onClick={() => setPhase('out')} role="presentation">
      <div className="sp-row">
        <img className="sp-kk" src="/renewal/logo-kk.png" alt="김꾼" />
        <span className="sp-x">×</span>
        <img className="sp-crew" src="/renewal/crew-logo.png" alt="The Crew" />
      </div>
    </div>
  )
}
