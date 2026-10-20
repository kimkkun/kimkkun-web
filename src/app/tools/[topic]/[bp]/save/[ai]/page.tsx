import { notFound } from 'next/navigation'
import { ExPage, Head, NextLink } from '@/components/explore/Explore'
import CopyBig from '@/components/explore/CopyBig'
import Walk from '@/components/explore/Walk'
import { BLUEPRINTS, findBlueprint, blueprintHref } from '@/lib/blueprints'

export const generateStaticParams = () => BLUEPRINTS.flatMap((b) => b.save.map((g) => ({ topic: b.topic, bp: b.slug, ai: g.ai })))

export default async function SaveAiPage({ params }: { params: Promise<{ topic: string; bp: string; ai: string }> }) {
  const { bp, ai } = await params
  const b = findBlueprint(bp)
  const g = b?.save.find((x) => x.ai === ai)
  if (!b || !g) notFound()
  const base = blueprintHref(b)
  return (
    <ExPage back={{ href: `${base}/save`, label: '어떤 AI' }} crumb={`5분 · ${g.name}`}>
      <Head kicker={`5분 · ${g.name} ${g.how}`} title="한 단계씩 따라 하세요" />
      {g.warn && <p className="ex-warn">{g.warn}</p>}
      <Walk steps={g.steps} doneHref={base} />
      <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <span className="ex-note" style={{ margin: 0 }}>지시문이 필요하면</span>
        <CopyBig text={b.quick} label="지시문 복사" small />
      </div>
      <NextLink href={`${base}/web`} hint="직원도 같이 쓰게 하려면" label="30분 · 웹페이지" />
    </ExPage>
  )
}
