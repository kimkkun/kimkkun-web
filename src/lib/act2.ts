/* 2막 글을 탐험형으로 나눈다: 맨 앞 :::summary(1분 요약)·:::tool(짝 설계도), 나머지는 ## 제목마다 한 장(章).
   첫 ## 앞의 글은 "들어가며" 장이 된다. */
export type Chapter = { title: string; body: string }

const block = (content: string, type: string) => content.match(new RegExp(`:::${type}\\n([\\s\\S]*?):::`))?.[1].trim()

export function summaryOf(content: string): string[] {
  const s = block(content, 'summary')
  return s ? s.split('\n').map((l) => l.replace(/^[-*]\s*/, '').trim()).filter(Boolean) : []
}

export function blueprintOf(content: string): string | undefined {
  return block(content, 'tool')?.match(/^slug:\s*(.+)$/m)?.[1].trim()
}

export function chaptersOf(content: string): Chapter[] {
  const body = content.replace(/:::(summary|tool)\n[\s\S]*?:::\n?/g, '').trim()
  const parts = body.split(/^## +/m)
  const out: Chapter[] = []
  // 장 앞뒤에 남는 구분선(---)만 지운다. 본문 안(복사 칸의 --- 등)은 건드리지 않는다.
  const edge = (t: string) => t.trim().replace(/^(-{3,}\s*\n)+/, '').replace(/(\n\s*-{3,})+$/, '').trim()
  const intro = edge(parts[0])
  if (intro) out.push({ title: '들어가며', body: intro })
  for (const part of parts.slice(1)) {
    const nl = part.indexOf('\n')
    const title = (nl < 0 ? part : part.slice(0, nl)).trim()
    const rest = edge(nl < 0 ? '' : part.slice(nl + 1))
    out.push({ title, body: rest })
  }
  return out
}
