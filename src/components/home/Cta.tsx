import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'
import { BRAND } from '@/lib/constants'

/* CTA — 시작. forest-deep 평면. 사이트의 단 하나뿐인 Ochre 순간이 여기 산다. */
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
          <p className="kk-cta-lead">친구추가하고, 다음 손님부터 다르게 맞이하세요.</p>
        </div>
        <div className="kk-cta-actions" data-reveal>
          <Button variant="accent" size="lg" href={BRAND.kakaoChannelUrl} target="_blank" rel="noopener noreferrer">
            카카오채널 친구추가
          </Button>
          <Button variant="ghost" size="lg" href={BRAND.openChatUrl} target="_blank" rel="noopener noreferrer">
            오픈채팅 입장 →
          </Button>
        </div>
      </div>
    </section>
  )
}
