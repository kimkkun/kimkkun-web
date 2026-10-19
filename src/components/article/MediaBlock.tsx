import LoopVideo from '@/components/article/LoopVideo'

/* 글 사이 사진·짧은 영상. 내용은 "키: 값" 줄로 쓴다.
   :::photo / :::video
   src: /articles/글/파일
   poster: (영상만) 첫 장면 사진
   alt: 사진 설명
   caption: 사진 아래 한 줄
   credit: 출처 표시(예: AI로 만든 장면)
   :::
   영상은 소리 없이 반복 재생한다(움직이는 사진처럼). */
function fields(content: string) {
  const f: Record<string, string> = {}
  content.split('\n').forEach((line) => {
    const i = line.indexOf(':')
    if (i > 0) f[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  })
  return f
}

export default function MediaBlock({ kind, content }: { kind: 'photo' | 'video'; content: string }) {
  const f = fields(content)
  if (!f.src) return null
  return (
    <figure className="rn-media">
      {kind === 'video' ? (
        <LoopVideo src={f.src} poster={f.poster} label={f.alt || f.caption} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={f.src} alt={f.alt || f.caption || ''} loading="lazy" />
      )}
      {(f.caption || f.credit) && (
        <figcaption>
          {f.caption}
          {f.credit && <small>{f.credit}</small>}
        </figcaption>
      )}
    </figure>
  )
}
