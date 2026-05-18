import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { About } from '../sections/About'
import { Approach } from '../sections/Approach'
import { Contacts } from '../sections/Contacts'
import { Hero } from '../sections/Hero'
import { HeroFlowMarquee } from '../sections/HeroFlowMarquee'
import { Projects } from '../sections/Projects'
import { Stack } from '../sections/Stack'
import { Thinking } from '../sections/Thinking'

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
      <Projects />
      <Thinking />
      <Stack />
      <Approach />
      <Contacts />
    </>
  )
}
