import type { KkunCategory } from "./KkunThumbnail";

interface KkunStep {
  num: string;
  title: string;
  desc: string;
}

interface KkunInfographicProps {
  category: KkunCategory;
  titleLines: string[];
  accentLine: string;
  sectionTitle: string;
  tableHeaders: [string, string, string];
  tableRows: string[][];
  calloutTitle: string;
  calloutSub: string;
  stepsTitle: string;
  steps: KkunStep[];
  footerLine: string;
  footerAccent: string;
  className?: string;
}

export default function KkunInfographic({
  category,
  titleLines,
  accentLine,
  sectionTitle,
  tableHeaders,
  tableRows,
  calloutTitle,
  calloutSub,
  stepsTitle,
  steps,
  footerLine,
  footerAccent,
  className,
}: KkunInfographicProps) {
  return (
    <div
      className={`kkun-info${className ? ` ${className}` : ""}`}
      data-category={category}
    >
      <div className="kkun-info__bar-top"></div>

      <header className="kkun-info__header">
        {titleLines.map((line, i) => (
          <div key={i} className="kkun-info__title">{line}</div>
        ))}
        <div className="kkun-info__title kkun-info__title--accent">{accentLine}</div>
      </header>

      <hr className="kkun-info__divider" />

      <h2 className="kkun-info__section">{sectionTitle}</h2>

      <table className="kkun-info__table">
        <thead>
          <tr>
            <th>{tableHeaders[0]}</th>
            <th className="bad">{tableHeaders[1]}</th>
            <th className="good">{tableHeaders[2]}</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <aside className="kkun-info__callout">
        <strong>{calloutTitle}</strong>
        <span>{calloutSub}</span>
      </aside>

      <h2 className="kkun-info__section">{stepsTitle}</h2>

      <ol className="kkun-info__steps">
        {steps.map((step, i) => (
          <li key={i}>
            <span className="num">{step.num}</span>
            <div>
              <strong>{step.title}</strong>
              <em>{step.desc}</em>
            </div>
          </li>
        ))}
      </ol>

      <hr className="kkun-info__divider" />

      <footer className="kkun-info__footer">
        <p>{footerLine}</p>
        <p className="accent">{footerAccent}</p>
        <small>김꾼 — 자영업자를 사업가로</small>
      </footer>

      <div className="kkun-info__bar-bottom"></div>
    </div>
  );
}
