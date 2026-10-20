import { ExPage, Head, Doors, Door } from '@/components/explore/Explore'
import { articleNo, getArticleSummaries, isAct2 } from '@/lib/articles'

export const dynamic = 'force-dynamic'
export const metadata = { title: '2막 — 김꾼' }

export default async function Act2Page() {
  const list = (await getArticleSummaries()).filter(isAct2)
  return (
    <ExPage back={{ href: '/content', label: '글 읽기' }}>
      <Head kicker="2막 · AI로 만드는 꾼" title="2막 글" lead="글마다 바로 써 보는 설계도가 붙어 있어요." />
      <Doors>
        {list.map((a, i) => (
          <Door key={a.id} main={i === 0} href={`/content/${a.slug}`} icon="notice" title={a.title} desc={articleNo(a)} />
        ))}
      </Doors>
    </ExPage>
  )
}
