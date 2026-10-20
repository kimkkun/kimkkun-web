import { ExPage, Head, Doors, Door } from '@/components/explore/Explore'
import { articleNo } from '@/lib/articles'
import { blueprintOf, chaptersOf, summaryOf } from '@/lib/act2'
import { findBlueprint, blueprintHref } from '@/lib/blueprints'
import type { Article } from '@/lib/types'

/* 2막 글 첫 화면: 제목 + 문 세 개(설계도 받기 · 1분 요약 · 자세히 읽기). 본문은 장(章)으로 나눠 골라 읽는다. */
export default function Act2Landing({ article }: { article: Article }) {
  const bp = findBlueprint(blueprintOf(article.content) || '')
  const sum = summaryOf(article.content)
  const chapters = chaptersOf(article.content)
  return (
    <ExPage back={{ href: '/content/act2', label: '2막 글' }}>
      <Head kicker={articleNo(article)} title={article.title} />
      <p className="ex-meta" style={{ margin: '-12px 0 18px' }}>
        <span>{article.author}</span>
        {article.reading_time ? <span>{article.reading_time}분 읽기</span> : null}
      </p>
      <p className="ex-lead" style={{ margin: '0 0 18px' }}>어떻게 볼까요?</p>
      <Doors>
        {bp && <Door main href={blueprintHref(bp)} icon="blueprint" title="설계도 받기" desc={`${bp.promise} · 1분`} />}
        {sum.length > 0 && <Door href={`/content/${article.slug}/summary`} icon="timer" title="1분 요약" desc={`핵심 ${sum.length}줄만`} />}
        <Door href={`/content/${article.slug}/read`} icon="book" title="자세히 읽기" desc={`${chapters.length}개 장 · 골라 읽기`} />
      </Doors>
    </ExPage>
  )
}
