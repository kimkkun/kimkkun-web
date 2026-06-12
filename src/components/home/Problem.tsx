import SectionLabel from '@/components/ui/SectionLabel'

/* Problem — 자영업의 현실 진단. 크림(라이트) 섹션, 3단 헤어라인 그리드. */
export default function Problem() {
  const items = [
    { n: '01', t: '손님은 오는데, 남지 않는다.', b: '재방문율을 모르는 사장이 대부분이다. 모르면 관리도 없다.' },
    { n: '02', t: '할인 말고는 부를 방법이 없다.', b: '마진을 깎아 손님을 사는 구조. 오래 못 간다.' },
    { n: '03', t: '사장이 멈추면 가게도 멈춘다.', b: '시스템이 없으니 모든 게 사장의 체력에 달려 있다.' },
  ]
  return (
    <section className="kk-section light" id="problem">
      <div className="kk-container">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="01" surface="light">
            Problem
          </SectionLabel>
          <h2 className="kk-sec-title">
            매출은 오르는데,
            <br />
            남는 게 없다.
          </h2>
        </div>
        <div className="kk-problem-grid">
          {items.map((it) => (
            <div className="kk-problem-item" key={it.n} data-reveal>
              <span className="kk-problem-num">{it.n}</span>
              <h3 className="kk-problem-title">{it.t}</h3>
              <p className="kk-problem-body">{it.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
