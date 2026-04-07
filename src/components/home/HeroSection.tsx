import Link from 'next/link'
import { BRAND } from '@/lib/constants'

const FLOATING_KEYWORDS = [
  { text: '장사', top: '8%', left: '8%' },
  { text: '매출', top: '18%', right: '12%' },
  { text: '마케팅', top: '38%', left: '18%' },
  { text: '브랜딩', top: '28%', right: '25%' },
  { text: '장사', bottom: '35%', right: '8%' },
  { text: '매출', top: '55%', left: '5%' },
  { text: '마케팅', bottom: '22%', right: '18%' },
  { text: '브랜딩', top: '12%', left: '45%' },
]

const MARQUEE_ITEMS = [
  '성과를 내는 장사에는 구조가 있습니다.',
  'KIM.KKUN',
  '장사의 첫 걸음은 시스템 구축입니다.',
  'KIM.KKUN',
]

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden">
      {/* 떠다니는 키워드 배경 */}
      {FLOATING_KEYWORDS.map((kw, i) => (
        <span
          key={i}
          className="absolute text-sm md:text-base font-light tracking-widest select-none pointer-events-none"
          style={{
            top: kw.top,
            left: kw.left,
            right: kw.right,
            bottom: kw.bottom,
            color: 'var(--muted)',
            opacity: 0.2,
          }}
        >
          {kw.text}
        </span>
      ))}

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 px-6 pb-24 max-w-6xl mx-auto w-full">
        {/* 브랜드 라벨 */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs md:text-sm font-semibold tracking-wider" style={{ color: '#E8A87C' }}>
            KIM.KKUN
          </span>
          <span className="text-xs md:text-sm text-muted tracking-wider">
            [ content ]
          </span>
        </div>

        {/* 의문문 헤드라인 */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          {BRAND.positioningLine1}
          <br />
          {BRAND.positioningLine2}
        </h1>

        {/* 구분선 */}
        <div className="w-12 border-t border-foreground/30 mt-8 mb-6" />

        {/* 서브카피 */}
        <p className="text-sm md:text-base text-muted max-w-md leading-relaxed">
          {BRAND.subCopy}
        </p>

        {/* CTA 버튼 */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
        >
          더 알아보기
          <span className="text-base">→</span>
        </Link>
      </div>

      {/* 하단 마키 */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-border py-3 overflow-hidden">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="marquee-item text-xs md:text-sm text-muted/60 whitespace-nowrap">
              <span className="mx-6">•</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
