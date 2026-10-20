import Link from 'next/link'
import { findTool } from '@/lib/tools'

/* 글 안에서 짝 도구로 보내는 칸. 내용은 "slug: 도구주소" 한 줄과, 있으면 "lead: 위에 붙일 한 줄".
   :::tool
   slug: job-post
   lead: 글 읽기 전에, 바로 해 보고 싶다면
   ::: */
export default function ToolBlock({ content }: { content: string }) {
  const slug = content.match(/^slug:\s*(.+)$/m)?.[1].trim() ?? ''
  const lead = content.match(/^lead:\s*(.+)$/m)?.[1].trim()
  const tool = findTool(slug)
  if (!tool) return null
  return (
    <Link className="rn-toolcta" href={`/tools/${tool.slug}`}>
      <span className="no">{lead || 'AI 도구로 바로 해 보기'}</span>
      <b>{tool.title}</b>
      <span className="d">{tool.desc}</span>
      <span className="btn">써 보기 · {tool.time} →</span>
    </Link>
  )
}
