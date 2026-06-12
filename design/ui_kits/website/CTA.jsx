/* CTA — 시작. Forest-deep plane. The site's ONE Ochre moment lives here.
   Interactive: the accent button flips to a confirmation line. */
function CTA() {
  const { SectionLabel, Button } = window.KimKkunDesignSystem_b887a3;
  const [joined, setJoined] = React.useState(false);
  return (
    <section className="kk-section deep" id="start" data-screen-label="CTA">
      <div className="kk-container kk-cta-wrap">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="05">Start</SectionLabel>
          <h2 className="kk-sec-title">다음 손님부터,<br />다르게.</h2>
          <p className="kk-cta-lead">친구추가하고, 다음 손님부터 다르게 맞이하세요.</p>
        </div>
        <div className="kk-cta-actions" data-reveal>
          {joined ? (
            <p className="kk-cta-done">신청 완료. 환영 메시지로 곧 만나요.</p>
          ) : (
            <>
              <Button variant="accent" size="lg" onClick={() => setJoined(true)}>카카오채널 친구추가</Button>
              <Button variant="ghost" size="lg" onClick={(e) => e.preventDefault()} href="#start">오픈채팅 입장 →</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

window.CTA = CTA;
