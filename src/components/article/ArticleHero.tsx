'use client'

import { Article } from '@/lib/types'

interface ArticleHeroProps {
  article: Article
}

// 카테고리별 장식 패턴 SVG
function CategoryPattern({ category, color }: { category: string; color: string }) {
  switch (category) {
    case '고객 만들기':
      return (
        <svg className="absolute right-8 bottom-8 opacity-[0.07]" width="200" height="200" viewBox="0 0 200 200">
          <polygon points="100,20 180,180 20,180" stroke={color} strokeWidth="1.5" fill="none" />
          <polygon points="100,60 150,160 50,160" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="100" cy="130" r="15" stroke={color} strokeWidth="1" fill="none" />
        </svg>
      )
    case '단골 만들기':
      return (
        <svg className="absolute right-8 bottom-8 opacity-[0.07]" width="200" height="200" viewBox="0 0 200 200">
          <path d="M100,40 L120,80 L165,88 L132,120 L140,165 L100,144 L60,165 L68,120 L35,88 L80,80 Z" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="110" r="25" stroke={color} strokeWidth="1" fill="none" />
        </svg>
      )
    case '브랜드 만들기':
      return (
        <svg className="absolute right-8 bottom-8 opacity-[0.07]" width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="20" stroke={color} strokeWidth="1" fill="none" />
          <line x1="20" y1="100" x2="180" y2="100" stroke={color} strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="180" stroke={color} strokeWidth="1" />
        </svg>
      )
    case '시스템 만들기':
      return (
        <svg className="absolute right-8 bottom-8 opacity-[0.07]" width="200" height="200" viewBox="0 0 200 200">
          <rect x="30" y="30" width="50" height="50" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="120" y="30" width="50" height="50" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="30" y="120" width="50" height="50" stroke={color} strokeWidth="1.5" fill="none" />
          <rect x="120" y="120" width="50" height="50" stroke={color} strokeWidth="1.5" fill="none" />
          <line x1="80" y1="55" x2="120" y2="55" stroke={color} strokeWidth="1" />
          <line x1="80" y1="145" x2="120" y2="145" stroke={color} strokeWidth="1" />
          <line x1="55" y1="80" x2="55" y2="120" stroke={color} strokeWidth="1" />
          <line x1="145" y1="80" x2="145" y2="120" stroke={color} strokeWidth="1" />
        </svg>
      )
    case '사장 이야기':
      return (
        <svg className="absolute right-8 bottom-8 opacity-[0.07]" width="200" height="200" viewBox="0 0 200 200">
          <path d="M30,100 Q100,20 170,100 Q100,180 30,100" stroke={color} strokeWidth="1.5" fill="none" />
          <path d="M60,100 Q100,50 140,100 Q100,150 60,100" stroke={color} strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="5" fill={color} />
        </svg>
      )
    default:
      return null
  }
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  const categoryColor = article.category?.color || '#888'
  const categoryName = article.category?.name || ''
  const numberStr = String(article.number).padStart(2, '0')

  return (
    <div className="relative w-full bg-[#0d0d0d] overflow-hidden">
      {/* 배경 그라디언트 */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${categoryColor} 0%, transparent 70%)`,
        }}
      />

      {/* 장식 패턴 */}
      <CategoryPattern category={categoryName} color={categoryColor} />

      {/* 큰 번호 (배경) */}
      <div
        className="absolute right-6 top-6 text-[60px] md:text-[90px] font-black leading-none opacity-[0.04] select-none"
        style={{ color: categoryColor }}
      >
        {numberStr}
      </div>

      {/* 콘텐츠 */}
      <div className="relative max-w-[600px] mx-auto px-6 py-16 md:py-24">
        {/* 카테고리 태그 */}
        <div className="flex items-center gap-3 mb-6">
          <span
            className="inline-block px-3 py-1.5 text-xs font-bold tracking-wider rounded"
            style={{ backgroundColor: categoryColor, color: '#0a0a0a' }}
          >
            {categoryName.toUpperCase()}
          </span>
          <span className="text-xs text-muted tracking-widest">
            NO.{numberStr}
          </span>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl md:text-4xl font-black leading-tight tracking-tight">
          {article.title}
        </h1>

        {/* 서브카피 */}
        <p className="mt-4 text-sm md:text-base text-muted leading-relaxed max-w-[480px]">
          {article.sub_copy}
        </p>

        {/* 메타 정보 */}
        <div className="flex items-center gap-4 mt-8 text-xs text-muted/60">
          <span>{article.author}</span>
          <span className="w-px h-3 bg-muted/30" />
          <span>
            {article.published_at
              ? new Date(article.published_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </span>
          <span className="w-px h-3 bg-muted/30" />
          <span>{article.reading_time}분 읽기</span>
        </div>
      </div>

      {/* 하단 구분선 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${categoryColor}40, transparent)`,
        }}
      />
    </div>
  )
}
