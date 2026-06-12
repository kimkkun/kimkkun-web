import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import { BRAND } from '@/lib/constants'

/* CTA — 시작. forest-deep 평면. 사이트의 단 하나뿐인 Ochre 순간이 여기 산다. 인스타그램으로 연결. */
export default function Cta() {
  return (
    <section className="kk-section deep" id="start">
      <div className="kk-container kk-cta-wrap">
        <div className="kk-sec-head" data-reveal>
          <SectionLabel number="04">Start</SectionLabel>
          <h2 className="kk-sec-title">
            다음 손님부터,
            <br />
            다르게.
          </h2>
          <p className="kk-cta-lead">팔로우하고, 다음 손님부터 다르게 맞이하세요.</p>
        </div>
        <div className="kk-cta-actions" data-reveal>
          <Button variant="accent" size="lg" href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
            인스타그램 팔로우 {BRAND.instagram}
          </Button>
          <Button variant="ghost" size="lg" href="/content">
            콘텐츠 먼저 보기 →
          </Button>
        </div>
      </div>
    </section>
  )
}
