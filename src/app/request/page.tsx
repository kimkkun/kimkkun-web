import HomeView from '@/components/renewal/HomeView'

export const metadata = { title: '도구 요청하기 — 김꾼' }

export default function RequestPage() {
  return <HomeView categories={[]} articles={[]} show={['request']} />
}
