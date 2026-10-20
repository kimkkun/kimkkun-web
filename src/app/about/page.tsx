import { redirect } from 'next/navigation'

/* 2026-10 리뉴얼: 소개는 첫 화면의 소개 칸으로 합쳤다. 예전 /about 링크는 그쪽으로 보낸다. */
export default function AboutPage() {
  redirect('/#about')
}
