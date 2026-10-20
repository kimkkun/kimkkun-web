import Link from 'next/link'
import { ACT2_SLUG, getArticleSummaries, getCategories, isAct2 } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '1막 서고 — 김꾼',
  description: '장사의 기본. 고객·단골·브랜드·시스템·사장 이야기, 5년간 가게를 직접 운영하며 배운 것.',
}

const pad = (n: number) => String(n).padStart(2, '0')

/* 1막 글 전체 — 분류별 칸. 첫 화면의 1막 서고 칸에서 분류를 누르면 여기의 해당 칸으로 온다. */
export default async function ContentPage() {
  const [allCategories, allArticles] = await Promise.all([getCategories(), getArticleSummaries()])
  // 1막 서고에는 2막 글을 넣지 않는다
  const categories = allCategories.filter((c) => c.slug !== ACT2_SLUG)
  const articles = allArticles.filter((a) => !isAct2(a))

  return (
    <div className="rn tiles">
      <section className="tile" style={{ paddingBottom: 40 }}>
        <div className="in">
          <p className="eyebrow">1막 서고</p>
          <h1 className="h1">장사의 기본 {articles.length}편.</h1>
          <p className="sub">2막이 서 있는 바닥. 5년간 가게를 직접 운영하며 배운 것.</p>
          <div className="chips">
            {categories.map((c) => (
              <a key={c.id} className="chip" href={`#${c.slug}`}>
                {c.name}
                <b>{articles.filter((a) => a.category_id === c.id).length}</b>
              </a>
            ))}
          </div>
        </div>
      </section>

      {categories.map((c, i) => {
        const list = articles.filter((a) => a.category_id === c.id)
        if (!list.length) return null
        return (
          <section key={c.id} id={c.slug} className={'tile ' + (i % 2 ? 'white' : '')} style={{ paddingBottom: 40, scrollMarginTop: 60 }}>
            <div className="in">
              <h2 className="h2">{c.name}</h2>
              <p className="call">{list.length}편</p>
              <div className="minis">
                {list.map((a) => (
                  <Link key={a.id} className="mini" href={`/content/${a.slug}`}>
                    <span className="n">{pad(a.number)}</span>
                    <span className="tt">{a.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
