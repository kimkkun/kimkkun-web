import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parseBlocks } from '@/lib/parseBlocks'
import CompareBlock from '@/components/article/CompareBlock'
import ChecklistBlock from '@/components/article/ChecklistBlock'
import InsightBlock from '@/components/article/InsightBlock'
import StepsBlock from '@/components/article/StepsBlock'
import ExamplesBlock from '@/components/article/ExamplesBlock'
import KkunInfographicBlock from '@/components/article/KkunInfographicBlock'
import MetricCardsBlock from '@/components/article/MetricCardsBlock'
import PromptCardsBlock from '@/components/article/PromptCardsBlock'
import MediaBlock from '@/components/article/MediaBlock'
import CopyBlock from '@/components/article/CopyBlock'
import ToolBlock from '@/components/article/ToolBlock'

/* 글 본문(마크다운 + ::: 블록)을 그린다. 글 전체 화면과 2막 장(章) 화면이 같이 쓴다. */
function createMarkdownComponents() {
  let chapterCount = 0
  return {
  h2: ({ children }: { children?: React.ReactNode }) => {
    chapterCount++
    const num = String(chapterCount).padStart(2, '0')
    return (
      <div className="mt-16 mb-6">
        <div className="text-[13px] font-bold text-[var(--crew-accent)] mb-2">CHAPTER {num}</div>
        <h2 className="text-[26px] md:text-[30px] font-extrabold leading-snug tracking-[-0.04em]">{children}</h2>
      </div>
    )
  },
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-[21px] md:text-[23px] font-bold mt-12 mb-5 leading-snug tracking-[-0.03em]">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-[17px] md:text-[18px] leading-[1.9] text-[#333D4B] mb-6">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-[var(--crew-ink)] bg-[linear-gradient(transparent_60%,var(--crew-accent-soft)_60%)]">{children}</strong>
  ),
  hr: () => (
    <div className="my-14 flex justify-center">
      <div className="w-12 h-[2px] rounded bg-[var(--crew-line-strong)]" />
    </div>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-8 rounded-2xl bg-[var(--crew-accent-air)] px-5 py-4 text-[17px] leading-[1.8] text-[var(--crew-dusk)] [&_p]:mb-0">
      {children}
    </blockquote>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="space-y-2 my-6 ml-5 list-disc marker:text-[var(--crew-accent)]">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="space-y-2 my-6 ml-5 list-decimal marker:text-[var(--crew-accent)] marker:font-bold">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[17px] md:text-[18px] leading-[1.85] text-[#333D4B]">{children}</li>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 -mx-4 px-4 overflow-x-auto">
      <table className="w-full min-w-[560px] border-separate" style={{ borderSpacing: '0 6px' }}>{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead>{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="px-4 py-3 text-left text-[13px] font-bold text-[var(--crew-dusk)] bg-[var(--crew-bg)] first:rounded-l-xl last:rounded-r-xl align-top">{children}</th>
  ),
  td: ({ children, node }: { children?: React.ReactNode; node?: { position?: { start?: { column?: number } } } }) => {
    const isFirstCol = node?.position?.start?.column === 1
    return (
      <td className={`px-4 py-3.5 text-[15px] leading-relaxed bg-white shadow-[0_1px_3px_rgba(25,31,40,.06)] first:rounded-l-xl last:rounded-r-xl align-top ${isFirstCol ? 'font-semibold text-[var(--crew-accent)]' : 'text-[#333D4B]'}`}>{children}</td>
    )
  },
  }
}


export default function ArticleBody({ content }: { content: string }) {
  const blocks = parseBlocks(content)
  const markdownComponents = createMarkdownComponents()
  return (
    <div className="prose-custom">
      {blocks.map((block, i) => {
                switch (block.type) {
                  case 'compare':
                    return <CompareBlock key={i} content={block.content} />
                  case 'checklist':
                    return <ChecklistBlock key={i} content={block.content} />
                  case 'insight':
                    return <InsightBlock key={i} content={block.content} />
                  case 'steps':
                    return <StepsBlock key={i} content={block.content} />
                  case 'examples':
                    return <ExamplesBlock key={i} content={block.content} />
                  case 'infographic':
                    return <KkunInfographicBlock key={i} content={block.content} />
                  case 'metricCards':
                    return <MetricCardsBlock key={i} content={block.content} />
                  case 'promptCards':
                    return <PromptCardsBlock key={i} content={block.content} />
                  case 'photo':
                  case 'video':
                    return <MediaBlock key={i} kind={block.type} content={block.content} />
                  case 'copy':
                    return <CopyBlock key={i} content={block.content} />
                  case 'tool':
                    return <ToolBlock key={i} content={block.content} />
                  case 'summary':
                    return null
                  default:
                    return (
                      <Markdown key={i} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {block.content}
                      </Markdown>
                    )
                }
              })}
    </div>
  )
}
