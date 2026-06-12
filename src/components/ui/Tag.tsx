import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react'

type TagProps = {
  children: ReactNode
  variant?: 'default' | 'muted' | 'accent'
  surface?: 'dark' | 'light'
} & ComponentPropsWithoutRef<'span'>

/**
 * Tag — 작은 카테고리/메타 칩. 헤어라인 테두리, 각진 모서리, 채움 없음
 * (드물게 쓰는 `accent` 제외). 콘텐츠 카테고리와 메타데이터에 사용.
 */
export default function Tag({
  children,
  variant = 'default',
  surface = 'dark',
  ...rest
}: TagProps) {
  const onLight = surface === 'light'
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.01em',
    padding: '6px 11px',
    borderRadius: 'var(--radius-2)',
    border: '1px solid',
  }
  const variants: Record<string, CSSProperties> = {
    default: {
      color: onLight ? 'var(--ink)' : 'var(--cream)',
      borderColor: onLight ? 'var(--sage-line-ink)' : 'var(--sage-line)',
      background: 'transparent',
    },
    muted: {
      color: onLight ? 'var(--ink-dim)' : 'var(--sage)',
      borderColor: onLight ? 'var(--sage-line-ink)' : 'var(--sage-line)',
      background: 'transparent',
    },
    accent: {
      color: 'var(--ochre)',
      borderColor: 'var(--ochre-line)',
      background: 'var(--ochre-soft)',
    },
  }
  return (
    <span style={{ ...base, ...variants[variant] }} {...rest}>
      {children}
    </span>
  )
}
