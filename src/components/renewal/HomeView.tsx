'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BRAND } from '@/lib/constants'
import type { Category } from '@/lib/types'
import { ACT2_SLUG, articleNo, isAct2, type ArticleSummary } from '@/lib/articles'
import Splash from '@/components/renewal/Splash'

/* 김꾼 2막 첫 화면 — 코멜(refeeel.com) 뼈대에 더크루 색.
   순서: 시작 화면 → 문장 하나 + 최신 글 알약 → 바로 읽을 글 → 주제별 서고 → 더크루 → 숫자 → 무료 자료 → 소개 → 요청하기.
   움직임은 등장·넘김에만 쓰고, 글 화면에서는 쓰지 않는다. */

// 더크루 랜딩에 공개된 실제 앱 화면
const SCREENS = [
  ['home', '홈'],
  ['check', '체크리스트'],
  ['schedule', '스케줄'],
  ['feed', '소식'],
] as const

// 글자 카드 표지 색 — 분류 순서대로 돈다(더크루 토큰)
const COVERS = ['cv-ink', 'cv-blue', 'cv-air', 'cv-dusk', 'cv-tile']

// 무료로 받을 자료. 파일이 정해지면 { title, desc, href }를 넣는다.
const FREE_DOWNLOADS: { title: string; desc: string; href: string }[] = []

const pad = (n: number) => String(n).padStart(2, '0')
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))

/* 2026-10-20 탐험형 개편 뒤로 첫 화면은 src/app/page.tsx(큰 문 4개)다. 이 화면은 칸을 골라 보여 주는 이야기 화면으로,
   /about(소개·더크루·숫자)과 /request(요청하기)에서 쓴다. show에 넣은 칸만 이 파일 순서대로 그린다. */
type Section = 'hero' | 'read' | 'library' | 'about' | 'made' | 'numbers' | 'free' | 'request'
type Props = { categories: Category[]; articles: ArticleSummary[]; show?: Section[] }

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

