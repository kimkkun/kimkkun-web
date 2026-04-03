'use client'

import { useState } from 'react'
import { Category, Article } from '@/lib/types'
import ContentCard from './ContentCard'

interface CategoryTabsProps {
  categories: Category[]
  articles: Article[]
}

export default function CategoryTabs({ categories, articles }: CategoryTabsProps) {
  const [activeSlug, setActiveSlug] = useState<string>('all')

  const filtered = activeSlug === 'all'
    ? articles
    : articles.filter((a) => a.category?.slug === activeSlug)

  return (
    <section className="px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* 탭 */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
          <TabButton
            label="All"
            active={activeSlug === 'all'}
            onClick={() => setActiveSlug('all')}
          />
          {categories.map((cat) => (
            <TabButton
              key={cat.id}
              label={cat.name}
              active={activeSlug === cat.slug}
              onClick={() => setActiveSlug(cat.slug)}
              color={cat.color}
            />
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

function TabButton({
  label,
  active,
  onClick,
  color,
}: {
  label: string
  active: boolean
  onClick: () => void
  color?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all ${
        active
          ? 'bg-foreground text-background font-medium'
          : 'text-muted hover:text-foreground border border-border'
      }`}
      style={active && color ? { backgroundColor: color, color: '#0a0a0a' } : undefined}
    >
      {label}
    </button>
  )
}
