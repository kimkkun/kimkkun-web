import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExPage, Head } from '@/components/explore/Explore'
import { getArticleSummaries, getCategories, isAct2 } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default async function Act1CategoryPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params
  const [cats, all] = await Promise.all([getCategories(), getArticleSummaries()])
  const c = cats.find((x) => x.slug === cat)
  if (!c) notFound()
  const list = all.filter((a) => !isAct2(a) && a.category_id === c.id)
  return (
    <ExPage back={{ href: '/content/act1', label: '1막 주제' }}>
      <Head kicker="1막 · 장사의 기본" title={c.name} lead={`${list.length}편`} />
      <nav className="ex-toc" aria-label={`${c.name} 글`}>
        {list.map((a) => (
          <Link key={a.id} href={`/content/${a.slug}`}>
            <em>{String(a.number).padStart(2, '0')}</em>
            <b>{a.title}</b>
            <i aria-hidden="true">›</i>
          </Link>
        ))}
      </nav>
    </ExPage>
  )
}
