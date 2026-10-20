/* 요약 한 줄 안의 **굵게**만 살린다. */
export default function Rich({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/g).map((t, i) => (i % 2 ? <strong key={i}>{t}</strong> : t))}</>
}
