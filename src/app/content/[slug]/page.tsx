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
import MetricCardsBlock from '@/components/article/MetricCardsBlock'
import PromptCardsBlock from '@/components/article/PromptCardsBlock'
import MediaBlock from '@/components/article/MediaBlock'
import CopyBlock from '@/components/article/CopyBlock'
import { articleNo, isAct2 } from '@/lib/articles'
import CopyProtect from '@/components/article/CopyProtect'
import ReadingProgress from '@/components/renewal/ReadingProgress'

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

function createMarkdownComponents() {
  let chapterCount = 0
  return {
  h2: ({ children }: { children?: React.ReactNode }) => {
    chapterCount++
    const num = String(chapterCount).padStart(2, '0')
    return (
      <div className="mt-16 mb-6">
        <div className="text-[13px] font-bold text-[var(--crew-accent)] mb-2">CHAPTER {num}</div>
        <h2 className="text-[26px] md:text-[30px] font-extrabold leading-snug tracking-[-0.04em]">{children}</h2>
      </div>
    )
  },
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-[21px] md:text-[23px] font-bold mt-12 mb-5 leading-snug tracking-[-0.03em]">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-[17px] md:text-[18px] leading-[1.9] text-[#333D4B] mb-6">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-[var(--crew-ink)] bg-[linear-gradient(transparent_60%,var(--crew-accent-soft)_60%)]">{children}</strong>
  ),
  hr: () => (
    <div className="my-14 flex justify-center">
      <div className="w-12 h-[2px] rounded bg-[var(--crew-line-strong)]" />
    </div>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-8 rounded-2xl bg-[var(--crew-accent-air)] px-5 py-4 text-[17px] leading-[1.8] text-[var(--crew-dusk)] [&_p]:mb-0">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-2 my-6 ml-5 list-disc marker:text-[var(--crew-accent)]">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-2 my-6 ml-5 list-decimal marker:text-[var(--crew-accent)] marker:font-bold">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[17px] md:text-[18px] leading-[1.85] text-[#333D4B]">{children}</li>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 -mx-4 px-4 overflow-x-auto">
      <table className="w-full min-w-[560px] border-separate" style={{ borderSpacing: '0 6px' }}>{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead>{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-[13px] font-bold text-[var(--crew-dusk)] bg-[var(--crew-bg)] first:rounded-l-xl last:rounded-r-xl align-top">{children}</th>
  ),
  td: ({ children, node }: { children?: React.ReactNode; node?: { position?: { start?: { column?: number } } } }) => {
    const isFirstCol = node?.position?.start?.column === 1
    return (
      <td className={`px-4 py-3.5 text-[15px] leading-relaxed bg-white shadow-[0_1px_3px_rgba(25,31,40,.06)] first:rounded-l-xl last:rounded-r-xl align-top ${isFirstCol ? 'font-semibold text-[var(--crew-accent)]' : 'text-[#333D4B]'}`}>{children}</td>
    )
  },
  }
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
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Seoul', // 서버(UTC)에서 그려도 한국 날짜로
      })
    : ''

  const blocks = parseBlocks(article.content)
  const markdownComponents = createMarkdownComponents()

  return (
    <div className="rn pb-20">
      <ReadingProgress />
      <header className="rn-art-head in">
        <div className="no">
          {isAct2(article) ? articleNo(article) : `1막 서고 · NO.${String(article.number).padStart(2, '0')}`} · {article.category?.name}
        </div>
        <h1>{article.title}</h1>
        {article.sub_copy && <p className="lede">{article.sub_copy}</p>}
        <div className="meta">
          <span>{article.author}</span>
          {publishedDate && <span>{publishedDate}</span>}
          {article.reading_time ? <span>{article.reading_time}분 읽기</span> : null}
        </div>
      </header>

      <article className="in">
        <div className="max-w-[640px] mx-auto pt-6">
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
                  case 'metricCards':
                    return <MetricCardsBlock key={i} content={block.content} />
                  case 'promptCards':
                    return <PromptCardsBlock key={i} content={block.content} />
                  case 'photo':
                  case 'video':
                    return <MediaBlock key={i} kind={block.type} content={block.content} />
                  case 'copy':
                    return <CopyBlock key={i} content={block.content} />
                  default:
                    return (
                      <Markdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {block.content}
                      </Markdown>
                    )
                }
              })}
            </div>

            {/* 핵심 한 줄 */}
            {article.sub_copy && (
              <div className="mt-14 rounded-[20px] bg-[var(--crew-ink)] text-white p-6">
                <div className="text-[13px] font-bold text-[var(--crew-accent-hi)] mb-2">핵심 한 줄</div>
                <p className="text-[17px] font-semibold leading-relaxed">{article.sub_copy}</p>
              </div>
            )}
          </CopyProtect>

          {article.reels_url && (
            <div className="mt-6 rounded-[20px] bg-[var(--crew-accent-air)] p-6 text-center">
              <p className="text-[15px] text-[var(--crew-dusk)] mb-4">이 글의 핵심을 1분으로 보기</p>
              <a className="btn" href={article.reels_url} target="_blank" rel="noopener noreferrer">
                릴스 보러 가기
              </a>
            </div>
          )}

          <nav className="rn-pager" aria-label="다른 글">
            {next && (
              <Link href={`/content/${next.slug}`}>
                <small>다음 글</small>
                <span>{next.title}</span>
              </Link>
            )}
            {prev && (
              <Link href={`/content/${prev.slug}`}>
                <small>이전 글</small>
                <span>{prev.title}</span>
              </Link>
            )}
            <Link href="/content">
              <small>1막 서고</small>
              <span>전체 글 보기</span>
            </Link>
          </nav>
        </div>
      </article>
    </div>
  )
}
