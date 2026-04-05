'use client'

import { useState, useRef } from 'react'
import { Category, Article } from '@/lib/types'
import ContentCard from './ContentCard'

interface CategoryTabsProps {
  categories: Category[]
  articles: Article[]
}

export default function CategoryTabs({ categories, articles }: CategoryTabsProps) {
  const [activeSlug, setActiveSlug] = useState<string>('all')
  const scrollRef = useRef<HTMLDivElement>(null)

  const filtered = activeSlug === 'all'
    ? articles
    : articles.filter((a) => a.category?.slug === activeSlug)

  const activeCategory = categories.find((c) => c.slug === activeSlug)
  const activeColor = activeCategory?.color || '#ededed'

  return (
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* 탭 — 가로 스크롤, 스크롤바 숨김 */}
        <div
          ref={scrollRef}
          className="flex gap-6 mb-10 overflow-x-auto pb-1 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <button
            onClick={() => setActiveSlug('all')}
            className={`relative whitespace-nowrap text-sm tracking-wide transition-colors shrink-0 pb-2 ${
              activeSlug === 'all'
                ? 'text-foreground font-semibold'
                : 'text-muted hover:text-foreground/70'
            }`}
          >
            전체
            {activeSlug === 'all' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground rounded-full" />
            )}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveSlug(cat.slug)}
              className={`relative whitespace-nowrap text-sm tracking-wide transition-colors shrink-0 pb-2 ${
                activeSlug === cat.slug
                  ? 'font-semibold'
                  : 'text-muted hover:text-foreground/70'
              }`}
              style={activeSlug === cat.slug ? { color: cat.color } : undefined}
            >
              {cat.name}
              {activeSlug === cat.slug && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ContentCard key={article.id} article={article} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted py-20">아직 등록된 콘텐츠가 없습니다.</p>
        )}
      </div>
    </section>
  )
}
