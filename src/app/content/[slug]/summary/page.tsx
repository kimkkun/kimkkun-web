import { notFound } from 'next/navigation'
import { ExPage, Head, NextLink } from '@/components/explore/Explore'
import Rich from '@/components/explore/Rich'
import { isAct2 } from '@/lib/articles'
import { getArticle } from '@/lib/getArticle'
import { blueprintOf, summaryOf } from '@/lib/act2'
import { findBlueprint, blueprintHref } from '@/lib/blueprints'

export const dynamic = 'force-dynamic'

export default async function SummaryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article || !isAct2(article)) notFound()
  const sum = summaryOf(article.content)
  if (!sum.length) notFound()
  const bp = findBlueprint(blueprintOf(article.content) || '')
  return (
    <ExPage back={{ href: `/content/${slug}`, label: '글 처음' }} crumb="1분 요약">
      <Head kicker="1분 요약" title="이것만 기억하세요" />
      <ol className="ex-sum">{sum.map((l, i) => <li key={i}><Rich text={l} /></li>)}</ol>
      {bp && <NextLink href={blueprintHref(bp)} hint="바로 해 보려면" label="설계도 받기" />}
      <NextLink href={`/content/${slug}/read`} hint="더 알고 싶으면" label="자세히 읽기" />
    </ExPage>
  )
}
