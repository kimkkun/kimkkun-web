import { notFound } from 'next/navigation'
import { ExPage, Head, Fold, StepBox, Icon } from '@/components/explore/Explore'
import CopyBig from '@/components/explore/CopyBig'
import { BLUEPRINTS, findBlueprint, blueprintHref } from '@/lib/blueprints'

export const generateStaticParams = () => BLUEPRINTS.map((b) => ({ topic: b.topic, bp: b.slug }))

export default async function WebPage({ params }: { params: Promise<{ topic: string; bp: string }> }) {
  const { bp } = await params
  const b = findBlueprint(bp)
  if (!b) notFound()
  return (
    <ExPage back={{ href: blueprintHref(b), label: b.title }} crumb="30분 · 웹페이지로">
      <Head kicker="30분 · 웹페이지로" title="칸 있는 페이지로 만들기" lead="코딩은 몰라도 돼요. 웹페이지를 만들어 주는 AI에 붙여 넣으면 끝." />
      <StepBox no={1} title="만들기 지시문 복사">
        <CopyBig text={b.web} />
      </StepBox>
      <StepBox no={2} title="붙여 넣을 곳">
        <div className="ex-ais" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer"><Icon name="logo-gemini" size={26} />제미나이<small>캔버스</small></a>
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer"><Icon name="logo-claude" size={26} />클로드<small>아티팩트</small></a>
        </div>
      </StepBox>
      <Fold title="지시문 내용 보기"><pre>{b.web}</pre></Fold>
      {b.webTip && <Fold title="만든 페이지가 마음에 안 들면">{b.webTip}</Fold>}
    </ExPage>
  )
}
