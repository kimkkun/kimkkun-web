/* Categories — 콘텐츠 5카테고리. Light section composing the Card primitive. */
function Categories() {
  const { SectionLabel, Card } = window.KimKkunDesignSystem_b887a3;
  const items = [
    { n: "01", t: "고객 만들기", b: "지나가는 사람을 손님으로 만드는 법." },
    { n: "02", t: "단골 만들기", b: "한 번 온 손님이 다시 오게 만드는 구조." },
    { n: "03", t: "브랜드 만들기", b: "가격 말고 이유로 선택받는 법." },
    { n: "04", t: "시스템 만들기", b: "사장이 없어도 돌아가는 가게." },
    { n: "05", t: "사장 이야기", b: "현장에서 배운 것들. 포장 없이." },
  ];
  return (
    <section className="kk-section light" id="work" data-screen-label="Categories">
      <div className="kk-container">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="03" surface="light">Work</SectionLabel>
          <h2 className="kk-sec-title">다섯 가지만 다룬다.</h2>
        </div>
        <div className="kk-cat-grid">
          {items.map((it) => (
            <div data-reveal key={it.n}>
              <Card surface="light" href="#work" number={it.n} title={it.t} body={it.b} onClick={(e) => e.preventDefault()} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Categories = Categories;
