import { createSupabaseClient } from '@/lib/supabase/client'
import { Article } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parseBlocks } from '@/lib/parseBlocks'
import CompareBlock from '@/components/article/CompareBlock'
import ChecklistBlock from '@/components/article/ChecklistBlock'
import InsightBlock from '@/components/article/InsightBlock'
import StepsBlock from '@/components/article/StepsBlock'
import ExamplesBlock from '@/components/article/ExamplesBlock'
import KkunInfographicBlock from '@/components/article/KkunInfographicBlock'
import KkunThumbnail, { type KkunCategory } from '@/components/KkunThumbnail'
import CopyProtect from '@/components/article/CopyProtect'

export const dynamic = 'force-dynamic'

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}

async function getAdjacentArticles(number: number) {
  const supabase = createSupabaseClient()

  const [{ data: prev }, { data: next }] = await Promise.all([
    supabase
      .from('articles')
      .select('title, slug')
      .eq('is_published', true)
      .lt('number', number)
      .order('number', { ascending: false })
      .limit(1)
      .single(),
    supabase
      .from('articles')
      .select('title, slug')
      .eq('is_published', true)
      .gt('number', number)
      .order('number', { ascending: true })
      .limit(1)
      .single(),
  ])

  return { prev, next }
}

const markdownComponents = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-20 mb-8">
      <div className="w-full h-px bg-border/50 mb-10" />
      <h2 className="text-2xl md:text-3xl font-black leading-tight">{children}</h2>
    </div>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-xl md:text-2xl font-bold mt-14 mb-6 leading-tight">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-[15px] leading-[2.2] text-foreground/85 mb-6">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-foreground font-semibold underline decoration-foreground/40 decoration-2 underline-offset-4">{children}</strong>
  ),
  hr: () => (
    <div className="my-16 flex justify-center">
      <div className="w-12 h-px bg-muted/30" />
    </div>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-2 border-foreground/30 pl-5 my-8 italic text-muted">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-3 my-6 ml-4">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-3 my-6 ml-4 list-decimal">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[15px] leading-[2.2] text-foreground/85">{children}</li>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 -mx-6 px-6 overflow-x-auto">
      <div className="rounded-xl border border-border min-w-[600px]">
        <table className="w-full text-sm">{children}</table>
      </div>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-[#1a1a1a]">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border text-[13px] align-top">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-4 py-3 text-foreground/80 border-b border-border/50 text-[13px] leading-relaxed align-top">{children}</td>
  ),
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  const { prev, next } = await getAdjacentArticles(article.number)
  const categoryColor = article.category?.color || '#888'
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  const blocks = parseBlocks(article.content)

  return (
    <div className="pt-16 pb-20">
      {/* 히어로: KkunThumbnail + 메타 스트립 */}
      <div className="px-6">
        <div className="max-w-[1000px] mx-auto">
          <KkunThumbnail
            category={article.category?.name as KkunCategory}
            titleLines={article.thumbnail_title_lines}
            accentLine={article.thumbnail_accent_line}
          />
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted/70">
            <span className="text-foreground/90 font-medium">{article.author}</span>
            <span className="w-px h-3 bg-muted/30" />
            <span>{publishedDate}</span>
            <span className="w-px h-3 bg-muted/30" />
            <span>{article.reading_time}분 읽기</span>
          </div>
        </div>
      </div>

      <article className="px-6">
        <div className="max-w-[600px] mx-auto">
          {/* 브레드크럼 */}
          <nav className="flex items-center gap-2 text-xs text-muted mt-10 mb-10">
            <Link href="/" className="hover:text-foreground transition-colors">
              Content
            </Link>
            <span>/</span>
            <span style={{ color: categoryColor }}>{article.category?.name}</span>
          </nav>

          {/* 본문 - 리치 블록 지원 (복사 방지) */}
          <CopyProtect>
            <div className="prose-custom">
              {blocks.map((block, i) => {
                switch (block.type) {
                  case 'compare':
                    return <CompareBlock key={i} content={block.content} />
                  case 'checklist':
                    return <ChecklistBlock key={i} content={block.content} />
                  case 'insight':
                    return <InsightBlock key={i} content={block.content} />
                  case 'steps':
                    return <StepsBlock key={i} content={block.content} />
                  case 'examples':
                    return <ExamplesBlock key={i} content={block.content} />
                  case 'infographic':
                    return <KkunInfographicBlock key={i} content={block.content} />
                  default:
                    return (
                      <Markdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {block.content}
                      </Markdown>
                    )
                }
              })}
            </div>

            {/* KEY TAKEAWAY */}
            <div className="mt-16 bg-card rounded-2xl p-6 border border-border">
              <h3 className="text-xs font-bold tracking-widest text-muted mb-3">
                KEY TAKEAWAY
              </h3>
              <p className="text-base font-medium leading-relaxed">
                {article.sub_copy}
              </p>
            </div>
          </CopyProtect>

          {/* WATCH ON REELS */}
          {article.reels_url && (
            <div className="mt-8 bg-card rounded-2xl p-6 border border-border text-center">
              <p className="text-sm text-muted mb-3">이 글의 핵심을 1분으로 보기</p>
              <a
                href={article.reels_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                릴스 보러 가기
              </a>
            </div>
          )}

          {/* 이전/다음 네비게이션 */}
          <nav className="mt-16 flex items-center justify-between border-t border-border pt-8">
            {prev ? (
              <Link
                href={`/content/${prev.slug}`}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                ← {prev.title}
              </Link>
            ) : (
              <div />
            )}
            <Link
              href="/"
              className="text-xs text-muted hover:text-foreground transition-colors tracking-wider"
            >
              All content
            </Link>
            {next ? (
              <Link
                href={`/content/${next.slug}`}
                className="text-sm text-muted hover:text-foreground transition-colors text-right"
              >
                {next.title} →
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>
      </article>
    </div>
  )
}
