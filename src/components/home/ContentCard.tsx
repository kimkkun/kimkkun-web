import Link from 'next/link'
import { Article } from '@/lib/types'

interface ContentCardProps {
  article: Article
}

// 카테고리별 미니 장식 패턴
function MiniPattern({ category, color }: { category: string; color: string }) {
  switch (category) {
    case '고객 만들기':
      return (
        <svg className="absolute right-4 top-4 opacity-[0.12]" width="80" height="80" viewBox="0 0 80 80">
          <polygon points="40,8 72,72 8,72" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      )
    case '단골 만들기':
      return (
        <svg className="absolute right-4 top-4 opacity-[0.12]" width="80" height="80" viewBox="0 0 80 80">
          <path d="M40,15 L47,32 L65,35 L52,48 L55,66 L40,58 L25,66 L28,48 L15,35 L33,32 Z" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      )
    case '브랜드 만들기':
      return (
        <svg className="absolute right-4 top-4 opacity-[0.12]" width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="40" cy="40" r="15" stroke={color} strokeWidth="1" fill="none" />
        </svg>
      )
    case '시스템 만들기':
      return (
        <svg className="absolute right-4 top-4 opacity-[0.12]" width="80" height="80" viewBox="0 0 80 80">
          <rect x="10" y="10" width="25" height="25" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="45" y="10" width="25" height="25" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="10" y="45" width="25" height="25" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="45" y="45" width="25" height="25" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      )
    case '사장 이야기':
      return (
        <svg className="absolute right-4 top-4 opacity-[0.12]" width="80" height="80" viewBox="0 0 80 80">
          <path d="M15,40 Q40,10 65,40 Q40,70 15,40" stroke={color} strokeWidth="1.5" fill="none" />
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
      <article className="bg-card rounded-2xl overflow-hidden border border-border hover:border-border/50 hover:bg-card-hover transition-all">
        {/* 썸네일 영역 */}
        <div className="relative h-44 bg-[#0d0d0d] overflow-hidden">
          {/* 배경 그라디언트 */}
          <div
            className="absolute inset-0 opacity-[0.1] group-hover:opacity-[0.15] transition-opacity"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${categoryColor} 0%, transparent 70%)`,
            }}
          />

          {/* 장식 패턴 */}
          <MiniPattern category={categoryName} color={categoryColor} />

          {/* 큰 번호 */}
          <div className="absolute left-5 top-4">
            <span
              className="text-2xl font-black leading-none opacity-80"
              style={{ color: categoryColor }}
            >
              {numberStr}
            </span>
          </div>

          {/* 카테고리 태그 */}
          <div className="absolute left-5 bottom-4">
            <span
              className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider rounded"
              style={{ backgroundColor: categoryColor, color: '#0a0a0a' }}
            >
              {categoryName.toUpperCase()}
            </span>
          </div>

          {/* 하단 그라디언트 라인 */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(90deg, ${categoryColor}60, transparent)`,
            }}
          />
        </div>

        {/* 텍스트 영역 */}
        <div className="p-5">
          <h3 className="text-base font-bold leading-snug group-hover:text-white transition-colors">
            {article.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
            {article.sub_copy}
          </p>
        </div>
      </article>
    </Link>
  )
}
