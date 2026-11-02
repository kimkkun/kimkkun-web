import { HOME, INTRO } from '@/components/v7/markup'
import { dataScript, getV7Data } from '@/lib/v7data'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const d = await getV7Data()
  return (
    <>
      <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: INTRO }} />
      <main className="kk-home" dangerouslySetInnerHTML={{ __html: HOME }} />
      <script id="kk-data" type="application/json" dangerouslySetInnerHTML={{ __html: dataScript(d) }} />
    </>
  )
}
