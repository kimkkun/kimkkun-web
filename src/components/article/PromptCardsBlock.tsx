interface PromptCardsBlockProps {
  content: string
}

interface PromptItem {
  category: string
  question: string
  tags: string[]
}

interface PromptCardsData {
  items: PromptItem[]
}

export default function PromptCardsBlock({ content }: PromptCardsBlockProps) {
  let data: PromptCardsData
  try {
    data = JSON.parse(content)
  } catch {
    return (
      <div className="my-8 p-4 border border-red-500/30 rounded text-xs text-red-400">
        [promptCards block: invalid JSON]
      </div>
    )
  }

  return (
    <div className="my-10 rounded-2xl bg-[#151515] border border-border overflow-hidden">
      {data.items.map((item, i) => (
        <div
          key={i}
          className={`px-6 py-5 flex flex-col md:flex-row md:items-start gap-3 md:gap-5 ${
            i !== data.items.length - 1 ? 'border-b border-border/50' : ''
          }`}
        >
          <span className="text-xs font-medium text-muted/60 whitespace-nowrap pt-0.5 md:w-[100px] md:flex-shrink-0">
            {item.category}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-foreground leading-snug mb-3">
              {item.question}
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, ti) => (
                <span
                  key={ti}
                  className="text-xs px-3 py-1 rounded-full bg-[#85B8CB]/15 text-[#85B8CB] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
