import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type CardProps = {
  children?: ReactNode
  number?: string
  label?: string
  title?: string
  body?: string
  href?: string
  surface?: 'dark' | 'light'
  flat?: boolean
} & Omit<ComponentPropsWithoutRef<'a'> & ComponentPropsWithoutRef<'div'>, 'title'>

/**
 * Card — 그림자 대신 1px 헤어라인으로 구분되는 평면 카드.
 * Ochre 번호, 대문자 라벨, 제목, 본문 옵션. href가 있으면 링크가 된다.
 */
export default function Card({
  children,
  number,
  label,
  title,
  body,
  href,
  surface = 'dark',
  flat = false,
  ...rest
}: CardProps) {
  const cls = [
    'kk-card',
    surface === 'light' ? 'kk-card-onlight' : '',
    href ? 'kk-card-link' : '',
    flat ? 'kk-card-flat' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {number != null && <span className="kk-card-num">{number}</span>}
      {label && <span className="kk-card-label">{label}</span>}
      {title && <h3 className="kk-card-title">{title}</h3>}
      {body && <p className="kk-card-body">{body}</p>}
      {children}
    </>
  )

  if (href) {
    if (href.startsWith('/')) {
      return (
        <Link className={cls} href={href} {...rest}>
          {content}
        </Link>
      )
    }
    return (
      <a className={cls} href={href} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <div className={cls} {...rest}>
      {content}
    </div>
  )
}
