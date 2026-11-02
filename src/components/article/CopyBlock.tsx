'use client'

import { useState } from 'react'

/* 복사해서 쓰는 자료(질문 문구·양식). 글 화면은 복사가 막혀 있어서 이 칸만 단추로 복사한다.
   :::copy
   title: 칸 이름
   when: 언제 쓰는지(선택)
   id: 바로가기용 이름(선택)
   ---
   복사될 본문(줄바꿈 그대로)
   ::: */
export default function CopyBlock({ content }: { content: string }) {
  const cut = content.indexOf('\n---\n')
  const head = cut >= 0 ? content.slice(0, cut) : ''
  const body = (cut >= 0 ? content.slice(cut + 5) : content).trim()
  const title = head.match(/^title:\s*(.+)$/m)?.[1] ?? ''
  const when = head.match(/^when:\s*(.+)$/m)?.[1] ?? ''
  const id = head.match(/^id:\s*(.+)$/m)?.[1]?.trim()
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
    <div className="pbox" id={id}>
      <div className="ph">
        <span>
          {title}
          {when && <span className="when">언제: {when}</span>}
        </span>
        <button type="button" className={'copy' + (done ? ' done' : '')} onClick={copy}>{done ? '복사됨 ✓' : '복사'}</button>
      </div>
      <pre>{body}</pre>
    </div>
  )
}
