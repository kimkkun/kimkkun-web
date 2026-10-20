import { notFound } from 'next/navigation'
import { ExPage, Head, Fold, NextLink, StepBox, Icon } from '@/components/explore/Explore'
import CopyBig from '@/components/explore/CopyBig'
import { BLUEPRINTS, findBlueprint, blueprintHref, AI_LINKS, AI_ICON } from '@/lib/blueprints'

export const generateStaticParams = () => BLUEPRINTS.map((b) => ({ topic: b.topic, bp: b.slug }))

export default async function QuickPage({ params }: { params: Promise<{ topic: string; bp: string }> }) {
  const { bp } = await params
  const b = findBlueprint(bp)
  if (!b) notFound()
  const base = blueprintHref(b)
  return (
    <ExPage back={{ href: base, label: b.title }} crumb="1분 · 바로 써 보기">
      <Head kicker="1분 · 바로 써 보기" title="두 번만 누르면 돼요" />
      <StepBox no={1} title="지시문 복사">
        <CopyBig text={b.quick} />
      </StepBox>
      <StepBox no={2} title="쓰는 AI 열고 붙여 넣기">
        <div className="ex-ais">
          {AI_LINKS.map((a) => (
            <a key={a.ai} href={a.href} target="_blank" rel="noopener noreferrer">
              <Icon name={AI_ICON[a.ai]} size={26} />
              {a.name}
              <small className={a.ai === 'gemini' ? 'free' : ''}>{a.note}</small>
            </a>
          ))}
        </div>
      </StepBox>
      <p className="ex-note">붙여 넣으면 AI가 순서대로 물어봐요. 답만 하시면 돼요.</p>
      <Fold title="지시문 내용 보기"><pre>{b.quick}</pre></Fold>
      {b.stuck && <Fold title="막히는 칸이 있다면">{b.stuck}</Fold>}
      <NextLink href={`${base}/save`} hint="매번 붙여 넣기 귀찮다면" label="5분 · 저장하기" />
    </ExPage>
  )
}
