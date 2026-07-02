import Link from 'next/link'
import { BRAND } from '@/lib/constants'

const BRANDS = [
  {
    name: '스키당',
    meta: '@sukidang.official',
    tagline: '모임을 경험으로 설계하다',
    points: [
      '대흥점 · 교대점 운영',
      '"여기 어떻게 알았어?" 리뷰가 가장 많은 샤브샤브',
    ],
    color: '#E8A87C',
  },
  {
    name: '일등고기',
    meta: 'OPENING · 2026',
    tagline: '실패 없는 고기 선택',
    points: [
      '듀록 삼겹살 전문',
      '고주파 해동 시스템',
      '업계 직거래 유통',
    ],
    color: '#85B8CB',
  },
]

const PHILOSOPHY = [
  {
    title: '하나. 매출이 아니라 순이익을 본다.',
    description:
      '매달 1억 팔고 0원 남던 사장이었습니다. 그 1년이 알려준 건 하나입니다. 매출은 허영이고, 순이익만이 진실입니다.',
    color: '#C9A96E',
  },
  {
    title: '둘. 직원 문제는 시스템 문제다.',
    description:
      '직원이 일을 못하는 게 아니라, 기준이 없는 겁니다. 사장이 매번 다르게 답하면, 직원은 매번 다르게 일합니다.',
    color: '#A8D8B9',
  },
  {
    title: '셋. 콘텐츠 100개보다 메시지 한 줄이다.',
    description:
      '"여기 뭐 하는 곳이야?"에 한 문장으로 답할 수 없으면, 콘텐츠 100개는 0개와 같습니다.',
    color: '#85B8CB',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-[11px] font-bold tracking-[0.25em] text-muted/50 mb-8">
            PROFILE
          </div>
          <h1 className="text-3xl md:text-5xl font-black leading-[1.25] tracking-tight">
            매달 <span className="text-[#C9A96E]">1억</span>씩 팔았습니다.
            <br />
            순이익은 <span className="text-[#E8A87C]">0원</span>이었습니다.
          </h1>
          <div className="mt-10 space-y-5 text-[17px] leading-[1.9] text-foreground/80">
            <p>
              통장은 매달 비었고, 주변엔 &ldquo;잘 되시네요&rdquo;라는 말만 들렸습니다.
            </p>
            <p className="text-foreground/95">
              &ldquo;왜 열심히 했는데 남는 게 없지?&rdquo;
            </p>
            <p className="text-foreground font-medium">
              그 질문이 김꾼의 시작이었습니다.
            </p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-muted mb-8">
            WHY
          </h2>
          <div className="space-y-7 text-[17px] leading-[2] text-foreground/85">
            <p className="text-xl md:text-2xl font-bold leading-[1.5] text-foreground">
              매출은 마케팅으로 만들 수 있습니다.
              <br />
              수익은 브랜드로 만들어야 합니다.
            </p>
            <p>
              마케팅만 잘하면 매출 10억도 가능합니다. 근데 순이익률 10%를 못 넘기면, 매출 1억짜리 100% 순이익 사장과 같은 돈을 법니다.{' '}
              <span className="text-foreground font-medium">
                다만 100배 더 일했을 뿐입니다.
              </span>
            </p>
            <p>
              그래서 다 뜯어고쳤습니다. 정체성을 다시 정의하고, 메시지를 바꾸고, 시스템을 깔았습니다.
            </p>
          </div>
        </div>
      </section>

      {/* NOW */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs font-bold tracking-widest text-muted mb-8">
            NOW
          </h2>
          <div className="space-y-7 text-[17px] leading-[2] text-foreground/85">
            <p>
              지금도 매장에 섭니다.{' '}
              <span className="text-foreground font-medium">
                스키당 카운터에서 손님과 인사하고, 메뉴를 직접 다듬습니다.
              </span>
            </p>
            <p>
              그리고 곧 일등고기를 엽니다. 온라인 고기 시장의 &ldquo;사면 후회하는 경험&rdquo;을 다시 설계하는 중입니다.
            </p>
            <p className="text-xl md:text-2xl font-bold leading-tight text-foreground pt-3">
              이게 제 자격증입니다.
            </p>
            <p>
              컨설턴트가 아니라,{' '}
              <span className="text-foreground font-medium">
                사장이 사장에게 전하는 이야기.
              </span>{' '}
              김꾼이 하는 일입니다.
            </p>
          </div>
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
                className="bg-card rounded-2xl p-7 border border-border"
              >
                <div
                  className="w-12 h-12 rounded-full mb-5 flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: `${brand.color}20`, color: brand.color }}
                >
                  {brand.name[0]}
                </div>
                <h3 className="text-lg font-bold">{brand.name}</h3>
                <p className="text-xs tracking-wider text-muted mt-1">{brand.meta}</p>
                <p className="text-base font-medium mt-5 leading-snug">{brand.tagline}</p>
                <ul className="mt-4 space-y-2">
                  {brand.points.map((point, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted leading-relaxed flex gap-2"
                    >
                      <span className="text-muted/40 mt-0.5">·</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
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
                className="bg-card rounded-2xl p-7 border-l-4"
                style={{ borderLeftColor: item.color }}
              >
                <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                <p className="text-[15px] text-muted mt-3 leading-[1.85]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold leading-tight">
            감으로 하던 사업,
            <br />
            시스템으로 바꾸고 싶다면.
          </h2>
          <p className="mt-6 text-muted leading-relaxed">
            한 줄이어도 좋습니다.
            <br />
            DM으로 사업 고민 보내주세요.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-sm font-medium bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all"
            >
              인스타 DM 보내기 → {BRAND.instagram}
            </a>
            <Link
              href="/"
              className="inline-block px-6 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
            >
              콘텐츠 더 보러 가기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
