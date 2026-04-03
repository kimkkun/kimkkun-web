import { createSupabaseClient } from '@/lib/supabase/client'
import { Category, Article } from '@/lib/types'
import HeroSection from '@/components/home/HeroSection'
import CategoryTabs from '@/components/home/CategoryTabs'

export const dynamic = 'force-dynamic'

async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createSupabaseClient()
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order')
    return data || []
  } catch {
    return []
  }
}

async function getArticles(): Promise<Article[]> {
  try {
    const supabase = createSupabaseClient()
    const { data } = await supabase
      .from('articles')
      .select('*, category:categories(*)')
      .eq('is_published', true)
      .order('number', { ascending: true })
    return data || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ])

  return (
    <>
      <HeroSection />
      <CategoryTabs categories={categories} articles={articles} />
    </>
  )
}
