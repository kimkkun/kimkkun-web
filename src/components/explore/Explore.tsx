import Link from 'next/link'

/* 탐험형 화면 부품. 한 화면에는 큰 문(Door) 몇 개만 두고, 자세한 건 Fold(접힘) 안에 둔다.
   원칙: website/site/work.md "화면 설계 원칙 — 2026-10-20". 아이콘은 public/icons/<이름>.webp */

export function Icon({ name, size = 52 }: { name: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="ex-ic" src={`/icons/${name}.webp`} alt="" width={size} height={size} />
}

export function ExPage({ back, crumb, children }: { back?: { href: string; label: string }; crumb?: string; children: React.ReactNode }) {
  return (
    <div className="rn ex">
      {back && (
        <nav className="ex-back" aria-label="위치">
          <Link href={back.href}>← {back.label}</Link>
          {crumb && <span>{crumb}</span>}
        </nav>
      )}
      <div className="ex-in">{children}</div>
    </div>
  )
}

export function Head({ kicker, title, lead, icons }: { kicker?: string; title: React.ReactNode; lead?: React.ReactNode; icons?: string[] }) {
  return (
    <header className="ex-head">
      {icons && <div className="ex-heroic">{icons.map((n) => <Icon key={n} name={n} size={44} />)}</div>}
      {kicker && <p className="ex-kicker">{kicker}</p>}
      <h1 className="ex-title">{title}</h1>
      {lead && <p className="ex-lead">{lead}</p>}
    </header>
  )
}

type DoorProps = { href?: string; icon?: string; title: React.ReactNode; desc?: React.ReactNode; main?: boolean; tag?: string; external?: boolean }
export function Door({ href, icon, title, desc, main, tag, external }: DoorProps) {
  const cls = 'ex-door' + (main ? ' main' : '') + (icon ? ' has-ic' : '') + (href ? '' : ' off')
  const inner = (
    <>
      {icon && <Icon name={icon} />}
      <b>{title}{tag && <em>{tag}</em>}</b>
      {desc && <span>{desc}</span>}
      <i aria-hidden="true">{href ? '→' : '곧'}</i>
    </>
  )
  if (!href) return <div className={cls}>{inner}</div>
  if (external) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  return <Link className={cls} href={href}>{inner}</Link>
}

export function Doors({ children }: { children: React.ReactNode }) {
  return <div className="ex-doors">{children}</div>
}

export function Fold({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="ex-fold">
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  )
}

export function NextLink({ href, hint, label }: { href: string; hint: string; label: string }) {
  return (
    <Link className="ex-next" href={href}>
      <span>{hint}</span>
      <b>{label} →</b>
    </Link>
  )
}

export function StepBox({ no, title, children }: { no: number; title: string; children: React.ReactNode }) {
  return (
    <div className="ex-step">
      <h2><span>{no}</span>{title}</h2>
      {children}
    </div>
  )
}
