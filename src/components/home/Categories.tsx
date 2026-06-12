import Card from '@/components/ui/Card'
import SectionLabel from '@/components/ui/SectionLabel'

/* Categories — 콘텐츠 5카테고리. forest 다크, 비대칭 그리드(첫 카드 2칸). 카드는 글 목록으로. */
export default function Categories() {
  const items = [
    { n: '01', t: '고객 만들기', b: '지나가는 사람을 손님으로 만드는 법.' },
    { n: '02', t: '단골 만들기', b: '한 번 온 손님이 다시 오게 만드는 구조.' },
    { n: '03', t: '브랜드 만들기', b: '가격 말고 이유로 선택받는 법.' },
    { n: '04', t: '시스템 만들기', b: '사장이 없어도 돌아가는 가게.' },
    { n: '05', t: '사장 이야기', b: '현장에서 배운 것들. 포장 없이.' },
  ]
  return (
    <section className="kk-section" id="work">
      <div className="kk-container">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="03">Work</SectionLabel>
          <h2 className="kk-sec-title">다섯 가지만 다룬다.</h2>
        </div>
        <div className="kk-cat-grid">
          {items.map((it) => (
            <div data-reveal key={it.n}>
              <Card href="/content" number={it.n} title={it.t} body={it.b}>
                <span className="kk-card-arrow">→</span>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
