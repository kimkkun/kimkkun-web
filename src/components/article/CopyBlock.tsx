'use client'

import { useState } from 'react'

/* 복사해서 쓰는 자료(질문 문구·양식). 글 화면은 복사가 막혀 있어서 이 칸만 단추로 복사한다.
   :::copy
   title: 칸 이름
   ---
   복사될 본문(줄바꿈 그대로)
   ::: */
export default function CopyBlock({ content }: { content: string }) {
  const cut = content.indexOf('\n---\n')
  const head = cut >= 0 ? content.slice(0, cut) : ''
  const body = (cut >= 0 ? content.slice(cut + 5) : content).trim()
  const title = head.match(/^title:\s*(.+)$/m)?.[1] ?? ''
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(body)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = body
      ta.setAttribute('data-allow-copy', '')
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
    setDone(true)
    setTimeout(() => setDone(false), 1800)
  }

  return (
    <div className="rn-copy">
      <div className="rn-copy-top">
        <b>{title}</b>
        <button type="button" onClick={copy}>{done ? '복사됐어요 ✓' : '복사하기'}</button>
      </div>
      <pre>{body}</pre>
    </div>
  )
}
