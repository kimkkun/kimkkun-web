/* 2막 AI 도구 목록. 릴스 하나에 도구 하나씩 늘려 간다.
   새 도구: 여기에 한 줄 추가 + src/app/tools/<slug>/ 화면 + 필요하면 src/app/api/tools/<slug>/ */
export type Tool = {
  slug: string
  title: string
  desc: string // 카드 한 줄
  time: string // 걸리는 시간(사장님 눈높이)
  article?: string // 짝 글 주소(/content/...)
}

export const TOOLS: Tool[] = [
  {
    slug: 'job-post',
    title: '알바 공고 초안 만들기',
    desc: '가게 이야기와 조건만 적으면, AI가 빠진 걸 먼저 묻고 앱용·SNS용 공고 두 개를 써 줘요.',
    time: '3분',
    article: 'job-post-ai',
  },
]

export const findTool = (slug: string) => TOOLS.find((t) => t.slug === slug)
