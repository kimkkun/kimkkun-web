import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'

const PILLARS = ['고객 만들기', '단골 만들기', '브랜드 만들기', '시스템 만들기', '사장 이야기']

/* 설계도 라인아트 — 사진 대신 1px 라인 언어로 그린 '설계' 모티프. 천천히 회전한다. */
function BlueprintArt() {
  return (
    <div className="kk-hero-art" data-reveal aria-hidden="true">
      <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 고정 크로스헤어 */}
        <line x1="240" y1="8" x2="240" y2="472" stroke="var(--sage-line-ink)" strokeWidth="1" />
        <line x1="8" y1="240" x2="472" y2="240" stroke="var(--sage-line-ink)" strokeWidth="1" />
        <circle cx="240" cy="240" r="206" stroke="var(--sage-line-ink)" strokeWidth="1" />
        <circle cx="240" cy="240" r="92" stroke="var(--sage-line-ink)" strokeWidth="1" />
        {/* 회전 레이어 1 — 점선 궤도 + 오커 점 */}
        <g className="kk-rotor">
          <circle cx="240" cy="240" r="158" stroke="rgba(20,32,28,0.30)" strokeWidth="1" strokeDasharray="3 9" />
          <circle cx="240" cy="82" r="5" fill="var(--ochre)" />
          <line x1="240" y1="240" x2="352" y2="128" stroke="rgba(20,32,28,0.22)" strokeWidth="1" />
        </g>
        {/* 회전 레이어 2 — 역방향 눈금 */}
        <g className="kk-rotor-rev">
          <circle cx="240" cy="240" r="122" stroke="rgba(20,32,28,0.18)" strokeWidth="1" />
          <line x1="240" y1="112" x2="240" y2="126" stroke="rgba(20,32,28,0.45)" strokeWidth="1" />
          <line x1="240" y1="354" x2="240" y2="368" stroke="rgba(20,32,28,0.45)" strokeWidth="1" />
          <line x1="112" y1="240" x2="126" y2="240" stroke="rgba(20,32,28,0.45)" strokeWidth="1" />
          <line x1="354" y1="240" x2="368" y2="240" stroke="rgba(20,32,28,0.45)" strokeWidth="1" />
        </g>
        {/* 중심 */}
        <circle cx="240" cy="240" r="3" fill="var(--ink)" />
        <rect x="228" y="296" width="24" height="2" fill="var(--ochre)" />
      </svg>
    </div>
  )
}

/* Hero — 크림 위 잉크. 비대칭 2단 + 하단 마키. 브랜드의 첫인상. */
export default function Hero() {
  return (
    <section className="kk-hero" id="top">
      <div className="kk-container kk-hero-grid">
        <div>
          <div data-reveal>
            <SectionLabel surface="light">INSIGHT</SectionLabel>
          </div>
          <h1 className="kk-hero-title" data-reveal>
            단골은 운이 아니다.
            <br />
            <span className="kk-hero-em">설계다.</span>
          </h1>
          <p className="kk-hero-lead" data-reveal>
            5년간 가게를 직접 운영하며 배운 것. 손님을 단골로, 단골을 팬으로
            만드는 건 친절이 아니라 시스템이다. 김꾼은 그 시스템을 쉽고 구체적으로,
            그리고 냉정하게 다룬다.
          </p>
          <div className="kk-hero-actions" data-reveal>
            <Button variant="primary" size="lg" surface="light" href="#work">
              콘텐츠 보기
            </Button>
            <Button variant="ghost" size="lg" surface="light" href="#view">
              김꾼의 관점
            </Button>
          </div>
        </div>
        <BlueprintArt />
      </div>
      {/* 흐르는 카테고리 띠 */}
      <div className="kk-marquee" aria-hidden="true">
        <div className="kk-marquee-track">
          {[0, 1].map((g) => (
            <div className="kk-marquee-group" key={g}>
              {PILLARS.map((p) => (
                <span className="kk-marquee-word" key={p}>
                  {p}
                  <span className="kk-marquee-dot">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
