import { ExPage, Head, Doors, Door } from '@/components/explore/Explore'
import { getArticleSummaries, isAct2 } from '@/lib/articles'

export const dynamic = 'force-dynamic'
export const metadata = { title: '글 읽기 — 김꾼' }

export default async function LibraryPage() {
  const articles = await getArticleSummaries()
  const act2 = articles.filter(isAct2)
  const act1 = articles.length - act2.length
  return (
    <ExPage back={{ href: '/', label: '처음' }}>
      <Head kicker="글 읽기" title="어느 쪽을 볼까요?" />
      <Doors>
        <Door main href="/content/act2" icon="blueprint" title="2막 · AI로 만드는 꾼" desc={act2.length ? `${act2.length}편 · 최신: ${act2[0].title}` : '곧 첫 편'} />
        <Door href="/content/act1" icon="book" title="1막 · 장사의 기본" desc={`${act1}편 · 5년 매장 운영에서 나온 글`} />
      </Doors>
    </ExPage>
  )
}
