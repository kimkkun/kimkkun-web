/* 김꾼 marketing site — top navigation. Slim, fixed, hairline divider on scroll. */
function Nav() {
  const { Button } = window.KimKkunDesignSystem_b887a3;
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "관점", href: "#view" },
    { label: "콘텐츠", href: "#work" },
    { label: "사례", href: "#proof" },
  ];

  return (
    <header className={"kk-nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="kk-nav-inner kk-container">
        <a className="kk-nav-mark" href="#top" aria-label="김꾼 홈">
          <span className="kk-nav-word">김꾼</span>
          <span className="kk-nav-tick" />
        </a>
        <nav className="kk-nav-links">
          {links.map((l) => (
            <a key={l.href} className="kk-nav-link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="kk-nav-cta">
          <Button variant="secondary" size="sm" href="#start">친구추가</Button>
        </div>
      </div>
    </header>
  );
}

window.Nav = Nav;
