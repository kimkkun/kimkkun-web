interface ChecklistBlockProps {
  content: string
}

export default function ChecklistBlock({ content }: ChecklistBlockProps) {
  const items = content.split('\n').filter(Boolean).map(line => {
    const checked = line.includes('[x]')
    const text = line.replace(/^-\s*\[[ x]\]\s*/, '').trim()
    return { checked, text }
  })

  return (
    <div className="my-8 bg-card rounded-2xl p-6 border border-border">
      <div className="space-y-3">
        {items.map((item, i) => (
          <label key={i} className="flex items-start gap-3 cursor-default">
            <span className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs ${
              item.checked
                ? 'bg-[#A8D8B9]/20 text-[#A8D8B9] border border-[#A8D8B9]/30'
                : 'bg-[#1a1a1a] text-muted/40 border border-border'
            }`}>
              {item.checked ? '✓' : ''}
            </span>
            <span className={`text-sm leading-relaxed ${item.checked ? 'text-foreground' : 'text-muted'}`}>
              {item.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
