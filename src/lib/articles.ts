import { createSupabaseClient } from '@/lib/supabase/client'
import { Article, Category } from '@/lib/types'

/* 글 목록에 필요한 칸만 가져온다(본문 content는 글 화면에서만). */
export type ArticleSummary = Pick<Article, 'id' | 'number' | 'title' | 'slug' | 'sub_copy' | 'category_id' | 'category'>

export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await createSupabaseClient().from('categories').select('*').order('sort_order')
    return data || []
  } catch {
    return []
  }
}

export async function getArticleSummaries(): Promise<ArticleSummary[]> {
  try {
    const { data } = await createSupabaseClient()
      .from('articles')
      .select('id, number, title, slug, sub_copy, category_id, category:categories(*)')
      .eq('is_published', true)
      .order('number', { ascending: false })
    return (data as unknown as ArticleSummary[]) || []
  } catch {
    return []
  }
}
