import Link from 'next/link'
import { BRAND } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
          {BRAND.positioningLine1}
          <br />
          {BRAND.positioningLine2}
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted max-w-xl leading-relaxed">
          {BRAND.subCopy}
        </p>
        <Link
          href="/about"
          className="inline-block mt-8 px-6 py-3 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground hover:text-background transition-all"
        >
          더 알아보기
        </Link>
      </div>
    </section>
  )
}
