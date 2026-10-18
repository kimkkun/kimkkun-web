interface InsightBlockProps {
  content: string
}

export default function InsightBlock({ content }: InsightBlockProps) {
  return (
    <div className="my-8 bg-[#115EF9]/5 rounded-2xl p-6 border-l-4 border-[#115EF9]">
      <span className="text-xs font-bold tracking-widest text-[#115EF9] block mb-3">KEY INSIGHT</span>
      <p className="text-base font-medium leading-relaxed text-foreground">
        {content}
      </p>
    </div>
  )
}
