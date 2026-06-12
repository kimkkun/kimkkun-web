import Hero from '@/components/home/Hero'
import Problem from '@/components/home/Problem'
import Belief from '@/components/home/Belief'
import Categories from '@/components/home/Categories'
import Cta from '@/components/home/Cta'
import Reveal from '@/components/home/Reveal'

export default function HomePage() {
  return (
    <>
      <Reveal />
      <Hero />
      <Problem />
      <Belief />
      <Categories />
      <Cta />
    </>
  )
}
