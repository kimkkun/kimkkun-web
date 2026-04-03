interface ExamplesBlockProps {
  content: string
}

export default function ExamplesBlock({ content }: ExamplesBlockProps) {
  const items = content.split('\n').filter(Boolean).map(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex === -1) return { label: '', desc: line.trim() }
    return {
      label: line.slice(0, colonIndex).trim(),
      desc: line.slice(colonIndex + 1).trim(),
    }
  })

  const colors = ['#E8A87C', '#85B8CB', '#A8D8B9', '#C3A6D8', '#E8A87C']

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-card rounded-xl p-4 border border-border"
          style={{ borderTopWidth: 2, borderTopColor: colors[i % colors.length] }}
        >
          <span
            className="text-xs font-bold block mb-2"
            style={{ color: colors[i % colors.length] }}
          >
            {item.label}
          </span>
          <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  )
}
