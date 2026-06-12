/* Footer — Forest Deep. Wordmark, pillar links, copyright. Hairline-separated. */
function Footer() {
  const pillars = ["고객 만들기", "단골 만들기", "브랜드 만들기", "시스템 만들기", "사장 이야기"];
  return (
    <footer className="kk-footer" data-screen-label="Footer">
      <div className="kk-container">
        <div className="kk-footer-top">
          <div className="kk-footer-mark">
            <span className="kk-footer-word">김꾼</span>
            <span className="kk-footer-tag"><span className="kk-footer-bar"></span>KIM.KKUN</span>
          </div>
          <nav className="kk-footer-links">
            {pillars.map((p) => (
              <a key={p} href="#work" className="kk-footer-link">{p}</a>
            ))}
          </nav>
        </div>
        <div className="kk-footer-bottom">
          <span>© 2026 김꾼. 무단 전재 금지.</span>
          <span>kimkkun.com</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
