/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- 화면 동작(public/v7/site.js)이 페이지마다 다시 돌도록 일부러 a 태그로 이동 */
import { createSupabaseClient } from '@/lib/supabase/client'
import { Article } from '@/lib/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
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
import CopyProtect from '@/components/article/CopyProtect'
import { isAct2 } from '@/lib/articles'
import { getV7Data, localDrafts, TOPIC_NAME, topicsOf, v7No } from '@/lib/v7data'
import * as B from '@/components/v7/Blocks'

export const dynamic = 'force-dynamic'

async function getArticle(slug: string): Promise<Article | null> {
  const local = (await localDrafts()).find((a) => a.slug === slug)
  if (local) return local
  const { data } = await createSupabaseClient().from('articles').select('*, category:categories(*)').eq('slug', slug).eq('is_published', true).single()
  return data
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = await getArticle((await params).slug)
  if (!a) return {}
  return { title: `${a.title} — 김꾼`, description: a.sub_copy, openGraph: { title: a.title, description: a.sub_copy } }
}

/* 표 칸: "됨"은 파랑, "안 됨"은 빨강 */
const cellText = (c: React.ReactNode) => (typeof c === 'string' ? c : Array.isArray(c) && c.every((x) => typeof x === 'string') ? c.join('') : '')
const md = {
  table: ({ children }: { children?: React.ReactNode }) => <table className="tbl">{children}</table>,
  td: ({ children }: { children?: React.ReactNode }) => {
    const t = cellText(children).trim()
    return <td className={t === '됨' ? 'y' : t === '안 됨' ? 'n' : undefined}>{children}</td>
  },
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a href={href} {...(href?.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>
  ),
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, d] = await Promise.all([getArticle(slug), getV7Data()])
  if (!article) notFound()

  const act2 = isAct2(article)
  const topics = topicsOf(article.slug, article.number, act2)
  const no = v7No({ number: article.number, act2 })
  const [l1, ...rest] = article.title.split(', ')
  const l2 = rest.join(', ')
  const blocks = parseBlocks(article.content)
  const hasRelated = blocks.some((b) => b.type === 'related')
  const sameTopic = d.arts.filter((a) => a.slug !== slug && a.topics.some((t) => topics.includes(t))).slice(0, 3)

  return (
    <main>
      <article className="art">
        <a className="back" href="/content">← 무료 자료</a>
        <div className="cat">
          {topics.map((t) => TOPIC_NAME[t]).join(' · ')} · {no}
        </div>
        <h1>
          {l2 ? (
            <>
              {l1},<span className="l2">{l2}</span>
            </>
          ) : (
            article.title
          )}
        </h1>
        {article.sub_copy && <p className="lede">{article.sub_copy}</p>}
        <div className="by">
          <img src="/v7/real.jpg" alt="" />
          {article.author} · {article.reading_time}분 · 무료
        </div>

        <CopyProtect>
          {blocks.map((b, i) => {
            const c = b.content
            switch (b.type) {
              case 'hero': return <B.Hero key={i} content={c} />
              case 'takeaways': return <B.Takeaways key={i} content={c} />
              default: return null
            }
          })}
          <div className="txt">
            {blocks.map((b, i) => {
              const c = b.content
              switch (b.type) {
                case 'hero':
                case 'takeaways':
                  return null
                case 'recap': return <B.Recap key={i} content={c} />
                case 'news': return <B.News key={i} content={c} />
                case 'chap': return <B.Chap key={i} content={c} />
                case 'map': return <B.MapBlock key={i} content={c} />
                case 'step': return <B.Step key={i} content={c} />
                case 'calc': return <B.Calc key={i} content={c} />
                case 'fix': return <B.Fix key={i} content={c} />
                case 'say': return <B.Say key={i} content={c} />
                case 'check': return <B.Check key={i} content={c} />
                case 'today': return <B.Today key={i} content={c} />
                case 'sum': return <B.Sum key={i} content={c} />
                case 'reel': return <B.Reel key={i} content={c} />
                case 'cmp': return <B.Cmp key={i} content={c} />
                case 'note': return <B.Note key={i} content={c} />
                case 'sources': return <B.Sources key={i} content={c} />
                case 'related': {
                  const list = B.items(c).map(({ parts: [s] }) => d.arts.find((a) => a.slug === s)).filter((a) => !!a)
                  return (
                    <div className="next" key={i}>
                      <h2>같은 고민, 다음 글</h2>
                      <div className="rail2">{list.map((a) => <B.ArtCard key={a.slug} a={a} />)}</div>
                      <div className="lib-cta"><a className="btn" href="/content">다른 글 더 보기 →</a></div>
                    </div>
                  )
                }
                case 'photo': return <B.Photo key={i} content={c} />
                case 'compare': return <CompareBlock key={i} content={c} />
                case 'checklist': return <ChecklistBlock key={i} content={c} />
                case 'insight': return <InsightBlock key={i} content={c} />
                case 'steps': return <StepsBlock key={i} content={c} />
                case 'examples': return <ExamplesBlock key={i} content={c} />
                case 'infographic': return <KkunInfographicBlock key={i} content={c} />
                case 'metricCards': return <MetricCardsBlock key={i} content={c} />
                case 'promptCards': return <PromptCardsBlock key={i} content={c} />
                case 'video': return <MediaBlock key={i} kind="video" content={c} />
                case 'copy': return <CopyBlock key={i} content={c} />
                default:
                  return <Markdown key={i} remarkPlugins={[remarkGfm]} components={md}>{c}</Markdown>
              }
            })}

            {article.reels_url && !blocks.some((b) => b.type === 'reel') && (
              <a className="reelbox" href={article.reels_url} target="_blank" rel="noopener noreferrer">
                <div><b>이 글의 릴스 다시 보기</b><span>인스타그램에서 1분으로 보기</span></div>
              </a>
            )}
            {!hasRelated && sameTopic.length > 0 && (
              <div className="next">
                <h2>같은 고민, 다음 글</h2>
                <div className="rail2">{sameTopic.map((a) => <B.ArtCard key={a.slug} a={a} />)}</div>
                <div className="lib-cta"><a className="btn" href="/content">다른 글 더 보기 →</a></div>
              </div>
            )}
          </div>
        </CopyProtect>
      </article>
    </main>
  )
}
