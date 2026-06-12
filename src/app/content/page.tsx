import { createSupabaseClient } from '@/lib/supabase/client'
import { Category, Article } from '@/lib/types'
import CategoryTabs from '@/components/home/CategoryTabs'
import SectionLabel from '@/components/ui/SectionLabel'

export const dynamic = 'force-dynamic'

/* 글 목록 — 새 디자인 스펙이 나오기 전까지 기존 카드 그리드를 그대로 사용한다. */

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
      .order('number', { ascending: false })
    return data || []
  } catch {
    return []
  }
}

export const metadata = {
  title: '콘텐츠 — 김꾼',
  description: '고객·단골·브랜드·시스템·사장 이야기. 현장에서 배운 것들.',
}

export default async function ContentPage() {
  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ])

  return (
    <div className="pt-36 pb-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-5">
        <SectionLabel>Content</SectionLabel>
        <h1 className="kk-h1">콘텐츠</h1>
      </div>
      <CategoryTabs categories={categories} articles={articles} />
    </div>
  )
}
