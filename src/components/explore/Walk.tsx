'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/* 한 화면에 한 단계씩 넘기며 따라 하기. */
export default function Walk({ steps, doneHref }: { steps: [string, string?][]; doneHref: string }) {
  const [i, setI] = useState(0)
  const router = useRouter()
  const last = i === steps.length - 1
  return (
    <div>
      <div className="ex-walk" aria-live="polite">
        <span className="count">{i + 1} / {steps.length}</span>
        <p>{steps[i][0]}</p>
        {steps[i][1] && <small>{steps[i][1]}</small>}
      </div>
      <div className="ex-dots" aria-hidden="true">
        {steps.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}
      </div>
      <div className="ex-walkbtns">
        <button type="button" className="prev" disabled={i === 0} onClick={() => setI(i - 1)}>이전</button>
        <button type="button" className="nxt" onClick={() => (last ? router.push(doneHref) : setI(i + 1))}>{last ? '끝! 설계도로' : '다음'}</button>
      </div>
    </div>
  )
}
