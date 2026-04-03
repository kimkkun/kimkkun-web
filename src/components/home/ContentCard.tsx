import Link from 'next/link'
import { Article } from '@/lib/types'

interface ContentCardProps {
  article: Article
}

export default function ContentCard({ article }: ContentCardProps) {
  const categoryColor = article.category?.color || '#888'
  const categoryGradient = article.category?.gradient || 'linear-gradient(135deg, #333 0%, #555 100%)'

  return (
    <Link href={`/content/${article.slug}`} className="group block">
      <article className="bg-card rounded-2xl overflow-hidden border border-border hover:border-border/50 hover:bg-card-hover transition-all">
        {/* 그라디언트 영역 */}
        <div
          className="h-36 flex items-end p-5"
          style={{ background: categoryGradient }}
        >
          <span className="text-xs font-bold text-background/70 tracking-widest">
            NO. {String(article.number).padStart(2, '0')}
          </span>
        </div>

        {/* 콘텐츠 */}
        <div className="p-5">
          <span
            className="inline-block px-2.5 py-1 text-xs font-medium rounded-full mb-3"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
          >
            {article.category?.name}
          </span>
          <h3 className="text-lg font-bold leading-snug group-hover:text-white transition-colors">
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
