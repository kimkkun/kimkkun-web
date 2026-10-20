import { notFound } from 'next/navigation'
import { ExPage, Head, NextLink } from '@/components/explore/Explore'
import ArticleBody from '@/components/article/ArticleBody'
import CopyProtect from '@/components/article/CopyProtect'
import { isAct2 } from '@/lib/articles'
import { getArticle } from '@/lib/getArticle'
import { blueprintOf, chaptersOf } from '@/lib/act2'
import { findBlueprint, blueprintHref } from '@/lib/blueprints'

export const dynamic = 'force-dynamic'

export default async function ChapterPage({ params }: { params: Promise<{ slug: string; n: string }> }) {
  const { slug, n } = await params
  const article = await getArticle(slug)
  if (!article || !isAct2(article)) notFound()
  const chapters = chaptersOf(article.content)
  const i = Number(n) - 1
  const c = chapters[i]
  if (!c) notFound()
  const pad = (k: number) => String(k).padStart(2, '0')
  const bp = findBlueprint(blueprintOf(article.content) || '')
  return (
    <ExPage back={{ href: `/content/${slug}/read`, label: '장 목록' }} crumb={`${pad(i + 1)} / ${pad(chapters.length)}`}>
      <Head kicker={`${pad(i + 1)} / ${pad(chapters.length)}`} title={c.title} />
      <CopyProtect>
        <div className="ex-read"><ArticleBody content={c.body} /></div>
      </CopyProtect>
      {chapters[i + 1] ? (
        <NextLink href={`/content/${slug}/read/${i + 2}`} hint="다음 장" label={`${pad(i + 2)} ${chapters[i + 1].title}`} />
      ) : (
        bp && <NextLink href={blueprintHref(bp)} hint="다 읽었다면, 이제 해 볼 차례" label="설계도 받기" />
      )}
    </ExPage>
  )
}
