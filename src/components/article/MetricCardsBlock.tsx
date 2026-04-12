interface MetricCardsBlockProps {
  content: string
}

interface Metric {
  label: string
  value: string
  bar?: number
}

interface MetricCard {
  subtitle: string
  title: string
  accent: string
  metrics: Metric[]
}

interface MetricCardsData {
  title?: string
  cards: MetricCard[]
}

export default function MetricCardsBlock({ content }: MetricCardsBlockProps) {
  let data: MetricCardsData
  try {
    data = JSON.parse(content)
  } catch {
    return (
      <div className="my-8 p-4 border border-red-500/30 rounded text-xs text-red-400">
        [metricCards block: invalid JSON]
      </div>
    )
  }

  return (
    <div className="my-10">
      {data.title && (
        <h3 className="text-sm font-bold tracking-widest text-muted/60 mb-5 uppercase">
          {data.title}
        </h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.cards.map((card, ci) => (
          <div
            key={ci}
            className="bg-[#1a1a1a] rounded-2xl p-5 md:p-6 border border-border"
          >
            <span className="text-xs font-medium tracking-wider text-muted/60 block">
              {card.subtitle}
            </span>
            <h4 className="text-xl font-bold text-foreground mt-1 mb-5 leading-tight">
              {card.title}
            </h4>
            <div className="space-y-4">
              {card.metrics.map((metric, mi) => (
                <div key={mi}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-muted/80">{metric.label}</span>
                    <span className="text-sm font-bold text-foreground whitespace-nowrap">
                      {metric.value}
                    </span>
                  </div>
                  {metric.bar != null && (
                    <div className="h-1.5 rounded-full bg-border/50 mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(Math.max(metric.bar, 0), 100)}%`,
                          backgroundColor: card.accent,
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
