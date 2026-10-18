interface CompareBlockProps {
  content: string
}

export default function CompareBlock({ content }: CompareBlockProps) {
  const lines = content.split('\n').filter(Boolean)
  const before = lines.find(l => l.startsWith('BEFORE:'))?.replace('BEFORE:', '').trim() || ''
  const after = lines.find(l => l.startsWith('AFTER:'))?.replace('AFTER:', '').trim() || ''

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <div className="bg-white shadow-[0_1px_3px_rgba(25,31,40,.06)] rounded-2xl p-5 border border-border">
        <span className="text-xs font-bold tracking-widest text-muted/60 block mb-3">BEFORE</span>
        <p className="text-[15px] leading-relaxed text-muted">{before}</p>
      </div>
      <div className="bg-white shadow-[0_1px_3px_rgba(25,31,40,.06)] rounded-2xl p-5 border border-[#115EF9]/30" style={{ borderLeftWidth: 3, borderLeftColor: '#115EF9' }}>
        <span className="text-xs font-bold tracking-widest text-[#115EF9] block mb-3">AFTER</span>
        <p className="text-[15px] leading-relaxed text-foreground">{after}</p>
      </div>
    </div>
  )
}
