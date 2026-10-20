import { ExPage, Head, Doors, Door } from '@/components/explore/Explore'
import { ACT2_SLUG, getArticleSummaries, getCategories, isAct2 } from '@/lib/articles'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: '1막 서고 — 김꾼',
  description: '장사의 기본. 고객·단골·브랜드·시스템·사장 이야기, 5년간 가게를 직접 운영하며 배운 것.',
}

/* 1막 주제 고르기 → 주제 안 글 목록(/content/act1/[cat]). 편수가 많은 주제부터. */
export default async function Act1Page() {
  const [cats, all] = await Promise.all([getCategories(), getArticleSummaries()])
  const articles = all.filter((a) => !isAct2(a))
  const rows = cats
    .filter((c) => c.slug !== ACT2_SLUG)
    .map((c) => ({ c, n: articles.filter((a) => a.category_id === c.id).length }))
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
  return (
    <ExPage back={{ href: '/content', label: '글 읽기' }}>
      <Head kicker="1막 · 장사의 기본" title="주제를 고르세요" lead={`${articles.length}편 · 5년간 가게를 직접 운영하며 배운 것.`} />
      <Doors>
        {rows.map(({ c, n }) => <Door key={c.id} href={`/content/act1/${c.slug}`} title={c.name} desc={`${n}편`} />)}
      </Doors>
    </ExPage>
  )
}
