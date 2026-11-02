/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react'
import { TOPIC_NAME, type V7Art } from '@/lib/v7data'

/* 웹사이트글 규칙(content/writing/guidelines/writing.json '웹사이트글')의 자료 칸들.
   글 본문(Supabase articles.content)에 :::이름 ... ::: 로 쓴다. 칸 안은 "키: 값" 줄과 "- 목록" 줄. */

export function fields(content: string) {
  const f: Record<string, string> = {}
  content.split('\n').forEach((line) => {
    const m = line.match(/^([a-z]+):\s?(.*)$/)
    if (m) f[m[1]] = m[2].trim()
  })
  return f
}
export const items = (content: string) =>
  content
    .split('\n')
    .filter((l) => /^[-*] /.test(l))
    .map((l) => ({ key: l[0] === '*', parts: l.slice(2).split(' | ').map((s) => s.trim()) }))
/* 본문 아닌 줄(키·목록)을 뺀 글 */
const prose = (content: string) =>
  content
    .split('\n')
    .filter((l) => !/^[a-z]+:\s?/.test(l) && !/^[-*] /.test(l))
    .join('\n')
    .trim()

/* **굵게**, ==형광펜== 만 처리 */
export function inline(s: string): ReactNode[] {
  return s.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).map((p, i) =>
    p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p.startsWith('==') ? <mark key={i}>{p.slice(2, -2)}</mark> : p
  )
}
const pose = (p?: string) => `/v7/char/${p || 'news'}.png`

