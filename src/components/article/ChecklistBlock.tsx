'use client'

import { useState } from 'react'

interface ChecklistBlockProps {
  content: string
}

export default function ChecklistBlock({ content }: ChecklistBlockProps) {
  const parsed = content.split('\n').filter(Boolean).map(line => {
    const defaultChecked = line.includes('[x]')
    const text = line.replace(/^-\s*\[[ x]\]\s*/, '').trim()
    return { defaultChecked, text }
  })

  const [checks, setChecks] = useState<boolean[]>(parsed.map(p => p.defaultChecked))

  const toggle = (index: number) => {
    setChecks(prev => prev.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <div className="my-8 bg-card rounded-2xl p-6 border border-border">
      <div className="space-y-3">
        {parsed.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className="flex items-start gap-3 w-full text-left cursor-pointer group"
          >
            <span className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs transition-all ${
              checks[i]
                ? 'bg-[#A8D8B9]/20 text-[#A8D8B9] border border-[#A8D8B9]/30'
                : 'bg-[#1a1a1a] text-muted/40 border border-border group-hover:border-foreground/30'
            }`}>
              {checks[i] ? '✓' : ''}
            </span>
            <span className={`text-sm leading-relaxed transition-colors ${checks[i] ? 'text-foreground' : 'text-muted'}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
