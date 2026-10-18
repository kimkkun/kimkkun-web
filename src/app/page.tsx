import HomeView from '@/components/renewal/HomeView'
import { getArticleSummaries, getCategories } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [categories, articles] = await Promise.all([getCategories(), getArticleSummaries()])
  return <HomeView categories={categories} articles={articles} />
}
