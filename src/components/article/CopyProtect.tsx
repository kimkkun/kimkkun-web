'use client'

import { useEffect } from 'react'

export default function CopyProtect({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const handleCopy = (e: ClipboardEvent) => {
      // 복사 칸(CopyBlock)의 단추 복사는 허용
      if ((e.target as Element | null)?.closest?.('[data-allow-copy]')) return
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+C, Ctrl+A, Ctrl+U (소스보기) 차단
      if ((e.ctrlKey || e.metaKey) && ['c', 'a', 'u'].includes(e.key.toLowerCase())) {
        e.preventDefault()
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div className="no-copy">{children}</div>
}
