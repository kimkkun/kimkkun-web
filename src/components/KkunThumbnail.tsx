export type KkunCategory =
  | "고객 만들기"
  | "단골 만들기"
  | "브랜드 만들기"
  | "시스템 만들기"
  | "사장 이야기";

interface KkunThumbnailProps {
  category: KkunCategory;
  titleLines: string[];
  accentLine: string;
  className?: string;
}

export default function KkunThumbnail({
  category,
  titleLines,
  accentLine,
  className,
}: KkunThumbnailProps) {
  return (
    <div
      className={`kkun-thumb${className ? ` ${className}` : ""}`}
      data-category={category}
    >
      <div className="kkun-thumb__bar-left"></div>
      <div className="kkun-thumb__stripes"></div>

      <span className="kkun-thumb__tag">{category}</span>

      <div className="kkun-thumb__title">
        {titleLines.map((line, i) => (
          <div key={i} className="kkun-thumb__line">{line}</div>
        ))}
        <div className="kkun-thumb__line kkun-thumb__line--accent">{accentLine}</div>
      </div>

      <svg className="kkun-thumb__icon" viewBox="0 0 160 160" aria-hidden="true">
        <circle cx="80" cy="80" r="78" fill="none" stroke="#C9A96E" strokeWidth="3" />
        <circle cx="80" cy="80" r="40" fill="#C9A96E" />
      </svg>

      <div className="kkun-thumb__watermark">김꾼 — 자영업자를 사업가로</div>
      <div className="kkun-thumb__bar-bottom"></div>
    </div>
  );
}