function CountUp({ to, start = false }: { to: number; start?: boolean }) {
  const [n, setN] = useState(to)
  useEffect(() => {
    if (!start || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = clamp((t - t0) / 1400)
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, start])
  return <>{n.toLocaleString('ko-KR')}</>
}

export default function HomeView({ categories, articles, show }: Props) {
  const has = (k: Section) => !show || show.includes(k)
  const [ready, setReady] = useState(false)
  const [shot, setShot] = useState(0)
  const [tick, setTick] = useState(0)
  const [numbersOn, setNumbersOn] = useState(false)
  const shotHold = useRef(0)
  const railRef = useRef<HTMLDivElement>(null)
  const numbersRef = useRef<HTMLElement>(null)
  const roadRef = useRef<HTMLOListElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  const latest = articles.slice(0, 8)
  const ticker = articles.slice(0, 3)
  const byCat = (id: string) => articles.filter((a) => a.category_id === id)
  const act1 = articles.filter((a) => !isAct2(a))
  const act2 = articles.filter(isAct2)
  const coverOf = (a: ArticleSummary) => COVERS[Math.max(0, categories.findIndex((c) => c.id === a.category_id)) % COVERS.length]

  // 첫 화면 등장
  useEffect(() => {
    rootRef.current?.classList.add('js-motion')
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  // 최신 글 알약 · 더크루 화면 자동 넘김
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const a = setInterval(() => !document.hidden && setTick((t) => t + 1), 3600)
    const b = setInterval(() => {
      if (Date.now() > shotHold.current && !document.hidden) setShot((s) => (s + 1) % SCREENS.length)
    }, 2800)
    return () => { clearInterval(a); clearInterval(b) }
  }, [])

  // 숫자 칸이 보이면 숫자 올리기
  useEffect(() => {
    const el = numbersRef.current
    if (!el) return
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setNumbersOn(true); io.disconnect() } }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // 사진 시차 · 걸어온 길
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const photos = [...document.querySelectorAll<HTMLElement>('.photo')]
    const update = () => {
      const vh = window.innerHeight
      photos.forEach((ph) => {
        const b = ph.getBoundingClientRect()
        if (b.bottom > 0 && b.top < vh) ph.querySelector<HTMLElement>('.ph')?.style.setProperty('--y', ((b.top + b.height / 2 - vh / 2) * -0.12).toFixed(1))
      })
      const road = roadRef.current
      if (road) {
        const rr = road.getBoundingClientRect()
        const rp = clamp((vh * 0.75 - rr.top) / rr.height)
        road.style.setProperty('--rp', String(rp))
        ;[...road.children].forEach((li, i, arr) => li.classList.toggle('on', rp >= i / (arr.length - 1) - 0.02))
      }
    }
    let ticking = false
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false }) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
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

  const scrollRail = (dir: number) => {
    const rail = railRef.current
    if (rail) rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: 'smooth' })
  }

  const now = ticker.length ? ticker[tick % ticker.length] : null

  return (
    <div className="rn tiles" ref={rootRef}>
      {has('hero') && <Splash />}

      {/* 1. 문장 하나 */}
      {has('hero') && (
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
            <a className="btn" href="#read">글 읽기</a>
            <a className="btn ghost" href="#free">무료 자료 받기</a>
          </div>
          {now && (
            <Link className="ticker" href={`/content/${now.slug}`} key={now.id}>
              <span className="dotlive" />
              <span className="tk-label">NEW · {articleNo(now)}</span>
              <span className="tk-title">{now.title}</span>
            </Link>
          )}
        </div>
        <div className={'collage small' + (ready ? ' ready' : '')} aria-hidden="true">
          <div className="it" style={{ ['--l' as string]: '6%', ['--t' as string]: '14%', ['--w' as string]: '28%', ['--r' as string]: '-8deg', ['--i' as string]: 1, ['--d' as string]: '6.5s', ['--z' as string]: 2 }}>
            <div className="fl">
              <div className="igcard">
                <div className="igtop"><i><b /></i>kim.kkun</div>
                <img src="/renewal/insta-b2.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="it" style={{ ['--l' as string]: '36%', ['--t' as string]: '2%', ['--w' as string]: '28%', ['--r' as string]: '0deg', ['--i' as string]: 0, ['--d' as string]: '7s', ['--z' as string]: 4 }}>
            <div className="fl"><div className="phone"><img src="/renewal/home.jpg" alt="" /></div></div>
          </div>
          <div className="it bun" style={{ ['--l' as string]: '66%', ['--t' as string]: '16%', ['--w' as string]: '28%', ['--r' as string]: '7deg', ['--i' as string]: 2, ['--d' as string]: '5.5s', ['--z' as string]: 3 }}>
            <div className="fl"><img src="/renewal/bunjjuk.png" alt="" /></div>
          </div>
          <div className="it" style={{ ['--l' as string]: '16%', ['--t' as string]: '64%', ['--w' as string]: '17%', ['--r' as string]: '5deg', ['--i' as string]: 3, ['--d' as string]: '6s', ['--z' as string]: 5 }}>
            <div className="fl"><div className="crewcard"><img src="/renewal/crew-wave.jpg" alt="" /></div></div>
          </div>
        </div>
      </section>
      )}

      {/* 2. 바로 읽을 글 */}
      {has('read') && (
      <section className="tile white left" id="read">
        <div className="in">
          <div className="sec-head">
            <div>
              <p className="eyebrow">지금 바로 읽기</p>
              <h2 className="h2">로그인 없이,<br />지금 바로 읽어보세요.</h2>
            </div>
            <div className="arrows">
              <button type="button" aria-label="이전 글" onClick={() => scrollRail(-1)}>←</button>
              <button type="button" aria-label="다음 글" onClick={() => scrollRail(1)}>→</button>
            </div>
          </div>
        </div>
        <div className="cards" ref={railRef}>
          {latest.map((a) => (
            <Link key={a.id} className="card" href={`/content/${a.slug}`}>
              <span className={'cover ' + coverOf(a)}>
                <span className="cv-cat">{a.category?.name}</span>
                <span className="cv-no">{articleNo(a).split('No.')[1]}</span>
              </span>
              <span className="meta">{articleNo(a)} · {a.category?.name}</span>
              <span className="title">{a.title}</span>
              <span className="desc">{a.sub_copy}</span>
            </Link>
          ))}
        </div>
        <div className="in"><p className="foot-link"><Link href="/content">1막 {act1.length}편 전체 보기 →</Link></p></div>
      </section>
      )}

      {/* 3. 주제별 서고 */}
      {has('library') && (
      <section className="tile" id="library">
        <div className="in">
          <p className="eyebrow">서고</p>
          <h2 className="h2">주제별로 쌓이는 장사 공부.</h2>
          <div className="shelves">
            {act2.length ? (
              <Link className="shelf next rv" href={`/content/${act2[0].slug}`}>
                <div className="sh-top"><span className="sh-badge">2</span><b>2막 · AI로 만드는 꾼</b></div>
                <div className="sh-row"><span>쌓인 편수</span><b>{act2.length}</b></div>
                <div className="sh-row"><span>최신</span><b>{articleNo(act2[0])}</b></div>
                <div className="sh-last">{act2[0].title} →</div>
              </Link>
            ) : (
              <div className="shelf next rv">
                <div className="sh-top"><span className="sh-badge">2</span><b>2막 · AI로 만드는 꾼</b></div>
                <div className="sh-row"><span>쌓인 편수</span><b>곧 첫 편</b></div>
                <div className="sh-row"><span>다루는 것</span><b>만드는 과정 · AI 활용법</b></div>
              </div>
            )}
            {categories.map((c) => {
              const list = byCat(c.id)
              if (!list.length || c.slug === ACT2_SLUG) return null
              return (
                <Link key={c.id} className="shelf rv" href={`/content#${c.slug}`}>
                  <div className="sh-top"><span className="sh-badge">{c.name.slice(0, 1)}</span><b>{c.name}</b></div>
                  <div className="sh-row"><span>쌓인 편수</span><b>{list.length}</b></div>
                  <div className="sh-row"><span>최신</span><b>No.{pad(list[0].number)}</b></div>
                  <div className="sh-last">{list[0].title} →</div>
                </Link>
              )
            })}
          </div>
          <p className="foot-link">1막 {act1.length}편이 주제별로 쌓여 있어요 · <Link href="/content">전체 보기 →</Link></p>
        </div>
      </section>
      )}

      {/* 7. 소개 */}
      {has('about') && (
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
      )}

      {/* 4. 만든 것: 더크루 */}
      {has('made') && (
      <section className="tile dark" id="made">
        <div className="in rv">
          <p className="eyebrow">직접 만든 것 · 01</p>
          <img className="crewhead" src="/renewal/crew-logo.png" alt="The Crew" />
          <h2 className="h2">더크루.</h2>
          <p className="sub">꿀팁만으로는 매장이 안 바뀌어서, 직접 만든 매장 운영 앱.</p>
          <p className="call">체크리스트, 스케줄, 소식을 사장과 크루가 한 앱에서 나눈다.</p>
        </div>
        <div className="stage">
          <div className="bigphone flat">
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
      )}

      {/* 5. 숫자 */}
      {has('numbers') && (
      <section className="tile white left" ref={numbersRef}>
        <div className="in">
          <p className="eyebrow">지금까지</p>
          <h2 className="h2">말로 끝내지 않고,<br />매장에서 돌아가게.</h2>
          <div className="numbers">
            <div className="num">
              <b><CountUp to={1500} start={numbersOn} /><small>개</small></b>
              <span>더크루가 들어가 있는 매장 · 입점 중</span>
            </div>
            <div className="num">
              <b><CountUp to={act1.length} start={numbersOn} /><small>편</small></b>
              <span>5년 매장 운영에서 나온 1막 인사이트</span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 6. 무료 다운로드 */}
      {has('free') && (
      <section className="tile air" id="free" style={{ paddingBottom: 48 }}>
        <div className="in rv">
          <p className="eyebrow">무료 자료</p>
          <h2 className="h2">지금 무료로<br />받아 가세요.</h2>
          <p className="sub">글에서 말한 방법을 가게에서 바로 쓰게 만든 자료.</p>
          {FREE_DOWNLOADS.length ? (
            <div className="minis">
              {FREE_DOWNLOADS.map((d) => (
                <a key={d.href} className="mini" href={d.href}>
                  <span className="n">FREE</span>
                  <span className="tt">{d.title}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="ctas"><button className="btn" type="button" disabled>무료 다운로드 · 곧 열려요</button></div>
          )}
        </div>
      </section>
      )}

      {/* 8. 요청하기 */}
      {has('request') && (
      <section className="photo end" id="request">
        <div className="ph" style={{ backgroundImage: 'url(/renewal/W1.jpg)' }} />
        <div className="in rv">
          <p className="eyebrow">요청하기</p>
          <h2 className="h2">필요한 도구를<br />말해 주세요.</h2>
          <p className="sub">여러 사람의 요청을 모아, 김꾼이 만드는 도구에 기능으로 넣는다.</p>
          <div className="ctas">
            <a className="btn" href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">인스타그램 댓글로 요청</a>
            <Link className="btn ghost" href="/content">글 먼저 읽기</Link>
          </div>
        </div>
      </section>
      )}
    </div>
  )
}
