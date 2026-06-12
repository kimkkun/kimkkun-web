import SectionLabel from '@/components/ui/SectionLabel'

/* Results — 증거. 다크 섹션, 세 개의 진짜 숫자. 장식도, 만들어낸 수치도 없다. */
export default function Results() {
  const items = [
    { v: '5년', b: '직접 가게를 운영한 시간.' },
    { v: '0회', b: '그동안 한 할인 이벤트.' },
  ]
  return (
    <section className="kk-section" id="proof">
      <div className="kk-container">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="04">Proof</SectionLabel>
          <h2 className="kk-sec-title">말보다 변화.</h2>
        </div>
        <div className="kk-proof-grid">
          {items.map((it, i) => (
            <div className="kk-proof-item" key={i} data-reveal>
              <span className="kk-proof-num">{it.v}</span>
              <p className="kk-proof-body">{it.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
