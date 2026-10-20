'use client'

import { useEffect, useState } from 'react'
import CopyBlock from '@/components/article/CopyBlock'
import ChecklistBlock from '@/components/article/ChecklistBlock'

/* 알바 공고 초안 만들기 화면. ① 재료 칸 채우기 → ② AI가 빠진 것 질문 → ③ 공고 두 개 + 확인 목록.
   적은 내용은 이 브라우저에만 임시 저장한다(서버에 저장 안 함). */

type Field = { k: string; label: string; ph: string; long?: boolean }
const GROUPS: { title: string; hint?: string; fields: Field[] }[] = [
  {
    title: '우리 가게',
    hint: '잘 쓰려고 하지 말고 말하듯이 적어 주세요. 다듬는 건 AI가 해요.',
    fields: [
      { k: 'store', label: '가게 이름·업종·위치', ph: '예) 망원동 작은 국숫집 ○○' },
      { k: 'customers', label: '주로 오는 손님', ph: '예) 동네 단골, 점심 직장인' },
      { k: 'why', label: '가게를 차린 이유', ph: '예) 엄마 국수 맛을 동네에 내고 싶어서', long: true },
      { k: 'rule', label: '같이 일하는 사람한테 꼭 지키는 것', ph: '예) 실수해도 손님 앞에서 안 혼낸다, 마감 시간 칼같이', long: true },
      { k: 'person', label: '같이 일하고 싶은 사람 (진짜 있었던 장면으로)', ph: '예) 바쁠 때 말 안 해도 컵부터 채워 두던 친구', long: true },
    ],
  },
  {
    title: '근무 조건',
    fields: [
      { k: 'hours', label: '요일·시간', ph: '예) 평일 11시~3시' },
      { k: 'wage', label: '시급', ph: '예) 11,000원' },
      { k: 'probation', label: '수습 기간 (없으면 비워 두기)', ph: '예) 2주, 그동안 시급 동일' },
      { k: 'start', label: '시작 가능한 날짜', ph: '예) 11월 첫 주부터' },
    ],
  },
  {
    title: '하는 일',
    fields: [
      { k: 'area', label: '홀 / 주방 / 카운터', ph: '예) 홀' },
      { k: 'tasks', label: '그 시간에 실제로 하는 일', ph: '예) 주문·서빙, 마감 테이블 정리', long: true },
      { k: 'busy', label: '제일 바쁜 시간', ph: '예) 12시~1시' },
    ],
  },
  {
    title: '있는 것만',
    hint: "주지 않는 혜택은 '없음'이라고 적어 주세요. 비워 두면 AI가 채우려 할 수 있어요.",
    fields: [
      { k: 'benefits', label: '실제로 주는 혜택', ph: "예) 근무 후 식사 한 끼 / 없음" },
      { k: 'apply', label: '지원 방법과 연락처', ph: '예) 문자 010-0000-0000' },
      { k: 'reply', label: '언제까지 연락 주는지', ph: '예) 3일 안에' },
    ],
  },
]

const CHECKS = [
  '내가 말하지 않은 혜택이 들어가 있지 않은가',
  '"분위기 좋은", "가족 같은" 같은 말이 진짜 우리 가게 모습인가',
  '시급·시간·요일이 내가 적은 숫자와 똑같은가',
  '나이·성별·외모를 조건으로 거는 말이 없는가',
  '지원 방법과 연락 주는 날짜가 들어가 있는가',
]

const SAVE = 'kk-tool-job-post'
type Result = { short: string; long: string; checks: string[] }

