import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type SectionLabelProps = {
  number?: string
  children: ReactNode
  surface?: 'dark' | 'light'
} & ComponentPropsWithoutRef<'span'>

/**
 * SectionLabel — 브랜드의 길찾기 표식: Ochre 숫자 + 넓은 자간의 대문자 라틴 단어.
 * 아이콘을 대신한다.
 */
export default function SectionLabel({
  number,
  children,
  surface = 'dark',
  ...rest
}: SectionLabelProps) {
  const labelColor = surface === 'light' ? 'var(--ink-dim)' : 'var(--sage)'
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: 10,
        fontFamily: 'var(--font-sans)',
      }}
      {...rest}
    >
      {number != null && (
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--ochre)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {number}
        </span>
      )}
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: labelColor,
        }}
      >
        {children}
      </span>
    </span>
  )
}
