export interface Category {
  id: string
  name: string
  slug: string
  color: string
  gradient: string
  sort_order: number
}

export interface Article {
  id: string
  number: number
  title: string
  slug: string
  sub_copy: string
  category_id: string
  category?: Category
  content: string
  author: string
  reading_time: number
  reels_url: string | null
  is_published: boolean
  published_at: string
  created_at: string
  updated_at: string
}
