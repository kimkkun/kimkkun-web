import Link from 'next/link'

const BRANDS = [
  {
    name: '스키당',
    handle: '@sukidang.official',
    description: '완벽한 대화에만 집중하는 시간',
    tags: ['오프라인 F&B', '직접 운영'],
    color: '#E8A87C',
  },
  {
    name: '일등고기',
    handle: '',
    description: '실패없는 고기 선택',
    tags: ['온라인 커머스', '직접 운영'],
    color: '#85B8CB',
  },
]

const TIMELINE = [
  { year: '', label: '주식 트레이딩', description: '숫자와 시스템의 세계에서 사업의 기초를 배우다' },
  { year: '', label: '스키당 론칭', description: '오프라인 F&B 브랜드를 직접 만들고 운영하다' },
  { year: '', label: '일등고기 론칭', description: '온라인 커머스로 영역을 확장하다' },
  { year: '', label: '김수환꾼 시작', description: '현장에서 검증한 브랜딩과 시스템을 기록하다' },
]

const PHILOSOPHY = [
  {
    title: '브랜딩은 복사 불가',
    description: 'AI가 대체 못하는 유일한 것은 당신의 이야기와 철학',
    color: '#E8A87C',
  },
  {
    title: '시스템이 자유를 만든다',
    description: '감으로 버티는 사업은 언젠가 무너진다',
    color: '#A8D8B9',
  },
  {
    title: '현장이 증명한다',
    description: '이론이 아닌 매일 매장에서 검증된 방법만',
    color: '#85B8CB',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* 히어로 */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            저는 강의만 하는 사람이 아닙니다.
            <br />
            <span className="text-muted">지금도 매장에 섭니다.</span>
          </h1>
          <p className="mt-6 text-muted leading-relaxed">
            이론이 아닌, 매일 현장에서 부딪히며 만든 브랜딩과 시스템을 이야기합니다.
          </p>
        </div>
      </section>

      {/* MY BRANDS */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-muted mb-8">
            MY BRANDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <div
                  className="w-12 h-12 rounded-full mb-4 flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: `${brand.color}20`, color: brand.color }}
                >
                  {brand.name[0]}
                </div>
                <h3 className="text-lg font-bold">{brand.name}</h3>
                {brand.handle && (
                  <p className="text-sm text-muted mt-1">{brand.handle}</p>
                )}
                <p className="text-sm text-muted mt-3 leading-relaxed">
                  {brand.description}
                </p>
                <div className="flex gap-2 mt-4">
                  {brand.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-muted mb-8">
            TIMELINE
          </h2>
          <div className="relative pl-8 border-l border-border space-y-10">
            {TIMELINE.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[2.55rem] top-1 w-3 h-3 rounded-full bg-foreground/30" />
                <h3 className="text-base font-bold">{item.label}</h3>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-muted mb-8">
            PHILOSOPHY
          </h2>
          <div className="space-y-4">
            {PHILOSOPHY.map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-2xl p-6 border-l-4"
                style={{ borderLeftColor: item.color }}
              >
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="text-sm text-muted mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            감으로 하던 사업,
            <br />
            시스템으로 바꾸고 싶다면.
          </h2>
          <Link
            href="/"
            className="inline-block mt-8 px-6 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
          >
            콘텐츠 보러 가기
          </Link>
        </div>
      </section>
    </div>
  )
}
