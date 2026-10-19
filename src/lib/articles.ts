import { createSupabaseClient } from '@/lib/supabase/client'
import { Article, Category } from '@/lib/types'

/* 2막 글은 분류 slug 'act2'로 묶는다. 번호 칸이 하나(겹치면 안 됨)라 2막은 101번부터 쓰고,
   화면에는 2막 안의 순서(101 → 2막 No.01)로 보인다. */
export const ACT2_SLUG = 'act2'
export const isAct2 = (a: { category?: Category }) => a.category?.slug === ACT2_SLUG
const pad2 = (n: number) => String(n).padStart(2, '0')
export const articleNo = (a: { number: number; category?: Category }) =>
  isAct2(a) ? `2막 No.${pad2(a.number - 100)}` : `No.${pad2(a.number)}`

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
