/* App — composes the 김꾼 site and wires the fade/slide reveal (IntersectionObserver). */
function App() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    // Fallback: some embedded contexts never deliver IO callbacks. If nothing
    // has revealed shortly after mount, reveal everything (fade still applies).
    const t = setTimeout(() => {
      if (!els.some((el) => el.classList.contains("is-in"))) {
        els.forEach((el) => el.classList.add("is-in"));
        io.disconnect();
      }
    }, 500);
    return () => { clearTimeout(t); io.disconnect(); };
  }, []);

  const { Nav, Hero, Problem, Belief, Categories, Results, CTA, Footer } = window;
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Belief />
        <Categories />
        <Results />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