export function Takeaways({ content }: { content: string }) {
  return (
    <div className="take">
      <div className="k">이 글에서 받아 가는 것</div>
      <ol>
        {items(content).map(({ parts: [t, href] }, i) => (
          <li key={i}>
            {t}
            {href && <a href={href} data-jump>바로가기 ↓</a>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function Hero({ content }: { content: string }) {
  const f = fields(content)
  return (
    <>
      <div className={'heroimg' + (f.label ? ' aitag' : '')}>
        <img src={f.src} alt={f.alt || ''} />
        {f.label && <span className="lb">{f.label}</span>}
      </div>
      {f.credit && <div className="cred">{f.credit}</div>}
    </>
  )
}

export function Recap({ content }: { content: string }) {
  const f = fields(content)
  const n = Math.max(0, Math.min(100, parseInt(f.dots || '0', 10)))
  return (
    <div className="recap">
      <div className="k">{f.label || '영상 요약'}</div>
      <p>{inline(prose(content))}</p>
      {f.dots && (
        <div className="dots" role="img" aria-label={`100칸 중 ${n}칸`}>
          {Array.from({ length: 100 }, (_, i) => <i key={i} className={i < n ? '' : 'o'} />)}
        </div>
      )}
      {f.src && <div className="src">{f.src}</div>}
    </div>
  )
}

export function News({ content }: { content: string }) {
  const f = fields(content)
  return (
    <a className="news" href={f.url} target="_blank" rel="noopener noreferrer">
      <div className="pub">{f.pub}</div>
      {f.title && <div className="hd">{f.title}</div>}
      {f.big && (
        <div className="big">
          {f.big}
          {f.bigsub && <small>{f.bigsub}</small>}
        </div>
      )}
      {f.quote && <p className="hl">{inline(f.quote)}</p>}
      <span className="orig">원문 보기 →</span>
    </a>
  )
}

export const Chap = ({ content }: { content: string }) => <span className="chap">{content}</span>

export function MapBlock({ content }: { content: string }) {
  return (
    <ol className="map">
      {items(content).map(({ key, parts: [t, s] }, i) => (
        <li key={i} className={key ? 'key' : undefined}>
          <div>
            <b>{t}</b>
            {s && <span>{s}</span>}
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Step({ content }: { content: string }) {
  const [n, t, id] = content.split(' | ').map((s) => s.trim())
  return (
    <div className="step" id={id || undefined}>
      <b>{n}</b>
      {t}
    </div>
  )
}

export function Calc({ content }: { content: string }) {
  const f = fields(content)
  const row = (label: string, k: string, v: string, mode: 'numeric' | 'decimal' = 'numeric') => (
    <label>
      {label}
      <input type="number" inputMode={mode} data-c={k} defaultValue={v} />
    </label>
  )
  return (
    <div className="calc" id="ocalcBox">
      <h4>{f.title || '판매가 계산기'}</h4>
      <p className="sub">들어 있는 숫자는 예시예요. 우리 가게 숫자로 바꾸세요.</p>
      {row('재료비 (1개)', 'food', f.food || '4000')}
      {row('포장재 (1개, 용기·라벨)', 'pack', f.pack || '700')}
      {row('택배·보냉 (1상자)', 'ship', f.ship || '5500')}
      {row('1상자에 몇 개', 'per', f.per || '3')}
      {row('판매 수수료 (%)', 'fee', f.fee || '6', 'decimal')}
      {row('남기고 싶은 이익 (1개)', 'gain', f.gain || '2000')}
      <div className="out">
        <span>1개 판매가</span>
        <b id="calcOut">-</b>
      </div>
      <div className="brk" id="calcBrk" />
    </div>
  )
}

export function Fix({ content }: { content: string }) {
  return (
    <div className="fix">
      {items(content).map(({ parts: [t, s] }, i) => (
        <div key={i}>
          <b>{t}</b>
          {inline(s || '')}
        </div>
      ))}
    </div>
  )
}

export function Say({ content }: { content: string }) {
  const f = fields(content)
  return (
    <div className="say">
      <img className="kk" src={pose(f.pose)} alt="설명하는 김꾼" />
      <div className="bubble">{inline(prose(content))}</div>
    </div>
  )
}

export function Check({ content }: { content: string }) {
  const f = fields(content)
  return (
    <div className="check" id={f.id || undefined}>
      <img className="kk" src={pose(f.pose || 'count')} alt="손가락을 세며 설명하는 김꾼" />
      <h3>{f.title}</h3>
      <ul>
        {items(content).map(({ parts: [t] }, i) => <li key={i}>{inline(t)}</li>)}
      </ul>
    </div>
  )
}

export function Today({ content }: { content: string }) {
  const f = fields(content)
  return (
    <div className="today">
      <div className="k">오늘 해 볼 것 하나</div>
      <p>{inline(prose(content))}</p>
      <img className="kk" src={pose(f.pose || 'thumb')} alt="엄지를 든 김꾼" />
    </div>
  )
}

export function Sum({ content }: { content: string }) {
  return (
    <div className="sum">
      <h3>정리하면</h3>
      <ul>
        {items(content).map(({ parts: [t] }, i) => <li key={i}>{inline(t)}</li>)}
      </ul>
    </div>
  )
}

export function Reel({ content }: { content: string }) {
  const f = fields(content)
  const inner = (
    <>
      {f.img && <img src={f.img} alt="" />}
      <div>
        <b>이 글의 릴스 다시 보기</b>
        <span>{f.title}</span>
      </div>
    </>
  )
  return f.url ? (
    <a className="reelbox" href={f.url} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <div className="reelbox">{inner}</div>
  )
}

export function Cmp({ content }: { content: string }) {
  return (
    <div className="cmp">
      {items(content).map(({ parts: [src, alt, label, cap] }, i) => (
        <figure key={i}>
          <img src={src} alt={alt} loading="lazy" />
          {label && <span className={'lb' + (label.includes('AI') ? ' ai' : '')}>{label}</span>}
          {cap && <figcaption>{cap}</figcaption>}
        </figure>
      ))}
    </div>
  )
}

export const Note = ({ content }: { content: string }) => <p className="tbl-note">{inline(content)}</p>
export const Sources = ({ content }: { content: string }) => <div className="srcs">출처 · {content}</div>

export function Photo({ content }: { content: string }) {
  const f = fields(content)
  if (!f.src) return null
  return (
    <figure className={'fig' + (f.label ? ' aitag' : '')} style={f.max ? { maxWidth: f.max + 'px' } : undefined}>
      <img src={f.src} alt={f.alt || f.caption || ''} loading="lazy" />
      {f.label && <span className="lb">{f.label}</span>}
      {(f.caption || f.credit) && (
        <figcaption>
          {f.caption}
          {f.credit && <> · {f.credit}</>}
        </figcaption>
      )}
    </figure>
  )
}

/* 글 카드(무료 자료·다음 글 줄과 같은 모양) */
export function ArtCard({ a }: { a: V7Art }) {
  return (
    <a className={'acard' + (a.act === 2 ? ' new' : '')} href={`/content/${a.slug}`}>
      <div className="no">{a.no}</div>
      <h3>{a.t}</h3>
      <div className="badges">
        {a.topics.map((t) => <span key={t} className="badge">{TOPIC_NAME[t]}</span>)}
        {a.prompts > 0 && <span className="badge p">AI 질문 {a.prompts}개</span>}
      </div>
    </a>
  )
}
