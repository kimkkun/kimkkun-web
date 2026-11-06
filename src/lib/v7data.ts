import { createSupabaseClient } from '@/lib/supabase/client'
import { isAct2, type ArticleSummary } from '@/lib/articles'
import { parseBlocks } from '@/lib/parseBlocks'

/* 무료 자료·첫 화면이 쓰는 글 목록과 AI 질문(복사 칸) 묶음.
   고민 분류(topics)는 DB에 칸이 없어 여기서 정한다. 1막 분류는 2026-11-02 AI가 제목을 보고 나눈 임시안. */
export type Topic = 'people' | 'money' | 'mkt' | 'ai'
export const TOPIC_NAME: Record<Topic, string> = { people: '직원·알바', money: '매출', mkt: '손님 모으기', ai: 'AI 쓰는 법' }

/* 콘텐츠 세 칸(2026-11-06 개편): 생각 · 프롬프트 · 정보·자료. 분류표 정본 = 사이트 작업 기록 work.md "개편 — 글 세 칸 분류표"(AI 초안, 수환 확인 전).
   1막은 정보·자료로 고른 번호 말고 전부 생각, 2막은 KIND2에 없으면 프롬프트. */
export type Kind = 'think' | 'prompt' | 'info'
export const KIND_NAME: Record<Kind, string> = { think: '생각', prompt: '프롬프트', info: '정보·자료' }
const KIND1_INFO = [15]
const KIND2: Record<string, Kind> = { 'online-owners': 'info' }
export const kindOf = (slug: string, number: number, act2: boolean): Kind =>
  act2 ? KIND2[slug] ?? 'prompt' : KIND1_INFO.includes(number) ? 'info' : 'think'

const ACT1: Record<Topic, number[]> = {
  people: [1, 4, 5, 10, 16, 20, 21, 22, 23, 24, 25, 26],
  money: [3, 6, 8, 9, 11, 12, 18, 19, 27, 29],
  mkt: [2, 7, 13, 14, 15, 17, 28],
  ai: [],
}
const ACT2: Record<string, { topics: Topic[]; short: string }> = {
  'job-post-ai': { topics: ['people', 'ai'], short: '알바 공고' },
  'customer-reviews': { topics: ['mkt', 'ai'], short: '손님 후기' },
  'ai-search-store': { topics: ['mkt', 'ai'], short: 'AI 검색' },
  'ai-review-loop': { topics: ['ai', 'mkt'], short: '규칙 메모' },
  'ai-food-photo': { topics: ['ai', 'mkt'], short: '메뉴 사진' },
  'online-owners': { topics: ['money', 'ai'], short: '온라인 판매' },
  'small-menu': { topics: ['money', 'ai'], short: '소짜 메뉴' },
}

export type V7Art = { slug: string; no: string; n: number; t: string; topics: Topic[]; kind: Kind; act: 1 | 2; prompts: number }
export type V7Prompt = { slug: string; no: string; art: string; short: string; h: string; when: string; body: string }
export type V7Data = { arts: V7Art[]; prompts: V7Prompt[] }

const pad2 = (n: number) => String(n).padStart(2, '0')
export const v7No = (a: { number: number; act2: boolean }) => (a.act2 ? `No.${a.number}` : `No.${pad2(a.number)}`)
export const topicsOf = (slug: string, number: number, act2: boolean): Topic[] => {
  if (act2) return ACT2[slug]?.topics ?? ['ai']
  const t = (Object.keys(ACT1) as Topic[]).filter((k) => ACT1[k].includes(number))
  return t.length ? t : ['money']
}

/* :::copy 칸 → AI 질문. 칸 머리의 title:/when: 을 읽는다 */
export function copyBlocks(content: string) {
  return parseBlocks(content)
    .filter((b) => b.type === 'copy')
    .map((b) => {
      const cut = b.content.indexOf('\n---\n')
      const head = cut >= 0 ? b.content.slice(0, cut) : ''
      return {
        h: head.match(/^title:\s*(.+)$/m)?.[1]?.trim() || '복사 칸',
        when: head.match(/^when:\s*(.+)$/m)?.[1]?.trim() || '',
        body: (cut >= 0 ? b.content.slice(cut + 5) : b.content).trim(),
      }
    })
}

export const showDrafts = process.env.NODE_ENV === 'development' && process.env.KK_SHOW_DRAFTS === '1'

/* 로컬 미리보기 전용: 아직 공개 안 한 글을 내 컴퓨터 파일(KK_DRAFTS_FILE, JSON 배열)에서 읽는다. 운영에서는 안 쓴다. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function localDrafts(): Promise<any[]> {
  if (!showDrafts || !process.env.KK_DRAFTS_FILE) return []
  const { readFile } = await import('node:fs/promises')
  try { return JSON.parse(await readFile(process.env.KK_DRAFTS_FILE, 'utf8')) } catch { return [] }
}

export async function getV7Data(): Promise<V7Data> {
  try {
    const q = createSupabaseClient()
      .from('articles')
      .select('number, title, slug, content, is_published, category:categories(slug)')
      .order('number', { ascending: false })
      .eq('is_published', true)
    const { data } = await q
    const extra = await localDrafts()
    const rows = ([...extra, ...((data as unknown as object[]) || [])].filter((r, i, a) => a.findIndex((x) => (x as { slug: string }).slug === (r as { slug: string }).slug) === i) as unknown as (Pick<ArticleSummary, 'number' | 'title' | 'slug'> & { content: string; category?: { slug: string } })[]) || []
    rows.sort((a, b) => b.number - a.number)
    const prompts: V7Prompt[] = []
    const arts: V7Art[] = rows.map((r) => {
      const act2 = isAct2(r as never)
      const no = v7No({ number: r.number, act2 })
      const cps = act2 ? copyBlocks(r.content) : []
      cps.forEach((c) => prompts.push({ slug: r.slug, no, art: r.title, short: ACT2[r.slug]?.short ?? r.title.slice(0, 8), ...c }))
      return { slug: r.slug, no, n: r.number, t: r.title, topics: topicsOf(r.slug, r.number, act2), kind: kindOf(r.slug, r.number, act2), act: act2 ? 2 : 1, prompts: cps.length }
    })
    arts.sort((a, b) => b.act - a.act || b.n - a.n)
    return { arts, prompts }
  } catch {
    return { arts: [], prompts: [] }
  }
}

/* 페이지에 넣는 데이터 칸(public/v7/site.js가 읽는다) */
export const dataScript = (d: V7Data) => JSON.stringify(d).replace(/</g, '\\u003c')
