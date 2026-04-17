import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { About } from '../sections/About'
import { Approach } from '../sections/Approach'
import { Contacts } from '../sections/Contacts'
import { ForWho } from '../sections/ForWho'
import { Hero } from '../sections/Hero'
import { HeroFlowMarquee } from '../sections/HeroFlowMarquee'
import { Manifest } from '../sections/Manifest'
import { Projects } from '../sections/Projects'
import { Services } from '../sections/Services'
import { Stack } from '../sections/Stack'
import { Testimonials } from '../sections/Testimonials'
import { WhyMe } from '../sections/WhyMe'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const section = searchParams.get('section')

  useEffect(() => {
    if (!section) return
    const id = window.requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      setSearchParams({}, { replace: true })
    })
    return () => window.cancelAnimationFrame(id)
  }, [section, setSearchParams])

  return (
    <>
      <Hero />
      <HeroFlowMarquee />
      <About />
      <Services />
      <Approach />
      <Projects />
      <WhyMe />
      <Stack />
      <ForWho />
      <Manifest />
      <Testimonials />
      <Contacts />
    </>
  )
}
