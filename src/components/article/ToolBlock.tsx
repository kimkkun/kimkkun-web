import Link from 'next/link'
import { findBlueprint, blueprintHref } from '@/lib/blueprints'

/* 글 안에서 짝 설계도로 보내는 칸. 내용은 "slug: 설계도주소" 한 줄과, 있으면 "lead: 위에 붙일 한 줄".
   2막 글 첫 화면에서는 이 칸이 "설계도 받기" 문이 된다(src/lib/act2.ts). */
export default function ToolBlock({ content }: { content: string }) {
  const slug = content.match(/^slug:\s*(.+)$/m)?.[1].trim() ?? ''
  const lead = content.match(/^lead:\s*(.+)$/m)?.[1].trim()
  const bp = findBlueprint(slug)
  if (!bp) return null
  return (
    <Link className="rn-toolcta" href={blueprintHref(bp)}>
      <span className="no">{lead || 'AI 도구 설계도'}</span>
      <b>{bp.title} 설계도</b>
      <span className="d">{bp.promise}</span>
      <span className="btn">설계도 받기 →</span>
    </Link>
  )
}
