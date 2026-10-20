import { createSupabaseClient } from '@/lib/supabase/client'
import { Article } from '@/lib/types'

/* 글 한 편(본문 포함). 서버 화면에서만 쓴다. */
export async function getArticle(slug: string): Promise<Article | null> {
  const { data } = await createSupabaseClient()
    .from('articles')
    .select('*, category:categories(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}
