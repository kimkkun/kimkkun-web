import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExPage, Head } from '@/components/explore/Explore'
import { isAct2 } from '@/lib/articles'
import { getArticle } from '@/lib/getArticle'
import { chaptersOf } from '@/lib/act2'

export const dynamic = 'force-dynamic'

export default async function TocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article || !isAct2(article)) notFound()
  const chapters = chaptersOf(article.content)
  return (
    <ExPage back={{ href: `/content/${slug}`, label: '글 처음' }} crumb="자세히 읽기">
      <Head kicker="자세히 읽기" title="궁금한 장만 골라 읽으세요" />
      <nav className="ex-toc" aria-label="장 목록">
        {chapters.map((c, i) => (
          <Link key={i} href={`/content/${slug}/read/${i + 1}`}>
            <em>{String(i + 1).padStart(2, '0')}</em>
            <b>{c.title}</b>
            <i aria-hidden="true">›</i>
          </Link>
        ))}
      </nav>
    </ExPage>
  )
}
