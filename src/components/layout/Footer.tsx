import { BRAND } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span className="font-bold tracking-wider text-foreground">
          {BRAND.siteTitle}
        </span>
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          {BRAND.instagram}
        </a>
      </div>
    </footer>
  )
}
