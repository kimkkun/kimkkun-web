'use client'

import { useEffect, useRef } from 'react'

/* 소리 없이 반복되는 짧은 영상. React가 muted 속성을 HTML에 안 넣어서 브라우저가 자동 재생을 막으므로,
   화면에 붙은 뒤 직접 음소거하고 재생한다. 움직임 줄이기 설정이면 첫 장면에 멈춰 둔다. */
export default function LoopVideo({ src, poster, label }: { src: string; poster?: string; label?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    v.play().catch(() => {})
  }, [])
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} />
}
