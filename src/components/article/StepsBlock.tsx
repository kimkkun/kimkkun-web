interface StepsBlockProps {
  content: string
}

export default function StepsBlock({ content }: StepsBlockProps) {
  const steps = content.split('\n').filter(Boolean).map(line => {
    return line.replace(/^\d+\.\s*/, '').trim()
  })

  return (
    <div className="my-8 space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-4">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8D8B9]/15 text-[#A8D8B9] text-sm font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <p className="text-sm leading-relaxed text-foreground/85 pt-1">{step}</p>
        </div>
      ))}
    </div>
  )
}
