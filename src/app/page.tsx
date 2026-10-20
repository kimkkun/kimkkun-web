import Splash from '@/components/renewal/Splash'
import { ExPage, Head, Doors, Door } from '@/components/explore/Explore'
import { getArticleSummaries, isAct2 } from '@/lib/articles'

export const dynamic = 'force-dynamic'

/* 첫 화면: 큰 문 4개만. 자세한 건 고른 문 안에서. (화면 설계 원칙 — 2026-10-20 수환 확정) */
export default async function HomePage() {
  const articles = await getArticleSummaries()
  const act2 = articles.filter(isAct2).length
  const act1 = articles.length - act2
  return (
    <>
      <Splash />
      <ExPage>
        <Head
          icons={['blueprint', 'notice', 'sunglasses']}
          kicker="사장님, 무엇이 필요하세요?"
          title={<>필요한 건<br />AI로 직접 만드는 꾼.</>}
          lead="고르면 그 안으로 들어가요."
        />
        <Doors>
          <Door main href="/tools" icon="blueprint" title="AI 도구 설계도" desc="내 AI에 붙여 넣으면 가게 도구가 돼요" />
          <Door href="/content" icon="book" title="글 읽기" desc={`2막 ${act2}편 · 1막 ${act1}편`} />
          <Door href="/about" icon="sunglasses" title="김꾼은 누구" desc="5년 매장 운영, 지금은 더크루를 만들어요" />
          <Door href="/request" icon="request" title="도구 요청하기" desc="필요한 걸 말해 주세요" />
        </Doors>
      </ExPage>
    </>
  )
}
