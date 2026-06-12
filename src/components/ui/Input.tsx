import type { ComponentPropsWithoutRef } from 'react'

type InputProps = {
  label?: string
  surface?: 'dark' | 'light'
} & ComponentPropsWithoutRef<'input'>

/**
 * Input — 한 줄 텍스트 필드. 헤어라인 테두리, 각진 모서리, Ochre 포커스 보더.
 * 대문자 라벨 옵션.
 */
export default function Input({
  label,
  surface = 'dark',
  id,
  type = 'text',
  ...rest
}: InputProps) {
  const onLight = surface === 'light'
  const fieldId =
    id || (label ? `kk-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined)
  return (
    <label className={`kk-field ${onLight ? 'kk-field-onlight' : ''}`} htmlFor={fieldId}>
      {label && <span className="kk-field-label">{label}</span>}
      <input
        id={fieldId}
        type={type}
        className={`kk-input ${onLight ? 'kk-input-onlight' : ''}`}
        {...rest}
      />
    </label>
  )
}