async function call(body: object) {
  const res = await fetch('/api/tools/job-post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || '잠시 문제가 생겼어요. 다시 시도해 주세요.')
  return data
}

export default function JobPostTool() {
  const [form, setForm] = useState<Record<string, string>>({})
  const [questions, setQuestions] = useState<string[] | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [busy, setBusy] = useState<'' | 'ask' | 'write'>('')
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVE)
      if (saved) setForm(JSON.parse(saved))
    } catch {}
  }, [])
  const set = (k: string, v: string) => {
    const next = { ...form, [k]: v }
    setForm(next)
    try { localStorage.setItem(SAVE, JSON.stringify(next)) } catch {}
  }
  const filled = Object.values(form).filter((v) => v.trim()).length

  const ask = async () => {
    setBusy('ask'); setError(''); setResult(null)
    try {
      const data = await call({ step: 'ask', form })
      setQuestions(data.questions)
      setAnswers(data.questions.map(() => ''))
    } catch (e) { setError((e as Error).message) }
    setBusy('')
  }
  const write = async () => {
    setBusy('write'); setError('')
    try {
      const qa = (questions || []).map((q, i) => ({ q, a: answers[i] || '' }))
      setResult(await call({ step: 'write', form, answers: qa }))
      setTimeout(() => document.getElementById('jp-result')?.scrollIntoView({ behavior: 'smooth' }), 50)
    } catch (e) { setError((e as Error).message) }
    setBusy('')
  }

  return (
    <div className="rn-jp">
      <ol className="rn-jp-steps">
        <li className="on">재료 채우기</li>
        <li className={questions ? 'on' : ''}>빠진 것 답하기</li>
        <li className={result ? 'on' : ''}>공고 받기</li>
      </ol>

      {GROUPS.map((g) => (
        <fieldset key={g.title} className="rn-jp-group">
          <legend>{g.title}</legend>
          {g.hint && <p className="hint">{g.hint}</p>}
          {g.fields.map((f) => (
            <label key={f.k}>
              <span>{f.label}</span>
              {f.long ? (
                <textarea rows={2} maxLength={600} placeholder={f.ph} value={form[f.k] || ''} onChange={(e) => set(f.k, e.target.value)} />
              ) : (
                <input maxLength={600} placeholder={f.ph} value={form[f.k] || ''} onChange={(e) => set(f.k, e.target.value)} />
              )}
            </label>
          ))}
        </fieldset>
      ))}

      {!questions && (
        <div className="rn-jp-act">
          <button className="btn" type="button" disabled={filled < 3 || !!busy} onClick={ask}>
            {busy === 'ask' ? 'AI가 읽는 중…' : '다 채웠어요 · AI한테 빠진 것 물어보기'}
          </button>
          {filled < 3 && <p className="hint">칸을 세 개 이상 채우면 눌러져요.</p>}
        </div>
      )}

      {questions && (
        <fieldset className="rn-jp-group ask">
          <legend>AI가 물어봐요</legend>
          {questions.length === 0 ? (
            <p className="hint">빠진 게 없대요. 바로 공고를 받아 보세요.</p>
          ) : (
            <p className="hint">지원자가 궁금해할 것들이에요. 아는 것만 답하고, 모르면 비워 두세요.</p>
          )}
          {questions.map((q, i) => (
            <label key={i}>
              <span>{q}</span>
              <input maxLength={600} value={answers[i] || ''} onChange={(e) => setAnswers(answers.map((a, j) => (j === i ? e.target.value : a)))} />
            </label>
          ))}
          <div className="rn-jp-act">
            <button className="btn" type="button" disabled={!!busy} onClick={write}>
              {busy === 'write' ? '공고 쓰는 중…' : result ? '다시 쓰기' : '공고 받기'}
            </button>
            <button className="btn ghost" type="button" disabled={!!busy} onClick={ask}>질문 다시 받기</button>
          </div>
        </fieldset>
      )}

      {error && <p className="rn-jp-err" role="alert">{error}</p>}

      {result && (
        <div id="jp-result" className="rn-jp-result">
          <CopyBlock content={`title: 알바 앱용 · 짧은 버전\n---\n${result.short}`} />
          <CopyBlock content={`title: 가게 SNS용 · 긴 버전\n---\n${result.long}`} />
          <h3>올리기 전에 확인하세요</h3>
          <ChecklistBlock content={[...result.checks, ...CHECKS].map((c) => `- [ ] ${c}`).join('\n')} />
          <p className="hint">AI가 쓴 초안이에요. 사장님이 한 번 읽고 고친 다음 올려 주세요. 공고에 쓴 말은 약속이 돼요.</p>
        </div>
      )}
    </div>
  )
}
