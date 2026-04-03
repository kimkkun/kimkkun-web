interface InsightBlockProps {
  content: string
}

export default function InsightBlock({ content }: InsightBlockProps) {
  return (
    <div className="my-8 bg-[#E8A87C]/5 rounded-2xl p-6 border-l-4 border-[#E8A87C]">
      <span className="text-xs font-bold tracking-widest text-[#E8A87C] block mb-3">KEY INSIGHT</span>
      <p className="text-base font-medium leading-relaxed text-foreground">
        {content}
      </p>
    </div>
  )
}
