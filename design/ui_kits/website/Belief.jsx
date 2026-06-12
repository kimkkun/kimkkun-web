/* Belief — 김꾼의 관점. Dark section, big serif declaratives with hairline dividers. */
function Belief() {
  const { SectionLabel } = window.KimKkunDesignSystem_b887a3;
  const lines = [
    "할인은 전략이 아니다. 변명이다.",
    "단골은 친절이 아니라 설계에서 나온다.",
    "브랜드는 로고가 아니라 반복되는 경험이다.",
  ];
  return (
    <section className="kk-section" id="view" data-screen-label="Belief">
      <div className="kk-container">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="02">View</SectionLabel>
          <h2 className="kk-sec-title">김꾼은 이렇게 본다.</h2>
        </div>
        <div className="kk-belief-list">
          {lines.map((l, i) => (
            <p className="kk-belief-line" key={i} data-reveal>{l}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Belief = Belief;
