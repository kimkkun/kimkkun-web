import HomeView from '@/components/renewal/HomeView'
import { getArticleSummaries, getCategories } from '@/lib/articles'

export const dynamic = 'force-dynamic'
export const metadata = { title: '김꾼은 누구 — 김꾼' }

/* 김꾼 소개 → 직접 만든 더크루 → 숫자. 예전 첫 화면의 칸을 그대로 옮겨 왔다. */
export default async function AboutPage() {
  const [categories, articles] = await Promise.all([getCategories(), getArticleSummaries()])
  return <HomeView categories={categories} articles={articles} show={['about', 'made', 'numbers']} />
}
