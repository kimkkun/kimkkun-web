import { createSupabaseClient } from '@/lib/supabase/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({
      error: 'Missing env vars',
      hasUrl: !!url,
      hasKey: !!key,
    })
  }

  try {
    const supabase = createSupabaseClient()
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('*')
    const { data: articles, error: artError } = await supabase
      .from('articles')
      .select('id, title, is_published')

    return NextResponse.json({
      envOk: true,
      url: url.substring(0, 30) + '...',
      categories: categories?.length ?? 0,
      catError: catError?.message ?? null,
      articles: articles?.length ?? 0,
      artError: artError?.message ?? null,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: msg })
  }
}
