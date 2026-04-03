interface CompareBlockProps {
  content: string
}

export default function CompareBlock({ content }: CompareBlockProps) {
  const lines = content.split('\n').filter(Boolean)
  const before = lines.find(l => l.startsWith('BEFORE:'))?.replace('BEFORE:', '').trim() || ''
  const after = lines.find(l => l.startsWith('AFTER:'))?.replace('AFTER:', '').trim() || ''

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-border">
        <span className="text-xs font-bold tracking-widest text-muted/60 block mb-3">BEFORE</span>
        <p className="text-sm leading-relaxed text-muted">{before}</p>
      </div>
      <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-[#E8A87C]/30" style={{ borderLeftWidth: 3, borderLeftColor: '#E8A87C' }}>
        <span className="text-xs font-bold tracking-widest text-[#E8A87C] block mb-3">AFTER</span>
        <p className="text-sm leading-relaxed text-foreground">{after}</p>
      </div>
    </div>
  )
}
