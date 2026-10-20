import { notFound } from 'next/navigation'
import { ExPage, Head, Doors, Door, Fold, NextLink } from '@/components/explore/Explore'
import { BLUEPRINTS, findBlueprint, findTopic, blueprintHref } from '@/lib/blueprints'

export const generateStaticParams = () => BLUEPRINTS.map((b) => ({ topic: b.topic, bp: b.slug }))

export default async function BlueprintPage({ params }: { params: Promise<{ topic: string; bp: string }> }) {
  const { topic, bp } = await params
  const b = findBlueprint(bp)
  const t = findTopic(topic)
  if (!b || !t || b.topic !== t.slug) notFound()
  const base = blueprintHref(b)
  return (
    <ExPage back={{ href: `/tools/${t.slug}`, label: t.title }}>
      <Head kicker={`설계도 · ${b.title}`} title={b.promise} lead="얼마나 해 볼지 고르세요. 1분이면 바로 써요." />
      <Doors>
        <Door main href={`${base}/quick`} title="1분 · 바로 써 보기" desc="복사해서 AI 대화창에 붙여 넣기" />
        <Door href={`${base}/save`} title="5분 · 내 도구로 저장" desc="매번 붙여 넣지 않게 AI 안에 저장" />
        <Door href={`${base}/web`} title="30분 · 웹페이지로" desc="직원도 같이 쓰는 칸 있는 페이지" />
      </Doors>
      <Fold title="이 도구가 뭘 해 주나요?">{b.does}</Fold>
      {b.article && <NextLink href={`/content/${b.article}`} hint="왜 이렇게 쓰는지 궁금하면" label="글로 보기" />}
    </ExPage>
  )
}
