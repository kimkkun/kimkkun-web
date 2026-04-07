import Link from 'next/link'
import { Article } from '@/lib/types'

interface ContentCardProps {
  article: Article
}

// 카테고리별 의미 있는 아이콘
function CategoryIcon({ category, color }: { category: string; color: string }) {
  const cls = "opacity-50"
  switch (category) {
    case '고객 만들기':
      // 확성기 (마케팅)
      return (
        <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M12 20v8h6l10 8V12L18 20h-6z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M32 18c2 2 2 6 0 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M36 14c4 4 4 12 0 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    case '단골 만들기':
      // 순환 화살표 (재방문)
      return (
        <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M32 16A12 12 0 1 0 36 24" stroke={color} strokeWidth="2" fill="none" />
          <path d="M28 12l4 4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="24" r="4" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      )
    case '브랜드 만들기':
      // 다이아몬드 (브랜드 가치)
      return (
        <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 6L42 24L24 42L6 24Z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M24 14L34 24L24 34L14 24Z" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="24" cy="24" r="3" fill={color} opacity="0.5" />
        </svg>
      )
    case '시스템 만들기':
      // 톱니바퀴 (시스템)
      return (
        <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="24" cy="24" r="3" fill={color} opacity="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="24" y1="8" x2="24" y2="13"
              stroke={color} strokeWidth="2" strokeLinecap="round"
              transform={`rotate(${deg} 24 24)`}
            />
          ))}
        </svg>
      )
    case '사장 이야기':
      // 펜 (서사)
      return (
        <svg className={cls} width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M30 10l8 8-20 20H10v-8L30 10z" stroke={color} strokeWidth="2" fill="none" />
          <path d="M26 14l8 8" stroke={color} strokeWidth="1.5" />
          <path d="M10 38h28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    default:
      return null
  }
}

export default function ContentCard({ article }: ContentCardProps) {
  const categoryColor = article.category?.color || '#888'
  const categoryName = article.category?.name || ''
  const numberStr = String(article.number).padStart(2, '0')

  return (
    <Link href={`/content/${article.slug}`} className="group block">
      <article className="rounded-2xl overflow-hidden border border-border hover:border-foreground/15 hover:-translate-y-1 transition-all duration-300 ease-out">
        {/* 썸네일 영역 */}
        <div
          className="relative px-6 pt-5 pb-6 min-h-[200px] flex flex-col justify-between overflow-hidden"
          style={{
            background: `linear-gradient(160deg, #0a0a0a 0%, ${categoryColor}15 50%, ${categoryColor}25 100%)`,
          }}
        >
          {/* 상단: 번호 + 아이콘 */}
          <div className="relative flex items-start justify-between">
            <span
              className="text-xs font-bold tracking-widest opacity-40"
              style={{ color: categoryColor }}
            >
              NO.{numberStr}
            </span>
            <CategoryIcon category={categoryName} color={categoryColor} />
          </div>

          {/* 제목 */}
          <div className="relative mt-3">
            <h3 className="text-lg font-black leading-snug text-foreground group-hover:text-white transition-colors">
              {article.title}
            </h3>

            {/* 카테고리 라인 + 이름 */}
            <div className="flex items-center gap-2 mt-3">
              <div
                className="w-6 h-[2px] rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
              <span
                className="text-[10px] font-bold tracking-wider"
                style={{ color: categoryColor }}
              >
                {categoryName}
              </span>
            </div>
          </div>

          {/* 좌측 세로 악센트 라인 */}
          <div
            className="absolute left-0 top-0 w-[3px] h-full opacity-70"
            style={{
              background: `linear-gradient(to bottom, ${categoryColor}, transparent)`,
            }}
          />
        </div>

        {/* 서브카피 */}
        <div className="px-6 py-4 bg-card">
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">
            {article.sub_copy}
          </p>
        </div>
      </article>
    </Link>
  )
}
