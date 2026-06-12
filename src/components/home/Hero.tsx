import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'

/* Hero — 단 하나의 강한 제안. forest 위 cream 타이포. 브랜드의 첫인상. */
export default function Hero() {
  return (
    <section className="kk-hero" id="top">
      <div className="kk-container">
        <div data-reveal>
          <SectionLabel>INSIGHT</SectionLabel>
        </div>
        <h1 className="kk-hero-title" data-reveal>
          단골은 운이 아니다.
          <br />
          설계다.
        </h1>
        <p className="kk-hero-lead" data-reveal>
          5년간 가게를 직접 운영하며 배운 것. 손님을 단골로, 단골을 팬으로
          만드는 건 친절이 아니라 시스템이다. 김꾼은 그 시스템을 쉽고 구체적으로,
          그리고 냉정하게 다룬다.
        </p>
        <div className="kk-hero-actions" data-reveal>
          <Button variant="primary" size="lg" href="#work">
            콘텐츠 보기
          </Button>
          <Button variant="ghost" size="lg" href="#view">
            김꾼의 관점
          </Button>
        </div>
        <div className="kk-hero-meta" data-reveal>
          <span>고객 만들기</span>
          <span>단골 만들기</span>
          <span>브랜드 만들기</span>
          <span>시스템 만들기</span>
          <span>사장 이야기</span>
        </div>
      </div>
    </section>
  )
}
