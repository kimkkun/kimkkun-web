import Link from 'next/link'
import { TOOLS } from '@/lib/tools'

export const metadata = {
  title: 'AI 도구 — 김꾼',
  description: '읽지 말고 바로 써 보세요. 김꾼이 사장님 일에 맞춰 만든 작은 AI 도구들.',
}

/* AI 도구 진열장. 도구는 src/lib/tools.ts 목록에서 온다. */
export default function ToolsPage() {
  return (
    <div className="rn tiles">
      <section className="tile" style={{ paddingBottom: 56 }}>
        <div className="in">
          <p className="eyebrow">AI 도구</p>
          <h1 className="h1">읽지 말고,<br />바로 써 보세요.</h1>
          <p className="sub">김꾼이 사장님 일에 맞춰 만든 작은 AI 도구. 로그인 없이 써요.</p>
          <div className="rn-tools">
            {TOOLS.map((t, i) => (
              <Link key={t.slug} className="rn-tool" href={`/tools/${t.slug}`}>
                <span className="no">TOOL {String(i + 1).padStart(2, '0')} · {t.time}</span>
                <b>{t.title}</b>
                <span className="d">{t.desc}</span>
                <span className="go">써 보기 →</span>
              </Link>
            ))}
            <div className="rn-tool soon">
              <span className="no">NEXT</span>
              <b>다음 도구 만드는 중</b>
              <span className="d">필요한 도구가 있으면 요청해 주세요. 많이 요청받은 것부터 만들어요.</span>
              <Link className="go" href="/#request">요청하기 →</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
