export interface ContentBlock {
  type: 'markdown' | 'compare' | 'checklist' | 'insight' | 'steps' | 'examples'
  content: string
}

export function parseBlocks(markdown: string): ContentBlock[] {
  const blocks: ContentBlock[] = []
  const regex = /:::(compare|checklist|insight|steps|examples)\n([\s\S]*?):::/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(markdown)) !== null) {
    // 블록 앞의 일반 마크다운
    if (match.index > lastIndex) {
      const before = markdown.slice(lastIndex, match.index).trim()
      if (before) blocks.push({ type: 'markdown', content: before })
    }

    blocks.push({
      type: match[1] as ContentBlock['type'],
      content: match[2].trim(),
    })

    lastIndex = match.index + match[0].length
  }

  // 마지막 블록 이후의 마크다운
  if (lastIndex < markdown.length) {
    const remaining = markdown.slice(lastIndex).trim()
    if (remaining) blocks.push({ type: 'markdown', content: remaining })
  }

  // 특수 블록이 없으면 전체를 마크다운으로
  if (blocks.length === 0) {
    blocks.push({ type: 'markdown', content: markdown })
  }

  return blocks
}
