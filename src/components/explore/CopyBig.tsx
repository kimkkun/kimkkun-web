'use client'

import { useState } from 'react'

/* 크게 누르는 복사 단추. 글 화면의 복사 막기(CopyProtect)와 상관없이 단추로만 복사한다. */
export default function CopyBig({ text, label = '복사하기', small }: { text: string; label?: string; small?: boolean }) {
  const [state, setState] = useState<'' | 'done' | 'fail'>('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('done')
    } catch {
      setState('fail')
    }
    setTimeout(() => setState(''), 2200)
  }
  return (
    <button type="button" className={(small ? 'ex-copy-sm' : 'ex-big') + (state === 'done' ? ' done' : '')} onClick={copy}>
      {state === 'done' ? '복사됐어요 ✓' : state === 'fail' ? '복사가 안 돼요 · 아래 "내용 보기"에서 길게 눌러 복사' : label}
    </button>
  )
}
