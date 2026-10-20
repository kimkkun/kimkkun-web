import Link from 'next/link'
import JobPostTool from '@/components/tools/JobPostTool'
import { findTool } from '@/lib/tools'

const tool = findTool('job-post')!

export const metadata = {
  title: `${tool.title} — 김꾼 AI 도구`,
  description: tool.desc,
}

export default function JobPostPage() {
  return (
    <div className="rn pb-20">
      <header className="rn-art-head in">
        <div className="no">AI 도구 · TOOL 01 · {tool.time}</div>
        <h1>{tool.title}</h1>
        <p className="lede">{tool.desc}</p>
        {tool.article && (
          <div className="meta"><Link href={`/content/${tool.article}`}>왜 이렇게 쓰는지 글로 보기 →</Link></div>
        )}
      </header>
      <div className="in">
        <div className="max-w-[640px] mx-auto pt-6">
          <JobPostTool />
        </div>
      </div>
    </div>
  )
}
