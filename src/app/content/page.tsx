import { LIB } from '@/components/v7/markup'
import { dataScript, getV7Data } from '@/lib/v7data'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: '무료 자료 — 김꾼',
  description: '읽고, 복사해서, 바로 따라 하세요. 김꾼 글 전체와 복사해서 쓰는 AI 질문, 전부 무료.',
}

export default async function ContentPage() {
  const d = await getV7Data()
  return (
    <>
      <main className="kk-lib" dangerouslySetInnerHTML={{ __html: LIB }} />
      <script id="kk-data" type="application/json" dangerouslySetInnerHTML={{ __html: dataScript(d) }} />
    </>
  )
}
