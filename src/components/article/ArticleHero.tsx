'use client'

import { Article } from '@/lib/types'

interface ArticleHeroProps {
  article: Article
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  const categoryColor = article.category?.color || '#888'
  const categoryName = article.category?.name || ''
  const numberStr = String(article.number).padStart(2, '0')

  return (
    <div className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* 배경 악센트 */}
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: categoryColor }}
      />

      {/* 콘텐츠 */}
      <div className="max-w-[700px] mx-auto px-8 py-16 md:py-24">
        {/* 상단: 카테고리 + 번호 */}
        <div className="flex items-center gap-3 mb-8">
          <span
            className="inline-block px-3 py-1.5 text-xs font-bold tracking-wider rounded"
            style={{ backgroundColor: categoryColor, color: '#0a0a0a' }}
          >
            {categoryName}
          </span>
          <span className="text-xs text-muted tracking-widest">
            NO.{numberStr}
          </span>
        </div>

        {/* 제목 — 크고 임팩트 있게 */}
        <h1 className="text-3xl md:text-5xl font-black leading-[1.3] tracking-tight">
          {article.title}
        </h1>

        {/* 구분선 */}
        <div
          className="w-12 h-1 mt-6 mb-6 rounded-full"
          style={{ backgroundColor: categoryColor }}
        />

        {/* 서브카피 */}
        <p className="text-base md:text-lg text-muted leading-relaxed max-w-[500px]">
          {article.sub_copy}
        </p>

        {/* 하단: 작성자 정보 */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/30">
          <div className="flex items-center gap-4 text-xs text-muted/70">
            <span className="text-foreground/90 font-medium">{article.author}</span>
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
      </div>
    </div>
  )
}
