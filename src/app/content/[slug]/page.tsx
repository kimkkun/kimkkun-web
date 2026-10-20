import { createSupabaseClient } from '@/lib/supabase/client'
import { Article } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { articleNo, isAct2 } from '@/lib/articles'
import { getArticle } from '@/lib/getArticle'
import CopyProtect from '@/components/article/CopyProtect'
import ArticleBody from '@/components/article/ArticleBody'
import Act2Landing from '@/components/article/Act2Landing'
import ReadingProgress from '@/components/renewal/ReadingProgress'

export const dynamic = 'force-dynamic'

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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()
  if (isAct2(article)) return <Act2Landing article={article} />

  const { prev, next } = await getAdjacentArticles(article.number)
  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Seoul', // 서버(UTC)에서 그려도 한국 날짜로
      })
    : ''


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
            <ArticleBody content={article.content} />

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
            <Link href="/content/act1">
              <small>1막 서고</small>
              <span>전체 글 보기</span>
            </Link>
          </nav>
        </div>
      </article>
    </div>
  )
}
