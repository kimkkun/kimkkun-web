import { notFound } from 'next/navigation'
import { ExPage, Head, Doors, Door, Fold } from '@/components/explore/Explore'
import { BLUEPRINTS, findBlueprint, blueprintHref, AI_ICON } from '@/lib/blueprints'

export const generateStaticParams = () => BLUEPRINTS.map((b) => ({ topic: b.topic, bp: b.slug }))

export default async function SavePage({ params }: { params: Promise<{ topic: string; bp: string }> }) {
  const { bp } = await params
  const b = findBlueprint(bp)
  if (!b) notFound()
  const base = blueprintHref(b)
  return (
    <ExPage back={{ href: base, label: b.title }} crumb="5분 · 내 도구로 저장">
      <Head kicker="5분 · 내 도구로 저장" title="어떤 AI를 쓰세요?" lead={'한 번 저장하면 다음부터 "공고 쓰자"만 치면 돼요.'} />
      <Doors>
        {b.save.map((g, i) => (
          <Door key={g.ai} main={i === 0} href={`${base}/save/${g.ai}`} icon={AI_ICON[g.ai]} title={g.name} tag={g.free ? '무료' : undefined} desc={`${g.how} · ${g.steps.length}단계`} />
        ))}
      </Doors>
      <Fold title="아직 1분 버전을 안 해 봤다면">먼저 1분 버전으로 한 번 써 보고 오세요. 저장할 때도 같은 지시문을 써요.</Fold>
      {b.saveTip && <Fold title="한 번 더 편하게">{b.saveTip}</Fold>}
    </ExPage>
  )
}
