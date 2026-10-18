'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BRAND } from '@/lib/constants'
import type { Category } from '@/lib/types'
import type { ArticleSummary } from '@/lib/articles'

/* 김꾼 2막 첫 화면. 시안: https://claude.ai/artifact/VJhZdtQ9yBJ7ftPCEqdqUo
   움직임은 등장·스크롤·넘김에만 쓰고, 글 화면에서는 쓰지 않는다. */

// 더크루 랜딩에 공개된 실제 앱 화면
const SCREENS = [
  ['home', '홈'],
  ['check', '체크리스트'],
  ['schedule', '스케줄'],
  ['feed', '소식'],
] as const

const pad = (n: number) => String(n).padStart(2, '0')
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

type Props = { categories: Category[]; articles: ArticleSummary[] }

function Words({ text, start }: { text: string; start: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <span key={i} className="w" aria-hidden="true" style={{ ['--i' as string]: start + i }}>
          {w}{' '}
        </span>
      ))}
    </>
  )
}

function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(to)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const t0 = performance.now() + 700
    const tick = (t: number) => {
      const p = clamp((t - t0) / 1200)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to])
  return <b>{n}</b>
}

const LOCK = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
)

export default function HomeView({ categories, articles }: Props) {
  const [ready, setReady] = useState(false)
  const [shot, setShot] = useState(0)
  const [slide, setSlide] = useState(0)
  const shotHold = useRef(0)
  const railRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const roadRef = useRef<HTMLOListElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const latest = articles.slice(0, 6)
  const byCat = (id: string) => articles.filter((a) => a.category_id === id)

  // 첫 화면 등장
  useEffect(() => {
    rootRef.current?.classList.add('js-motion')
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  // 더크루 화면 자동 넘김
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => {
      if (Date.now() > shotHold.current && !document.hidden) setShot((s) => (s + 1) % SCREENS.length)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  // 1막 글 넘김: 가운데 카드 표시 + 자동 넘김
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const slides = () => [...rail.children] as HTMLElement[]
    const mark = () => {
      const mid = rail.scrollLeft + rail.clientWidth / 2
      let best = 0
      let bd = Infinity
      slides().forEach((s, i) => {
        const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid)
        if (d < bd) { bd = d; best = i }
      })
      setSlide(best)
    }
    let paused = 0
    const hold = () => { paused = Date.now() + 8000 }
    let seen = false
    const io = new IntersectionObserver((es) => { seen = es[0].isIntersecting })
    io.observe(rail)
    const onScroll = () => requestAnimationFrame(mark)
    rail.addEventListener('scroll', onScroll, { passive: true })
    ;['pointerdown', 'touchstart', 'wheel'].forEach((ev) => rail.addEventListener(ev, hold, { passive: true }))
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = reduce ? 0 : window.setInterval(() => {
      if (Date.now() < paused || !seen || document.hidden) return
      const list = slides()
      const mid = rail.scrollLeft + rail.clientWidth / 2
      const cur = list.findIndex((s) => Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid) < s.offsetWidth / 2)
      const next = list[(cur + 1) % list.length]
      if (next) rail.scrollTo({ left: next.offsetLeft - (rail.clientWidth - next.offsetWidth) / 2, behavior: 'smooth' })
    }, 4500)
    mark()
    return () => {
      io.disconnect()
      rail.removeEventListener('scroll', onScroll)
      if (t) clearInterval(t)
    }
  }, [latest.length])

  // 스크롤에 맞춰 움직이는 것들
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const story = storyRef.current
    if (!story) return
    const lines = [...story.querySelectorAll<HTMLElement>('.line')]
    const meter = [...story.querySelectorAll<HTMLElement>('.storymeter i')]
    const bg = story.querySelector<HTMLElement>('.bg')
    const blob = story.querySelector<HTMLElement>('.blob')
    const strike = story.querySelector<HTMLElement>('.strike')
    const photos = [...document.querySelectorAll<HTMLElement>('.photo')]
    if (reduce) {
      lines.forEach((l) => l.classList.add('on'))
      return
    }
    const update = () => {
      const vh = window.innerHeight
      const r = story.getBoundingClientRect()
      const p = clamp(-r.top / (r.height - vh))
      bg?.style.setProperty('--p', String(p))
      const step = p < 0.28 ? 0 : p < 0.6 ? 1 : 2
      lines.forEach((l, i) => { l.classList.toggle('on', i === step); l.classList.toggle('off', i < step) })
      meter.forEach((m, i) => m.classList.toggle('on', i <= step))
      strike?.style.setProperty('--s', p > 0.38 ? '1' : '0')
      blob?.style.setProperty('--b', step === 2 ? '1' : '0')
      const s = stageRef.current?.getBoundingClientRect()
      if (s && phoneRef.current) phoneRef.current.style.setProperty('--t', clamp((s.top + s.height / 2 - vh / 2) / vh, -1, 1).toFixed(3))
      photos.forEach((ph) => {
        const b = ph.getBoundingClientRect()
        if (b.bottom > 0 && b.top < vh) ph.querySelector<HTMLElement>('.ph')?.style.setProperty('--y', ((b.top + b.height / 2 - vh / 2) * -0.12).toFixed(1))
      })
      const road = roadRef.current
      if (road) {
        const rr = road.getBoundingClientRect()
        const rp = clamp((vh * 0.75 - rr.top) / rr.height)
        road.style.setProperty('--rp', String(rp))
        ;[...road.children].forEach((li, i, a) => li.classList.toggle('on', rp >= i / (a.length - 1) - 0.02))
      }
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false }) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])

  // 아래에서 떠오르기 (화면 아래에 있는 것만)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.remove('pre'); io.unobserve(e.target) }
    }), { rootMargin: '0px 0px -10% 0px' })
    document.querySelectorAll('.rv').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) { el.classList.add('pre'); io.observe(el) }
    })
    return () => io.disconnect()
  }, [])

  const goSlide = (i: number) => {
    const rail = railRef.current
    const s = rail?.children[i] as HTMLElement | undefined
    if (rail && s) rail.scrollTo({ left: s.offsetLeft - (rail.clientWidth - s.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <div className="rn tiles" ref={rootRef}>
      <section className="tile hero">
        <div className="in">
          <p className="eyebrow">김꾼 2막</p>
          <h1 className="h1" aria-label="필요한 건 AI로 직접 만드는 꾼.">
            <Words text="필요한 건" start={0} />
            <br />
            <span className="grad w" aria-hidden="true" style={{ ['--i' as string]: 2 }}>AI로 직접</span>{' '}
            <Words text="만드는 꾼." start={3} />
          </h1>
          <p className="sub">장사 꿀팁은 넘쳐난다. 도구가 없으면 현실은 그대로다.</p>
          <div className="ctas">
            <a className="btn" href="#made">만든 것 보기</a>
            <a className="btn ghost" href="#request">도구 요청하기</a>
          </div>
        </div>
        <div className={'collage' + (ready ? ' ready' : '')}>
          <div className="it" style={{ ['--l' as string]: '2%', ['--t' as string]: '12%', ['--w' as string]: '33%', ['--r' as string]: '-8deg', ['--i' as string]: 1, ['--d' as string]: '6.5s', ['--z' as string]: 2 }}>
            <div className="fl">
              <a className="igcard" href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                <div className="igtop"><i><b /></i>kim.kkun</div>
                <img src="/renewal/insta-b2.jpg" alt="김꾼 인스타그램 릴스 표지" />
                <div className="igbot">
                  <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
                  <svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-3.3-6.5L20 4v4.5" /></svg>
                  <svg viewBox="0 0 24 24"><path d="M21 4 10 14M21 4l-7 17-3-8-8-3z" /></svg>
                </div>
              </a>
            </div>
            <span className="tag">인스타그램 {BRAND.instagram}</span>
          </div>
          <div className="it" style={{ ['--l' as string]: '33%', ['--t' as string]: '2%', ['--w' as string]: '34%', ['--r' as string]: '0deg', ['--i' as string]: 0, ['--d' as string]: '7s', ['--z' as string]: 4 }}>
            <div className="fl"><div className="phone"><img src="/renewal/home.jpg" alt="더크루 앱 홈 화면" /></div></div>
            <span className="tag blue">직접 만든 앱 · 더크루</span>
          </div>
          <div className="it bun" style={{ ['--l' as string]: '66%', ['--t' as string]: '14%', ['--w' as string]: '33%', ['--r' as string]: '7deg', ['--i' as string]: 2, ['--d' as string]: '5.5s', ['--z' as string]: 3 }}>
            <div className="fl"><img src="/renewal/bunjjuk.png" alt="번쩍이 캐릭터" /></div>
            <span className="tag">번쩍이 · AI 트렌드</span>
          </div>
          <div className="it" style={{ ['--l' as string]: '9%', ['--t' as string]: '66%', ['--w' as string]: '22%', ['--r' as string]: '5deg', ['--i' as string]: 3, ['--d' as string]: '6s', ['--z' as string]: 5 }}>
            <div className="fl"><div className="crewcard"><img src="/renewal/crew-wave.jpg" alt="더크루 캐릭터" /></div></div>
          </div>
          <div className="it" style={{ ['--l' as string]: '68%', ['--t' as string]: '72%', ['--w' as string]: '26%', ['--r' as string]: '-5deg', ['--i' as string]: 4, ['--d' as string]: '7.5s', ['--z' as string]: 5 }}>
            <div className="fl"><div className="crewpill"><img src="/renewal/crew-logo.png" alt="The Crew" /></div></div>
          </div>
        </div>
        <div className="stats">
          <span>직접 만든 앱 <CountUp to={1} />개</span>
          <span>1막 글 <CountUp to={articles.length} />편</span>
          <span>다음 도구 <b>요청 받는 중</b></span>
        </div>
      </section>

      <section className="story" ref={storyRef} aria-label="1막에서 2막으로">
        <div className="pin">
          <div className="bg" />
          <div className="blob" />
          <p className="line">장사 꿀팁은<br />인스타에 넘쳐난다.</p>
          <p className="line">
            <span className="strike">저장은 계속하는데</span>
            <br />내 현실은 그대로.
            <span className="small">도구가 없으면 꿀팁은 효용이 없다.</span>
          </p>
          <p className="line">그래서<br />직접 만든다.<span className="small">세상의 문제를 AI로 푸는 꾼, 김꾼 2막.</span></p>
          <div className="storymeter"><i /><i /><i /></div>
        </div>
      </section>

      <section className="tile dark" id="made">
        <div className="in rv">
          <p className="eyebrow">지금 만드는 것 · 01</p>
          <img className="crewhead" src="/renewal/crew-logo.png" alt="The Crew" />
          <h2 className="h2">더크루.</h2>
          <p className="sub">꿀팁만으로는 매장이 안 바뀌어서, 직접 만든 매장 운영 앱.</p>
          <p className="call">체크리스트, 스케줄, 소식을 사장과 크루가 한 앱에서 나눈다.</p>
        </div>
        <div className="stage" ref={stageRef}>
          <div className="bigphone" ref={phoneRef}>
            <div className="scr">
              {SCREENS.map(([id, label], i) => (
                <img key={id} className={i === shot ? 'on' : ''} src={`/renewal/${id}.jpg`} alt={`더크루 ${label} 화면`} />
              ))}
            </div>
          </div>
          <img className="wave" src="/renewal/crew-wave.jpg" alt="손 흔드는 더크루 캐릭터" />
          <div className="tabs">
            {SCREENS.map(([id, label], i) => (
              <button key={id} type="button" className={'tab' + (i === shot ? ' on' : '')} onClick={() => { setShot(i); shotHold.current = Date.now() + 9000 }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="photo">
        <div className="ph" style={{ backgroundImage: 'url(/renewal/W1.jpg)' }} />
        <div className="in rv">
          <p className="eyebrow">왜 만드나</p>
          <h2 className="h2">먼저 가서 해보고,<br />알려주고, 돕는다.</h2>
        </div>
      </section>

      <div className="rn-grid" id="library">
        <section className="tile wide">
          <div className="in rv">
            <p className="eyebrow">1막 서고</p>
            <h2 className="h2">장사의 기본 {articles.length}편.</h2>
            <p className="sub">2막이 서 있는 바닥. 5년간 가게를 직접 운영하며 배운 것.</p>
            <div className="chips">
              {categories.map((c) => (
                <Link key={c.id} className="chip" href={`/content#${c.slug}`}>
                  {c.name}<b>{byCat(c.id).length}</b>
                </Link>
              ))}
            </div>
            <div className="ctas"><Link className="btn ghost" href="/content">1막 전체 보기</Link></div>
          </div>
        </section>
        <section className="tile air">
          <div className="in rv">
            <p className="eyebrow">2막 서고</p>
            <h2 className="h2">곧 채워질 이야기.</h2>
            <div className="chips">
              {['만드는 과정', 'AI 활용법', '깊이 있는 장사', '소비 트렌드'].map((t) => (
                <span key={t} className="chip soon">{t}</span>
              ))}
            </div>
            <p className="note">2막 글이 올라오면 이 칸이 첫 서가가 된다.</p>
          </div>
        </section>
        <section className="tile white">
          <div className="in rv">
            <p className="eyebrow">자료실</p>
            <h2 className="h2">바로 써먹는 자료.</h2>
            <div className="chips">
              <span className="chip soon">{LOCK}곧 열려요</span>
            </div>
            <p className="note">글에서 말한 방법을 가게에서 바로 쓰게 만든 자료가 여기에 쌓인다.</p>
          </div>
        </section>
      </div>

      <section className="tile white" style={{ paddingBottom: 28 }}>
        <div className="rail-head in rv">
          <p className="eyebrow">1막 서고에서</p>
          <h2 className="h2">읽을수록 남는 장사 공부.</h2>
        </div>
        <div className="rail" ref={railRef} aria-label="1막 글 넘겨 보기">
          {latest.map((a, i) => (
            <Link key={a.id} href={`/content/${a.slug}`} className={`slide s${i % 5}` + (i === slide ? ' on' : '')}>
              <span>
                <span className="c">NO.{pad(a.number)} · {a.category?.name}</span>
                <span className="t">{a.title}</span>
                <span className="s">{a.sub_copy}</span>
              </span>
              <span className="go">읽기</span>
            </Link>
          ))}
        </div>
        <div className="dots">
          {latest.map((a, i) => (
            <button key={a.id} type="button" className={'dot' + (i === slide ? ' on' : '')} aria-label={`${i + 1}번째 글로`} onClick={() => goSlide(i)} />
          ))}
        </div>
      </section>

      <section className="photo">
        <div className="ph" style={{ backgroundImage: 'url(/renewal/W2.jpg)' }} />
        <div className="in rv">
          <p className="eyebrow">만드는 방식</p>
          <h2 className="h2">내가 쓰는 걸 만들고,<br />당신의 요청을 더한다.</h2>
        </div>
      </section>

      <section className="tile" id="about" style={{ paddingBottom: 44 }}>
        <div className="in rv">
          <p className="eyebrow">소개</p>
          <h2 className="h2">안녕하세요, 김꾼입니다.</h2>
          <p className="sub">모든 일을 에이전트로 생각하고, 필요한 도구는 직접 만든다.</p>
        </div>
        <div className="portrait rv"><img src="/renewal/real.jpg" alt="촬영 중인 김꾼" /></div>
        <div className="in">
          <ol className="road" ref={roadRef}>
            <li><b>1막</b><span>자영업자에게 장사 꿀팁을 전하다.</span></li>
            <li><b>한계</b><span>꿀팁은 넘쳐나는데, 도구가 없으면 현실은 그대로.</span></li>
            <li><b>더크루</b><span>그래서 매장 운영 앱을 직접 만들었다.</span></li>
            <li><b>2막</b><span>필요한 건 AI로 직접 만드는 꾼.</span></li>
          </ol>
        </div>
      </section>

      <section className="tile dark" id="request" style={{ paddingBottom: 48 }}>
        <div className="in rv">
          <p className="eyebrow">요청하기</p>
          <h2 className="h2">필요한 도구를<br />말해 주세요.</h2>
          <p className="sub" style={{ color: 'var(--crew-muted)' }}>여러 사람의 요청을 모아, 김꾼이 만드는 도구에 기능으로 넣는다.</p>
          <div className="ctas">
            <a className="btn" href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">인스타그램 댓글로 요청</a>
            <button className="btn ghost" type="button" disabled>의뢰하기 · 준비 중</button>
          </div>
        </div>
      </section>
    </div>
  )
}
