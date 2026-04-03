import { createSupabaseClient } from '@/lib/supabase/client'
import { Category, Article } from '@/lib/types'
import HeroSection from '@/components/home/HeroSection'
import CategoryTabs from '@/components/home/CategoryTabs'

export const revalidate = 60

async function getCategories(): Promise<Category[]> {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')
  return data || []
}

async function getArticles(): Promise<Article[]> {
  const supabase = createSupabaseClient()
  const { data } = await supabase
    .from('articles')
    .select('*, category:categories(*)')
    .eq('is_published', true)
    .order('number', { ascending: true })
  return data || []
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
