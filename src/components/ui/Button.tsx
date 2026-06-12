import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  surface?: 'dark' | 'light'
  href?: string
  disabled?: boolean
} & Omit<ComponentPropsWithoutRef<'button'> & ComponentPropsWithoutRef<'a'>, 'href'>

/**
 * Button — 김꾼 액션. 절제된 형태, 4px 이하 모서리, 그림자 없음.
 * `accent`는 화면당 단 하나의 CTA(Ochre 헤어라인)에만 사용.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  surface = 'dark',
  href,
  disabled = false,
  type = 'button',
  ...rest
}: ButtonProps) {
  const cls = [
    'kk-btn',
    `kk-btn-${size}`,
    `kk-btn-${variant}`,
    surface === 'light' ? 'kk-btn-onlight' : '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href && !disabled) {
    if (href.startsWith('/')) {
      return (
        <Link className={cls} href={href} {...rest}>
          {children}
        </Link>
      )
    }
    return (
      <a className={cls} href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}
