import { notFound } from 'next/navigation'
import { ExPage, Head, Doors, Door } from '@/components/explore/Explore'
import { TOPICS, findTopic, blueprintsOf, blueprintHref } from '@/lib/blueprints'

export const generateStaticParams = () => TOPICS.map((t) => ({ topic: t.slug }))

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const t = findTopic(topic)
  if (!t) notFound()
  const list = blueprintsOf(t.slug)
  return (
    <ExPage back={{ href: '/tools', label: 'AI 도구 설계도' }}>
      <Head kicker={t.title} title={`${t.title} 설계도`} lead="하나를 고르세요." />
      <Doors>
        {list.map((b, i) => (
          <Door key={b.slug} main={i === 0} href={blueprintHref(b)} icon={b.icon} title={b.title} desc={b.short} />
        ))}
      </Doors>
    </ExPage>
  )
}
