import { ExPage, Head, Doors, Door, NextLink } from '@/components/explore/Explore'
import { TOPICS, blueprintsOf } from '@/lib/blueprints'

export const metadata = {
  title: 'AI 도구 설계도 — 김꾼',
  description: '내 AI(제미나이·GPT·클로드)에 붙여 넣으면 우리 가게 전용 도구가 되는 설계도.',
}

export default function ToolsPage() {
  return (
    <ExPage back={{ href: '/', label: '처음' }}>
      <Head kicker="AI 도구 설계도" title="어떤 일이 귀찮으세요?" lead="주제를 고르면 그 일을 맡길 설계도가 나와요." />
      <Doors>
        {TOPICS.map((t) => (
          <Door key={t.slug} href={`/tools/${t.slug}`} icon={t.icon} title={t.title} desc={`설계도 ${blueprintsOf(t.slug).length}개`} />
        ))}
      </Doors>
      <NextLink href="/request" hint="찾는 게 없나요? 다음 설계도는 요청받은 것부터 만들어요" label="요청하기" />
    </ExPage>
  )
}
